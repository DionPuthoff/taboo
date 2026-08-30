"use client";

import { Input } from "../ui/Input";

interface TeamInputsProps {
  team1Name: string;
  team2Name: string;
  onChangeTeam1: (value: string) => void;
  onChangeTeam2: (value: string) => void;
}

export function TeamInputs({ team1Name, team2Name, onChangeTeam1, onChangeTeam2 }: TeamInputsProps) {
  return (
    <div className="space-y-3">
      <div className="relative">
        <div className="absolute left-4 top-1/2 mt-3 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-team-one" />
        <Input
          label="Team 1"
          value={team1Name}
          onChange={(e) => onChangeTeam1(e.target.value)}
          maxLength={20}
          placeholder="Red Team"
          className="pl-9"
        />
      </div>
      <div className="flex items-center justify-center">
        <span className="font-display text-xs font-bold tracking-[0.3em] text-haze-400">VS</span>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-1/2 mt-3 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-team-two" />
        <Input
          label="Team 2"
          value={team2Name}
          onChange={(e) => onChangeTeam2(e.target.value)}
          maxLength={20}
          placeholder="Blue Team"
          className="pl-9"
        />
      </div>
    </div>
  );
}
