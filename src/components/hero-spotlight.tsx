"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";

type SpotlightItem = {
  label: string;
  title: string;
  summary: string;
  metrics: Array<{ name: string; value: string }>;
};

const spotlightItemsEn: SpotlightItem[] = [
  {
    label: "Technology Partner for Business Growth",
    title: "We Keep Your Business Systems Secure, Fast, and Reliable",
    summary:
      "From IT infrastructure to custom platforms, we help business owners reduce downtime, improve productivity, and scale with confidence.",
    metrics: [
      { name: "Coverage", value: "15 Services" },
      { name: "Response Model", value: "Remote + On-Site" },
      { name: "Focus", value: "Security + Performance" },
    ],
  },
  {
    label: "Reliable Day-to-Day Operations",
    title: "One Team for Servers, Cloud, Email, and Ongoing Support",
    summary:
      "We proactively manage your core systems so your team can focus on sales, operations, and customer experience instead of technical issues.",
    metrics: [
      { name: "Platform Scope", value: "Windows + Linux" },
      { name: "Cloud", value: "Microsoft 365" },
      { name: "Email Stack", value: "Exchange Ready" },
    ],
  },
  {
    label: "Security and Business Continuity",
    title: "Protect Revenue With Practical Network and Security Controls",
    summary:
      "We design secure, resilient environments that minimize business risk and protect your company from costly interruptions.",
    metrics: [
      { name: "Security Stack", value: "Firewall + VPN + IDS" },
      { name: "Network Design", value: "LAN + WAN" },
      { name: "Deployment", value: "Planning to Go-Live" },
    ],
  },
  {
    label: "Digital Growth and Automation",
    title: "Build Better Customer Journeys With Smart Digital Solutions",
    summary:
      "We build websites, online stores, and custom business tools that help you increase revenue, automate tasks, and make better decisions.",
    metrics: [
      { name: "Build Types", value: "Web + Store + SaaS" },
      { name: "Intelligence", value: "AI Workflows" },
      { name: "Customization", value: "CRM + ERP" },
    ],
  },
];

const spotlightItemsRo: SpotlightItem[] = [
  {
    label: "Partener tehnologic pentru creșterea afacerii",
    title: "Îți menținem sistemele de business sigure, rapide și stabile",
    summary:
      "De la infrastructură IT la platforme personalizate, ajutăm antreprenorii să reducă downtime-ul, să crească productivitatea și să scaleze în siguranță.",
    metrics: [
      { name: "Acoperire", value: "15 Servicii" },
      { name: "Model suport", value: "Remote + On-Site" },
      { name: "Prioritate", value: "Securitate + Performanta" },
    ],
  },
  {
    label: "Operațiuni zilnice fără stres",
    title: "O singură echipă pentru servere, cloud, email și suport continuu",
    summary:
      "Administrăm proactiv sistemele critice, astfel încât echipa ta să se concentreze pe vânzări, operațiuni și clienți, nu pe probleme tehnice.",
    metrics: [
      { name: "Platforme", value: "Windows + Linux" },
      { name: "Cloud", value: "Microsoft 365" },
      { name: "Email", value: "Exchange" },
    ],
  },
  {
    label: "Securitate și continuitate",
    title: "Protejează veniturile cu măsuri de rețea și securitate aplicabile",
    summary:
      "Construim medii reziliente care reduc riscul operațional și protejează compania împotriva întreruperilor costisitoare.",
    metrics: [
      { name: "Stack securitate", value: "Firewall + VPN + IDS" },
      { name: "Design retea", value: "LAN + WAN" },
      { name: "Implementare", value: "Planificare la Go-Live" },
    ],
  },
  {
    label: "Creștere digitală și automatizare",
    title: "Crește vânzările cu soluții digitale inteligente",
    summary:
      "Dezvoltăm website-uri, magazine online și aplicații de business care cresc veniturile, automatizează munca și oferă decizii mai bune.",
    metrics: [
      { name: "Tipuri proiecte", value: "Web + Store + SaaS" },
      { name: "Inteligență", value: "Fluxuri AI" },
      { name: "Customizare", value: "CRM + ERP" },
    ],
  },
];

const ROTATION_MS = 5000;

type HeroSpotlightProps = {
  locale: Locale;
};

export default function HeroSpotlight({ locale }: HeroSpotlightProps) {
  const isRo = locale === "ro";
  const spotlightItems = isRo ? spotlightItemsRo : spotlightItemsEn;
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const nextProgress = Math.min((elapsed / ROTATION_MS) * 100, 100);
      setProgress(nextProgress);
      if (elapsed >= ROTATION_MS) {
        setActiveIndex((current) => (current + 1) % spotlightItems.length);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [activeIndex, spotlightItems.length]);

  const activeItem = useMemo(
    () => spotlightItems[activeIndex],
    [activeIndex, spotlightItems],
  );

  return (
    <section className="rounded-2xl border border-cyan-500/30 bg-slate-950/85 p-6 shadow-2xl shadow-cyan-900/15 backdrop-blur md:p-10">
      <div className="mb-4 inline-flex max-w-full items-center rounded-full border border-cyan-400/35 bg-cyan-950/40 px-3 py-1 text-xs font-semibold text-cyan-300">
        <span className="truncate">{activeItem.label}</span>
      </div>

      <h1 className="max-w-5xl text-2xl font-bold leading-tight tracking-tight text-cyan-50 md:text-5xl">
        {activeItem.title}
      </h1>

      <p className="mt-4 max-w-3xl text-base leading-8 text-slate-100">
        {activeItem.summary}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          href="/services"
          className="rounded-md border border-cyan-300/40 bg-cyan-500/15 px-4 py-2.5 text-base font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
        >
          {isRo ? "Explorează servicii" : "Explore Services"}
        </Link>
        <Link
          href="/get-started"
          className="rounded-md border border-slate-400/35 bg-slate-800/70 px-4 py-2.5 text-base font-semibold text-slate-100 transition hover:bg-slate-700"
        >
          {isRo ? "Pornește fluxul de inițiere" : "Start Guided Flow"}
        </Link>
      </div>

      <div className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
        <div
          className="h-full rounded-full bg-cyan-400 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-3">
        {activeItem.metrics.map((metric) => (
          <article
            key={metric.name}
            className="rounded-lg border border-slate-700/70 bg-slate-900/85 p-4"
          >
            <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/85">
              {metric.name}
            </p>
            <p className="mt-1 text-lg font-semibold text-slate-100">
              {metric.value}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {spotlightItems.map((item, index) => (
          <button
            key={item.title}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={`rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              index === activeIndex
                ? "border border-cyan-300/55 bg-cyan-500/20 text-cyan-100"
                : "border border-slate-600/70 bg-slate-900/70 text-slate-300 hover:border-cyan-500/40"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </section>
  );
}

