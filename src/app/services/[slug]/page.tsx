import Link from "next/link";
import { notFound } from "next/navigation";
import Icon from "@/components/icon";
import PageHero from "@/components/page-hero";
import ServiceShowcase from "@/components/service-showcase";
import { getServiceModules, serviceModules } from "@/data/services";
import { getLocale } from "@/lib/locale";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return serviceModules.map((service) => ({ slug: service.slug }));
}

export default async function ServicePage({ params }: ServicePageProps) {
  const locale = await getLocale();
  const isRo = locale === "ro";
  const localizedServices = getServiceModules(locale);
  const { slug } = await params;
  const service = localizedServices.find((item) => item.slug === slug);

  if (!service) {
    notFound();
  }

  const phases = [
    {
      label: isRo ? "Faza 01" : "Phase 01",
      title: isRo ? "Evaluare" : "Assessment",
      text: isRo
        ? "Evaluăm mediul actual, identificăm riscurile și definim o arhitectură țintă aplicabilă."
        : "We evaluate the current environment, identify risks, and define a practical target architecture.",
    },
    {
      label: isRo ? "Faza 02" : "Phase 02",
      title: isRo ? "Implementare" : "Implementation",
      text: isRo
        ? "Implementăm, configurăm și validăm soluția prin execuție controlată și checkpoint-uri de calitate."
        : "We deploy, configure, and validate the solution using controlled execution and quality checkpoints.",
    },
    {
      label: isRo ? "Faza 03" : "Phase 03",
      title: isRo ? "Optimizare" : "Optimization",
      text: isRo
        ? "Monitorizăm rezultatele, îmbunătățim performanța și susținem echipa prin ghidaj operațional continuu."
        : "We monitor results, improve performance, and support the team with ongoing operational guidance.",
    },
  ];

  return (
    <>
      <PageHero
        overlap
        eyebrow={service.unit}
        title={service.title}
        description={
          <>
            <p>{service.description}</p>
            <p className="mt-3 text-slate-400">
              {isRo
                ? "Lucrăm ca partener orientat pe execuție: strategie, implementare și suport administrat pentru rezultate concrete de business."
                : "We work as an execution-focused partner, combining strategy, implementation, and managed support to ensure this service produces tangible business results, not just technical output."}
            </p>
          </>
        }
        actions={
          <>
            <Link href={`/contact?service=${service.slug}`} className="btn primary lg">
              {isRo ? "Solicită acest serviciu" : "Request This Service"}
              <Icon name="arrowRight" className="h-[18px] w-[18px]" />
            </Link>
            <Link href="/services" className="btn on-dark lg">
              <Icon name="grid" className="h-[18px] w-[18px]" />
              {isRo ? "Servicii" : "Services"}
            </Link>
          </>
        }
      />

      <main className="shell relative -mt-16 space-y-7 pb-8">
        <section className="card flex items-start gap-4">
          <span className="ico">
            <Icon name="layers" className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <h2 className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-3">
              {isRo ? "Domeniul serviciului" : "Service Scope"}
            </h2>
            <p className="mt-1.5 text-[15.5px] leading-relaxed text-ink">{service.scope}</p>
          </div>
        </section>

        <ServiceShowcase service={service} locale={locale} />

        <section>
          <div className="section-h">
            <span className="ico">
              <Icon name="calendar" className="h-5 w-5" />
            </span>
            <h2>{isRo ? "Cadru de livrare" : "Delivery Framework"}</h2>
          </div>
          {/* App-style timeline: numbered nodes on a connecting rail */}
          <ol className="grid gap-[18px] md:grid-cols-3">
            {phases.map((phase, index) => (
              <li key={phase.label} className="relative pt-[34px]">
                <span
                  aria-hidden="true"
                  className={`absolute top-[13px] left-0 h-[3px] rounded-[3px] bg-line ${
                    index === phases.length - 1 ? "right-0" : "right-0 md:-right-[18px]"
                  }`}
                />
                <span className="absolute top-0 left-0 grid h-[30px] w-[30px] place-items-center rounded-full border-[3px] border-accent bg-surface text-[13px] font-extrabold text-accent shadow-[0_0_0_6px_var(--accent-soft)]">
                  {index + 1}
                </span>
                <article className="card h-full !p-[18px]">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-3">
                    {phase.label}
                  </p>
                  <h3 className="mt-1 text-[16px] font-bold text-ink">{phase.title}</h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-ink-2">{phase.text}</p>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <div className="card flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="ico ok">
              <Icon name="checkCircle" className="h-5 w-5" />
            </span>
            <p className="text-[15.5px] font-semibold text-ink">{service.title}</p>
          </div>
          <Link href="/contact" className="btn primary">
            {isRo ? "Solicită acest serviciu" : "Request This Service"}
            <Icon name="arrowRight" className="h-4 w-4" />
          </Link>
        </div>
      </main>
    </>
  );
}
