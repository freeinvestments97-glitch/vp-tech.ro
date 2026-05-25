"use client";

import { useEffect, useMemo, useState } from "react";
import type { ServiceModule } from "@/data/services";
import type { Locale } from "@/lib/locale";
import ServiceIcon from "@/components/service-icon";

type ServiceShowcaseProps = {
  service: ServiceModule;
  locale: Locale;
};

type TabKey = "capabilities" | "deliverables" | "engagement";

function scoreFromSeed(seed: string, offset: number) {
  const total = Array.from(seed).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return 68 + ((total + offset * 19) % 28);
}

export default function ServiceShowcase({ service, locale }: ServiceShowcaseProps) {
  const isRo = locale === "ro";
  const [tab, setTab] = useState<TabKey>("capabilities");
  const [animateBars, setAnimateBars] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateBars(true), 120);
    return () => clearTimeout(timer);
  }, []);

  const kpis = useMemo(
    () => [
      {
        label: isRo ? "Creștere fiabilitate" : "Reliability Uplift",
        value: scoreFromSeed(service.slug, 1),
      },
      {
        label: isRo ? "Nivel securitate" : "Security Posture",
        value: scoreFromSeed(service.slug, 2),
      },
      {
        label: isRo ? "Eficiență operațională" : "Operational Efficiency",
        value: scoreFromSeed(service.slug, 3),
      },
    ],
    [isRo, service.slug],
  );

  const tabContent: Record<TabKey, string[]> = {
    capabilities: service.details,
    deliverables: service.deliverables,
    engagement: service.engagement,
  };

  return (
    <section className="mt-6 space-y-5">
      <div className="rounded-xl border border-cyan-700/40 bg-gradient-to-br from-cyan-950/30 to-slate-900/95 p-5 md:p-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <h2 className="text-lg font-semibold text-cyan-100">
              {isRo ? "Ce livrează acest serviciu" : "What this service delivers"}
            </h2>
            <p className="mt-2 text-base leading-8 text-slate-200">
              {isRo
                ? `Serviciul nostru de ${service.title.toLowerCase()} combină arhitectură, implementare și operațiuni administrate. Ne concentrăm pe rezultate măsurabile: reziliență, hardening de securitate, claritate operațională și mentenanță pe termen lung.`
                : `Our ${service.title.toLowerCase()} offering combines architecture, implementation, and managed operations. We focus on measurable outcomes such as uptime resilience, security hardening, process clarity, and long-term maintainability aligned to your business priorities.`}
            </p>
            <p className="mt-3 text-base leading-8 text-slate-200">
              {isRo
                ? "Abordarea este structurată pentru vizibilitate clară: evaluare inițială, roadmap de implementare, livrabile validate și optimizare continuă."
                : "The engagement is structured to give decision-makers clear visibility: baseline assessment, implementation roadmap, validated deliverables, and ongoing optimization checkpoints."}
            </p>
          </div>
          <div className="rounded-lg border border-cyan-500/30 bg-slate-950/70 p-4">
            <ServiceIcon slug={service.slug} variant="panel" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/70 bg-slate-900/85 p-5">
        <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
          {isRo ? "Indice impact operațional" : "Operational Impact Index"}
        </h3>
        <div className="mt-4 space-y-4">
          {kpis.map((kpi) => (
            <div key={kpi.label}>
              <div className="mb-1 flex items-center justify-between text-sm text-slate-200">
                <span>{kpi.label}</span>
                <span>{kpi.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-800">
                <div
                  className="h-full rounded-full bg-cyan-400 transition-all duration-700"
                  style={{ width: animateBars ? `${kpi.value}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-700/70 bg-slate-900/85 p-5">
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setTab("capabilities")}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              tab === "capabilities"
                ? "border border-cyan-300/55 bg-cyan-500/20 text-cyan-100"
                : "border border-slate-600/70 bg-slate-900 text-slate-300 hover:border-cyan-500/40"
            }`}
          >
            {isRo ? "Capabilități" : "Capabilities"}
          </button>
          <button
            type="button"
            onClick={() => setTab("deliverables")}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              tab === "deliverables"
                ? "border border-cyan-300/55 bg-cyan-500/20 text-cyan-100"
                : "border border-slate-600/70 bg-slate-900 text-slate-300 hover:border-cyan-500/40"
            }`}
          >
            {isRo ? "Livrabile" : "Deliverables"}
          </button>
          <button
            type="button"
            onClick={() => setTab("engagement")}
            className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
              tab === "engagement"
                ? "border border-cyan-300/55 bg-cyan-500/20 text-cyan-100"
                : "border border-slate-600/70 bg-slate-900 text-slate-300 hover:border-cyan-500/40"
            }`}
          >
            {isRo ? "Model colaborare" : "Engagement"}
          </button>
        </div>

        <ul className="mt-4 space-y-3 text-base leading-8 text-slate-200">
          {tabContent[tab].map((item) => (
            <li key={item} className="rounded-md border border-slate-700/70 bg-slate-950/60 px-4 py-3">
              - {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

