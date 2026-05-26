import Link from "next/link";
import { getServiceModules } from "@/data/services";
import HeroSpotlight from "@/components/hero-spotlight";
import LiveMetrics from "@/components/live-metrics";
import ServiceExplorer from "@/components/service-explorer";
import { getLocale } from "@/lib/locale";

export default async function Home() {
  const locale = await getLocale();
  const isRo = locale === "ro";
  const localizedServices = getServiceModules(locale);

  return (
    <div className="command-bg min-h-screen text-slate-100">
      <main className="flex w-full flex-col gap-10 px-6 py-7 md:px-10 md:py-10 xl:px-14">
        <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-800/80 bg-slate-950/70 px-5 py-4">
          <div className="select-none leading-none" style={{ fontFamily: "var(--font-space-grotesk)" }}>
            <div className="flex items-center gap-2">
              <div className="h-5 w-[3px] rounded-full bg-cyan-400" />
              <span className="text-[22px] font-bold tracking-[-0.01em] text-white">VP</span>
            </div>
            <span className="ml-[20px] block text-[9px] font-semibold tracking-[0.38em] text-cyan-400 uppercase mt-[3px]">
              TECHNOLOGIES
            </span>
          </div>
          <nav className="flex w-full flex-wrap gap-2 text-base md:w-auto">
            <Link
              href="/"
              className="rounded-md border border-cyan-500/35 bg-cyan-500/10 px-3 py-1.5 font-semibold text-cyan-200"
            >
              {isRo ? "Acasa" : "Home"}
            </Link>
            <Link
              href="/services"
              className="rounded-md border border-slate-600/70 bg-slate-900/80 px-3 py-1.5 font-semibold text-slate-200 transition hover:border-cyan-500/35"
            >
              {isRo ? "Servicii" : "Services"}
            </Link>
            <Link
              href="/clients"
              className="rounded-md border border-slate-600/70 bg-slate-900/80 px-3 py-1.5 font-semibold text-slate-200 transition hover:border-cyan-500/35"
            >
              {isRo ? "Clienti" : "Clients"}
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-slate-600/70 bg-slate-900/80 px-3 py-1.5 font-semibold text-slate-200 transition hover:border-cyan-500/35"
            >
              {isRo ? "Contact" : "Contact"}
            </Link>
            <Link
              href="/get-started"
              className="rounded-md border border-cyan-300/55 bg-cyan-400 px-3 py-1.5 font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {isRo ? "Începe acum" : "Get Started"}
            </Link>
          </nav>
        </header>

        <HeroSpotlight locale={locale} />

        <LiveMetrics locale={locale} />

        <ServiceExplorer services={localizedServices} locale={locale} />

        <section className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <article className="rounded-xl border border-cyan-500/25 bg-slate-950/78 p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
              {isRo ? "Cum lucrăm cu clienții" : "How We Work With Clients"}
            </p>
            <h2 className="mt-2 text-2xl font-bold text-cyan-50">
              {isRo
                ? "Transformăm tehnologia în rezultate clare de business"
                : "We Turn Technology Into Clear Business Results"}
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-100">
              {isRo
                ? "Începem de la obiectivele tale comerciale: vânzări, eficiență, continuitate și satisfacția clienților. Apoi construim soluția tehnică potrivită, fără complexitate inutilă."
                : "We start from your business goals: revenue, efficiency, continuity, and customer satisfaction. Then we build the right technical solution without unnecessary complexity."}
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <article
                className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4"
              >
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Faza 1" : "Phase 1"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {isRo ? "Analiza" : "Discover"}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {isRo
                    ? "Înțelegem modelul de business, punctele slabe și oportunitățile de creștere."
                    : "We understand your business model, weak points, and growth opportunities."}
                </p>
              </article>
              <article className="rounded-lg border border-slate-700/70 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Faza 2" : "Phase 2"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {isRo ? "Implementare" : "Build"}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {isRo
                    ? "Implementăm în etape clare, cu impact minim asupra activității zilnice."
                    : "We implement in clear phases, with minimal impact on daily operations."}
                </p>
              </article>
              <article className="rounded-lg border border-slate-700/70 bg-slate-900/70 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Faza 3" : "Phase 3"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {isRo ? "Optimizare" : "Optimize"}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {isRo
                    ? "Măsurăm rezultatele și ajustăm continuu pentru performanță mai bună."
                    : "We measure outcomes and continuously adjust for better performance."}
                </p>
              </article>
            </div>
          </article>

          <aside className="rounded-xl border border-emerald-500/30 bg-emerald-950/18 p-6 md:p-7">
            <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">
              {isRo ? "De ce ne aleg antreprenorii" : "Why Business Owners Choose Us"}
            </p>
            <ul className="mt-4 space-y-3 text-base leading-8 text-slate-100">
              <li>
                -{" "}
                {isRo
                  ? "Primești un singur partener pentru infrastructură, securitate și software."
                  : "You get one partner for infrastructure, security, and software."}
              </li>
              <li>
                -{" "}
                {isRo
                  ? "Reducem riscurile și costurile generate de întreruperi sau incidente."
                  : "We reduce risk and costs caused by downtime or incidents."}
              </li>
              <li>
                -{" "}
                {isRo
                  ? "Comunicăm clar, pe înțelesul managementului, nu doar tehnic."
                  : "We communicate clearly for management, not only technical teams."}
              </li>
              <li>
                -{" "}
                {isRo
                  ? "Ne concentrăm pe rezultate măsurabile: stabilitate, timp economisit și creștere."
                  : "We focus on measurable outcomes: stability, time saved, and growth."}
              </li>
            </ul>
            <Link
              href="/contact"
              className="mt-5 inline-block rounded-md border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
            >
              {isRo ? "Programează o discuție" : "Book a Discovery Call"}
            </Link>
          </aside>
        </section>
      </main>
    </div>
  );
}
