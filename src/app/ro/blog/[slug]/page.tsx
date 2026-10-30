import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/blog-article";
import { articleMetadata } from "@/components/blog/blog-shared";
import { getArticle } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = await getArticle((await params).slug);
  return article ? articleMetadata(article, "ro") : {};
}

export default async function Page({ params }: Props) {
  const article = await getArticle((await params).slug);
  if (!article) notFound();
  return <BlogArticle article={article} lang="ro" />;
}
