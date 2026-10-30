import { cookies, headers } from "next/headers";

export type Locale = "en" | "ro";

export async function getLocale(): Promise<Locale> {
  // Blog URLs carry their own language (set by src/proxy.ts).
  const fromUrl = (await headers()).get("x-site-locale");
  if (fromUrl === "en" || fromUrl === "ro") return fromUrl;
  const store = await cookies();
  const value = store.get("site_lang")?.value;
  return value === "ro" ? "ro" : "en";
}

export function isRomanian(locale: Locale) {
  return locale === "ro";
}
