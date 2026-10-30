import Link from "next/link";
import Icon, { type IconName } from "@/components/icon";
import PageHero, { HeroArt } from "@/components/page-hero";
import ServiceCatalogue, { type CatalogueArea } from "@/components/service-catalogue";
import { getServiceAreas } from "@/data/service-areas";
import { getServiceModules } from "@/data/services";
import { getLocale } from "@/lib/locale";
import { CLIENT_PORTAL_URL, MEET_BOOKING_URL } from "@/lib/links";

type Need = { icon: IconName; title: string; hint: string; slug: string };

export default async function ServicesPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";
  const services = getServiceModules(locale);
  const bySlug = new Map(services.map((service) => [service.slug, service]));

  const areas: CatalogueArea[] = getServiceAreas(locale).map((area) => ({
    id: area.id,
    icon: area.icon,
    title: area.title,
    summary: area.summary,
    services: area.slugs.flatMap((slug) => {
      const service = bySlug.get(slug);
      return service
        ? [
            {
              slug,
              title: service.title,
              description: service.description,
              scope: service.scope,
              deliverables: service.deliverables,
            },
          ]
        : [];
    }),
  }));

  // Plain-language starting points, each leading to the service that fits best.
  const needs: Need[] = isRo
    ? [
        { icon: "alert", title: "Ceva nu funcționează", hint: "Calculatoare lente, imprimante, conturi blocate, probleme urgente.", slug: "on-site-remote-it-support" },
        { icon: "network", title: "Rețeaua sau Wi-Fi-ul nu e stabil", hint: "Conexiuni care cad, acoperire slabă, birou sau locație nouă.", slug: "network-design-implementation" },
        { icon: "mail", title: "Email, fișiere și Microsoft 365", hint: "Conturi, licențe, migrare email, partajare fișiere.", slug: "microsoft-365-administration" },
        { icon: "shieldCheck", title: "Vreau firma protejată", hint: "Firewall, VPN pentru angajați, protecție la atacuri.", slug: "network-security-solutions" },
        { icon: "globe", title: "Am nevoie de website sau magazin online", hint: "Site de prezentare, magazin, plăți și livrare.", slug: "online-stores" },
        { icon: "sparkles", title: "Vreau să automatizez munca", hint: "CRM, ERP, aplicații interne și instrumente AI.", slug: "custom-crm-erp-development" },
      ]
    : [
        { icon: "alert", title: "Something isn’t working", hint: "Slow computers, printers, locked accounts, urgent issues.", slug: "on-site-remote-it-support" },
        { icon: "network", title: "Our network or Wi-Fi is unreliable", hint: "Dropping connections, weak coverage, a new office or site.", slug: "network-design-implementation" },
        { icon: "mail", title: "Email, files and Microsoft 365", hint: "Accounts, licences, email migration, file sharing.", slug: "microsoft-365-administration" },
        { icon: "shieldCheck", title: "We want the business protected", hint: "Firewall, staff VPN, protection against attacks.", slug: "network-security-solutions" },
        { icon: "globe", title: "We need a website or online store", hint: "Company site, web shop, payments and delivery.", slug: "online-stores" },
        { icon: "sparkles", title: "We want to automate work", hint: "CRM, ERP, internal apps and AI tools.", slug: "custom-crm-erp-development" },
      ];

  const steps = isRo
    ? [
        { icon: "mail" as IconName, title: "Ne spui de ce ai nevoie", body: "Completezi formularul sau ne suni. Primești un răspuns inițial în 1 zi lucrătoare." },
        { icon: "calendar" as IconName, title: "Analizăm și îți propunem", body: "O discuție de descoperire, fără obligații, apoi o ofertă clară cu pași și termene." },
        { icon: "wrench" as IconName, title: "Livrăm și rămânem alături", body: "Implementăm remote sau la fața locului și te susținem după lansare." },
      ]
    : [
        { icon: "mail" as IconName, title: "Tell us what you need", body: "Fill in the form or call us. You get an initial reply within 1 business day." },
        { icon: "calendar" as IconName, title: "We assess and propose", body: "A no-commitment discovery call, then a clear offer with steps and timelines." },
        { icon: "wrench" as IconName, title: "We deliver and stay with you", body: "We implement remotely or onsite and keep supporting you after go-live." },
      ];

  const faqs = isRo
    ? [
        { q: "Trebuie să știu exact ce serviciu îmi trebuie?", a: "Nu. Descrie problema sau obiectivul, iar noi îți recomandăm serviciul potrivit." },
        { q: "Pot combina mai multe servicii?", a: "Da. Primești un singur partener pentru infrastructură, securitate și software, cu o singură ofertă." },
        { q: "Lucrați remote sau la sediu?", a: "Ambele. Putem lucra la distanță, la sediu sau într-un model hibrid, în funcție de proiect." },
        { q: "Puteți colabora cu echipa noastră IT?", a: "Da. Colaborăm frecvent cu echipe interne pentru arhitectură, implementare și optimizare." },
      ]
    : [
        { q: "Do I need to know exactly which service I need?", a: "No. Describe the problem or goal and we’ll recommend the right service." },
        { q: "Can I combine several services?", a: "Yes. You get one partner for infrastructure, security and software, in a single offer." },
        { q: "Do you work remotely or onsite?", a: "Both. We can work remotely, onsite, or in a hybrid model, depending on the project." },
        { q: "Can you work with our IT team?", a: "Yes. We often work alongside in-house teams on architecture, implementation and optimisation." },
      ];

  return (
    <>
      <PageHero
        overlap
        eyebrow={isRo ? "Servicii" : "Services"}
        title={isRo ? "Cu ce te putem ajuta?" : "What do you need help with?"}
        description={
          isRo
            ? "Alege situația cea mai apropiată de a ta sau caută în catalog. Nu ești sigur? Descrie-ne problema și îți recomandăm noi serviciul potrivit."
            : "Pick the situation closest to yours or browse the catalogue. Not sure? Describe the problem and we’ll recommend the right service."
        }
        actions={
          <>
            <Link href="/contact" className="btn primary lg">
              {isRo ? "Cere o recomandare" : "Get a recommendation"}
              <Icon name="arrowRight" className="h-[18px] w-[18px]" />
            </Link>
            <a href="#catalogue" className="btn on-dark lg">
              <Icon name="grid" className="h-[18px] w-[18px]" />
              {isRo ? "Vezi catalogul" : "Browse the catalogue"}
            </a>
          </>
        }
      />

      <main className="shell flex flex-col gap-12 pb-6">
        {/* Start from your situation */}
        <section className="relative -mt-16">
          <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-3">
            {needs.map((need) => (
              <Link
                key={need.title}
                href={`/services/${need.slug}`}
                className="card group flex items-start gap-3.5 !p-4 transition hover:border-accent"
              >
                <span className="ico">
                  <Icon name={need.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-bold text-ink">{need.title}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-ink-2">{need.hint}</span>
                  <span className="mt-2 inline-flex items-center gap-1 text-[13px] font-semibold text-accent-ink">
                    {bySlug.get(need.slug)?.title}
                    <Icon name="arrowRight" className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>

        <ServiceCatalogue areas={areas} locale={locale} />

        {/* How working with us works */}
        <section>
          <div className="mb-4">
            <p className="eyebrow !text-accent">{isRo ? "Cum lucrăm" : "How it works"}</p>
            <h2 className="mt-1.5 text-[22px] font-extrabold text-ink md:text-[26px]">
              {isRo ? "De la prima discuție la rezultat, în 3 pași" : "From first message to results, in 3 steps"}
            </h2>
          </div>
          <ol className="grid gap-[18px] md:grid-cols-3">
            {steps.map((step, index) => (
              <li key={step.title} className="card">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-accent text-sm font-extrabold text-on-accent">
                    {index + 1}
                  </span>
                  <Icon name={step.icon} className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-3 text-base font-bold text-ink">{step.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-2">{step.body}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* FAQ + closing call to action */}
        <section className="grid gap-[18px] lg:grid-cols-[1fr_1fr]">
          <div className="card">
            <div className="section-h !mb-1">
              <span className="ico">
                <Icon name="info" className="h-[18px] w-[18px]" />
              </span>
              <h2>{isRo ? "Întrebări frecvente" : "Frequently asked"}</h2>
            </div>
            {faqs.map((faq) => (
              <details key={faq.q} className="group border-t border-line py-3 first-of-type:border-t-0">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {faq.q}
                  <Icon name="chevronRight" className="h-4 w-4 text-ink-3 transition group-open:rotate-90" />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">{faq.a}</p>
              </details>
            ))}
          </div>

          <div className="hero-band flex flex-col rounded-[18px] p-6 shadow-card md:p-8">
            <HeroArt />
            <div className="relative flex flex-1 flex-col">
              <p className="eyebrow">{isRo ? "Nu ești sigur?" : "Not sure?"}</p>
              <h2 className="mt-2 text-2xl font-extrabold text-white">
                {isRo ? "Spune-ne problema, noi alegem serviciul" : "Tell us the problem, we’ll pick the service"}
              </h2>
              <p className="mt-3 text-slate-300">
                {isRo
                  ? "O discuție scurtă, fără obligații, ca să înțelegem situația și să-ți propunem pașii potriviți."
                  : "A short, no-commitment conversation to understand your situation and propose the right next steps."}
              </p>
              <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
                <a
                  href={MEET_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn primary lg"
                >
                  <Icon name="calendar" className="h-[18px] w-[18px]" />
                  {isRo ? "Programează pe Google Meet" : "Book a Google Meet"}
                </a>
                <Link href={CLIENT_PORTAL_URL} className="btn on-dark lg">
                  <Icon name="user" className="h-[18px] w-[18px]" />
                  {isRo ? "Sunt deja client" : "I’m already a client"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
