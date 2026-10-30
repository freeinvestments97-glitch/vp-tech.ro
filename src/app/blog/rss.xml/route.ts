import { blogRss } from "@/lib/blog-rss";

export async function GET() {
  return blogRss("en");
}
