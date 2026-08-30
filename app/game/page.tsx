"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useGameEngine } from "../../hooks/useGameEngine";
import { readPendingGame, loadSettings } from "../../lib/storage";
import { GameSettings } from "../../lib/types";
import { CircularTimer } from "../../components/game/CircularTimer";
import { GameCard } from "../../components/game/GameCard";
import { GameButtons } from "../../components/game/GameButtons";
import { RoundSummary } from "../../components/game/RoundSummary";
import { WinnerScreen } from "../../components/game/WinnerScreen";
import { ReadyScreen } from "../../components/game/ReadyScreen";

export default function GamePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<GameSettings | null>(null);

  useEffect(() => {
    const pending = readPendingGame() ?? loadSettings();
    if (!pending || pending.selectedDecks.length === 0) {
      router.replace("/");
      return;
    }
    // Reading session/localStorage must happen after mount, so this one-time
    // handoff from storage is an intentional exception to the "no setState in
    // effect" guideline rather than a value that could be derived during render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(pending);
  }, [router]);

  if (!settings) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-aurora-violet" />
      </div>
    );
  }

  return <GameRunner settings={settings} />;
}

function GameRunner({ settings }: { settings: GameSettings }) {
  const engine = useGameEngine(settings);
  const { state, secondsLeft, currentCard, startTurn, handleOutcome, continueAfterRound, restart } = engine;

  const teamName = state.activeTeam === 0 ? state.settings.team1Name : state.settings.team2Name;
  const nextTeamName = state.activeTeam === 0 ? state.settings.team2Name : state.settings.team1Name;
  const teamColor = state.activeTeam === 0 ? "text-team-one" : "text-team-two";

  if (state.phase === "gameEnd") {
    return (
      <WinnerScreen
        settings={state.settings}
        teamStats={state.teamStats}
        onPlayAgain={() => restart(state.settings)}
      />
    );
  }

  if (state.phase === "roundEnd") {
    const lastRecord = state.history[state.history.length - 1];
    if (!lastRecord) return null;
    return (
      <RoundSummary
        record={lastRecord}
        settings={state.settings}
        teamScores={state.teamScores}
        onContinue={continueAfterRound}
        nextTeamName={nextTeamName}
        isGameEnd={false}
      />
    );
  }

  if (state.phase === "ready") {
    return (
      <ReadyScreen
        settings={state.settings}
        activeTeam={state.activeTeam}
        currentRound={state.currentRound}
        teamScores={state.teamScores}
        onReady={startTurn}
      />
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col px-5 pb-10 pt-6 safe-top safe-bottom">
      <header className="flex items-center justify-between">
        <Link
          href="/"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/8 text-white"
          aria-label="Home"
        >
          ⌂
        </Link>
        <div className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-haze-400">
            Round {state.currentRound} · {teamName}
          </p>
        </div>
        <CircularTimer secondsLeft={secondsLeft} totalSeconds={state.settings.roundSeconds} />
      </header>

      <div className="mt-4 flex items-center justify-center gap-6">
        <ScorePill label={state.settings.team1Name} score={state.teamScores[0]} color="text-team-one" active={state.activeTeam === 0} />
        <ScorePill label={state.settings.team2Name} score={state.teamScores[1]} color="text-team-two" active={state.activeTeam === 1} />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-8 py-8">
        <GameCard card={currentCard} />
        <GameButtons
          skipsRemaining={state.skipsRemaining}
          onOutcome={handleOutcome}
          disabled={!currentCard}
        />
      </div>

      <p className={`text-center text-xs font-semibold uppercase tracking-widest ${teamColor}`}>
        {teamName} is guessing
      </p>
    </main>
  );
}

function ScorePill({
  label,
  score,
  color,
  active,
}: {
  label: string;
  score: number;
  color: string;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full px-4 py-1.5 transition ${
        active ? "glass-strong shadow-glass" : "opacity-50"
      }`}
    >
      <span className={`font-display text-sm font-bold ${color}`}>{label}</span>
      <span className="font-display text-sm font-bold text-white">{score}</span>
    </div>
  );
}
