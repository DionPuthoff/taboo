"use client";

import { motion } from "framer-motion";
import { DeckMeta } from "../../lib/types";

interface DeckCardProps {
  deck: DeckMeta;
  selected: boolean;
  onToggle: (id: string) => void;
}

const difficultyDots: Record<number, string> = {
  1: "bg-emerald-400",
  2: "bg-lime-400",
  3: "bg-amber-400",
  4: "bg-orange-400",
  5: "bg-rose-400",
};

export function DeckCard({ deck, selected, onToggle }: DeckCardProps) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.96 }}
      onClick={() => onToggle(deck.id)}
      className={`relative flex flex-col justify-between rounded-3xl border p-4 text-left transition-all ${
        selected
          ? "border-aurora-violet/70 bg-aurora-violet/15 shadow-glow"
          : "border-white/10 bg-white/5 hover:bg-white/8"
      }`}
    >
      <div className="flex items-start justify-between">
        <span className={`h-2.5 w-2.5 rounded-full ${difficultyDots[deck.difficulty]}`} />
        <span className="text-[11px] font-semibold text-haze-400">{deck.cardCount} cards</span>
      </div>
      <div className="mt-3">
        <p className="font-display text-sm font-semibold leading-tight text-white">{deck.shortName}</p>
        <p className="mt-1 text-[11px] leading-snug text-haze-400 line-clamp-2">{deck.description}</p>
      </div>
      {selected && (
        <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-aurora-violet text-[11px] text-white">
          ✓
        </div>
      )}
    </motion.button>
  );
}
