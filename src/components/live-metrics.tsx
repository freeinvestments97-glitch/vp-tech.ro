"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";

type Metric = {
  label: string;
  value: number;
  suffix?: string;
};

type LiveMetricsProps = {
  locale: Locale;
};

export default function LiveMetrics({ locale }: LiveMetricsProps) {
  const metrics: Metric[] = useMemo(
    () =>
      locale === "ro"
        ? [
            { label: "Module servicii", value: 15 },
            { label: "Domenii specialistice", value: 9 },
            { label: "Acoperire suport", value: 24, suffix: "/7" },
            { label: "Model livrare", value: 2, suffix: " Moduri" },
          ]
        : [
            { label: "Service Modules", value: 15 },
            { label: "Specialist Domains", value: 9 },
            { label: "Support Coverage", value: 24, suffix: "/7" },
            { label: "Delivery Model", value: 2, suffix: " Modes" },
          ],
    [locale],
  );
  const [counts, setCounts] = useState<number[]>(metrics.map(() => 0));

  useEffect(() => {
    const durationMs = 900;
    const start = performance.now();

    const frame = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setCounts(metrics.map((metric) => Math.round(metric.value * progress)));
      if (progress < 1) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, [metrics]);

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <article
          key={metric.label}
          className="rounded-xl border border-cyan-500/25 bg-slate-900/85 p-5 transition hover:border-cyan-400/45"
        >
          <p className="text-xs uppercase tracking-[0.16em] text-cyan-300/90">
            {metric.label}
          </p>
          <p className="mt-2 text-2xl font-semibold text-slate-100">
            {counts[index]}
            {metric.suffix ?? ""}
          </p>
        </article>
      ))}
    </section>
  );
}

