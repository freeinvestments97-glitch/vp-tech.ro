"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/lib/locale";

type SiteStatusBarProps = {
  locale: Locale;
};

export default function SiteStatusBar({ locale }: SiteStatusBarProps) {
  const statusMessages =
    locale === "ro"
      ? [
          "Monitorizarea infrastructurii este activă",
          "Modul de verificare securitate este activ",
          "Cereri noi de servicii disponibile",
          "Consultanță de arhitectură disponibilă",
        ]
      : [
          "Infrastructure monitoring active",
          "Security review mode enabled",
          "New service requests open",
          "Architecture consultations available",
        ];
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessageIndex((current) => (current + 1) % statusMessages.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [statusMessages.length]);

  const currentDate = useMemo(
    () =>
      new Intl.DateTimeFormat(locale === "ro" ? "ro-RO" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
    [locale],
  );

  return (
    <div className="border-b border-cyan-900/45 bg-slate-950/95 px-6 py-2.5 text-sm text-slate-200 md:px-10 xl:px-14">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-medium text-cyan-200">
          {statusMessages[messageIndex]}
        </p>
        <p className="text-xs text-slate-400">
          {locale === "ro" ? "Actualizat" : "Updated"} {currentDate}
        </p>
      </div>
    </div>
  );
}

