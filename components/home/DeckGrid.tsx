"use client";

import { DECKS_BY_DIFFICULTY } from "../../lib/decks-meta";
import { DeckCard } from "./DeckCard";

interface DeckGridProps {
  selectedDecks: string[];
  onToggle: (id: string) => void;
}

const DIFFICULTY_LABELS: Record<number, string> = {
  1: "Difficulty 1 · Easy",
  2: "Difficulty 2 · Simple",
  3: "Difficulty 3 · Medium",
  4: "Difficulty 4 · Hard",
  5: "Difficulty 5 · Expert",
};

export function DeckGrid({ selectedDecks, onToggle }: DeckGridProps) {
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
    </div>
  );
}
