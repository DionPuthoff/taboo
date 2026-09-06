"use client";

import { motion } from "framer-motion";
import { DeckMeta } from "../../lib/types";

interface DeckCardProps {
  deck: DeckMeta;
  selected: boolean;
  onToggle: (id: string) => void;
  gold?: boolean;
}

const difficultyDots: Record<number, string> = {
  1: "bg-emerald-400",
  2: "bg-lime-400",
  3: "bg-amber-400",
  4: "bg-orange-400",
  5: "bg-rose-400",
};

export function DeckCard({ deck, selected, onToggle, gold = false }: DeckCardProps) {
  if (gold) {
    return (
      <motion.button
        type="button"
        whileTap={{ scale: 0.96 }}
        onClick={() => onToggle(deck.id)}
        className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-4 text-left transition-all ${
          selected
            ? "border-amber-300/80 bg-gradient-to-br from-amber-400/25 via-yellow-300/15 to-amber-600/25 shadow-[0_0_30px_rgba(251,191,36,0.35)]"
            : "border-amber-400/40 bg-gradient-to-br from-amber-400/10 via-yellow-300/5 to-amber-600/10 hover:from-amber-400/15 hover:to-amber-600/15"
        }`}
      >
        <div className="pointer-events-none absolute -right-6 -top-6 h-16 w-16 rounded-full bg-amber-300/20 blur-xl" />
        <div className="flex items-start justify-between">
          <span className="text-sm">✨</span>
          <span className="text-[11px] font-semibold text-amber-200/80">{deck.cardCount} cards</span>
        </div>
        <div className="mt-3">
          <p className="font-display text-sm font-semibold leading-tight text-amber-100">
            {deck.shortName}
          </p>
          <p className="mt-1 text-[11px] leading-snug text-amber-200/60 line-clamp-2">
            {deck.description}
          </p>
        </div>
        {selected && (
          <div className="absolute right-3 top-3 flex h-5 w-5 items-center justify-center rounded-full bg-amber-400 text-[11px] text-ink-950">
            ✓
          </div>
        )}
      </motion.button>
    );
  }

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
