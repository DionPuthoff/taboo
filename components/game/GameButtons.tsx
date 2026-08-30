"use client";

import { motion } from "framer-motion";
import { CardOutcome } from "../../lib/types";

interface GameButtonsProps {
  skipsRemaining: number;
  onOutcome: (outcome: CardOutcome) => void;
  disabled?: boolean;
}

export function GameButtons({ skipsRemaining, onOutcome, disabled }: GameButtonsProps) {
  const skipDisabled = disabled || skipsRemaining <= 0;

  return (
    <div className="flex items-center justify-center gap-5">
      <div className="relative">
        {skipsRemaining > 0 && (
          <span className="absolute -right-1 -top-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-signal-skip text-[11px] font-bold text-ink-950 shadow">
            {skipsRemaining}
          </span>
        )}
        <motion.button
          type="button"
          whileTap={{ scale: skipDisabled ? 1 : 0.9 }}
          onClick={() => onOutcome("skip")}
          disabled={skipDisabled}
          aria-label="Skip"
          className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-signal-skip to-signal-skip-deep text-2xl text-ink-950 shadow-glass disabled:opacity-30"
        >
          ↷
        </motion.button>
      </div>

      <motion.button
        type="button"
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={() => onOutcome("taboo")}
        disabled={disabled}
        aria-label="Taboo"
        className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-signal-taboo to-signal-taboo-deep text-3xl font-display font-extrabold text-white shadow-glow disabled:opacity-30"
      >
        T
      </motion.button>

      <motion.button
        type="button"
        whileTap={{ scale: disabled ? 1 : 0.9 }}
        onClick={() => onOutcome("correct")}
        disabled={disabled}
        aria-label="Correct"
        className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-b from-signal-correct to-signal-correct-deep text-2xl text-white shadow-glass disabled:opacity-30"
      >
        ✓
      </motion.button>
    </div>
  );
}
