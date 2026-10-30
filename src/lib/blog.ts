import { unstable_cache } from "next/cache";
import { getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, type DocumentData, type Timestamp } from "firebase-admin/firestore";
import { sampleArticle } from "@/data/blog-sample";
import type { Article, ArticleBody, ArticleSection, BlogTopic } from "@/lib/blog-types";

export const SITE_URL = "https://vp-tech.ro";
/** Tag used to refresh the blog right after an article is published. */
export const ARTICLES_TAG = "articles";

const PROJECT_ID = "vp-tech-eec01";
const TOPICS: BlogTopic[] = ["security", "outages", "networking", "ai"];

function db() {
  const app = getApps()[0] ?? initializeApp({ projectId: PROJECT_ID });
  return getFirestore(app);
}

const str = (value: unknown, max = 2000) => (typeof value === "string" ? value.trim().slice(0, max) : "");
const strList = (value: unknown, max = 600) =>
  Array.isArray(value) ? value.map((item) => str(item, max)).filter(Boolean) : [];
const iso = (value: unknown) => {
  const date = (value as Timestamp | undefined)?.toDate?.();
  return date ? date.toISOString() : "";
};

function toBody(value: unknown): ArticleBody | null {
  const body = (value ?? {}) as DocumentData;
  const sections: ArticleSection[] = Array.isArray(body.sections)
    ? body.sections
        .map((section: DocumentData) => ({
          heading: str(section?.heading, 200),
          paragraphs: strList(section?.paragraphs, 3000),
          bullets: strList(section?.bullets),
        }))
        .filter((section: ArticleSection) => section.heading && section.paragraphs.length)
    : [];
  const title = str(body.title, 200);
  const summary = str(body.summary, 400);
  if (!title || !summary || !sections.length) return null;
  return { title, summary, sections, takeaways: strList(body.takeaways, 300) };
}

// Firestore documents are written by the app's generator; validate everything.
function toArticle(id: string, data: DocumentData): Article | null {
  const en = toBody(data.en);
  const ro = toBody(data.ro);
  const slug = str(data.slug, 120);
  const publishedAt = iso(data.publishedAt);
  if (!en || !ro || !/^[a-z0-9-]+$/.test(slug) || !publishedAt) return null;
  return {
    id,
    slug,
    publishedAt,
    updatedAt: iso(data.updatedAt) || publishedAt,
    weekStart: str(data.weekStart, 10),
    weekEnd: str(data.weekEnd, 10),
    topics: strList(data.topics).filter((topic): topic is BlogTopic => TOPICS.includes(topic as BlogTopic)),
    services: strList(data.services, 80),
    sources: Array.isArray(data.sources)
      ? data.sources
          .map((source: DocumentData) => ({
            title: str(source?.title, 300),
            url: str(source?.url, 1000),
            publisher: str(source?.publisher, 120) || undefined,
          }))
          .filter((source) => source.title && /^https?:\/\//.test(source.url))
      : [],
    en,
    ro,
  };
}

// Errors are thrown (not returned) so a failed read is never cached.
const loadPublished = unstable_cache(
  async (): Promise<Article[]> => {
    // Filter on status only (no composite index needed); sort here.
    const snapshot = await db().collection("articles").where("status", "==", "published").get();
    return snapshot.docs
      .map((doc) => toArticle(doc.id, doc.data()))
      .filter((article): article is Article => article !== null)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  },
  ["published-articles"],
  { revalidate: 300, tags: [ARTICLES_TAG] },
);

/** Published articles, newest first. Locally, a design sample stands in until real ones exist. */
export async function getPublishedArticles(): Promise<Article[]> {
  let articles: Article[] = [];
  try {
    articles = await loadPublished();
  } catch (error) {
    console.error("blog: could not load articles", error instanceof Error ? error.message : error);
  }
  if (!articles.length && process.env.NODE_ENV === "development") return [sampleArticle];
  return articles;
}

export async function getArticle(slug: string): Promise<Article | null> {
  return (await getPublishedArticles()).find((article) => article.slug === slug) ?? null;
}

export function blogPath(lang: "en" | "ro", slug?: string) {
  const base = lang === "ro" ? "/ro/blog" : "/blog";
  return slug ? `${base}/${slug}` : base;
}

export function readingMinutes(body: ArticleBody) {
  const words = [
    body.summary,
    ...body.sections.flatMap((section) => [section.heading, ...section.paragraphs, ...(section.bullets ?? [])]),
    ...body.takeaways,
  ]
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}
