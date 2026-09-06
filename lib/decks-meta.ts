import { DeckMeta } from "./types";

export const DECKS: DeckMeta[] = [
  { id: "g1a", name: "Animals", shortName: "Animals", difficulty: 1, description: "Familiar creatures, from pets to farmyard favorites.", cardCount: 50 },
  { id: "g1b", name: "Food & Drink", shortName: "Food", difficulty: 1, description: "Everyday meals, snacks, and things you'd find in a kitchen.", cardCount: 50 },
  { id: "g1c", name: "Around the House", shortName: "Household", difficulty: 1, description: "Objects and rooms found in any home.", cardCount: 50 },
  { id: "g1d", name: "Body & Clothes", shortName: "Body & Clothes", difficulty: 1, description: "Body parts, garments, and things you wear.", cardCount: 50 },
  { id: "g1e", name: "Toys & Games", shortName: "Toys", difficulty: 1, description: "Playthings and games kids and families enjoy.", cardCount: 50 },
  { id: "g1f", name: "Colors & Shapes", shortName: "Colors & Shapes", difficulty: 1, description: "Basic colors, shapes, and patterns.", cardCount: 50 },

  { id: "g2a", name: "Places & Locations", shortName: "Places", difficulty: 2, description: "Cities, landmarks, and everyday destinations.", cardCount: 50 },
  { id: "g2b", name: "Sports & Games", shortName: "Sports", difficulty: 2, description: "Games, sports, and things you play.", cardCount: 50 },
  { id: "g2c", name: "School & Jobs", shortName: "School & Jobs", difficulty: 2, description: "Classrooms, careers, and everyday work life.", cardCount: 50 },
  { id: "g2d", name: "Weather & Nature", shortName: "Nature", difficulty: 2, description: "Seasons, weather, and the natural world.", cardCount: 50 },
  { id: "g2e", name: "Holidays & Celebrations", shortName: "Holidays", difficulty: 2, description: "Festive occasions and the traditions around them.", cardCount: 50 },
  { id: "g2f", name: "Space & Planets", shortName: "Space", difficulty: 2, description: "Planets, astronauts, and the wonders of space.", cardCount: 50 },

  { id: "g3a", name: "Entertainment & Music", shortName: "Entertainment", difficulty: 3, description: "Shows, songs, and things that entertain.", cardCount: 50 },
  { id: "g3b", name: "Technology", shortName: "Tech", difficulty: 3, description: "Gadgets, apps, and the digital world.", cardCount: 50 },
  { id: "g3c", name: "Emotions & Actions", shortName: "Emotions", difficulty: 3, description: "Feelings and things people do.", cardCount: 50 },
  { id: "g3d", name: "Travel & Transportation", shortName: "Travel", difficulty: 3, description: "Getting around — vehicles, trips, and journeys.", cardCount: 50 },
  { id: "g3e", name: "Kitchen & Cooking", shortName: "Cooking", difficulty: 3, description: "Techniques, tools, and terms from the kitchen.", cardCount: 50 },
  { id: "g3f", name: "Fashion & Style", shortName: "Fashion", difficulty: 3, description: "Trends, designers, and the world of style.", cardCount: 50 },

  { id: "g4a", name: "Movies & Shows", shortName: "Movies & TV", difficulty: 4, description: "Genres, formats, and moments from screen entertainment.", cardCount: 50 },
  { id: "g4b", name: "Science", shortName: "Science", difficulty: 4, description: "Concepts and discoveries from the world of science.", cardCount: 50 },
  { id: "g4c", name: "History & Geography", shortName: "History", difficulty: 4, description: "Eras, events, and places that shaped the world.", cardCount: 50 },
  { id: "g4d", name: "Idioms & Phrases", shortName: "Idioms", difficulty: 4, description: "Common sayings and figures of speech.", cardCount: 50 },
  { id: "g4e", name: "Art & Design", shortName: "Art & Design", difficulty: 4, description: "Techniques, styles, and terms from the art world.", cardCount: 50 },
  { id: "g4f", name: "Law & Government", shortName: "Law & Gov", difficulty: 4, description: "Courts, elections, and how governments work.", cardCount: 50 },

  { id: "g5a", name: "Abstract Concepts", shortName: "Abstract", difficulty: 5, description: "Ideas and concepts that take some describing.", cardCount: 50 },
  { id: "g5b", name: "Myths & Legends", shortName: "Mythology", difficulty: 5, description: "Legendary creatures, tales, and folklore.", cardCount: 50 },
  { id: "g5c", name: "Business & Finance", shortName: "Business", difficulty: 5, description: "Money, markets, and the world of work.", cardCount: 50 },
  { id: "g5d", name: "Wordplay & Compounds", shortName: "Wordplay", difficulty: 5, description: "Compound words and clever combinations.", cardCount: 50 },
  { id: "g5e", name: "Inventions & Discoveries", shortName: "Inventions", difficulty: 5, description: "Breakthroughs and discoveries that changed the world.", cardCount: 50 },
  { id: "g5f", name: "Psychology & Behavior", shortName: "Psychology", difficulty: 5, description: "How the mind works and why people act the way they do.", cardCount: 50 },
];

export const GOLD_DECKS: DeckMeta[] = [
  { id: "g6a", name: "World Landmarks", shortName: "Landmarks", difficulty: 3, description: "Famous places and wonders known around the world.", cardCount: 50, secret: true },
  { id: "g6b", name: "Time & Calendar", shortName: "Time", difficulty: 2, description: "Clocks, calendars, and everything about time.", cardCount: 50, secret: true },
  { id: "g6c", name: "Odds & Ends", shortName: "Odds & Ends", difficulty: 4, description: "Handy everyday items you know but rarely name.", cardCount: 50, secret: true },
  { id: "g6d", name: "Superlatives & Records", shortName: "Superlatives", difficulty: 5, description: "Bests, firsts, and records that stand out.", cardCount: 50, secret: true },
];

export const DECKS_BY_DIFFICULTY: Record<number, DeckMeta[]> = {
  1: DECKS.filter((d) => d.difficulty === 1),
  2: DECKS.filter((d) => d.difficulty === 2),
  3: DECKS.filter((d) => d.difficulty === 3),
  4: DECKS.filter((d) => d.difficulty === 4),
  5: DECKS.filter((d) => d.difficulty === 5),
};

export function getDeckMeta(id: string): DeckMeta | undefined {
  return DECKS.find((d) => d.id === id) ?? GOLD_DECKS.find((d) => d.id === id);
}
