"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { RoundRecord, GameSettings } from "../../lib/types";

interface RoundSummaryProps {
  record: RoundRecord;
  settings: GameSettings;
  teamScores: [number, number];
  onContinue: () => void;
  nextTeamName: string;
  isGameEnd: boolean;
}

export function RoundSummary({
  record,
  settings,
  teamScores,
  onContinue,
  nextTeamName,
  isGameEnd,
}: RoundSummaryProps) {
  const teamName = record.team === 0 ? settings.team1Name : settings.team2Name;
  const correct = record.entries.filter((e) => e.outcome === "correct");
  const taboos = record.entries.filter((e) => e.outcome === "taboo");
  const skips = record.entries.filter((e) => e.outcome === "skip");

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[70vh] flex-col justify-center gap-6 px-6 py-10"
    >
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-haze-400">
          Round {record.round} Complete
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-white">{teamName}</h1>
        <p
          className={`mt-1 font-display text-4xl font-extrabold ${
            record.scoreDelta >= 0 ? "text-signal-correct" : "text-signal-taboo"
          }`}
        >
          {record.scoreDelta >= 0 ? "+" : ""}
          {record.scoreDelta}
        </p>
      </div>

      <div className="glass rounded-4xl p-5 shadow-glass">
        <div className="mb-4 grid grid-cols-3 gap-3 text-center">
          <div>
            <p className="font-display text-2xl font-bold text-signal-correct">{correct.length}</p>
            <p className="text-[11px] uppercase tracking-wide text-haze-400">Correct</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-signal-taboo">{taboos.length}</p>
            <p className="text-[11px] uppercase tracking-wide text-haze-400">Taboo</p>
          </div>
          <div>
            <p className="font-display text-2xl font-bold text-signal-skip">{skips.length}</p>
            <p className="text-[11px] uppercase tracking-wide text-haze-400">Skipped</p>
          </div>
        </div>

        {record.entries.length > 0 && (
          <div className="max-h-40 space-y-1.5 overflow-y-auto no-scrollbar">
            {record.entries.map((entry, i) => (
              <div
                key={`${entry.card.id}-${i}`}
                className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2"
              >
                <span className="text-sm text-haze-200">{entry.card.word}</span>
                <span
                  className={`text-xs font-semibold uppercase ${
                    entry.outcome === "correct"
                      ? "text-signal-correct"
                      : entry.outcome === "taboo"
                      ? "text-signal-taboo"
                      : "text-signal-skip"
                  }`}
                >
                  {entry.outcome}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="glass flex items-center justify-between rounded-3xl px-5 py-4">
        <div>
          <p className="text-xs text-haze-400">{settings.team1Name}</p>
          <p className="font-display text-xl font-bold text-team-one">{teamScores[0]}</p>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="text-right">
          <p className="text-xs text-haze-400">{settings.team2Name}</p>
          <p className="font-display text-xl font-bold text-team-two">{teamScores[1]}</p>
        </div>
      </div>

      <Button fullWidth size="xl" onClick={onContinue}>
        {isGameEnd ? "See Final Results" : `Pass to ${nextTeamName}`}
      </Button>
    </motion.div>
  );
}
