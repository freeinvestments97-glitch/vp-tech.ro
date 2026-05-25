"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";

type GetStartedFlowProps = {
  locale: Locale;
};

const goalsEn = [
  "Stabilize infrastructure and reduce downtime",
  "Improve security and continuity",
  "Scale digital sales and operations",
  "Automate workflows with custom software or AI",
];

const goalsRo = [
  "Stabilizarea infrastructurii și reducerea downtime-ului",
  "Creșterea securității și continuității",
  "Scalarea vânzărilor și operațiunilor digitale",
  "Automatizarea fluxurilor prin software custom sau AI",
];

const timelinesEn = ["Immediately", "Within 30 days", "This quarter", "Exploration phase"];
const timelinesRo = ["Imediat", "În următoarele 30 zile", "În trimestrul curent", "Fază de explorare"];

const collaborationEn = [
  "Managed service partnership",
  "Project-based implementation",
  "Advisory and architecture guidance",
];
const collaborationRo = [
  "Parteneriat de servicii administrate",
  "Implementare pe bază de proiect",
  "Consultanță și ghidaj arhitectural",
];

export default function GetStartedFlow({ locale }: GetStartedFlowProps) {
  const isRo = locale === "ro";
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("");
  const [timeline, setTimeline] = useState("");
  const [model, setModel] = useState("");

  const done = goal && timeline && model;

  const contactHref = useMemo(() => {
    const params = new URLSearchParams();
    if (goal) params.set("goal", goal);
    if (timeline) params.set("timeline", timeline);
    if (model) params.set("model", model);
    return `/contact?${params.toString()}`;
  }, [goal, model, timeline]);

  const servicesHref = useMemo(() => {
    const params = new URLSearchParams();
    if (goal) params.set("q", goal.split(" ").slice(0, 3).join(" "));
    return `/services${params.size ? `?${params.toString()}` : ""}`;
  }, [goal]);

  const goals = isRo ? goalsRo : goalsEn;
  const timelines = isRo ? timelinesRo : timelinesEn;
  const collaborations = isRo ? collaborationRo : collaborationEn;

  return (
    <section className="rounded-2xl border border-cyan-500/30 bg-slate-950/85 p-6 shadow-xl shadow-cyan-900/20 md:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.18em] text-cyan-300/90">
          {isRo ? "Flux de inițiere" : "Initiation Flow"}
        </p>
        <p className="text-xs text-slate-400">{isRo ? `Pasul ${step} din 4` : `Step ${step} of 4`}</p>
      </div>

      <h2 className="mt-2 text-2xl font-bold text-cyan-50 md:text-3xl">
        {isRo ? "Configurează începutul colaborării" : "Configure How We Start Working Together"}
      </h2>
      <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-200 md:text-base">
        {isRo
          ? "Acest flux ne oferă context de business înainte de primul contact, astfel încât discuția să fie scurtă, clară și orientată pe rezultate."
          : "This flow gives us business context before the first call, so our discussion starts focused on outcomes, priorities, and execution."}
      </p>

      <div className="mt-6 h-1.5 w-full rounded-full bg-slate-800">
        <div className="h-full rounded-full bg-cyan-400 transition-all" style={{ width: `${(step / 4) * 100}%` }} />
      </div>

      <div className="mt-6 space-y-5">
        <div className={`rounded-xl border p-4 ${step === 1 ? "border-cyan-400/60 bg-cyan-950/25" : "border-slate-700/70 bg-slate-900/80"}`}>
          <p className="text-sm font-semibold text-cyan-100">{isRo ? "1. Prioritate principală" : "1. Primary Priority"}</p>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {goals.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setGoal(item);
                  setStep((current) => (current < 2 ? 2 : current));
                }}
                className={`rounded-md border px-3 py-2 text-left text-sm transition ${
                  goal === item
                    ? "border-cyan-300/60 bg-cyan-500/20 text-cyan-100"
                    : "border-slate-600/70 bg-slate-900/75 text-slate-200 hover:border-cyan-500/40"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-4 ${step === 2 ? "border-cyan-400/60 bg-cyan-950/25" : "border-slate-700/70 bg-slate-900/80"}`}>
          <p className="text-sm font-semibold text-cyan-100">{isRo ? "2. Orizont de timp" : "2. Timeline"}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {timelines.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setTimeline(item);
                  setStep((current) => (current < 3 ? 3 : current));
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  timeline === item
                    ? "border-cyan-300/60 bg-cyan-500/20 text-cyan-100"
                    : "border-slate-600/70 bg-slate-900/75 text-slate-300 hover:border-cyan-500/40"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-4 ${step === 3 ? "border-cyan-400/60 bg-cyan-950/25" : "border-slate-700/70 bg-slate-900/80"}`}>
          <p className="text-sm font-semibold text-cyan-100">{isRo ? "3. Model de colaborare" : "3. Engagement Model"}</p>
          <div className="mt-3 space-y-2">
            {collaborations.map((item) => (
              <label key={item} className="flex items-center gap-2 text-sm text-slate-200">
                <input
                  type="radio"
                  name="engagement-model"
                  checked={model === item}
                  onChange={() => {
                    setModel(item);
                    setStep(4);
                  }}
                  className="h-4 w-4 accent-cyan-400"
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        <div className={`rounded-xl border p-4 ${done ? "border-emerald-400/55 bg-emerald-950/25" : "border-slate-700/70 bg-slate-900/80"}`}>
          <p className="text-sm font-semibold text-cyan-100">{isRo ? "4. Confirmare și acțiune" : "4. Confirm and Launch"}</p>
          <p className="mt-2 text-sm leading-7 text-slate-200">
            {done
              ? isRo
                ? "Perfect. Fluxul este complet. Mergi către contact cu contextul deja pregătit."
                : "Perfect. The flow is complete. Continue to contact with your context already prepared."
              : isRo
                ? "Completează pașii anteriori pentru a debloca următoarea acțiune."
                : "Complete previous steps to unlock the next action."}
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={done ? contactHref : "#"}
              className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
                done
                  ? "border-cyan-300/50 bg-cyan-500/20 text-cyan-100 hover:bg-cyan-400/30"
                  : "pointer-events-none border-slate-700/70 bg-slate-900/70 text-slate-500"
              }`}
            >
              {isRo ? "Continuă către Contact" : "Continue to Contact"}
            </Link>
            <Link
              href={servicesHref}
              className="rounded-md border border-slate-500/40 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/40"
            >
              {isRo ? "Vezi servicii potrivite" : "View Matching Services"}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
