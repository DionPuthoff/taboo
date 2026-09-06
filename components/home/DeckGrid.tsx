"use client";

import { motion, AnimatePresence } from "framer-motion";
import { DECKS_BY_DIFFICULTY, GOLD_DECKS } from "../../lib/decks-meta";
import { DeckCard } from "./DeckCard";

interface DeckGridProps {
  selectedDecks: string[];
  onToggle: (id: string) => void;
  goldUnlocked?: boolean;
}

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Difficulty 1 · Easy",
  2: "Difficulty 2 · Simple",
  3: "Difficulty 3 · Medium",
  4: "Difficulty 4 · Hard",
  5: "Difficulty 5 · Expert",
};

export function DeckGrid({ selectedDecks, onToggle, goldUnlocked = false }: DeckGridProps) {
  return (
    <div className="space-y-5">
      {[1, 2, 3, 4, 5].map((difficulty) => (
        <div key={difficulty}>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-haze-400">
            {DIFFICULTY_LABELS[difficulty]}
          </p>
          <div className="grid grid-cols-2 gap-3">
            {DECKS_BY_DIFFICULTY[difficulty].map((deck) => (
              <DeckCard
                key={deck.id}
                deck={deck}
                selected={selectedDecks.includes(deck.id)}
                onToggle={onToggle}
              />
            ))}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {goldUnlocked && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-amber-300/80">
              ✨ Secret · Gold Decks
            </p>
            <div className="grid grid-cols-2 gap-3">
              {GOLD_DECKS.map((deck) => (
                <DeckCard
                  key={deck.id}
                  deck={deck}
                  selected={selectedDecks.includes(deck.id)}
                  onToggle={onToggle}
                  gold
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
