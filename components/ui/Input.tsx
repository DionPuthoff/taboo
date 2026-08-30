"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  accentClassName?: string;
}

export function Input({ label, accentClassName = "", className = "", ...props }: InputProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-xs font-semibold uppercase tracking-widest text-haze-400">
          {label}
        </span>
      )}
      <input
        className={`w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3.5 text-base text-white placeholder-haze-400/60 outline-none transition focus:border-white/30 focus:bg-white/10 ${accentClassName} ${className}`}
        {...props}
      />
    </label>
  );
}
