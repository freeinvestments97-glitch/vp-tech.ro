"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Icon, { type IconName } from "@/components/icon";
import type { Locale } from "@/lib/locale";

export type CatalogueService = {
  slug: string;
  title: string;
  description: string;
  scope: string;
  deliverables: string[];
};

export type CatalogueArea = {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  services: CatalogueService[];
};

type ServiceCatalogueProps = {
  areas: CatalogueArea[];
  locale: Locale;
};

// Services grouped by area, with a sticky area bar and a search that narrows every group.
export default function ServiceCatalogue({ areas, locale }: ServiceCatalogueProps) {
  const isRo = locale === "ro";
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return areas;
    return areas
      .map((area) => ({
        ...area,
        services: area.services.filter((service) =>
          [service.title, service.description, service.scope, ...service.deliverables]
            .join(" ")
            .toLowerCase()
            .includes(q),
        ),
      }))
      .filter((area) => area.services.length > 0);
  }, [areas, query]);

  const matches = visible.reduce((sum, area) => sum + area.services.length, 0);

  return (
    <section id="catalogue" className="scroll-mt-28">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="eyebrow !text-accent">{isRo ? "Catalog servicii" : "Service catalogue"}</p>
          <h2 className="mt-1.5 text-[22px] font-extrabold text-ink md:text-[26px]">
            {isRo ? "Toate serviciile, pe arii" : "Every service, by area"}
          </h2>
        </div>
      </div>

      {/* sticky bar: search + jump to an area (sits under the site header) */}
      <div className="sticky top-[108px] z-20 -mx-1 mb-6 lg:top-[68px]">
        <div className="card flex flex-col gap-3 !p-3 lg:flex-row lg:items-center">
          <label className="relative block min-w-0 lg:w-[380px] lg:flex-none">
            <Icon
              name="search"
              className="pointer-events-none absolute top-1/2 left-3.5 h-[18px] w-[18px] -translate-y-1/2 text-ink-3"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={
                isRo ? "Caută: email, firewall, magazin online…" : "Search: email, firewall, online store…"
              }
              aria-label={isRo ? "Caută servicii" : "Search services"}
              className="input !py-2.5 !pl-10"
            />
          </label>
          <nav
            className="flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label={isRo ? "Arii de servicii" : "Service areas"}
          >
            {areas.map((area) => {
              const shown = visible.find((item) => item.id === area.id)?.services.length ?? 0;
              return (
                <a
                  key={area.id}
                  href={`#${area.id}`}
                  className={`inline-flex flex-none items-center gap-2 rounded-full border-[1.5px] px-3.5 py-2 text-sm font-semibold transition ${
                    shown
                      ? "border-line bg-surface text-ink-2 hover:border-accent hover:bg-accent-soft hover:text-accent"
                      : "pointer-events-none border-line bg-surface-2 text-ink-3 opacity-60"
                  }`}
                >
                  <Icon name={area.icon} className="h-4 w-4" />
                  {area.title}
                  <span className="text-xs font-bold opacity-60">{shown}</span>
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {query && matches === 0 ? (
        <div className="card flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <span className="ico warn">
              <Icon name="search" />
            </span>
            <div>
              <p className="font-semibold text-ink">
                {isRo ? `Nimic găsit pentru „${query}”` : `Nothing found for “${query}”`}
              </p>
              <p className="text-sm text-ink-2">
                {isRo
                  ? "Descrie-ne situația și îți recomandăm serviciul potrivit."
                  : "Describe your situation and we’ll recommend the right service."}
              </p>
            </div>
          </div>
          <Link href="/contact" className="btn primary">
            {isRo ? "Cere o recomandare" : "Ask for a recommendation"}
          </Link>
        </div>
      ) : null}

      <div className="flex flex-col gap-10">
        {visible.map((area) => (
          <section key={area.id} id={area.id} className="scroll-mt-[210px] lg:scroll-mt-[170px]">
            <div className="section-h !items-start">
              <span className="ico !mt-0.5">
                <Icon name={area.icon} className="h-[18px] w-[18px]" />
              </span>
              <div className="min-w-0">
                <h3 className="text-[20px] font-bold text-ink">{area.title}</h3>
                <p className="text-sm text-ink-2">{area.summary}</p>
              </div>
            </div>

            <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
              {area.services.map((service) => (
                <article key={service.slug} className="card flex flex-col transition hover:border-line-2">
                  <h4 className="text-[17px] font-bold text-ink">{service.title}</h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{service.description}</p>

                  <p className="mt-4 text-[11.5px] font-bold tracking-[0.08em] text-ink-3 uppercase">
                    {isRo ? "Ce primești" : "What you get"}
                  </p>
                  <ul className="mt-1.5 mb-5 space-y-1.5">
                    {service.deliverables.slice(0, 2).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-ink">
                        <Icon name="check" className="mt-0.5 h-4 w-4 text-ok" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap gap-2 border-t border-line pt-4">
                    <Link href={`/contact?service=${service.slug}`} className="btn primary flex-1">
                      {isRo ? "Solicită" : "Request"}
                    </Link>
                    <Link href={`/services/${service.slug}`} className="btn flex-1">
                      {isRo ? "Detalii" : "Details"}
                      <Icon name="arrowRight" className="h-4 w-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
