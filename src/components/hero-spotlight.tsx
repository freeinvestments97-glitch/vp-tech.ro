"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Icon from "@/components/icon";
import { HeroArt } from "@/components/page-hero";
import type { Locale } from "@/lib/locale";
import { ONBOARDING_URL } from "@/lib/links";

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
    <header className="hero-band pt-10 pb-24 md:pt-14">
      <HeroArt />
      <div className="shell relative grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
        <div className="min-w-0">
          <span className="inline-flex max-w-full items-center gap-2 rounded-full bg-blue-400/16 px-3 py-1.5 text-[13px] font-bold text-blue-200">
            <span className="pulse-dot flex-none" />
            <span className="truncate">{activeItem.label}</span>
          </span>

          <h1 className="mt-4 max-w-4xl text-[30px] font-extrabold leading-[1.1] text-white md:text-[44px]">
            {activeItem.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:text-[17px]">
            {activeItem.summary}
          </p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            <Link href="/services" className="btn primary lg">
              {isRo ? "Explorează servicii" : "Explore Services"}
              <Icon name="arrowRight" className="h-[18px] w-[18px]" />
            </Link>
            <Link href={ONBOARDING_URL} className="btn on-dark lg">
              {isRo ? "Pornește fluxul de inițiere" : "Start Guided Flow"}
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {spotlightItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={index === activeIndex}
                className={`cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  index === activeIndex
                    ? "border-white bg-white text-navy"
                    : "border-white/16 bg-white/8 text-slate-200 hover:bg-white/16"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <aside className="min-w-0 rounded-[18px] border border-white/14 bg-white/7 p-5 backdrop-blur">
          <p className="text-[12px] font-bold tracking-[0.16em] text-accent-2 uppercase">
            {isRo ? "Pe scurt" : "At a glance"}
          </p>
          <ul className="mt-3">
            {activeItem.metrics.map((metric) => (
              <li
                key={metric.name}
                className="flex items-center justify-between gap-4 border-t border-white/10 py-3 first:border-t-0"
              >
                <span className="text-sm text-slate-300">{metric.name}</span>
                <span className="text-right font-semibold text-white">{metric.value}</span>
              </li>
            ))}
          </ul>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-accent to-accent-2"
              style={{ width: `${progress}%` }}
            />
          </div>
        </aside>
      </div>
    </header>
  );
}
