"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import { Section } from "../components/ui/Section";
import { TeamInputs } from "../components/home/TeamInputs";
import { NumberSelector } from "../components/home/NumberSelector";
import { RuleSelector } from "../components/home/RuleSelector";
import { DeckGrid } from "../components/home/DeckGrid";
import { DEFAULT_SETTINGS, loadSettings, saveSettings, stashPendingGame } from "../lib/storage";
import { GameSettings } from "../lib/types";

export default function HomePage() {
  const router = useRouter();
  const [settings, setSettings] = useState<GameSettings>(DEFAULT_SETTINGS);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Reading localStorage must happen after mount (server has no localStorage),
    // so this one-time sync from storage is an intentional exception to the
    // "no setState in effect" guideline rather than a derivable render value.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSettings(loadSettings());
    setHydrated(true);
  }, []);

  const update = <K extends keyof GameSettings>(key: K, value: GameSettings[K]) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      saveSettings(next);
      return next;
    });
  };

  const toggleDeck = (id: string) => {
    setSettings((prev) => {
      const isSelected = prev.selectedDecks.includes(id);
      const nextDecks = isSelected
        ? prev.selectedDecks.filter((d) => d !== id)
        : [...prev.selectedDecks, id];
      const next = { ...prev, selectedDecks: nextDecks };
      saveSettings(next);
      return next;
    });
  };

  const totalCards = settings.selectedDecks.length * 50;
  const canStart = settings.selectedDecks.length > 0 && settings.team1Name.trim() && settings.team2Name.trim();

  const handleStart = () => {
    if (!canStart) return;
    stashPendingGame(settings);
    router.push("/game");
  };

  if (!hydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-aurora-violet" />
      </div>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col gap-5 px-4 pb-32 pt-10 safe-top">
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-aurora-violet">
          Party Game
        </p>
        <h1 className="mt-1 font-display text-4xl font-extrabold text-white">Taboo Party</h1>
        <p className="mt-2 text-sm text-haze-400">
          Describe the word. Avoid the taboo list. Beat the clock.
        </p>
      </motion.header>

      <div className="animate-fade-slide-up space-y-4">
        <Section title="Teams">
          <TeamInputs
            team1Name={settings.team1Name}
            team2Name={settings.team2Name}
            onChangeTeam1={(v) => update("team1Name", v)}
            onChangeTeam2={(v) => update("team2Name", v)}
          />
        </Section>

        <Section title="Rules" subtitle="Tune the pace and stakes">
          <NumberSelector
            label="Round Length"
            value={settings.roundSeconds}
            min={30}
            max={120}
            step={15}
            formatValue={(v) => `${v}s`}
            onChange={(v) => update("roundSeconds", v)}
          />
          <div className="my-1 h-px bg-white/8" />
          <NumberSelector
            label="Number of Rounds"
            value={settings.totalRounds}
            min={1}
            max={10}
            onChange={(v) => update("totalRounds", v)}
          />
          <div className="my-1 h-px bg-white/8" />
          <NumberSelector
            label="Free Skips"
            value={settings.freeSkips}
            min={0}
            max={10}
            onChange={(v) => update("freeSkips", v)}
          />
          <div className="my-1 h-px bg-white/8" />
          <RuleSelector
            tabooPenalty={settings.tabooPenalty}
            onChangePenalty={(v) => update("tabooPenalty", v)}
          />
        </Section>

        <Section
          title="Choose Your Decks"
          subtitle={`${settings.selectedDecks.length} decks selected · ${totalCards} cards`}
        >
          <DeckGrid selectedDecks={settings.selectedDecks} onToggle={toggleDeck} />
        </Section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 mx-auto max-w-md px-4 pb-6 pt-4 safe-bottom">
        <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 bg-gradient-to-t from-ink-950 to-transparent" />
        <div className="relative">
          <Button fullWidth size="xl" onClick={handleStart} disabled={!canStart}>
            {canStart ? "Start Game" : "Select at Least One Deck"}
          </Button>
        </div>
      </div>
    </main>
  );
}
