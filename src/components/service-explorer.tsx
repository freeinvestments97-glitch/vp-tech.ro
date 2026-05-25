"use client";

import { useEffect, useMemo, useState } from "react";
import type { ServiceModule } from "@/data/services";
import type { Locale } from "@/lib/locale";
import ServiceIcon from "@/components/service-icon";

type ServiceExplorerProps = {
  services: ServiceModule[];
  locale: Locale;
};

type ServiceBriefingPanelProps = {
  service: ServiceModule;
  isRo: boolean;
  onClose: () => void;
  desktop?: boolean;
};

function scoreFromSeed(seed: string, salt: number) {
  let total = 0;
  for (const char of seed) {
    total += char.charCodeAt(0);
  }
  return 68 + ((total + salt * 23) % 29);
}

function buildNarrative(service: ServiceModule, isRo: boolean) {
  if (isRo) {
    return [
      `Acest serviciu de ${service.title.toLowerCase()} este conceput ca un control-point operațional pentru business: reducerea riscului, claritate în execuție și continuitate în momente critice. Nu livrăm doar acțiuni tehnice punctuale, ci un cadru coerent care susține obiective comerciale și stabilitate pe termen lung.`,
      `În practică, combinăm evaluarea inițială, implementarea etapizată și optimizarea continuă într-un flux predictibil. Echipa de management primește vizibilitate clară asupra impactului, iar echipa tehnică primește procese, standarde și runbook-uri care accelerează reacția la incidente și reduc dependența de intervenții ad-hoc.`,
    ];
  }

  return [
    `This ${service.title.toLowerCase()} capability is designed as an operational control-point for your business: reducing risk, increasing execution clarity, and preserving continuity during critical moments. We do not deliver isolated technical tasks; we establish a coherent framework that supports commercial priorities and long-term resilience.`,
    `In practice, we combine baseline assessment, phased implementation, and continuous optimization into a predictable delivery cycle. Leadership gets clear visibility into impact, while technical teams get standards, runbooks, and response patterns that accelerate incident recovery and reduce ad-hoc firefighting.`,
  ];
}

function ServiceBriefingPanel({ service, isRo, onClose, desktop = false }: ServiceBriefingPanelProps) {
  const telemetry = [
    {
      label: isRo ? "Reziliență operațională" : "Operational Resilience",
      value: scoreFromSeed(service.slug, 1),
    },
    {
      label: isRo ? "Postură de securitate" : "Security Posture",
      value: scoreFromSeed(service.slug, 2),
    },
    {
      label: isRo ? "Viteză execuție" : "Execution Velocity",
      value: scoreFromSeed(service.slug, 3),
    },
    {
      label: isRo ? "Scalabilitate business" : "Business Scalability",
      value: scoreFromSeed(service.slug, 4),
    },
  ];

  const narrative = buildNarrative(service, isRo);

  return (
    <aside
      className={
        desktop
          ? "intel-panel-enter sticky top-5 max-h-[calc(100vh-2.5rem)] overflow-y-auto rounded-xl border border-cyan-500/35 bg-slate-950/96 p-6 shadow-2xl shadow-cyan-900/25"
          : "absolute right-0 top-0 h-full w-full max-w-2xl overflow-y-auto border-l border-cyan-500/35 bg-slate-950/97 p-6 shadow-2xl shadow-cyan-900/30 md:p-8"
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.14em] text-cyan-300/90">
            {service.unit}
          </p>
          <h3 className="mt-1 text-2xl font-bold text-cyan-50 md:text-3xl">
            {service.title}
          </h3>
          <p className="mt-2 text-base leading-7 text-slate-200">
            {isRo ? "Briefing operațional extins" : "Extended Operational Briefing"}
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-md border border-slate-600/70 bg-slate-900/80 px-3 py-1.5 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40"
        >
          {isRo ? "Închide" : "Close"}
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-cyan-600/35 bg-cyan-950/20 p-4">
        <ServiceIcon slug={service.slug} variant="panel" />
      </div>

      <div className="mt-5 space-y-3">
        <p className="text-lg leading-8 text-slate-100">{service.description}</p>
        <p className="text-base leading-8 text-slate-200">{service.scope}</p>
        {narrative.map((paragraph) => (
          <p key={paragraph} className="text-base leading-8 text-slate-200">
            {paragraph}
          </p>
        ))}
      </div>

      <section className="mt-6 rounded-xl border border-cyan-700/35 bg-slate-900/80 p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h4 className="text-base font-semibold text-cyan-200">
            {isRo ? "Telemetrie impact serviciu" : "Service Impact Telemetry"}
          </h4>
          <p className="text-xs uppercase tracking-[0.16em] text-slate-400">
            {isRo ? "Date simulate live" : "Live simulated data"}
          </p>
        </div>
        <div className="mt-4 space-y-3">
          {telemetry.map((item, index) => (
            <div key={item.label}>
              <div className="mb-1 flex items-center justify-between text-sm text-slate-200">
                <span>{item.label}</span>
                <span>{item.value}%</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className="telemetry-bar h-full rounded-full bg-cyan-400"
                  style={{
                    width: `${item.value}%`,
                    animationDelay: `${index * 90}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-6 space-y-5">
        <section>
          <h4 className="text-base font-semibold text-cyan-200">
            {isRo ? "Capabilități cheie" : "Core Capabilities"}
          </h4>
          <ul className="mt-2 space-y-2 text-base leading-7 text-slate-200">
            {service.details.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-base font-semibold text-cyan-200">
            {isRo ? "Livrabile și artefacte" : "Deliverables and Artifacts"}
          </h4>
          <ul className="mt-2 space-y-2 text-base leading-7 text-slate-200">
            {service.deliverables.map((item) => (
              <li key={item}>- {item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-base font-semibold text-cyan-200">
            {isRo ? "Secvența de colaborare" : "Engagement Sequence"}
          </h4>
          <div className="mt-3 grid gap-2">
            {service.engagement.map((item, index) => (
              <div
                key={item}
                className="rounded-md border border-slate-700/70 bg-slate-950/70 px-3 py-2 text-base text-slate-200"
              >
                <span className="mr-2 font-semibold text-cyan-300">0{index + 1}</span>
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}

export default function ServiceExplorer({ services, locale }: ServiceExplorerProps) {
  const isRo = locale === "ro";
  const [query, setQuery] = useState("");
  const [activeUnit, setActiveUnit] = useState(isRo ? "Toate" : "All");
  const [activeServiceSlug, setActiveServiceSlug] = useState<string | null>(null);
  const [desktopDrawerMode, setDesktopDrawerMode] = useState(false);

  const units = useMemo(
    () => [isRo ? "Toate" : "All", ...new Set(services.map((service) => service.unit))],
    [isRo, services],
  );

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return services.filter((service) => {
      const unitMatch = activeUnit === (isRo ? "Toate" : "All") || service.unit === activeUnit;
      const text = `${service.title} ${service.description} ${service.scope}`.toLowerCase();
      const queryMatch = q.length === 0 || text.includes(q);
      return unitMatch && queryMatch;
    });
  }, [activeUnit, isRo, query, services]);

  const activeService = useMemo(
    () => services.find((service) => service.slug === activeServiceSlug) ?? null,
    [activeServiceSlug, services],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1280px)");
    const syncMode = () => setDesktopDrawerMode(mediaQuery.matches);
    syncMode();
    mediaQuery.addEventListener("change", syncMode);
    return () => mediaQuery.removeEventListener("change", syncMode);
  }, []);

  useEffect(() => {
    if (!activeService) {
      return;
    }

    if (desktopDrawerMode) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveServiceSlug(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeService, desktopDrawerMode]);

  return (
    <section className="relative">
      <div className="mb-5 flex flex-col gap-4 rounded-xl border border-slate-700/70 bg-slate-950/75 p-5 md:p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
              {isRo ? "Soluții pentru afacerea ta" : "Solutions for Your Business"}
            </p>
            <h2 className="mt-1 text-2xl font-bold text-cyan-50 md:text-3xl">
              {isRo
                ? "Găsește serviciul care rezolvă exact nevoia ta"
                : "Find the service that solves your exact need"}
            </h2>
          </div>
          <p className="text-base text-slate-200">
            {filtered.length}{" "}
            {isRo
              ? filtered.length === 1
                ? "rezultat"
                : "rezultate"
              : `match${filtered.length === 1 ? "" : "es"}`}
          </p>
        </div>

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={
              isRo
                ? "Caută după obiectiv (ex: securitate, magazin online, Microsoft 365)"
                : "Search by business goal (e.g. security, online store, Microsoft 365)"
            }
            className="w-full rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-3 text-base text-slate-100 outline-none transition focus:border-cyan-400/70 lg:max-w-lg"
          />
          <div className="flex flex-wrap gap-2">
            {units.map((unit) => (
              <button
                key={unit}
                type="button"
                onClick={() => setActiveUnit(unit)}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  activeUnit === unit
                    ? "border border-cyan-300/55 bg-cyan-500/20 text-cyan-100"
                    : "border border-slate-600/70 bg-slate-900/70 text-slate-300 hover:border-cyan-500/40"
                }`}
              >
                {unit}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div
        className={
          activeService && desktopDrawerMode
            ? "grid items-start gap-5 xl:grid-cols-[minmax(0,1fr)_30rem]"
            : "block"
        }
      >
        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            activeService && desktopDrawerMode ? "xl:grid-cols-2" : "xl:grid-cols-3"
          }`}
        >
          {filtered.map((service, index) => (
            <article
              key={service.title}
              className={`group flex h-full flex-col rounded-xl border p-5 transition md:p-6 ${
                index % 3 === 0
                  ? "border-cyan-500/30 bg-cyan-950/15 hover:border-cyan-300/60"
                  : index % 3 === 1
                    ? "border-emerald-500/30 bg-emerald-950/15 hover:border-emerald-300/60"
                    : "border-indigo-500/30 bg-indigo-950/15 hover:border-indigo-300/60"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className="telemetry-pulse absolute -inset-1 rounded-md border border-cyan-400/30" />
                  <ServiceIcon slug={service.slug} />
                </div>
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-200/90">
                  {service.unit}
                </p>
              </div>
              <h3 className="mt-2 text-xl font-semibold text-slate-100">
                {service.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-200">
                {service.description}
              </p>
              <p className="mt-3 text-base leading-7 text-slate-300">{service.scope}</p>
              <p className="mt-3 text-base leading-7 text-slate-300">
                {service.details[0]}
              </p>
              <button
                type="button"
                onClick={() => setActiveServiceSlug(service.slug)}
                className="mt-auto inline-block pt-5 text-left text-base font-semibold text-cyan-200 transition group-hover:text-white"
              >
                {isRo ? "Deschide briefing serviciu -" : "Open service briefing -"}
                <span aria-hidden="true"> &gt;</span>
              </button>
            </article>
          ))}
        </div>

        {activeService && desktopDrawerMode ? (
          <ServiceBriefingPanel
            service={activeService}
            isRo={isRo}
            onClose={() => setActiveServiceSlug(null)}
            desktop
          />
        ) : null}
      </div>

      {activeService && !desktopDrawerMode ? (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={isRo ? "Închide panoul" : "Close panel"}
            onClick={() => setActiveServiceSlug(null)}
            className="absolute inset-0 bg-slate-950/70 backdrop-blur-[2px]"
          />
          <ServiceBriefingPanel
            service={activeService}
            isRo={isRo}
            onClose={() => setActiveServiceSlug(null)}
          />
        </div>
      ) : null}
    </section>
  );
}

