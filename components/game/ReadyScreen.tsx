"use client";

import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { GameSettings } from "../../lib/types";

interface ReadyScreenProps {
  settings: GameSettings;
  activeTeam: 0 | 1;
  currentRound: number;
  teamScores: [number, number];
  onReady: () => void;
}

export function ReadyScreen({ settings, activeTeam, currentRound, teamScores, onReady }: ReadyScreenProps) {
  const teamName = activeTeam === 0 ? settings.team1Name : settings.team2Name;
  const teamColor = activeTeam === 0 ? "text-team-one" : "text-team-two";
  const gradient =
    activeTeam === 0 ? "from-team-one to-team-one-deep" : "from-team-two to-team-two-deep";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex min-h-screen flex-col items-center justify-center px-6 py-10 text-center"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-haze-400">
        Round {currentRound} of {settings.totalRounds}
      </p>

      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
        className={`mt-8 flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br ${gradient} shadow-glow animate-float`}
      >
        <span className="font-display text-4xl font-extrabold text-white">
          {teamName.slice(0, 2).toUpperCase()}
        </span>
      </motion.div>

      <h1 className={`mt-6 font-display text-3xl font-extrabold ${teamColor}`}>{teamName}</h1>
      <p className="mt-1 text-sm text-haze-400">Current score: {teamScores[activeTeam]}</p>

      <p className="mt-8 max-w-xs text-sm text-haze-300">
        Pass the device to the Clue Giver. They&apos;ll describe the word without saying it or the
        taboo words below it.
      </p>

      <Button size="xl" fullWidth className="mt-10 max-w-xs" onClick={onReady}>
        I&apos;m Ready!
      </Button>
    </motion.div>
  );
}
