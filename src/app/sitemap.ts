import type { MetadataRoute } from "next";
import { serviceModules } from "@/data/services";
import { SITE_URL, blogPath, getPublishedArticles } from "@/lib/blog";

export const revalidate = 600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const page = (path: string, priority: number): MetadataRoute.Sitemap[number] => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "weekly",
    priority,
  });

  const articles = (await getPublishedArticles()).filter((article) => !article.sample);

  return [
    page("/", 1),
    page("/services", 0.9),
    ...serviceModules.map((service) => page(`/services/${service.slug}`, 0.7)),
    page("/clients", 0.6),
    page("/contact", 0.7),
    // blog index and articles exist in both languages; tell Google they belong together
    ...(["en", "ro"] as const).map((lang) => ({
      ...page(blogPath(lang), 0.8),
      alternates: { languages: { en: `${SITE_URL}${blogPath("en")}`, ro: `${SITE_URL}${blogPath("ro")}` } },
    })),
    ...articles.flatMap((article) =>
      (["en", "ro"] as const).map((lang) => ({
        url: `${SITE_URL}${blogPath(lang, article.slug)}`,
        lastModified: article.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.7,
        alternates: {
          languages: {
            en: `${SITE_URL}${blogPath("en", article.slug)}`,
            ro: `${SITE_URL}${blogPath("ro", article.slug)}`,
          },
        },
      })),
    ),
    page("/privacy-policy", 0.2),
    page("/cookie-policy", 0.2),
    page("/terms-and-conditions", 0.2),
  ];
}
