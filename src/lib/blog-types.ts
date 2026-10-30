// Weekly "This week in tech" articles. Stored in Firestore (collection
// `articles`, project vp-tech-eec01); drafted by app.vp-tech.ro with Vertex AI
// and published after review there. Content is plain text only (no HTML), so
// generated text can never inject markup into the site.

export type BlogLang = "en" | "ro";

export type BlogTopic = "security" | "outages" | "networking" | "ai";

export type ArticleSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type ArticleBody = {
  title: string;
  /** One or two sentences: list pages, meta description, social previews. */
  summary: string;
  sections: ArticleSection[];
  /** "What to do this week": short, practical actions for business owners. */
  takeaways: string[];
};

export type ArticleSource = {
  title: string;
  url: string;
  publisher?: string;
};

export type Article = {
  id: string;
  /** Same slug for both languages: /blog/<slug> and /ro/blog/<slug>. */
  slug: string;
  /** ISO timestamps. */
  publishedAt: string;
  updatedAt: string;
  /** The week covered, YYYY-MM-DD. */
  weekStart: string;
  weekEnd: string;
  topics: BlogTopic[];
  /** Service slugs from src/data/services.ts that can help with the issues covered. */
  services: string[];
  sources: ArticleSource[];
  en: ArticleBody;
  ro: ArticleBody;
  /** Only the local design preview sets this; it is never served in production. */
  sample?: boolean;
};
