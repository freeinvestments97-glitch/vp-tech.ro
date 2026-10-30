"use client";

import { useEffect, useMemo, useState } from "react";
import Icon, { type IconName } from "@/components/icon";
import type { Locale } from "@/lib/locale";

const METRIC_ICONS: IconName[] = ["grid", "target", "headset", "layers"];

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
    let rafId = 0;

    const frame = (timestamp: number) => {
      const progress = Math.min((timestamp - start) / durationMs, 1);
      setCounts(metrics.map((metric) => Math.round(metric.value * progress)));
      if (progress < 1) {
        rafId = requestAnimationFrame(frame);
      }
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [metrics]);

  return (
    <section className="grid grid-cols-2 gap-3.5 xl:grid-cols-4">
      {metrics.map((metric, index) => (
        <article key={metric.label} className="card !p-4 !pb-3.5">
          <div className={`ico mb-3 ${index === 2 ? "ok" : ""}`}>
            <Icon name={METRIC_ICONS[index] ?? "layers"} className="h-5 w-5" />
          </div>
          <p className="text-[26px] leading-[1.1] font-extrabold tracking-[-0.02em] text-ink">
            {counts[index]}
            {metric.suffix ? (
              <small className="text-[15px] font-semibold text-ink-3">{metric.suffix}</small>
            ) : null}
          </p>
          <p className="mt-0.5 text-[13px] font-medium text-ink-2">{metric.label}</p>
        </article>
      ))}
    </section>
  );
}
