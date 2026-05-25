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
    <div className="flex items-center gap-1 rounded-full border border-slate-600/70 bg-slate-900/70 p-1 text-xs">
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-full px-2.5 py-1 font-semibold transition ${
          locale === "en"
            ? "bg-cyan-500/25 text-cyan-100"
            : "text-slate-300 hover:text-slate-100"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLanguage("ro")}
        className={`rounded-full px-2.5 py-1 font-semibold transition ${
          locale === "ro"
            ? "bg-cyan-500/25 text-cyan-100"
            : "text-slate-300 hover:text-slate-100"
        }`}
      >
        RO
      </button>
    </div>
  );
}

