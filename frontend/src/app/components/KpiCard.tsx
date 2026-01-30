"use client";

import clsx from "clsx";

type KpiCardProps = {
  title: string;
  value: string;
  note?: string;
  trend?: number;
  accent?: "green" | "amber" | "blue";
};

export function KpiCard({ title, value, note, trend, accent = "green" }: KpiCardProps) {
  const trendColor =
    trend === undefined
      ? "text-slate-300"
      : trend >= 0
      ? "text-green-400"
      : "text-amber-400";

  const badgeClass =
    accent === "green"
      ? "bg-green-500/10 text-green-300 border-green-500/30"
      : accent === "amber"
      ? "bg-amber-400/10 text-amber-200 border-amber-400/30"
      : "bg-sky-400/10 text-sky-200 border-sky-400/30";

  return (
    <div className="glass-panel rounded-3xl p-4 shadow-glass">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-300">{title}</p>
        <span
          className={clsx(
            "rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
            badgeClass
          )}
        >
          Live
        </span>
      </div>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-sm text-slate-400">
        {trend !== undefined ? (
          <span className={trendColor}>
            {trend > 0 ? "▲" : trend < 0 ? "▼" : "•"}{" "}
            {Math.abs(trend).toLocaleString("en-US", {
              maximumFractionDigits: 1,
              minimumFractionDigits: 1,
            })}
            %
          </span>
        ) : null}
        {note ? <span className="text-slate-400">{note}</span> : null}
      </div>
    </div>
  );
}
