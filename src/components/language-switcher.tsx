"use client";

import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/locale";

type LanguageSwitcherProps = {
  locale: Locale;
};

function saveLanguage(nextLocale: Locale) {
  document.cookie = `site_lang=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const setLanguage = (nextLocale: Locale) => {
    saveLanguage(nextLocale);
    // Blog URLs carry the language: go to the same page in the other language.
    const blogPath = pathname.match(/^(?:\/ro)?(\/blog(?:\/.*)?)$/)?.[1];
    if (blogPath) {
      // full load so the shared header/footer re-render in the new language
      window.location.assign(nextLocale === "ro" ? `/ro${blogPath}` : blogPath);
      return;
    }
    router.refresh();
  };

  return (
    <div className="inline-flex gap-0.5 rounded-[10px] border border-white/16 bg-white/8 p-[3px]">
      {(["en", "ro"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLanguage(code)}
          aria-pressed={locale === code}
          className={`cursor-pointer rounded-lg px-2.5 py-1.5 text-[13px] font-semibold transition ${
            locale === code ? "bg-white text-navy" : "text-slate-200/75 hover:text-white"
          }`}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
