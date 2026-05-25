import Link from "next/link";
import { notFound } from "next/navigation";
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

  return (
    <div className="command-bg min-h-screen text-slate-100">
      <main className="w-full px-6 py-8 md:px-10 md:py-10 xl:px-14">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Home" : "Back to Home"}
        </Link>

        <section className="rounded-2xl border border-cyan-500/35 bg-slate-950/90 p-6 shadow-xl shadow-cyan-900/20 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
            {service.unit}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-cyan-50 md:text-4xl">
            {service.title}
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-200">
            {service.description}
          </p>
          <p className="mt-3 text-base leading-8 text-slate-200">
            {isRo
              ? "Lucrăm ca partener orientat pe execuție: strategie, implementare și suport administrat pentru rezultate concrete de business."
              : "We work as an execution-focused partner, combining strategy, implementation, and managed support to ensure this service produces tangible business results, not just technical output."}
          </p>

          <div className="mt-6 rounded-xl border border-cyan-900/45 bg-cyan-950/20 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              {isRo ? "Domeniul serviciului" : "Service Scope"}
            </h2>
            <p className="mt-2 text-base leading-7 text-slate-200">{service.scope}</p>
          </div>

          <ServiceShowcase service={service} locale={locale} />

          <div className="mt-5 rounded-xl border border-slate-700/70 bg-slate-900/80 p-5">
            <h2 className="text-sm font-semibold uppercase tracking-[0.16em] text-cyan-300">
              {isRo ? "Cadru de livrare" : "Delivery Framework"}
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              <article className="rounded-lg border border-slate-700/70 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Faza 01" : "Phase 01"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {isRo ? "Evaluare" : "Assessment"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {isRo
                    ? "Evaluăm mediul actual, identificăm riscurile și definim o arhitectură țintă aplicabilă."
                    : "We evaluate the current environment, identify risks, and define a practical target architecture."}
                </p>
              </article>
              <article className="rounded-lg border border-slate-700/70 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Faza 02" : "Phase 02"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {isRo ? "Implementare" : "Implementation"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {isRo
                    ? "Implementăm, configurăm și validăm soluția prin execuție controlată și checkpoint-uri de calitate."
                    : "We deploy, configure, and validate the solution using controlled execution and quality checkpoints."}
                </p>
              </article>
              <article className="rounded-lg border border-slate-700/70 bg-slate-950/60 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Faza 03" : "Phase 03"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {isRo ? "Optimizare" : "Optimization"}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  {isRo
                    ? "Monitorizăm rezultatele, îmbunătățim performanța și susținem echipa prin ghidaj operațional continuu."
                    : "We monitor results, improve performance, and support the team with ongoing operational guidance."}
                </p>
              </article>
            </div>
          </div>

          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-block rounded-md border border-cyan-300/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
            >
              {isRo ? "Solicită acest serviciu" : "Request This Service"}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

