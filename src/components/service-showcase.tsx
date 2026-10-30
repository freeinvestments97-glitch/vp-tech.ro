"use client";

import { useEffect, useMemo, useState } from "react";
import type { ServiceModule } from "@/data/services";
import type { Locale } from "@/lib/locale";
import Icon from "@/components/icon";
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

  const tabs: Array<{ key: TabKey; label: string }> = [
    { key: "capabilities", label: isRo ? "Capabilități" : "Capabilities" },
    { key: "deliverables", label: isRo ? "Livrabile" : "Deliverables" },
    { key: "engagement", label: isRo ? "Model colaborare" : "Engagement" },
  ];

  return (
    <section className="grid gap-[18px] lg:grid-cols-[1.25fr_1fr]">
      <div className="card lg:col-span-2">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="min-w-0">
            <div className="section-h !mb-3">
              <span className="ico">
                <Icon name="target" className="h-5 w-5" />
              </span>
              <h2>{isRo ? "Ce livrează acest serviciu" : "What this service delivers"}</h2>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-2">
              {isRo
                ? `Serviciul nostru de ${service.title.toLowerCase()} combină arhitectură, implementare și operațiuni administrate. Ne concentrăm pe rezultate măsurabile: reziliență, hardening de securitate, claritate operațională și mentenanță pe termen lung.`
                : `Our ${service.title.toLowerCase()} offering combines architecture, implementation, and managed operations. We focus on measurable outcomes such as uptime resilience, security hardening, process clarity, and long-term maintainability aligned to your business priorities.`}
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              {isRo
                ? "Abordarea este structurată pentru vizibilitate clară: evaluare inițială, roadmap de implementare, livrabile validate și optimizare continuă."
                : "The engagement is structured to give decision-makers clear visibility: baseline assessment, implementation roadmap, validated deliverables, and ongoing optimization checkpoints."}
            </p>
          </div>
          <ServiceIcon slug={service.slug} variant="panel" />
        </div>
      </div>

      <div className="card min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h3 className="text-[16px] font-bold text-ink">
            {tabs.find((item) => item.key === tab)?.label}
          </h3>
          <div className="inline-flex max-w-full gap-0.5 overflow-x-auto rounded-[10px] bg-surface-2 p-[3px]">
            {tabs.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => setTab(item.key)}
                aria-pressed={tab === item.key}
                className={`flex-none cursor-pointer rounded-lg px-3 py-1.5 text-[13.5px] font-semibold transition ${
                  tab === item.key
                    ? "bg-surface text-ink shadow-[0_1px_2px_rgba(0,0,0,0.08)]"
                    : "text-ink-2 hover:text-ink"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-3">
          {tabContent[tab].map((item) => (
            <li
              key={item}
              className="flex items-start gap-2.5 border-t border-line py-2.5 text-[14.5px] text-ink first:border-t-0"
            >
              <Icon name="checkCircle" className="mt-0.5 h-[18px] w-[18px] text-ok" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="card min-w-0">
        <div className="section-h">
          <span className="ico">
            <Icon name="gauge" className="h-5 w-5" />
          </span>
          <h2 className="!text-[16px]">
            {isRo ? "Indice impact operațional" : "Operational Impact Index"}
          </h2>
        </div>
        <div className="space-y-4">
          {kpis.map((kpi) => (
            <div key={kpi.label}>
              <div className="mb-1.5 flex items-center justify-between text-[13.5px] text-ink-2">
                <span>{kpi.label}</span>
                <span className="text-[15px] font-extrabold text-ink">{kpi.value}%</span>
              </div>
              <div className="track">
                <span
                  className="transition-[width] duration-700"
                  style={{ width: animateBars ? `${kpi.value}%` : "0%" }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
