import { Fragment } from "react";
import Link from "next/link";
import Icon from "@/components/icon";
import { HeroArt } from "@/components/page-hero";
import { ArticleCard } from "@/components/blog/blog-index";
import BlogProgress from "@/components/blog/blog-progress";
import BlogToc from "@/components/blog/blog-toc";
import {
  TOPIC_META,
  articleJsonLd,
  formatDate,
  formatWeek,
  sectionIcon,
  sourceDetail,
} from "@/components/blog/blog-shared";
import { getServiceModules } from "@/data/services";
import { blogPath, getPublishedArticles, readingMinutes } from "@/lib/blog";
import type { Article, BlogLang } from "@/lib/blog-types";
import { MEET_BOOKING_URL } from "@/lib/links";

const num = (n: number) => String(n).padStart(2, "0");

export default async function BlogArticle({ article, lang }: { article: Article; lang: BlogLang }) {
  const isRo = lang === "ro";
  const body = article[lang];
  const services = getServiceModules(lang).filter((service) => article.services.includes(service.slug));
  const more = (await getPublishedArticles()).filter((item) => item.id !== article.id).slice(0, 3);
  const toc = body.sections.map((section, index) => ({ id: `section-${index + 1}`, label: section.heading }));
  // the mid-article call to action sits after the second section (or the last, for short articles)
  const ctaAfter = Math.min(1, body.sections.length - 1);

  const t = {
    week: isRo ? "Săptămâna" : "Week of",
    read: isRo ? "min de citit" : "min read",
    glance: isRo ? "Pe scurt" : "At a glance",
    inThis: isRo ? "În acest rezumat" : "In this briefing",
    help: isRo ? "Cum te putem ajuta" : "How we can help",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(article, lang) }} />
      <BlogProgress targetId="article-body" />

      {/* hero: what, when, and the whole briefing at a glance */}
      <header className="hero-band pt-10 pb-10 md:pt-14">
        <HeroArt />
        <div className="shell relative">
          <Link
            href={blogPath(lang)}
            className="inline-flex min-h-10 items-center gap-1.5 text-[13px] font-semibold text-slate-300 hover:text-white"
          >
            <Icon name="arrowLeft" className="h-4 w-4" />
            {isRo ? "Toate articolele" : "All articles"}
          </Link>
          <p className="eyebrow mt-3">
            {t.week} {formatWeek(article.weekStart, article.weekEnd, lang)}
          </p>
          <h1 className="mt-3 max-w-5xl text-[30px] leading-[1.1] font-extrabold text-white md:text-[46px]">
            {body.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-300 md:text-[18px]">{body.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3 text-[13px] text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4 text-accent-2" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4 text-accent-2" />
              {readingMinutes(body)} {t.read}
            </span>
            <span className="flex flex-wrap gap-2">
              {article.topics.map((topic) => (
                <span
                  key={topic}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[12.5px] font-semibold text-slate-100"
                >
                  <Icon name={TOPIC_META[topic].icon} className="h-3.5 w-3.5 text-accent-2" />
                  {TOPIC_META[topic][lang]}
                </span>
              ))}
            </span>
          </div>

          {toc.length ? (
            <div className="mt-8 rounded-[18px] border border-white/12 bg-white/[0.06] p-4 backdrop-blur md:p-5">
              <p className="text-[12px] font-bold tracking-[0.16em] text-accent-2 uppercase">{t.glance}</p>
              <ol className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {toc.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="group flex h-full min-h-10 items-start gap-3 rounded-xl px-2.5 py-2 text-[14px] leading-snug text-slate-100 transition hover:bg-white/10"
                    >
                      <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-white/10 text-[12px] font-extrabold text-accent-2">
                        {num(index + 1)}
                      </span>
                      <span className="pt-0.5 group-hover:text-white">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          ) : null}
        </div>
      </header>

      <main className="shell pt-8 pb-6 md:pt-10">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[250px_minmax(0,1fr)_320px] xl:gap-10">
          {/* left: table of contents (wide screens) */}
          <aside className="hidden xl:block">
            <div className="sticky top-[92px]">
              <BlogToc title={t.inThis} items={toc} />
            </div>
          </aside>

          {/* middle: the article */}
          <article id="article-body" className="min-w-0">
            {article.sample ? (
              <p className="mb-6 flex items-start gap-2 rounded-xl bg-warn-soft px-3.5 py-2.5 text-sm font-medium text-warn">
                <Icon name="info" className="mt-0.5 h-4 w-4" />
                {isRo
                  ? "Previzualizare de design, vizibilă doar local. Articolele reale sunt generate săptămânal și aprobate înainte de publicare."
                  : "Design preview, visible locally only. Real articles are generated weekly and approved before publishing."}
              </p>
            ) : null}

            {/* compact contents on tablet / phone */}
            <details className="card mb-6 !p-0 xl:hidden">
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  <Icon name="menu" className="h-4 w-4 text-accent" />
                  {t.inThis}
                </span>
                <Icon name="chevronRight" className="h-4 w-4 text-ink-3" />
              </summary>
              <div className="border-t border-line px-3 pt-2 pb-3">
                <ol className="space-y-1">
                  {toc.map((item, index) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex min-h-10 items-start gap-3 rounded-xl px-2 py-2 text-[14px] leading-snug text-ink-2 hover:bg-surface-2 hover:text-ink"
                      >
                        <span className="font-extrabold text-accent tabular-nums">{num(index + 1)}</span>
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            </details>

            <div className="flex flex-col gap-6">
              {body.sections.map((section, index) => {
                const [lead, ...rest] = section.paragraphs;
                return (
                  <Fragment key={section.heading}>
                    <section id={`section-${index + 1}`} className="card scroll-mt-32 !p-6 md:!p-9 lg:scroll-mt-24">
                      <div className="flex items-center gap-4">
                        <span className="text-[44px] leading-none font-extrabold tracking-[-0.04em] text-accent/25 tabular-nums md:text-[56px]">
                          {num(index + 1)}
                        </span>
                        <span className="ico !h-11 !w-11 !rounded-xl">
                          <Icon name={sectionIcon(section.heading, index)} className="h-[22px] w-[22px]" />
                        </span>
                      </div>
                      <h2 className="mt-4 max-w-[40rem] text-[22px] leading-snug font-bold text-ink md:text-[26px]">
                        {section.heading}
                      </h2>
                      <div className="mt-4 max-w-[46rem] space-y-4">
                        {lead ? (
                          <p className="text-[17px] leading-[1.7] font-medium text-ink md:text-[18px]">{lead}</p>
                        ) : null}
                        {rest.map((paragraph) => (
                          <p key={paragraph} className="text-[16px] leading-[1.75] text-ink-2">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                      {section.bullets?.length ? (
                        <ul className="mt-6 max-w-[46rem] space-y-2.5 rounded-[14px] border border-line bg-surface-2 p-4 md:p-5">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="flex items-start gap-3 text-[15px] leading-relaxed text-ink">
                              <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-accent-soft text-accent">
                                <Icon name="check" className="h-3.5 w-3.5" />
                              </span>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </section>

                    {index === ctaAfter ? (
                      <aside className="hero-band rounded-[18px] p-6 shadow-card md:p-8">
                        <HeroArt />
                        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                          <div className="max-w-xl">
                            <p className="eyebrow">{isRo ? "Te afectează?" : "Does this affect you?"}</p>
                            <p className="mt-2 text-[20px] leading-snug font-extrabold text-white md:text-[22px]">
                              {isRo
                                ? "Verificăm gratuit dacă sistemele tale sunt expuse."
                                : "We can check whether your systems are exposed."}
                            </p>
                            <p className="mt-1.5 text-sm text-slate-300">
                              {isRo
                                ? "O discuție scurtă pe Google Meet, fără obligații."
                                : "A short call on Google Meet, no commitment."}
                            </p>
                          </div>
                          <div className="flex flex-wrap gap-2.5">
                            <a href={MEET_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn primary">
                              <Icon name="calendar" className="h-4 w-4" />
                              {isRo ? "Programează o discuție" : "Book a call"}
                            </a>
                            <Link href="/contact" className="btn on-dark">
                              {isRo ? "Scrie-ne" : "Write to us"}
                            </Link>
                          </div>
                        </div>
                      </aside>
                    ) : null}
                  </Fragment>
                );
              })}

              {body.takeaways.length ? (
                <section className="card border-ok/30 !p-6 md:!p-9" aria-labelledby="takeaways">
                  <div className="flex items-center gap-3">
                    <span className="ico ok !h-11 !w-11 !rounded-xl">
                      <Icon name="checkCircle" className="h-[22px] w-[22px]" />
                    </span>
                    <h2 id="takeaways" className="text-[22px] font-bold text-ink md:text-[26px]">
                      {isRo ? "Ce să faci săptămâna aceasta" : "What to do this week"}
                    </h2>
                  </div>
                  <ol className="mt-6 grid gap-3 md:grid-cols-2">
                    {body.takeaways.map((item, index) => (
                      <li
                        key={item}
                        className="flex items-start gap-3.5 rounded-[14px] border border-line bg-ok-soft/60 p-4 text-[15px] leading-relaxed text-ink"
                      >
                        <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-ok text-[13px] font-extrabold text-white">
                          {index + 1}
                        </span>
                        <span className="pt-1">{item}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}

              {article.sources.length ? (
                <section aria-labelledby="sources">
                  <h2 id="sources" className="text-[13px] font-bold tracking-[0.14em] text-ink-3 uppercase">
                    {isRo ? "Surse" : "Sources"} · {article.sources.length}
                  </h2>
                  <ol className="mt-3 grid gap-2.5 sm:grid-cols-2">
                    {article.sources.map((source, index) => (
                      <li key={source.url} className="min-w-0">
                        <a
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="group flex h-full min-h-12 items-start gap-3 rounded-[14px] border border-line bg-surface p-3.5 transition hover:border-accent"
                        >
                          <span className="grid h-7 w-7 flex-none place-items-center rounded-lg bg-surface-2 text-[12px] font-bold text-ink-3">
                            {index + 1}
                          </span>
                          <span className="min-w-0">
                            <span className="block text-[14px] leading-snug font-semibold break-words text-ink group-hover:text-accent-ink">
                              {source.title}
                            </span>
                            <span className="mt-0.5 block truncate text-[12.5px] text-ink-3">
                              {sourceDetail(source)}
                            </span>
                          </span>
                          <Icon name="external" className="ml-auto h-4 w-4 flex-none text-ink-3 group-hover:text-accent" />
                        </a>
                      </li>
                    ))}
                  </ol>
                </section>
              ) : null}
            </div>
          </article>

          {/* right: services and call to action */}
          <aside className="min-w-0">
            <div className="flex flex-col gap-[18px] lg:sticky lg:top-[92px]">
              {services.length ? (
                <div className="card">
                  <h2 className="text-base font-bold text-ink">{t.help}</h2>
                  <ul className="mt-2">
                    {services.map((service) => (
                      <li key={service.slug} className="border-t border-line first:border-t-0">
                        <Link
                          href={`/services/${service.slug}`}
                          className="group flex min-h-11 items-center justify-between gap-2 py-2 text-sm font-semibold text-ink hover:text-accent"
                        >
                          {service.title}
                          <Icon name="chevronRight" className="h-4 w-4 text-ink-3 group-hover:text-accent" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <div className="hero-band rounded-[18px] p-6 shadow-card">
                <HeroArt />
                <div className="relative">
                  <h2 className="text-[19px] font-extrabold text-white">
                    {isRo ? "Vorbește cu un specialist" : "Talk to a specialist"}
                  </h2>
                  <p className="mt-2 text-sm text-slate-300">
                    {isRo
                      ? "O discuție scurtă, fără obligații, ca să vedem ce trebuie făcut."
                      : "A short, no-commitment call to see what needs doing."}
                  </p>
                  <div className="mt-4 flex flex-col gap-2">
                    <a href={MEET_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn primary">
                      <Icon name="calendar" className="h-4 w-4" />
                      {isRo ? "Programează pe Google Meet" : "Book a Google Meet"}
                    </a>
                    <Link href="/contact" className="btn on-dark">
                      <Icon name="mail" className="h-4 w-4" />
                      {isRo ? "Trimite o solicitare" : "Send a request"}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {more.length ? (
          <section className="mt-14 border-t border-line pt-10">
            <div className="mb-5 flex items-end justify-between gap-3">
              <h2 className="text-[22px] font-extrabold text-ink">{isRo ? "Mai multe articole" : "More articles"}</h2>
              <Link
                href={blogPath(lang)}
                className="inline-flex min-h-10 items-center text-sm font-semibold text-accent-ink hover:text-accent"
              >
                {isRo ? "Toate articolele" : "All articles"} →
              </Link>
            </div>
            <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
              {more.map((item) => (
                <ArticleCard key={item.id} article={item} lang={lang} />
              ))}
            </div>
          </section>
        ) : null}
      </main>
    </>
  );
}
