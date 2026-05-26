import Link from "next/link";
import { getLocale } from "@/lib/locale";
import ClientLoginTerminal from "@/components/client-login-terminal";

const clients = [
  {
    name: "RSG Global",
    slug: "rsg-global",
    sector: { en: "Financial Services", ro: "Servicii Financiare" },
    description: {
      en: "A globally operating financial services firm requiring high-availability infrastructure, secure data environments, and continuous technical support across time zones.",
      ro: "Firma de servicii financiare cu activitate globala, care necesita infrastructura cu disponibilitate ridicata, medii de date securizate si suport tehnic continuu.",
    },
    scope: {
      en: "Infrastructure operations, cybersecurity hardening, 24/7 support coverage.",
      ro: "Operatiuni infrastructura, hardening securitate, acoperire suport 24/7.",
    },
    accent: "cyan",
  },
  {
    name: "TheCryptoHub LLC",
    slug: "thecryptohub",
    sector: { en: "Digital Assets & Fintech", ro: "Active Digitale & Fintech" },
    description: {
      en: "A digital asset platform demanding robust network architecture, strict access governance, and resilient cloud hosting to sustain trading operations and protect user assets.",
      ro: "Platforma de active digitale care necesita arhitectura de retea robusta, guvernanta stricta a accesului si hosting cloud rezistent pentru operatiuni de tranzactionare.",
    },
    scope: {
      en: "Cloud infrastructure, network security, access management, uptime monitoring.",
      ro: "Infrastructura cloud, securitate retea, management acces, monitorizare disponibilitate.",
    },
    accent: "emerald",
  },
  {
    name: "Open Fintech Solutions",
    slug: "open-fintech",
    sector: { en: "Financial Technology", ro: "Tehnologie Financiara" },
    description: {
      en: "A fintech innovator building payment and compliance platforms, requiring scalable software delivery, API integration, and a secure, compliant technology foundation.",
      ro: "Inovator fintech care construieste platforme de plata si conformitate, necesitand livrare software scalabila, integrare API si o fundatie tehnologica sigura si conforma.",
    },
    scope: {
      en: "Custom software development, API integration, security compliance, cloud delivery.",
      ro: "Dezvoltare software personalizat, integrare API, conformitate securitate, livrare cloud.",
    },
    accent: "indigo",
  },
  {
    name: "Sorin Neagu PFA",
    slug: "sorin-neagu-pfa",
    sector: { en: "Independent Professional", ro: "Persoana Fizica Autorizata" },
    description: {
      en: "An independent professional requiring reliable IT setup, cloud productivity tools, secure document workflows, and responsive technical support to operate with confidence.",
      ro: "Profesionist independent care necesita configurare IT fiabila, instrumente cloud de productivitate, fluxuri de documente securizate si suport tehnic responsiv.",
    },
    scope: {
      en: "Endpoint setup, Microsoft 365, cloud backup, ongoing technical support.",
      ro: "Configurare endpoint, Microsoft 365, backup cloud, suport tehnic continuu.",
    },
    accent: "violet",
  },
];

const accentMap: Record<string, { border: string; bg: string; tag: string; hover: string; pill: string }> = {
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-cyan-950/15",
    tag: "text-cyan-300/90",
    hover: "hover:border-cyan-300/60",
    pill: "bg-cyan-500/15 border-cyan-300/40 text-cyan-100",
  },
  emerald: {
    border: "border-emerald-500/30",
    bg: "bg-emerald-950/15",
    tag: "text-emerald-300/90",
    hover: "hover:border-emerald-300/60",
    pill: "bg-emerald-500/15 border-emerald-300/40 text-emerald-100",
  },
  indigo: {
    border: "border-indigo-500/30",
    bg: "bg-indigo-950/15",
    tag: "text-indigo-300/90",
    hover: "hover:border-indigo-300/60",
    pill: "bg-indigo-500/15 border-indigo-300/40 text-indigo-100",
  },
  violet: {
    border: "border-violet-500/30",
    bg: "bg-violet-950/15",
    tag: "text-violet-300/90",
    hover: "hover:border-violet-300/60",
    pill: "bg-violet-500/15 border-violet-300/40 text-violet-100",
  },
};

export default async function ClientsPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";

  return (
    <div className="command-bg min-h-screen px-6 py-8 text-slate-100 md:px-10 md:py-10 xl:px-14">
      <main className="w-full">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Home" : "Back to Home"}
        </Link>

        {/* Hero */}
        <section className="rounded-2xl border border-cyan-500/30 bg-slate-950/85 p-6 shadow-xl shadow-cyan-900/20 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
            {isRo ? "Portofoliu clienti" : "Client Portfolio"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-cyan-50 md:text-4xl">
            {isRo
              ? "Companii care au ales VP TECHNOLOGIES"
              : "Companies That Trust VP TECHNOLOGIES"}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
            {isRo
              ? "Lucram cu organizatii din sectoare diferite — de la fintech global la profesionisti independenti. Fiecare angajament este adaptat obiectivelor specifice de business si livrat cu responsabilitate completa."
              : "We work with organisations across different sectors — from global fintech to independent professionals. Every engagement is tailored to specific business goals and delivered with full accountability."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-md border border-cyan-300/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
            >
              {isRo ? "Contacteaza-ne" : "Get in Touch"}
            </Link>
            <Link
              href="/get-started"
              className="rounded-md border border-slate-600/70 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/35"
            >
              {isRo ? "Începe acum" : "Get Started"}
            </Link>
          </div>
        </section>

        {/* Stats bar */}
        <section className="mt-5 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "4", label: isRo ? "Clienti activi" : "Active clients" },
            { value: "3", label: isRo ? "Tari de operare" : "Countries of operation" },
            { value: "15+", label: isRo ? "Servicii livrate" : "Services delivered" },
            { value: "24/7", label: isRo ? "Disponibilitate suport" : "Support availability" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-700/70 bg-slate-950/75 p-4 text-center"
            >
              <p className="text-3xl font-black text-cyan-300">{stat.value}</p>
              <p className="mt-1 text-xs text-slate-400">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Client cards */}
        <section className="mt-5 grid gap-5 md:grid-cols-2">
          {clients.map((client) => {
            const a = accentMap[client.accent];
            return (
              <article
                key={client.slug}
                className={`flex flex-col rounded-xl border p-6 transition md:p-7 ${a.border} ${a.bg} ${a.hover}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className={`text-xs uppercase tracking-[0.16em] ${a.tag}`}>
                      {isRo ? client.sector.ro : client.sector.en}
                    </p>
                    <h2 className="mt-1 text-2xl font-bold text-slate-50">
                      {client.name}
                    </h2>
                  </div>
                  <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${a.pill}`}>
                    {isRo ? "Client activ" : "Active client"}
                  </span>
                </div>

                <p className="mt-4 text-base leading-8 text-slate-200">
                  {isRo ? client.description.ro : client.description.en}
                </p>

                <div className="mt-4 rounded-lg border border-slate-700/60 bg-slate-900/60 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-400">
                    {isRo ? "Scop angajament" : "Engagement scope"}
                  </p>
                  <p className="mt-1 text-sm leading-7 text-slate-200">
                    {isRo ? client.scope.ro : client.scope.en}
                  </p>
                </div>
              </article>
            );
          })}
        </section>

        {/* Client login */}
        <section className="mt-5 grid gap-6 xl:grid-cols-[1fr_1.1fr] xl:items-start">
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
                {isRo ? "Portal client" : "Client Portal"}
              </p>
              <h2 className="mt-2 text-2xl font-bold text-cyan-50 md:text-3xl">
                {isRo ? "Acces securizat cont client" : "Secure Client Account Access"}
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-300">
                {isRo
                  ? "Clientii activi pot accesa rapoarte de livrare, statusul proiectelor si documentatia tehnica printr-un portal securizat, dedicat contului lor."
                  : "Active clients can access delivery reports, project status, and technical documentation through a secure portal dedicated to their account."}
              </p>
            </div>
            <ul className="space-y-2 text-sm text-slate-400">
              {(isRo
                ? [
                    "Rapoarte de livrare si statusul proiectelor",
                    "Documentatie tehnica si runbook-uri",
                    "Bilete de suport si istoric incidente",
                    "Metrici SLA si tablouri de bord",
                  ]
                : [
                    "Delivery reports and project status",
                    "Technical documentation and runbooks",
                    "Support tickets and incident history",
                    "SLA metrics and dashboards",
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1 text-cyan-500" aria-hidden="true">›</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-xs text-slate-600">
              {isRo
                ? "Nu ai inca credentiale? Contacteaza managerul tau de cont."
                : "No credentials yet? Contact your account manager."}
            </p>
          </div>
          <ClientLoginTerminal locale={locale} />
        </section>

        {/* CTA */}
        <section className="mt-5 rounded-2xl border border-emerald-500/25 bg-emerald-950/12 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-300/90">
            {isRo ? "Urmatorul pas" : "Next Step"}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-cyan-50 md:text-3xl">
            {isRo
              ? "Adauga-ti compania pe aceasta lista"
              : "Add your company to this list"}
          </h2>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-200">
            {isRo
              ? "Programeaza o sesiune de descoperire de 60 de minute. Analizam obiectivele tale, identificam prioritatile si livram un plan concret — fara angajament necesar."
              : "Book a 60-minute discovery session. We map your goals, identify priorities, and deliver a concrete plan — no commitment required."}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-md border border-emerald-300/40 bg-emerald-500/15 px-4 py-2 text-sm font-semibold text-emerald-100 transition hover:bg-emerald-400/25"
            >
              {isRo ? "Programeaza o discutie" : "Book a Discovery Call"}
            </Link>
            <Link
              href={
                isRo
                  ? "/docs/VP-TECHNOLOGIES-Prezentare-Client.pdf"
                  : "/docs/VP-TECHNOLOGIES-Client-Presentation.pdf"
              }
              target="_blank"
              className="rounded-md border border-slate-600/70 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-500/35"
            >
              {isRo ? "Descarcă prezentarea PDF" : "Download PDF Deck"}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
