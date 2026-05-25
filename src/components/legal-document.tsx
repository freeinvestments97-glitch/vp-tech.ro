"use client";

import { useMemo, useState } from "react";
import type { LegalDocument } from "@/data/legal";
import type { Locale } from "@/lib/locale";

type LegalDocumentProps = {
  document: LegalDocument;
  locale: Locale;
};

export default function LegalDocumentView({ document, locale }: LegalDocumentProps) {
  const isRo = locale === "ro";
  const [query, setQuery] = useState("");
  const [expandAll, setExpandAll] = useState(false);

  const filteredSections = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) {
      return document.sections;
    }

    return document.sections.filter((section) => {
      const haystack = [
        section.title,
        ...section.paragraphs,
        ...(section.bullets ?? []),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(search);
    });
  }, [document.sections, query]);

  return (
    <section className="w-full rounded-2xl border border-cyan-500/35 bg-slate-950/90 p-6 shadow-xl shadow-cyan-900/20 md:p-8">
      <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
        {isRo ? "Legal" : "Legal"}
      </p>
      <h1 className="mt-2 text-3xl font-bold text-cyan-50 md:text-4xl">
        {document.title}
      </h1>
      <p className="mt-2 text-sm text-slate-300">
        {isRo ? "Data intrării în vigoare" : "Effective date"}: {document.effectiveDate}
      </p>

      <p className="mt-5 text-base leading-8 text-slate-200">
        {document.summary}
      </p>

      <div className="mt-4 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm leading-7 text-amber-100/90">
        {document.disclaimer}
      </div>

      <div className="mt-6 flex flex-col gap-3 rounded-xl border border-slate-700/70 bg-slate-900/80 p-4 md:flex-row md:items-center md:justify-between">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={isRo ? "Caută secțiuni..." : "Search policy sections..."}
          className="w-full rounded-md border border-slate-600/80 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-400/70 md:max-w-md"
        />
        <button
          type="button"
          onClick={() => setExpandAll((value) => !value)}
          className="rounded-md border border-cyan-300/40 bg-cyan-500/15 px-3 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
        >
          {expandAll
            ? isRo
              ? "Restrânge toate secțiunile"
              : "Collapse all sections"
            : isRo
              ? "Extinde toate secțiunile"
              : "Expand all sections"}
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {filteredSections.length === 0 ? (
          <p className="rounded-lg border border-slate-700/70 bg-slate-900/70 px-4 py-3 text-sm text-slate-300">
            {isRo
              ? `Nu există secțiuni potrivite pentru "${query}".`
              : `No matching section found for "${query}".`}
          </p>
        ) : (
          filteredSections.map((section) => (
            <details
              key={section.id}
              open={expandAll || query.length > 0}
              className="rounded-xl border border-slate-700/70 bg-slate-900/80 p-5 transition"
            >
              <summary className="cursor-pointer list-none text-base font-semibold text-cyan-100">
                {section.title}
              </summary>
              <div className="mt-3 space-y-3 text-sm leading-7 text-slate-300 md:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul className="space-y-1">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>- {bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </details>
          ))
        )}
      </div>
    </section>
  );
}

