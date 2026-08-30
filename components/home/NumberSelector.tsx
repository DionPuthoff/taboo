"use client";

interface NumberSelectorProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  formatValue?: (value: number) => string;
  onChange: (value: number) => void;
}

export function NumberSelector({
  label,
  value,
  min,
  max,
  step = 1,
  formatValue,
  onChange,
}: NumberSelectorProps) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));

  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <span className="text-sm font-medium text-haze-200">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={decrement}
          disabled={value <= min}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-lg font-semibold text-white transition hover:bg-white/15 disabled:opacity-30"
          aria-label={`Decrease ${label}`}
        >
          −
        </button>
        <span className="font-display w-16 text-center text-base font-semibold text-white tabular-nums">
          {formatValue ? formatValue(value) : value}
        </span>
        <button
          type="button"
          onClick={increment}
          disabled={value >= max}
          className="flex h-9 w-9 items-center justify-center rounded-full bg-white/8 text-lg font-semibold text-white transition hover:bg-white/15 disabled:opacity-30"
          aria-label={`Increase ${label}`}
        >
          +
        </button>
      </div>
    </div>
  );
}
