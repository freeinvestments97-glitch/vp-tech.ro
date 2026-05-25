import { cookies } from "next/headers";

export type Locale = "en" | "ro";

export async function getLocale(): Promise<Locale> {
  const store = await cookies();
  const value = store.get("site_lang")?.value;
  return value === "ro" ? "ro" : "en";
}

export function isRomanian(locale: Locale) {
  return locale === "ro";
}

