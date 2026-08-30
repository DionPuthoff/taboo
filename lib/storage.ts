import { GameSettings } from "./types";

const SETTINGS_KEY = "taboo-party:settings";

export const DEFAULT_SETTINGS: GameSettings = {
  team1Name: "Red Team",
  team2Name: "Blue Team",
  roundSeconds: 60,
  totalRounds: 4,
  freeSkips: 3,
  tabooPenalty: -1,
  selectedDecks: ["g1a", "g1b", "g1c", "g1d"],
  soundEnabled: true,
};

export function loadSettings(): GameSettings {
  if (typeof window === "undefined") return DEFAULT_SETTINGS;
  try {
    const raw = window.localStorage.getItem(SETTINGS_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_SETTINGS, ...parsed };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: GameSettings): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch {
    // localStorage unavailable (private browsing, quota) — fail silently.
  }
}

const PENDING_GAME_KEY = "taboo-party:pending-game";

export function stashPendingGame(settings: GameSettings): void {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(PENDING_GAME_KEY, JSON.stringify(settings));
  } catch {
    // ignore
  }
}

export function readPendingGame(): GameSettings | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.sessionStorage.getItem(PENDING_GAME_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameSettings;
  } catch {
    return null;
  }
}
