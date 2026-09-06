export type Difficulty = 1 | 2 | 3 | 4 | 5;

export interface Card {
  id: string;
  word: string;
  taboo: [string, string, string, string, string];
  difficulty: Difficulty;
  deck: string;
}

export interface DeckMeta {
  id: string;
  name: string;
  shortName: string;
  difficulty: Difficulty;
  description: string;
  cardCount: number;
  secret?: boolean;
}

export type TabooPenalty = 0 | -1;

export interface GameSettings {
  team1Name: string;
  team2Name: string;
  roundSeconds: number;
  totalRounds: number;
  freeSkips: number;
  tabooPenalty: TabooPenalty;
  selectedDecks: string[];
  soundEnabled: boolean;
}

export type CardOutcome = "correct" | "skip" | "taboo";

export interface TurnLogEntry {
  card: Card;
  outcome: CardOutcome;
}

export interface TeamStats {
  name: string;
  score: number;
  correct: number;
  skips: number;
  taboos: number;
}

export interface RoundRecord {
  round: number;
  team: 0 | 1;
  entries: TurnLogEntry[];
  scoreDelta: number;
}

export interface GameState {
  settings: GameSettings;
  deck: Card[];
  cursor: number;
  currentRound: number;
  activeTeam: 0 | 1;
  teamScores: [number, number];
  teamStats: [TeamStats, TeamStats];
  history: RoundRecord[];
  skipsRemaining: number;
  phase: "ready" | "playing" | "roundEnd" | "gameEnd";
}
