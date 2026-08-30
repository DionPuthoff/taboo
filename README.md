# Taboo Party

A fast-paced, mobile-first Taboo-style party game for two teams. Built with Next.js 16, React 19,
TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Two-team local play** — pass the device back and forth, no accounts or setup required
- **20 curated decks, 1,000 cards** — five difficulty tiers (Easy → Expert) across topics like
  animals, food, technology, science, mythology, business, idioms, and wordplay
- **Fully configurable rules** — round length, number of rounds, free skips, and a taboo penalty
  toggle (0 or −1 points)
- **Deck mixing** — select any combination of decks; cards are merged and shuffled into a single
  draw pile
- **Circular countdown timer** with an urgency pulse in the final seconds
- **Round summaries** and a final **winner screen** with per-team stats and light confetti
- **Installable PWA** with offline support via a service worker
- **Dark glassmorphism UI**, smooth Framer Motion transitions, fully responsive and mobile-first
- **LocalStorage persistence** — your settings (teams, rules, deck selection) are remembered
  between sessions

## Getting Started

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Build for Production

```bash
npm run build
npm run start
```

## Deploying to Vercel

This project is ready to deploy as-is:

1. Push this repository to GitHub (or GitLab/Bitbucket).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Vercel will auto-detect Next.js — no configuration needed. Click **Deploy**.

Alternatively, with the [Vercel CLI](https://vercel.com/docs/cli):

```bash
npm i -g vercel
vercel
```

## How to Play

1. On the home screen, name both teams, tune the round length, number of rounds, free skips, and
   the taboo penalty, then choose one or more decks.
2. Tap **Start Game**. On each turn, pass the device to that team's Clue Giver and tap **I'm
   Ready!** to begin the countdown.
3. The Clue Giver describes the word on the card **without saying it or any of the five taboo
   words** beneath it.
   - Tap the green **✓** when their team guesses correctly (+1 point).
   - Tap the red **T** if a taboo word (or the word itself) is said (configurable penalty).
   - Tap the orange **↷** to skip a card (limited by the free-skip count).
4. When the timer runs out, a round summary appears, then the device passes to the other team.
5. After the configured number of rounds, the winner screen shows final scores and stats.

## Project Structure

```
app/
  layout.tsx          Root layout, fonts, PWA metadata
  page.tsx            Home screen (settings + deck selection)
  game/page.tsx        Game screen (ready → playing → round end → game end)
  globals.css         Design tokens and glass utilities
components/
  ui/                 Button, Input, Section
  home/               TeamInputs, NumberSelector, RuleSelector, DeckCard, DeckGrid
  game/               CircularTimer, GameCard, GameButtons, RoundSummary, WinnerScreen, ReadyScreen
hooks/
  useGameEngine.ts    Timer, turn, scoring, and phase-transition logic
lib/
  types.ts            Shared TypeScript types
  decks-meta.ts       Metadata for all 20 decks
  cards/              One JSON file per deck (50 cards each) + merge/shuffle helpers
  storage.ts          LocalStorage/sessionStorage helpers
public/
  manifest.webmanifest, sw.js, icons/   PWA assets
```

## Card Data Format

Each card follows this schema:

```json
{
  "id": "g1a001",
  "word": "Dog",
  "taboo": ["Bark", "Puppy", "Pet", "Bone", "Leash"],
  "difficulty": 1,
  "deck": "g1a"
}
```

## Tech Stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
