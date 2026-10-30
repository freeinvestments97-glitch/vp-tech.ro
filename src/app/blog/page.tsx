import BlogIndex from "@/components/blog/blog-index";
import { blogIndexMetadata } from "@/components/blog/blog-shared";

export const metadata = blogIndexMetadata("en");

export default function Page() {
  return <BlogIndex lang="en" />;
}
