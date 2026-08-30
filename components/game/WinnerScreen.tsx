"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { GameSettings, TeamStats } from "../../lib/types";
import Link from "next/link";

interface WinnerScreenProps {
  settings: GameSettings;
  teamStats: [TeamStats, TeamStats];
  onPlayAgain: () => void;
}

export function WinnerScreen({ settings, teamStats, onPlayAgain }: WinnerScreenProps) {
  const [t1, t2] = teamStats;
  const isTie = t1.score === t2.score;
  const winner = t1.score > t2.score ? t1 : t2;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-10">
      <Confetti />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
        className="z-10 text-center"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-haze-400">
          {isTie ? "It's a Tie" : "Winner"}
        </p>
        <h1 className="mt-3 font-display text-4xl font-extrabold text-white drop-shadow-lg">
          {isTie ? "Great Game!" : winner.name}
        </h1>
        {!isTie && (
          <p className="mt-2 font-display text-6xl font-extrabold text-signal-correct">{winner.score}</p>
        )}
      </motion.div>

      <div className="z-10 mt-10 w-full max-w-sm space-y-3">
        {teamStats.map((team, i) => (
          <motion.div
            key={team.name}
            initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-strong flex items-center justify-between rounded-3xl px-5 py-4 shadow-glass"
          >
            <div>
              <p
                className={`font-display text-base font-bold ${
                  i === 0 ? "text-team-one" : "text-team-two"
                }`}
              >
                {team.name}
              </p>
              <p className="mt-1 text-xs text-haze-400">
                {team.correct} correct · {team.taboos} taboo · {team.skips} skipped
              </p>
            </div>
            <p className="font-display text-3xl font-extrabold text-white">{team.score}</p>
          </motion.div>
        ))}
      </div>

      <div className="z-10 mt-10 flex w-full max-w-sm flex-col gap-3">
        <Button fullWidth size="xl" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Link href="/" className="w-full">
          <Button fullWidth size="lg" variant="secondary">
            New Setup
          </Button>
        </Link>
      </div>
    </div>
  );
}

const CONFETTI_COLORS = ["#7c5cff", "#e14fd4", "#3ddc97", "#ffb84d", "#ff6b7a", "#4fc3ff"];

interface ConfettiPiece {
  left: number;
  delay: number;
  duration: number;
  color: string;
  size: number;
}

function makeConfettiPieces(count: number): ConfettiPiece[] {
  return Array.from({ length: count }, (_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 0.6,
    duration: 2.4 + Math.random() * 1.6,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    size: 6 + Math.random() * 6,
  }));
}

function Confetti() {
  // Randomized once via lazy initializer so render itself stays pure/idempotent.
  const [pieces] = useState(() => makeConfettiPieces(24));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece, i) => (
        <motion.span
          key={i}
          initial={{ y: -40, opacity: 0, rotate: 0 }}
          animate={{ y: "110vh", opacity: [0, 1, 1, 0], rotate: 360 }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            ease: "easeIn",
            repeat: Infinity,
            repeatDelay: 1.5,
          }}
          style={{
            position: "absolute",
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size * 1.6,
            backgroundColor: piece.color,
            borderRadius: 2,
          }}
        />
      ))}
    </div>
  );
}
