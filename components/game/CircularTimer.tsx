"use client";

import { motion } from "framer-motion";

interface CircularTimerProps {
  secondsLeft: number;
  totalSeconds: number;
  size?: number;
}

export function CircularTimer({ secondsLeft, totalSeconds, size = 92 }: CircularTimerProps) {
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  const dashOffset = circumference * (1 - progress);
  const isUrgent = secondsLeft <= 10 && secondsLeft > 0;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {isUrgent && (
        <div className="absolute inset-0 rounded-full bg-signal-taboo/40 animate-pulse-ring" />
      )}
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth={7}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={isUrgent ? "#ff4d5e" : "#7c5cff"}
          strokeWidth={7}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 0.9, ease: "linear" }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          className={`font-display text-xl font-bold tabular-nums ${
            isUrgent ? "text-signal-taboo" : "text-white"
          }`}
        >
          {secondsLeft}
        </span>
      </div>
    </div>
  );
}
