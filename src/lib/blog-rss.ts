import { BLOG_COPY } from "@/components/blog/blog-shared";
import { SITE_URL, blogPath, getPublishedArticles } from "@/lib/blog";
import type { BlogLang } from "@/lib/blog-types";

const xml = (value: string) =>
  value.replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[c]!);

/** RSS 2.0 feed of published articles in one language. */
export async function blogRss(lang: BlogLang) {
  const articles = (await getPublishedArticles()).filter((article) => !article.sample);
  const copy = BLOG_COPY[lang];
  const feedUrl = `${SITE_URL}${blogPath(lang)}`;
  const items = articles
    .map((article) => {
      const url = `${SITE_URL}${blogPath(lang, article.slug)}`;
      return `<item><title>${xml(article[lang].title)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><pubDate>${new Date(article.publishedAt).toUTCString()}</pubDate><description>${xml(article[lang].summary)}</description></item>`;
    })
    .join("");
  const body = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${xml(`${copy.title} | VP TECHNOLOGIES`)}</title><link>${feedUrl}</link><description>${xml(copy.description)}</description><language>${lang === "ro" ? "ro-RO" : "en-GB"}</language>${items}</channel></rss>`;
  return new Response(body, {
    headers: { "content-type": "application/rss+xml; charset=utf-8", "cache-control": "public, max-age=600" },
  });
}
