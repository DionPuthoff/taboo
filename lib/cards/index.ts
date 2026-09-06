import { Card } from "../types";
import g1a from "./g1a.json";
import g1b from "./g1b.json";
import g1c from "./g1c.json";
import g1d from "./g1d.json";
import g1e from "./g1e.json";
import g1f from "./g1f.json";
import g2a from "./g2a.json";
import g2b from "./g2b.json";
import g2c from "./g2c.json";
import g2d from "./g2d.json";
import g2e from "./g2e.json";
import g2f from "./g2f.json";
import g3a from "./g3a.json";
import g3b from "./g3b.json";
import g3c from "./g3c.json";
import g3d from "./g3d.json";
import g3e from "./g3e.json";
import g3f from "./g3f.json";
import g4a from "./g4a.json";
import g4b from "./g4b.json";
import g4c from "./g4c.json";
import g4d from "./g4d.json";
import g4e from "./g4e.json";
import g4f from "./g4f.json";
import g5a from "./g5a.json";
import g5b from "./g5b.json";
import g5c from "./g5c.json";
import g5d from "./g5d.json";
import g5e from "./g5e.json";
import g5f from "./g5f.json";
import g6a from "./g6a.json";
import g6b from "./g6b.json";
import g6c from "./g6c.json";
import g6d from "./g6d.json";

export const CARDS_BY_DECK: Record<string, Card[]> = {
  g1a: g1a as Card[],
  g1b: g1b as Card[],
  g1c: g1c as Card[],
  g1d: g1d as Card[],
  g1e: g1e as Card[],
  g1f: g1f as Card[],
  g2a: g2a as Card[],
  g2b: g2b as Card[],
  g2c: g2c as Card[],
  g2d: g2d as Card[],
  g2e: g2e as Card[],
  g2f: g2f as Card[],
  g3a: g3a as Card[],
  g3b: g3b as Card[],
  g3c: g3c as Card[],
  g3d: g3d as Card[],
  g3e: g3e as Card[],
  g3f: g3f as Card[],
  g4a: g4a as Card[],
  g4b: g4b as Card[],
  g4c: g4c as Card[],
  g4d: g4d as Card[],
  g4e: g4e as Card[],
  g4f: g4f as Card[],
  g5a: g5a as Card[],
  g5b: g5b as Card[],
  g5c: g5c as Card[],
  g5d: g5d as Card[],
  g5e: g5e as Card[],
  g5f: g5f as Card[],
  g6a: g6a as Card[],
  g6b: g6b as Card[],
  g6c: g6c as Card[],
  g6d: g6d as Card[],
};

export const ALL_CARDS: Card[] = Object.values(CARDS_BY_DECK).flat();

/** Fisher-Yates shuffle, returns a new array. */
export function shuffle<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/** Merge the selected decks into a single shuffled draw pile. */
export function buildDeck(selectedDeckIds: string[]): Card[] {
  const merged = selectedDeckIds.flatMap((id) => CARDS_BY_DECK[id] ?? []);
  return shuffle(merged);
}
