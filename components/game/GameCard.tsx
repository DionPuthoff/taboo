"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card } from "../../lib/types";

interface GameCardProps {
  card: Card | null;
}

const DIFFICULTY_GRADIENTS: Record<number, string> = {
  1: "from-emerald-500 to-emerald-700",
  2: "from-lime-500 to-lime-700",
  3: "from-amber-500 to-amber-700",
  4: "from-orange-500 to-orange-700",
  5: "from-rose-500 to-rose-700",
};

export function GameCard({ card }: GameCardProps) {
  return (
    <div className="relative w-full max-w-sm">
      <AnimatePresence mode="wait">
        {card && (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 24, rotate: -2, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, rotate: 2, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="glass-strong overflow-hidden rounded-4xl shadow-glass-lg"
          >
            <div
              className={`bg-gradient-to-br ${DIFFICULTY_GRADIENTS[card.difficulty]} px-6 py-7 text-center`}
            >
              <p className="font-display text-3xl font-extrabold uppercase tracking-wide text-white drop-shadow-sm">
                {card.word}
              </p>
            </div>
            <div className="space-y-4 px-6 py-7">
              {card.taboo.map((word, i) => (
                <p
                  key={i}
                  className="text-center font-display text-lg font-semibold text-haze-200"
                >
                  {word}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
