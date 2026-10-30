import Link from "next/link";
import ContactForm from "@/components/contact-form";
import Icon from "@/components/icon";
import PageHero from "@/components/page-hero";
import { getServiceAreas } from "@/data/service-areas";
import { getServiceModules } from "@/data/services";
import { CONTACT_EMAIL, MEET_BOOKING_URL } from "@/lib/links";
import { getLocale } from "@/lib/locale";

type ContactPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const locale = await getLocale();
  const isRo = locale === "ro";
  const params = await searchParams;
  const goal = typeof params.goal === "string" ? params.goal : "";
  const timeline = typeof params.timeline === "string" ? params.timeline : "";
  const model = typeof params.model === "string" ? params.model : "";
  const hasGuidedContext = goal || timeline || model;
  // ?service=<slug> from the Request buttons on /services
  const requestedService =
    typeof params.service === "string"
      ? getServiceModules(locale).find((item) => item.slug === params.service)
      : undefined;
  const areas = getServiceAreas(locale);
  const areaTitles = areas.map((area) => area.title);
  const requestedArea = requestedService
    ? areas.find((area) => area.slugs.includes(requestedService.slug))?.title
    : undefined;

  const companyDetails = [
    { label: isRo ? "Denumire" : "Company Name", value: "VP INVESTMENTS SRL", mono: false },
    { label: isRo ? "Nume piață / Domeniu" : "Market Name / Domain", value: "VP TECHNOLOGIES (vp-tech.ro)", mono: false },
    { label: "CUI", value: "51453103", mono: true },
    { label: isRo ? "Nr. Reg. Com." : "Trade Register Number", value: "J2025018400006", mono: true },
    { label: "EUID", value: "ROONRC.J2025018400006", mono: true },
    { label: isRo ? "Data înființării" : "Incorporation Date", value: "2025-03-13", mono: true },
    { label: isRo ? "Sediu" : "Registered Office", value: "VP INVESTMENTS SRL - informații de contact verificate prin Call Center", mono: false },
    { label: isRo ? "Județ" : "County", value: "Bucuresti", mono: false },
    { label: isRo ? "Localitate" : "City", value: isRo ? "Sectorul 3" : "Sector 3", mono: false },
    { label: isRo ? "Adresă sediu" : "Registered Address", value: "Bdul. Basarabia 242 Bl. MY7 Et. 7 Ap. 32 Cod 030352", mono: false },
  ];

  return (
    <>
      <PageHero
        overlap
        eyebrow="Contact"
        title={isRo ? "Hai să discutăm despre obiectivele afacerii tale" : "Let’s Talk About Your Business Goals"}
        description={
          isRo
            ? "Spune-ne unde vrei să crești și ce provocări ai. Noi îți propunem o soluție clară, realistă și orientată pe rezultate de business."
            : "Tell us where you want to grow and what challenges you face. We will propose a clear, practical solution focused on business outcomes."
        }
        actions={
          <>
            <Link
              href={
                isRo
                  ? "/docs/VP-TECHNOLOGIES-Prezentare-Client.pdf"
                  : "/docs/VP-TECHNOLOGIES-Client-Presentation.pdf"
              }
              target="_blank"
              className="btn primary"
            >
              <Icon name="download" className="h-4 w-4" />
              {isRo ? "Prezentare profesionala (PDF — RO)" : "Download Presentation (PDF — EN)"}
            </Link>
            <Link
              href={
                isRo
                  ? "/docs/VP-TECHNOLOGIES-Client-Presentation.pdf"
                  : "/docs/VP-TECHNOLOGIES-Prezentare-Client.pdf"
              }
              target="_blank"
              className="btn on-dark"
            >
              <Icon name="file" className="h-4 w-4" />
              {isRo ? "Download Presentation (PDF — EN)" : "Prezentare profesionala (PDF — RO)"}
            </Link>
          </>
        }
      />

      <main className="shell pb-6">
        <div className="relative -mt-16 grid gap-[18px] xl:grid-cols-[1.25fr_0.75fr]">
          <div className="min-w-0 space-y-[18px]">
            {requestedService ? (
              <div className="card flex flex-wrap items-center gap-3 !py-4">
                <span className="ico ok">
                  <Icon name="checkCircle" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-3">
                    {isRo ? "Serviciu solicitat" : "Requested service"}
                  </p>
                  <p className="mt-0.5 font-semibold text-ink">{requestedService.title}</p>
                </div>
                <Link href="/services" className="btn">
                  {isRo ? "Schimbă" : "Change"}
                </Link>
              </div>
            ) : null}

            {hasGuidedContext ? (
              <div className="card flex flex-wrap items-center gap-3 !py-4">
                <span className="ico ok">
                  <Icon name="checkCircle" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-3">
                    {isRo ? "Context din fluxul Get Started" : "Context From Get Started Flow"}
                  </p>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <span className="chip acc">{isRo ? "Obiectiv" : "Goal"}: {goal || "-"}</span>
                    <span className="chip acc">{isRo ? "Termen" : "Timeline"}: {timeline || "-"}</span>
                    <span className="chip acc">{isRo ? "Model" : "Engagement"}: {model || "-"}</span>
                  </div>
                </div>
              </div>
            ) : null}

            <ContactForm
              locale={locale}
              areas={areaTitles}
              requested={
                requestedService
                  ? { title: requestedService.title, area: requestedArea ?? "" }
                  : undefined
              }
              bookingUrl={MEET_BOOKING_URL}
            />
          </div>

          <aside className="min-w-0 space-y-[18px]">
            {MEET_BOOKING_URL || CONTACT_EMAIL ? (
              <div className="card">
                <div className="section-h !mb-2">
                  <span className="ico">
                    <Icon name="calendar" className="h-[18px] w-[18px]" />
                  </span>
                  <h2 className="!text-base">{isRo ? "Vorbește direct cu noi" : "Talk to us directly"}</h2>
                </div>
                {MEET_BOOKING_URL ? (
                  <>
                    <p className="text-sm leading-relaxed text-ink-2">
                      {isRo
                        ? "Alege o oră liberă și primești automat un link Google Meet."
                        : "Pick a free slot and you’ll get a Google Meet link automatically."}
                    </p>
                    <a
                      href={MEET_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn primary mt-3 w-full"
                    >
                      <Icon name="calendar" className="h-4 w-4" />
                      {isRo ? "Programează pe Google Meet" : "Book a Google Meet"}
                    </a>
                  </>
                ) : null}
                {CONTACT_EMAIL ? (
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="mt-3 flex items-center gap-2 border-t border-line pt-3 text-sm font-semibold text-accent-ink hover:text-accent"
                  >
                    <Icon name="mail" className="h-4 w-4" />
                    {CONTACT_EMAIL}
                  </a>
                ) : null}
              </div>
            ) : null}

            <div className="card">
              <div className="flex items-center gap-3">
                <span className="ico">
                  <Icon name="clock" />
                </span>
                <div>
                  <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-3">
                    {isRo ? "Timp de răspuns" : "Typical response"}
                  </p>
                  <p className="font-semibold text-ink">
                    {isRo ? "Răspuns inițial în 1 zi lucrătoare" : "Initial reply within 1 business day"}
                  </p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-2">
                {isRo
                  ? "Pentru situații urgente, menționează impactul asupra afacerii și contextul tehnic, iar solicitarea va fi prioritară."
                  : "For urgent situations, include business impact and technical context so we can prioritize your request."}
              </p>
            </div>

            <div className="card">
              <div className="section-h !mb-2">
                <span className="ico">
                  <Icon name="info" className="h-[18px] w-[18px]" />
                </span>
                <h2 className="!text-base">{isRo ? "Întrebări frecvente" : "Frequently asked"}</h2>
              </div>
              <details className="group border-t border-line">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {isRo
                    ? "Oferiți livrare atât remote, cât și on-site?"
                    : "Do you support both remote and on-site delivery?"}
                  <Icon name="chevronRight" className="h-4 w-4 text-ink-3 transition group-open:rotate-90" />
                </summary>
                <p className="pb-3 text-sm leading-relaxed text-ink-2">
                  {isRo
                    ? "Da. Putem lucra la distanță, la sediu sau într-un model hibrid, în funcție de proiect."
                    : "Yes. We can work remotely, on-site, or in a hybrid model, depending on project needs."}
                </p>
              </details>
              <details className="group border-t border-line">
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 py-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {isRo
                    ? "Puteți colabora cu echipele IT interne?"
                    : "Can you work with existing internal IT teams?"}
                  <Icon name="chevronRight" className="h-4 w-4 text-ink-3 transition group-open:rotate-90" />
                </summary>
                <p className="pb-3 text-sm leading-relaxed text-ink-2">
                  {isRo
                    ? "Absolut. Colaborăm frecvent cu echipe interne pentru arhitectură, implementare și optimizare operațională."
                    : "Absolutely. We frequently collaborate with in-house teams for architecture guidance, implementation support, and operational optimization."}
                </p>
              </details>
            </div>
          </aside>
        </div>

        <section className="mt-7">
          <div className="section-h">
            <span className="ico">
              <Icon name="briefcase" className="h-[18px] w-[18px]" />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-bold uppercase tracking-[0.1em] text-ink-3">
                {isRo ? "Detalii de identificare" : "Company Identification Details"}
              </p>
              <h2>VP INVESTMENTS SRL</h2>
            </div>
          </div>
          <div className="card !p-0">
            <dl className="grid md:grid-cols-2">
              {companyDetails.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 border-t border-line px-5 py-3.5 first:border-t-0 md:[&:nth-child(2)]:border-t-0 md:odd:border-r"
                >
                  <dt className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-ink-3">{item.label}</dt>
                  <dd className={`m-0 font-semibold text-ink break-words ${item.mono ? "font-mono text-[14px]" : ""}`}>
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </main>
    </>
  );
}
