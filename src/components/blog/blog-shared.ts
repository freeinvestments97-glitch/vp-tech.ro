import type { Metadata } from "next";
import type { IconName } from "@/components/icon";
import { SITE_URL, blogPath } from "@/lib/blog";
import type { Article, BlogLang, BlogTopic } from "@/lib/blog-types";

export const TOPIC_META: Record<BlogTopic, { icon: IconName; en: string; ro: string }> = {
  security: { icon: "shieldCheck", en: "Security", ro: "Securitate" },
  outages: { icon: "cloud", en: "Outages & cloud", ro: "Întreruperi & cloud" },
  networking: { icon: "network", en: "Networking", ro: "Rețelistică" },
  ai: { icon: "sparkles", en: "AI & software", ro: "AI & software" },
};

// Icon for a section, guessed from words in its heading (English and Romanian).
const SECTION_ICONS: Array<[RegExp, IconName]> = [
  [/secur|vulnerab|patch|exploit|breach|ransom|attack|malware|backdoor|phish|flaw|threat|cve|zero-day|compromi|supply chain|atac|bre[sș]|amenin|actualiz/i, "shieldCheck"],
  [/outage|cloud|microsoft|exchange|azure|aws|downtime|disrupt|întrerup|avari/i, "cloud"],
  [/network|wi-?fi|starlink|connect|isp|satellite|router|re[țt]ea|conectiv/i, "network"],
  [/\bai\b|agent|automat|model|gpt|gemini|inteligen/i, "sparkles"],
  [/pay|pos|card|terminal|pl[ăa]ț|retail/i, "card"],
  [/software|crm|erp|e-?commerce|store|wordpress|magazin/i, "code"],
];
const FALLBACK_ICONS: IconName[] = ["activity", "layers", "target", "globe", "trending"];

export function sectionIcon(heading: string, index: number): IconName {
  return SECTION_ICONS.find(([re]) => re.test(heading))?.[1] ?? FALLBACK_ICONS[index % FALLBACK_ICONS.length];
}

/** Hostname for a source without a publisher label. */
export function sourceHost(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Second line of a source card: the publisher, or the page path when the title already is the domain. */
export function sourceDetail(source: { title: string; url: string; publisher?: string }) {
  const host = sourceHost(source.url);
  const label = source.publisher || host;
  if (label && label.toLowerCase() !== source.title.toLowerCase()) return label;
  try {
    const path = decodeURIComponent(new URL(source.url).pathname).replace(/\/+$/, "");
    return path && path !== "/" ? path.replace(/[-_]+/g, " ").replace(/^\//, "") : host;
  } catch {
    return host;
  }
}

const TZ = "Europe/Bucharest";

export function formatDate(isoDate: string, lang: BlogLang) {
  return new Intl.DateTimeFormat(lang === "ro" ? "ro-RO" : "en-GB", {
    timeZone: TZ,
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(isoDate));
}

/** "19–25 October 2026" for the week an article covers. */
export function formatWeek(start: string, end: string, lang: BlogLang) {
  if (!start || !end) return "";
  const fmt = (day: string, options: Intl.DateTimeFormatOptions) =>
    new Intl.DateTimeFormat(lang === "ro" ? "ro-RO" : "en-GB", { timeZone: "UTC", ...options }).format(
      new Date(`${day}T12:00:00Z`),
    );
  const sameMonth = start.slice(0, 7) === end.slice(0, 7);
  return sameMonth
    ? `${fmt(start, { day: "numeric" })}–${fmt(end, { day: "numeric", month: "long", year: "numeric" })}`
    : `${fmt(start, { day: "numeric", month: "short" })} – ${fmt(end, { day: "numeric", month: "short", year: "numeric" })}`;
}

export const BLOG_COPY = {
  en: {
    eyebrow: "Blog",
    title: "This week in tech, for your business",
    description:
      "Every week: the major tech events that affect companies (security flaws, outages, network and AI news) explained in plain language, with practical next steps.",
  },
  ro: {
    eyebrow: "Blog",
    title: "Săptămâna în tech, pentru afacerea ta",
    description:
      "În fiecare săptămână: evenimentele tech majore care afectează companiile (vulnerabilități, întreruperi, rețelistică și AI), explicate pe înțeles, cu pași practici.",
  },
} as const;

/** Canonical URL plus the other-language version and x-default for Google. */
function alternates(lang: BlogLang, slug?: string): Metadata["alternates"] {
  return {
    canonical: `${SITE_URL}${blogPath(lang, slug)}`,
    languages: {
      en: `${SITE_URL}${blogPath("en", slug)}`,
      ro: `${SITE_URL}${blogPath("ro", slug)}`,
      "x-default": `${SITE_URL}${blogPath("en", slug)}`,
    },
    types: { "application/rss+xml": `${SITE_URL}${blogPath(lang)}/rss.xml` },
  };
}

export function blogIndexMetadata(lang: BlogLang): Metadata {
  const copy = BLOG_COPY[lang];
  return {
    title: `${copy.title} | VP TECHNOLOGIES`,
    description: copy.description,
    alternates: alternates(lang),
    openGraph: {
      type: "website",
      url: `${SITE_URL}${blogPath(lang)}`,
      title: copy.title,
      description: copy.description,
      siteName: "VP TECHNOLOGIES",
      locale: lang === "ro" ? "ro_RO" : "en_GB",
    },
  };
}

export function articleMetadata(article: Article, lang: BlogLang): Metadata {
  const body = article[lang];
  return {
    title: `${body.title} | VP TECHNOLOGIES`,
    description: body.summary,
    alternates: alternates(lang, article.slug),
    // the local design preview must never be indexed
    robots: article.sample ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "article",
      url: `${SITE_URL}${blogPath(lang, article.slug)}`,
      title: body.title,
      description: body.summary,
      siteName: "VP TECHNOLOGIES",
      locale: lang === "ro" ? "ro_RO" : "en_GB",
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      authors: ["VP TECHNOLOGIES"],
      tags: article.topics.map((topic) => TOPIC_META[topic][lang]),
    },
    twitter: { card: "summary", title: body.title, description: body.summary },
  };
}

/** schema.org BlogPosting for Google's article rich results. */
export function articleJsonLd(article: Article, lang: BlogLang) {
  const body = article[lang];
  const url = `${SITE_URL}${blogPath(lang, article.slug)}`;
  const organisation = { "@type": "Organization", name: "VP TECHNOLOGIES", url: SITE_URL };
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: body.title,
    description: body.summary,
    url,
    mainEntityOfPage: url,
    inLanguage: lang === "ro" ? "ro-RO" : "en-GB",
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    author: organisation,
    publisher: organisation,
    keywords: article.topics.map((topic) => TOPIC_META[topic][lang]).join(", "),
    citation: article.sources.map((source) => source.url),
  };
  // escape "<" so the JSON can never close the <script> tag
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
