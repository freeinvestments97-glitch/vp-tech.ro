import Link from "next/link";
import { getServiceAreas } from "@/data/service-areas";
import { getServiceModules } from "@/data/services";
import HeroSpotlight from "@/components/hero-spotlight";
import Icon from "@/components/icon";
import LiveMetrics from "@/components/live-metrics";
import { getLocale } from "@/lib/locale";

export default async function Home() {
  const locale = await getLocale();
  const isRo = locale === "ro";
  const serviceTitles = new Map(
    getServiceModules(locale).map((service) => [service.slug, service.title]),
  );
  const areas = getServiceAreas(locale);

  const phases = isRo
    ? [
        {
          title: "Analiza",
          body: "Înțelegem modelul de business, punctele slabe și oportunitățile de creștere.",
        },
        {
          title: "Implementare",
          body: "Implementăm în etape clare, cu impact minim asupra activității zilnice.",
        },
        {
          title: "Optimizare",
          body: "Măsurăm rezultatele și ajustăm continuu pentru performanță mai bună.",
        },
      ]
    : [
        {
          title: "Discover",
          body: "We understand your business model, weak points, and growth opportunities.",
        },
        {
          title: "Build",
          body: "We implement in clear phases, with minimal impact on daily operations.",
        },
        {
          title: "Optimize",
          body: "We measure outcomes and continuously adjust for better performance.",
        },
      ];

  const reasons = isRo
    ? [
        "Primești un singur partener pentru infrastructură, securitate și software.",
        "Reducem riscurile și costurile generate de întreruperi sau incidente.",
        "Comunicăm clar, pe înțelesul managementului, nu doar tehnic.",
        "Ne concentrăm pe rezultate măsurabile: stabilitate, timp economisit și creștere.",
      ]
    : [
        "You get one partner for infrastructure, security, and software.",
        "We reduce risk and costs caused by downtime or incidents.",
        "We communicate clearly for management, not only technical teams.",
        "We focus on measurable outcomes: stability, time saved, and growth.",
      ];

  return (
    <>
      <HeroSpotlight locale={locale} />

      <main className="shell flex flex-col gap-10 pb-6">
        <div className="relative -mt-16">
          <LiveMetrics locale={locale} />
        </div>

        {/* Overview of the four service areas; the full catalogue lives on /services */}
        <section>
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div className="min-w-0">
              <p className="eyebrow !text-accent">{isRo ? "Ce facem" : "What We Do"}</p>
              <h2 className="mt-1.5 text-[22px] font-extrabold text-ink md:text-[26px]">
                {isRo
                  ? "Patru arii, un singur partener tehnologic"
                  : "Four areas, one technology partner"}
              </h2>
            </div>
            <Link href="/services" className="btn">
              {isRo ? "Toate cele 15 servicii" : "All 15 services"}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-[18px] md:grid-cols-2 xl:grid-cols-4">
            {areas.map((area) => (
              <article key={area.id} className="card flex flex-col">
                <span className="ico !h-11 !w-11 !rounded-xl">
                  <Icon name={area.icon} className="h-[22px] w-[22px]" />
                </span>
                <h3 className="mt-4 text-[18px] font-bold text-ink">{area.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{area.summary}</p>
                <ul className="mt-4 border-t border-line pt-2">
                  {area.slugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/services/${slug}`}
                        className="group flex items-center justify-between gap-2 py-1.5 text-sm font-medium text-ink transition hover:text-accent"
                      >
                        {serviceTitles.get(slug)}
                        <Icon
                          name="chevronRight"
                          className="h-4 w-4 text-ink-3 transition group-hover:text-accent"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/services#${area.id}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-accent-ink hover:text-accent"
                >
                  {isRo ? "Vezi în catalog" : "View in catalogue"}
                  <Icon name="arrowRight" className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-[18px] xl:grid-cols-[1.25fr_1fr]">
          <article className="card md:!p-7">
            <div className="section-h">
              <span className="ico">
                <Icon name="activity" />
              </span>
              <div className="min-w-0">
                <p className="eyebrow !text-accent">
                  {isRo ? "Cum lucrăm cu clienții" : "How We Work With Clients"}
                </p>
                <h2 className="mt-0.5 !text-[22px] text-ink">
                  {isRo
                    ? "Transformăm tehnologia în rezultate clare de business"
                    : "We Turn Technology Into Clear Business Results"}
                </h2>
              </div>
            </div>
            <p className="text-[15px] leading-relaxed text-ink-2">
              {isRo
                ? "Începem de la obiectivele tale comerciale: vânzări, eficiență, continuitate și satisfacția clienților. Apoi construim soluția tehnică potrivită, fără complexitate inutilă."
                : "We start from your business goals: revenue, efficiency, continuity, and customer satisfaction. Then we build the right technical solution without unnecessary complexity."}
            </p>

            {/* app-style timeline: numbered nodes joined by a track */}
            <ol className="mt-6 grid gap-[18px] md:grid-cols-3">
              {phases.map((phase, index) => (
                <li key={phase.title} className="relative pt-[34px]">
                  <span
                    aria-hidden="true"
                    className={`absolute top-[13px] left-0 h-[3px] rounded-[3px] ${
                      index === phases.length - 1 ? "right-0" : "right-0 md:-right-[18px]"
                    } ${index === 0 ? "bg-ok" : index === 1 ? "bg-gradient-to-r from-accent to-line" : "bg-line"}`}
                  />
                  <span
                    className={`absolute top-0 left-0 grid h-[30px] w-[30px] place-items-center rounded-full border-[3px] text-[13px] font-extrabold ${
                      index === 0
                        ? "border-ok bg-ok text-white"
                        : index === 1
                          ? "border-accent bg-surface text-accent shadow-[0_0_0_6px_var(--accent-soft)]"
                          : "border-line bg-surface text-ink-3"
                    }`}
                  >
                    {index + 1}
                  </span>
                  <div className="rounded-[14px] border border-line bg-surface-2 p-4">
                    <p className="text-[11.5px] font-bold tracking-[0.08em] text-ink-3 uppercase">
                      {isRo ? `Faza ${index + 1}` : `Phase ${index + 1}`}
                    </p>
                    <h3 className="mt-1 text-base font-bold text-ink">{phase.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{phase.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </article>

          <aside className="card flex flex-col md:!p-7">
            <div className="section-h">
              <span className="ico ok !bg-ok-soft !text-ok">
                <Icon name="shieldCheck" />
              </span>
              <h2 className="text-ink">
                {isRo ? "De ce ne aleg antreprenorii" : "Why Business Owners Choose Us"}
              </h2>
            </div>
            <ul>
              {reasons.map((reason) => (
                <li
                  key={reason}
                  className="flex items-start gap-2.5 border-t border-line py-3 text-[15px] text-ink first:border-t-0 first:pt-0"
                >
                  <Icon name="checkCircle" className="mt-0.5 h-[18px] w-[18px] text-ok" />
                  {reason}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-5">
              <Link href="/contact" className="btn primary">
                <Icon name="calendar" className="h-[18px] w-[18px]" />
                {isRo ? "Programează o discuție" : "Book a Discovery Call"}
              </Link>
            </div>
          </aside>
        </section>
      </main>
    </>
  );
}
