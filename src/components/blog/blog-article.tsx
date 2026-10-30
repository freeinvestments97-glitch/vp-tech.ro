import Link from "next/link";
import Icon from "@/components/icon";
import PageHero, { HeroArt } from "@/components/page-hero";
import { ArticleCard } from "@/components/blog/blog-index";
import { TOPIC_META, articleJsonLd, formatDate, formatWeek } from "@/components/blog/blog-shared";
import { getServiceModules } from "@/data/services";
import { blogPath, getPublishedArticles, readingMinutes } from "@/lib/blog";
import type { Article, BlogLang } from "@/lib/blog-types";
import { MEET_BOOKING_URL } from "@/lib/links";

export default async function BlogArticle({ article, lang }: { article: Article; lang: BlogLang }) {
  const isRo = lang === "ro";
  const body = article[lang];
  const services = getServiceModules(lang).filter((service) => article.services.includes(service.slug));
  const more = (await getPublishedArticles()).filter((item) => item.id !== article.id).slice(0, 3);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: articleJsonLd(article, lang) }} />

      <PageHero
        overlap
        eyebrow={`${isRo ? "Săptămâna" : "Week of"} ${formatWeek(article.weekStart, article.weekEnd, lang)}`}
        title={body.title}
        description={body.summary}
        actions={
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-slate-300">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="calendar" className="h-4 w-4 text-accent-2" />
              <time dateTime={article.publishedAt}>{formatDate(article.publishedAt, lang)}</time>
            </span>
            <span aria-hidden="true">·</span>
            <span className="inline-flex items-center gap-1.5">
              <Icon name="clock" className="h-4 w-4 text-accent-2" />
              {readingMinutes(body)} min {isRo ? "de citit" : "read"}
            </span>
          </div>
        }
      />

      <main className="shell pb-6">
        <div className="relative -mt-16 grid max-w-[1240px] gap-[18px] lg:grid-cols-[minmax(0,1fr)_340px]">
          <article className="card min-w-0 md:!p-8">
            {article.sample ? (
              <p className="mb-6 flex items-start gap-2 rounded-xl bg-warn-soft px-3.5 py-2.5 text-sm font-medium text-warn">
                <Icon name="info" className="mt-0.5 h-4 w-4" />
                {isRo
                  ? "Previzualizare de design, vizibilă doar local. Articolele reale sunt generate săptămânal și aprobate înainte de publicare."
                  : "Design preview, visible locally only. Real articles are generated weekly and approved before publishing."}
              </p>
            ) : null}

            <div className="mb-6 flex flex-wrap gap-2">
              {article.topics.map((topic) => (
                <span key={topic} className="chip acc">
                  <Icon name={TOPIC_META[topic].icon} className="h-3.5 w-3.5" />
                  {TOPIC_META[topic][lang]}
                </span>
              ))}
            </div>

            <div className="space-y-8">
              {body.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-[21px] font-bold text-ink">{section.heading}</h2>
                  <div className="mt-3 space-y-3.5 text-[16px] leading-[1.7] text-ink-2">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-3.5 space-y-2">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2.5 text-[16px] leading-relaxed text-ink-2">
                          <Icon name="chevronRight" className="mt-1 h-4 w-4 text-accent" />
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            {body.takeaways.length ? (
              <section className="mt-9 rounded-[14px] border border-line bg-ok-soft p-5">
                <h2 className="flex items-center gap-2 text-[17px] font-bold text-ink">
                  <Icon name="checkCircle" className="h-5 w-5 text-ok" />
                  {isRo ? "Ce să faci săptămâna aceasta" : "What to do this week"}
                </h2>
                <ul className="mt-3 space-y-2">
                  {body.takeaways.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[15px] text-ink">
                      <Icon name="check" className="mt-0.5 h-4 w-4 text-ok" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            {article.sources.length ? (
              <section className="mt-9 border-t border-line pt-6">
                <h2 className="text-[13px] font-bold tracking-[0.1em] text-ink-3 uppercase">
                  {isRo ? "Surse" : "Sources"}
                </h2>
                <ol className="mt-3 space-y-2">
                  {article.sources.map((source, index) => (
                    <li key={source.url} className="flex gap-2.5 text-sm">
                      <span className="w-5 flex-none text-right font-semibold text-ink-3">{index + 1}.</span>
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="min-w-0 break-words text-accent-ink hover:text-accent"
                      >
                        {source.title}
                        {source.publisher ? <span className="text-ink-3"> · {source.publisher}</span> : null}
                      </a>
                    </li>
                  ))}
                </ol>
              </section>
            ) : null}
          </article>

          <aside className="flex min-w-0 flex-col gap-[18px] lg:sticky lg:top-[86px] lg:self-start">
            {services.length ? (
              <div className="card">
                <h2 className="text-base font-bold text-ink">
                  {isRo ? "Cum te putem ajuta" : "How we can help"}
                </h2>
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
                  {isRo ? "Te afectează ceva din ce ai citit?" : "Does any of this affect you?"}
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
          </aside>
        </div>

        {more.length ? (
          <section className="mt-12">
            <div className="mb-4 flex items-end justify-between gap-3">
              <h2 className="text-[20px] font-bold text-ink">{isRo ? "Mai multe articole" : "More articles"}</h2>
              <Link href={blogPath(lang)} className="text-sm font-semibold text-accent-ink hover:text-accent">
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
