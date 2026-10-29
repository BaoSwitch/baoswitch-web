"use client";

import { useId, useMemo, useRef, useState } from "react";
import { TrendingUp } from "lucide-react";
import { TREND } from "@/lib/admin-data";
import { cn } from "@/lib/cn";

/**
 * Daily payment-attempt trend.
 *
 * One series, so there is no legend — the title says what is plotted, and a
 * one-swatch legend box would only restate it. The series carries a 2px line
 * over a 10%-opacity wash, hairline solid gridlines a step off the surface,
 * and exactly one direct label (the peak); the axis and the tooltip carry
 * every other value, and the table below carries all of them for anyone who
 * cannot use hover at all.
 *
 * The two metrics are a toggle rather than a second y-axis. Volume runs
 * 0–₦10m and count runs 0–2,400; drawing both on one plot would invent a
 * correlation out of where the two scales happen to line up.
 */
const W = 760;
const H = 230;
const PAD = { top: 18, right: 22, bottom: 30, left: 46 };

type Metric = "volume" | "count";

function niceTicks(max: number, steps = 2) {
  const raw = max / steps;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? mag * 10;
  return Array.from({ length: steps + 1 }, (_, i) => i * step);
}

export function TrendChart() {
  const [metric, setMetric] = useState<Metric>("volume");
  const [hover, setHover] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const gradId = useId();

  const { points, ticks, max, peak } = useMemo(() => {
    const values = TREND.map((d) => d[metric]);
    const rawMax = Math.max(...values);
    const t = niceTicks(rawMax);
    const m = t[t.length - 1];
    const plotW = W - PAD.left - PAD.right;
    const plotH = H - PAD.top - PAD.bottom;
    const pts = values.map((v, i) => ({
      x: PAD.left + (plotW * i) / (values.length - 1),
      y: PAD.top + plotH * (1 - v / m),
      v,
      i,
    }));
    return { points: pts, ticks: t, max: m, peak: values.indexOf(rawMax) };
  }, [metric]);

  const fmt = (v: number) =>
    metric === "volume"
      ? `₦${v.toFixed(2)}m`
      : v.toLocaleString("en-NG", { maximumFractionDigits: 0 });
  const fmtTick = (v: number) =>
    metric === "volume"
      ? v === 0
        ? "₦0"
        : `₦${v}m`
      : v === 0
        ? "0"
        : `${v / 1000}K`;

  const line = points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
  const area = `${line} L${points[points.length - 1].x} ${H - PAD.bottom} L${points[0].x} ${H - PAD.bottom} Z`;
  const active = hover ?? peak;

  function onMove(e: React.PointerEvent<SVGSVGElement>) {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * W;
    let nearest = 0;
    let best = Infinity;
    points.forEach((p, i) => {
      const d = Math.abs(p.x - x);
      if (d < best) {
        best = d;
        nearest = i;
      }
    });
    setHover(nearest);
  }

  return (
    <section className="bs-card bs-edge flex flex-col rounded-[var(--radius-card)] p-6">
      <div className="bs-raise flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold text-ink">Transaction trend</h2>
          <p className="text-[13px] text-muted">
            {metric === "volume" ? "Payment attempt value · NGN millions" : "Payment attempts"}
          </p>
        </div>
        <div
          role="group"
          aria-label="Metric"
          className="flex rounded-full border border-line bg-surface2 p-0.5"
        >
          {(["volume", "count"] as Metric[]).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={metric === m}
              onClick={() => setMetric(m)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-[13px] font-medium capitalize transition-colors",
                metric === m ? "bg-surface text-ink shadow-e1" : "text-muted hover:text-ink",
              )}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* The SVG scales with its box, and so does its text — at phone width a
          760-unit viewBox squeezed into ~360px renders 11px ticks at about
          5px. A min-width plus horizontal scroll keeps the axis legible
          instead; at 600px and up nothing scrolls. The tooltip lives inside
          the scroller so it tracks the plot. */}
      <div className="bs-raise mt-4 overflow-x-auto">
        <div className="relative min-w-[37.5rem]">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full touch-none"
          role="img"
          aria-label={`${metric === "volume" ? "Daily payment value" : "Daily payment attempts"} from ${TREND[0].day} to ${TREND[TREND.length - 1].day}. Peak ${fmt(TREND[peak][metric])} on ${TREND[peak].day}. Full figures in the table below.`}
          onPointerMove={onMove}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--bs-primary)" stopOpacity="0.16" />
              <stop offset="100%" stopColor="var(--bs-primary)" stopOpacity="0.01" />
            </linearGradient>
          </defs>

          {/* Hairline, solid, one step off the surface. */}
          {ticks.map((t) => {
            const y = PAD.top + (H - PAD.top - PAD.bottom) * (1 - t / max);
            return (
              <g key={t}>
                <line
                  x1={PAD.left}
                  x2={W - PAD.right}
                  y1={y}
                  y2={y}
                  stroke="var(--bs-line)"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                />
                <text x={PAD.left - 10} y={y + 4} textAnchor="end" className="fill-muted text-[12px]">
                  {fmtTick(t)}
                </text>
              </g>
            );
          })}

          <path d={area} fill={`url(#${gradId})`} />
          <path
            d={line}
            fill="none"
            stroke="var(--bs-primary)"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />

          {TREND.map((d, i) => (
            <text
              key={d.day}
              x={points[i].x}
              y={H - 10}
              textAnchor="middle"
              className="fill-muted text-[12px]"
            >
              {d.day}
            </text>
          ))}

          {/* Crosshair + marker. The marker carries a 2px surface ring so it
              stays legible where it sits on the line. */}
          <line
            x1={points[active].x}
            x2={points[active].x}
            y1={PAD.top}
            y2={H - PAD.bottom}
            stroke="var(--bs-line2)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <circle
            cx={points[active].x}
            cy={points[active].y}
            r={5}
            fill="var(--bs-primary)"
            stroke="var(--bs-surface)"
            strokeWidth={2}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Tooltip. Enhances — it never gates a value, which the axis, the
            peak label and the table all carry. */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-[var(--radius-chip)] bg-accent px-3 py-2 text-center text-white shadow-e2 transition-opacity"
          style={{
            left: `${(points[active].x / W) * 100}%`,
            opacity: hover === null ? 0 : 1,
          }}
        >
          <span className="block text-[11px] text-white/70">{TREND[active].day}</span>
          <span className="num block text-sm font-semibold">{fmt(TREND[active][metric])}</span>
          </div>
        </div>
      </div>

      <p className="bs-raise mt-2 flex items-center gap-2 text-[13px] text-muted">
        <TrendingUp aria-hidden className="size-4 text-primary-text" />
        <span>
          <span className="num font-medium text-ink">{fmt(TREND[peak][metric])}</span> on{" "}
          {TREND[peak].day} — highest in the selected period
        </span>
      </p>

      <details className="bs-raise mt-3 text-[13px]">
        <summary className="cursor-pointer text-muted hover:text-ink">Show data table</summary>
        <table className="mt-3 w-full border-collapse text-left">
          <caption className="sr-only">
            Daily payment {metric === "volume" ? "value" : "attempts"}, 12–18 Oct 2026
          </caption>
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="py-2 pr-4 font-medium text-muted">
                Day
              </th>
              <th scope="col" className="py-2 text-right font-medium text-muted">
                {metric === "volume" ? "Value" : "Attempts"}
              </th>
            </tr>
          </thead>
          <tbody>
            {TREND.map((d) => (
              <tr key={d.day} className="border-b border-line last:border-0">
                <th scope="row" className="py-2 pr-4 font-normal text-ink">
                  {d.day}
                </th>
                <td className="num py-2 text-right text-ink">{fmt(d[metric])}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </section>
  );
}
