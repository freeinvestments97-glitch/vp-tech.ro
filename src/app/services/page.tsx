import Link from "next/link";
import ServiceExplorer from "@/components/service-explorer";
import { getServiceModules } from "@/data/services";
import { getLocale } from "@/lib/locale";

export default async function ServicesPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";
  const localizedServices = getServiceModules(locale);

  return (
    <div className="command-bg min-h-screen px-6 py-8 text-slate-100 md:px-10 md:py-10 xl:px-14">
      <main className="w-full">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Home" : "Back to Home"}
        </Link>
        <header className="mb-7 rounded-2xl border border-cyan-500/30 bg-slate-950/85 p-6 shadow-xl shadow-cyan-900/20 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
            {isRo ? "Servicii" : "Services"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-cyan-50 md:text-4xl">
            {isRo
              ? "Servicii IT care îți susțin direct afacerea"
              : "IT Services That Directly Support Your Business"}
          </h1>
          <p className="mt-4 max-w-4xl text-base leading-8 text-slate-200">
            {isRo
              ? "Alege serviciile de care ai nevoie pentru stabilitate, securitate, productivitate și creștere. Folosește filtrele și căutarea pentru a găsi rapid soluția potrivită."
              : "Choose the services you need for stability, security, productivity, and growth. Use filters and search to quickly find the right fit."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/get-started"
              className="rounded-md border border-cyan-300/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
            >
              {isRo ? "Începe fluxul ghidat" : "Start Guided Flow"}
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-slate-400/35 bg-slate-800/70 px-4 py-2 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              {isRo ? "Contact direct" : "Direct Contact"}
            </Link>
          </div>
        </header>

        <ServiceExplorer services={localizedServices} locale={locale} />
      </main>
    </div>
  );
}

