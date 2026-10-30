import Link from "next/link";
import Icon from "@/components/icon";
import PageHero from "@/components/page-hero";
import { BLOG_COPY, TOPIC_META, formatWeek } from "@/components/blog/blog-shared";
import { blogPath, getPublishedArticles, readingMinutes } from "@/lib/blog";
import type { Article, BlogLang } from "@/lib/blog-types";
import { MEET_BOOKING_URL } from "@/lib/links";

export function ArticleCard({ article, lang, featured = false }: { article: Article; lang: BlogLang; featured?: boolean }) {
  const body = article[lang];
  const isRo = lang === "ro";
  return (
    <Link
      href={blogPath(lang, article.slug)}
      className={`card group flex flex-col transition hover:border-accent ${featured ? "md:!p-8" : ""}`}
    >
      <p className="text-[12px] font-bold tracking-[0.1em] text-ink-3 uppercase">
        {isRo ? "Săptămâna" : "Week of"} {formatWeek(article.weekStart, article.weekEnd, lang)}
      </p>
      <h3 className={`mt-2 font-extrabold text-ink group-hover:text-accent-ink ${featured ? "text-[24px] md:text-[30px] leading-tight" : "text-[18px] leading-snug"}`}>
        {body.title}
      </h3>
      <p className={`mt-2 leading-relaxed text-ink-2 ${featured ? "max-w-3xl text-base" : "text-sm"}`}>{body.summary}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {article.topics.map((topic) => (
          <span key={topic} className="chip">
            <Icon name={TOPIC_META[topic].icon} className="h-3.5 w-3.5" />
            {TOPIC_META[topic][lang]}
          </span>
        ))}
        <span className="ml-auto inline-flex items-center gap-1.5 text-[13px] text-ink-3">
          <Icon name="clock" className="h-3.5 w-3.5" />
          {readingMinutes(body)} min
        </span>
      </div>
    </Link>
  );
}

export default async function BlogIndex({ lang }: { lang: BlogLang }) {
  const isRo = lang === "ro";
  const copy = BLOG_COPY[lang];
  const [latest, ...older] = await getPublishedArticles();

  return (
    <>
      <PageHero
        overlap
        eyebrow={copy.eyebrow}
        title={copy.title}
        description={copy.description}
        actions={
          <>
            <a href={MEET_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="btn primary">
              <Icon name="calendar" className="h-4 w-4" />
              {isRo ? "Programează o discuție" : "Book a discovery call"}
            </a>
            <a href={`${blogPath(lang)}/rss.xml`} className="btn on-dark">
              <Icon name="activity" className="h-4 w-4" />
              RSS
            </a>
          </>
        }
      />

      <main className="shell pb-6">
        {latest ? (
          <div className="relative -mt-16 flex flex-col gap-[18px]">
            <ArticleCard article={latest} lang={lang} featured />
            {older.length ? (
              <section className="mt-6">
                <h2 className="mb-4 text-[20px] font-bold text-ink">
                  {isRo ? "Articole anterioare" : "Earlier articles"}
                </h2>
                <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-3">
                  {older.map((article) => (
                    <ArticleCard key={article.id} article={article} lang={lang} />
                  ))}
                </div>
              </section>
            ) : null}
            {latest.sample ? (
              <p className="text-[13px] text-ink-3">
                {isRo
                  ? "Articol de previzualizare, vizibil doar local. Nu apare pe site-ul public."
                  : "Preview article, visible locally only. It never appears on the public site."}
              </p>
            ) : null}
          </div>
        ) : (
          <div className="card relative -mt-16 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-3">
              <span className="ico">
                <Icon name="calendar" />
              </span>
              <div>
                <p className="font-semibold text-ink">
                  {isRo ? "Primul articol apare în curând" : "The first article is coming soon"}
                </p>
                <p className="text-sm text-ink-2">
                  {isRo
                    ? "Publicăm un rezumat tech în fiecare săptămână. Până atunci, vezi ce putem face pentru tine."
                    : "We publish a tech briefing every week. Meanwhile, see how we can help."}
                </p>
              </div>
            </div>
            <Link href="/services" className="btn primary">
              {isRo ? "Vezi serviciile" : "See our services"}
            </Link>
          </div>
        )}
      </main>
    </>
  );
}
