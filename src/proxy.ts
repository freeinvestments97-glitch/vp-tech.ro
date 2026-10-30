import { NextResponse, type NextRequest } from "next/server";

// Blog pages take their language from the URL (/blog = English, /ro/blog =
// Romanian) so both versions can be indexed. Everywhere else the language
// comes from the site_lang cookie (see src/lib/locale.ts).
export function proxy(request: NextRequest) {
  const locale = request.nextUrl.pathname.startsWith("/ro/") ? "ro" : "en";
  const headers = new Headers(request.headers);
  headers.set("x-site-locale", locale);
  const response = NextResponse.next({ request: { headers } });
  // Keep the visitor's language preference in line with the blog URL, so the
  // rest of the site continues in that language (e.g. arriving from Google).
  if (request.cookies.get("site_lang")?.value !== locale) {
    response.cookies.set("site_lang", locale, { path: "/", maxAge: 31536000, sameSite: "lax" });
  }
  return response;
}

export const config = {
  matcher: ["/blog", "/blog/:path*", "/ro/blog", "/ro/blog/:path*"],
};
