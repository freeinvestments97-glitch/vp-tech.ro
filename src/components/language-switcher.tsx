"use client";

import { useRouter } from "next/navigation";
import type { Locale } from "@/lib/locale";

type LanguageSwitcherProps = {
  locale: Locale;
};

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const router = useRouter();

  const setLanguage = (nextLocale: Locale) => {
    document.cookie = `site_lang=${nextLocale}; path=/; max-age=31536000; samesite=lax`;
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
