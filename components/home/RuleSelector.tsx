"use client";

import { TabooPenalty } from "../../lib/types";

interface RuleSelectorProps {
  tabooPenalty: TabooPenalty;
  onChangePenalty: (value: TabooPenalty) => void;
}

export function RuleSelector({ tabooPenalty, onChangePenalty }: RuleSelectorProps) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm font-medium text-haze-200">Taboo Penalty</span>
      <div className="flex overflow-hidden rounded-2xl border border-white/10">
        <button
          type="button"
          onClick={() => onChangePenalty(0)}
          className={`px-4 py-2 text-sm font-semibold transition ${
            tabooPenalty === 0 ? "bg-signal-skip text-ink-950" : "bg-white/5 text-haze-300 hover:bg-white/10"
          }`}
        >
          No Penalty
        </button>
        <button
          type="button"
          onClick={() => onChangePenalty(-1)}
          className={`px-4 py-2 text-sm font-semibold transition ${
            tabooPenalty === -1 ? "bg-signal-taboo text-white" : "bg-white/5 text-haze-300 hover:bg-white/10"
          }`}
        >
          −1 Point
        </button>
      </div>
    </div>
  );
}
