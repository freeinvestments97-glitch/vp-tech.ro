"use client";

import { useMemo, useState } from "react";
import Icon from "@/components/icon";
import PageHero from "@/components/page-hero";
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
    <>
      <PageHero
        overlap
        eyebrow="Legal"
        title={document.title}
        description={document.summary}
        actions={
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[13px] font-semibold text-blue-100">
            <Icon name="calendar" className="h-4 w-4 text-accent-2" />
            {isRo ? "Data intrării în vigoare" : "Effective date"}: {document.effectiveDate}
          </span>
        }
      />

      <main className="shell pb-6">
        <div className="relative -mt-16 grid gap-[18px] xl:grid-cols-[280px_minmax(0,1fr)]">
          {document.sections.length > 0 ? (
            <aside className="hidden xl:block">
              <nav className="card sticky top-[88px] !p-4" aria-label={isRo ? "Cuprins" : "Contents"}>
                <p className="px-2 pb-2 text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-3">
                  {isRo ? "Cuprins" : "Contents"}
                </p>
                <ul className="space-y-0.5">
                  {document.sections.map((section) => (
                    <li key={section.id}>
                      <a
                        href={`#${section.id}`}
                        className="block rounded-lg px-2 py-1.5 text-[13.5px] font-medium text-ink-2 transition hover:bg-surface-2 hover:text-ink"
                      >
                        {section.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : null}

          <article className="card min-w-0 max-w-4xl md:!p-8">
            <div className="flex gap-3 rounded-xl bg-warn-soft px-4 py-3 text-sm leading-relaxed text-warn">
              <Icon name="alert" className="mt-0.5 h-[18px] w-[18px]" />
              <p>{document.disclaimer}</p>
            </div>

            <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:items-center">
              <label className="relative min-w-0 flex-1">
                <Icon name="search" className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-ink-3" />
                <input
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder={isRo ? "Caută secțiuni..." : "Search policy sections..."}
                  className="input !pl-10 !text-[15px]"
                />
              </label>
              <button type="button" onClick={() => setExpandAll((value) => !value)} className="btn">
                {expandAll
                  ? isRo
                    ? "Restrânge toate secțiunile"
                    : "Collapse all sections"
                  : isRo
                    ? "Extinde toate secțiunile"
                    : "Expand all sections"}
              </button>
            </div>

            <div className="mt-5">
              {filteredSections.length === 0 ? (
                <p className="flex items-center gap-2 py-3 text-sm text-ink-3">
                  <Icon name="info" className="h-[18px] w-[18px]" />
                  {isRo
                    ? `Nu există secțiuni potrivite pentru "${query}".`
                    : `No matching section found for "${query}".`}
                </p>
              ) : (
                filteredSections.map((section) => (
                  <details
                    key={section.id}
                    id={section.id}
                    open={expandAll || query.length > 0}
                    className="group scroll-mt-24 border-t border-line py-4 first:border-t-0"
                  >
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
                      <h2 className="text-[17px] font-bold text-ink">{section.title}</h2>
                      <Icon name="chevronRight" className="h-[18px] w-[18px] text-ink-3 transition group-open:rotate-90" />
                    </summary>
                    <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-2">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets ? (
                        <ul className="space-y-1.5">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex gap-2.5">
                              <Icon name="check" className="mt-1 h-4 w-4 text-accent" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  </details>
                ))
              )}
            </div>
          </article>
        </div>
      </main>
    </>
  );
}
