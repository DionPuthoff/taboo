"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { buildDeck } from "../lib/cards";
import { Card, CardOutcome, GameSettings, GameState, RoundRecord, TurnLogEntry } from "../lib/types";

function makeInitialState(settings: GameSettings): GameState {
  return {
    settings,
    deck: buildDeck(settings.selectedDecks),
    cursor: 0,
    currentRound: 1,
    activeTeam: 0,
    teamScores: [0, 0],
    teamStats: [
      { name: settings.team1Name, score: 0, correct: 0, skips: 0, taboos: 0 },
      { name: settings.team2Name, score: 0, correct: 0, skips: 0, taboos: 0 },
    ],
    history: [],
    skipsRemaining: settings.freeSkips,
    phase: "ready",
  };
}

export interface UseGameEngine {
  state: GameState;
  secondsLeft: number;
  currentCard: Card | null;
  isLastRound: boolean;
  startTurn: () => void;
  handleOutcome: (outcome: CardOutcome) => void;
  continueAfterRound: () => void;
  restart: (settings: GameSettings) => void;
}

export function useGameEngine(initialSettings: GameSettings): UseGameEngine {
  const [state, setState] = useState<GameState>(() => makeInitialState(initialSettings));
  const [secondsLeft, setSecondsLeft] = useState(initialSettings.roundSeconds);
  const turnLogRef = useRef<TurnLogEntry[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  useEffect(() => clearTimer, [clearTimer]);

  const endTurn = useCallback(() => {
    clearTimer();
    setState((prev) => {
      const scoreDelta = turnLogRef.current.reduce((sum, entry) => {
        if (entry.outcome === "correct") return sum + 1;
        if (entry.outcome === "taboo") return sum + prev.settings.tabooPenalty;
        return sum;
      }, 0);

      const record: RoundRecord = {
        round: prev.currentRound,
        team: prev.activeTeam,
        entries: [...turnLogRef.current],
        scoreDelta,
      };

      const newScores: [number, number] = [...prev.teamScores] as [number, number];
      newScores[prev.activeTeam] += scoreDelta;

      const newStats = [...prev.teamStats] as [typeof prev.teamStats[0], typeof prev.teamStats[1]];
      const correctCount = turnLogRef.current.filter((e) => e.outcome === "correct").length;
      const skipCount = turnLogRef.current.filter((e) => e.outcome === "skip").length;
      const tabooCount = turnLogRef.current.filter((e) => e.outcome === "taboo").length;
      newStats[prev.activeTeam] = {
        ...newStats[prev.activeTeam],
        score: newScores[prev.activeTeam],
        correct: newStats[prev.activeTeam].correct + correctCount,
        skips: newStats[prev.activeTeam].skips + skipCount,
        taboos: newStats[prev.activeTeam].taboos + tabooCount,
      };

      const finishedFinalTurn = prev.activeTeam === 1 && prev.currentRound >= prev.settings.totalRounds;

      turnLogRef.current = [];

      return {
        ...prev,
        teamScores: newScores,
        teamStats: newStats,
        history: [...prev.history, record],
        phase: finishedFinalTurn ? "gameEnd" : "roundEnd",
      };
    });
  }, [clearTimer]);

  const startTurn = useCallback(() => {
    turnLogRef.current = [];
    setSecondsLeft(state.settings.roundSeconds);
    setState((prev) => ({
      ...prev,
      phase: "playing",
      skipsRemaining: prev.settings.freeSkips,
    }));
    clearTimer();
    intervalRef.current = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) {
          clearTimer();
          endTurn();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
  }, [clearTimer, endTurn, state.settings.roundSeconds]);

  const advanceCard = useCallback((prev: GameState): GameState => {
    let nextCursor = prev.cursor + 1;
    let nextDeck = prev.deck;
    if (nextCursor >= nextDeck.length) {
      nextDeck = buildDeck(prev.settings.selectedDecks);
      nextCursor = 0;
    }
    return { ...prev, cursor: nextCursor, deck: nextDeck };
  }, []);

  const handleOutcome = useCallback(
    (outcome: CardOutcome) => {
      setState((prev) => {
        if (prev.phase !== "playing") return prev;
        const card = prev.deck[prev.cursor];
        if (!card) return prev;

        if (outcome === "skip") {
          if (prev.skipsRemaining <= 0) return prev;
        }

        turnLogRef.current = [...turnLogRef.current, { card, outcome }];

        const withAdvance = advanceCard(prev);
        return {
          ...withAdvance,
          skipsRemaining: outcome === "skip" ? prev.skipsRemaining - 1 : prev.skipsRemaining,
        };
      });
    },
    [advanceCard]
  );

  const continueAfterRound = useCallback(() => {
    setState((prev) => {
      if (prev.activeTeam === 0) {
        return { ...prev, activeTeam: 1, phase: "ready" };
      }
      return { ...prev, activeTeam: 0, currentRound: prev.currentRound + 1, phase: "ready" };
    });
  }, []);

  const restart = useCallback((settings: GameSettings) => {
    clearTimer();
    turnLogRef.current = [];
    setSecondsLeft(settings.roundSeconds);
    setState(makeInitialState(settings));
  }, [clearTimer]);

  const currentCard = state.deck[state.cursor] ?? null;
  const isLastRound = state.currentRound >= state.settings.totalRounds;

  return {
    state,
    secondsLeft,
    currentCard,
    isLastRound,
    startTurn,
    handleOutcome,
    continueAfterRound,
    restart,
  };
}
