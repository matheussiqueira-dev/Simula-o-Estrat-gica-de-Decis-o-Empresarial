"use client";

import { useId } from "react";
import clsx from "clsx";

type VariableSliderProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  hint?: string;
  onChange: (next: number) => void;
};

export function VariableSlider({
  label,
  value,
  min,
  max,
  step = 1,
  unit,
  hint,
  onChange,
}: VariableSliderProps) {
  const id = useId();

  return (
    <div className="glass-panel rounded-2xl p-4 shadow-glass transition-all hover:shadow-glow-green">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-sm font-semibold text-slate-200">{label}</p>
          {hint ? (
            <p className="text-xs text-slate-400">{hint}</p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-50">
            {value.toLocaleString("en-US", {
              maximumFractionDigits: 2,
              minimumFractionDigits: step < 1 ? 1 : 0,
            })}
            {unit ? <span className="ml-1 text-xs text-slate-400">{unit}</span> : null}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <input
          id={id}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className={clsx(
            "h-2 w-full appearance-none rounded-full bg-slate-800",
            "accent-green-400"
          )}
        />
        <div className="flex items-center gap-2 rounded-lg bg-slate-900/60 px-3 py-2">
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            step={step}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1 text-sm outline-none ring-0 focus:border-green-400 focus:bg-slate-900"
          />
          {unit ? (
            <span className="rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300">
              {unit}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}
