import Link from "next/link";
import Icon from "@/components/icon";
import PageHero from "@/components/page-hero";
import { getServiceModules } from "@/data/services";
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

              <form className="card grid gap-x-4 gap-y-3.5 md:grid-cols-2">
                <label className="field">
                  <span>{isRo ? "Nume complet" : "Full Name"}</span>
                  <input
                    type="text"
                    className="input"
                    placeholder={isRo ? "Numele complet" : "Your full name"}
                  />
                </label>
                <label className="field">
                  <span>{isRo ? "Email companie" : "Business Email"}</span>
                  <input
                    type="email"
                    className="input"
                    placeholder={isRo ? "nume@companie.com" : "name@company.com"}
                  />
                </label>
                <label className="field">
                  <span>{isRo ? "Număr de telefon" : "Phone Number"}</span>
                  <input
                    type="tel"
                    className="input"
                    placeholder="+40..."
                  />
                </label>
                <label className="field">
                  <span>{isRo ? "Categoria serviciului" : "Service Category"}</span>
                  <select className="input">
                    <option>{isRo ? "Administrare servere" : "Server Administration"}</option>
                    <option>{isRo ? "Rețele și securitate" : "Network & Security"}</option>
                    <option>{isRo ? "Cloud și Microsoft 365" : "Cloud & Microsoft 365"}</option>
                    <option>{isRo ? "Web și E-Commerce" : "Web & E-Commerce"}</option>
                    <option>{isRo ? "Software custom și AI" : "Custom Software & AI"}</option>
                    <option>{isRo ? "Suport tehnic" : "Technical Support"}</option>
                  </select>
                </label>
                <label className="field">
                  <span>{isRo ? "Termen proiect" : "Project Timeline"}</span>
                  <select className="input">
                    <option>{isRo ? "Imediat" : "Immediately"}</option>
                    <option>{isRo ? "În 2-4 săptămâni" : "Within 2-4 weeks"}</option>
                    <option>{isRo ? "În 1-3 luni" : "Within 1-3 months"}</option>
                    <option>{isRo ? "Stadiu de planificare" : "Planning stage"}</option>
                  </select>
                </label>
                <label className="field">
                  <span>{isRo ? "Metodă preferată de contact" : "Preferred Contact Method"}</span>
                  <select className="input">
                    <option>{isRo ? "Email" : "Email"}</option>
                    <option>{isRo ? "Apel telefonic" : "Phone Call"}</option>
                    <option>{isRo ? "Întâlnire video" : "Video Meeting"}</option>
                  </select>
                </label>
                <label className="field md:col-span-2">
                  <span>{isRo ? "Detalii proiect" : "Project Details"}</span>
                  <textarea
                    rows={5}
                    className="input"
                    placeholder={
                      isRo
                      ? "Descrie obiectivele, infrastructura actuală și termenul dorit."
                        : "Tell us about your goals, current setup, and timeline."
                    }
                  />
                </label>
                <div className="mt-1 border-t border-line pt-4 md:col-span-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <p className="text-[13px] text-ink-3">
                    {isRo
                      ? "Prin trimitere, ești de acord cu politicile legale din footer."
                      : "By submitting, you agree to our legal policies in the footer."}
                  </p>
                  <button
                    type="button"
                    className="btn primary lg"
                  >
                    <Icon name="mail" className="h-[18px] w-[18px]" />
                    {isRo ? "Trimite solicitarea" : "Send Request"}
                  </button>
                </div>
              </form>
          </div>

          <aside className="min-w-0 space-y-[18px]">
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
              <details className="group border-t border-line py-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {isRo
                    ? "Oferiți livrare atât remote, cât și on-site?"
                    : "Do you support both remote and on-site delivery?"}
                  <Icon name="chevronRight" className="h-4 w-4 text-ink-3 transition group-open:rotate-90" />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
                  {isRo
                    ? "Da. Putem lucra la distanță, la sediu sau într-un model hibrid, în funcție de proiect."
                    : "Yes. We can work remotely, on-site, or in a hybrid model, depending on project needs."}
                </p>
              </details>
              <details className="group border-t border-line pt-3">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {isRo
                    ? "Puteți colabora cu echipele IT interne?"
                    : "Can you work with existing internal IT teams?"}
                  <Icon name="chevronRight" className="h-4 w-4 text-ink-3 transition group-open:rotate-90" />
                </summary>
                <p className="mt-2 text-sm leading-relaxed text-ink-2">
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
