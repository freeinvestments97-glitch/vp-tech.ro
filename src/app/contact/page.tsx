import Link from "next/link";
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

  return (
    <div className="command-bg min-h-screen px-6 py-8 text-slate-100 md:px-10 md:py-10 xl:px-14">
      <main className="w-full">
        <Link
          href="/"
          className="mb-6 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Home" : "Back to Home"}
        </Link>

        <section className="rounded-2xl border border-cyan-500/35 bg-slate-950/90 p-6 shadow-xl shadow-cyan-900/20 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
            {isRo ? "Contact" : "Contact"}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-cyan-50 md:text-4xl">
            {isRo ? "Hai să discutăm despre obiectivele afacerii tale" : "Let’s Talk About Your Business Goals"}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
            {isRo
              ? "Spune-ne unde vrei să crești și ce provocări ai. Noi îți propunem o soluție clară, realistă și orientată pe rezultate de business."
              : "Tell us where you want to grow and what challenges you face. We will propose a clear, practical solution focused on business outcomes."}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link
              href={
                isRo
                  ? "/docs/VP-TECHNOLOGIES-Prezentare-Client.pdf"
                  : "/docs/VP-TECHNOLOGIES-Client-Presentation.pdf"
              }
              target="_blank"
              className="inline-block rounded-md border border-cyan-300/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
            >
              {isRo ? "Prezentare profesionala (PDF — RO)" : "Download Presentation (PDF — EN)"}
            </Link>
            <Link
              href={
                isRo
                  ? "/docs/VP-TECHNOLOGIES-Client-Presentation.pdf"
                  : "/docs/VP-TECHNOLOGIES-Prezentare-Client.pdf"
              }
              target="_blank"
              className="inline-block rounded-md border border-slate-500/40 bg-slate-900/60 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:border-cyan-400/40"
            >
              {isRo ? "Download Presentation (PDF — EN)" : "Prezentare profesionala (PDF — RO)"}
            </Link>
          </div>

          {hasGuidedContext ? (
            <div className="mt-5 rounded-xl border border-emerald-400/45 bg-emerald-950/20 p-4">
              <p className="text-xs uppercase tracking-[0.16em] text-emerald-300/90">
                {isRo ? "Context din fluxul Get Started" : "Context From Get Started Flow"}
              </p>
              <div className="mt-2 grid gap-2 text-sm text-slate-100 md:grid-cols-3">
                <p>{isRo ? "Obiectiv" : "Goal"}: {goal || "-"}</p>
                <p>{isRo ? "Termen" : "Timeline"}: {timeline || "-"}</p>
                <p>{isRo ? "Model" : "Engagement"}: {model || "-"}</p>
              </div>
            </div>
          ) : null}

          <div className="mt-7 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <form className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                {isRo ? "Nume complet" : "Full Name"}
                <input
                  type="text"
                  className="rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/70"
                  placeholder={isRo ? "Numele complet" : "Your full name"}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                {isRo ? "Email companie" : "Business Email"}
                <input
                  type="email"
                  className="rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/70"
                  placeholder={isRo ? "nume@companie.com" : "name@company.com"}
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                {isRo ? "Număr de telefon" : "Phone Number"}
                <input
                  type="tel"
                  className="rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/70"
                  placeholder="+40..."
                />
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                {isRo ? "Categoria serviciului" : "Service Category"}
                <select className="rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/70">
                  <option>{isRo ? "Administrare servere" : "Server Administration"}</option>
                  <option>{isRo ? "Rețele și securitate" : "Network & Security"}</option>
                  <option>{isRo ? "Cloud și Microsoft 365" : "Cloud & Microsoft 365"}</option>
                  <option>{isRo ? "Web și E-Commerce" : "Web & E-Commerce"}</option>
                  <option>{isRo ? "Software custom și AI" : "Custom Software & AI"}</option>
                  <option>{isRo ? "Suport tehnic" : "Technical Support"}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                {isRo ? "Termen proiect" : "Project Timeline"}
                <select className="rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/70">
                  <option>{isRo ? "Imediat" : "Immediately"}</option>
                  <option>{isRo ? "În 2-4 săptămâni" : "Within 2-4 weeks"}</option>
                  <option>{isRo ? "În 1-3 luni" : "Within 1-3 months"}</option>
                  <option>{isRo ? "Stadiu de planificare" : "Planning stage"}</option>
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm text-slate-200">
                {isRo ? "Metodă preferată de contact" : "Preferred Contact Method"}
                <select className="rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/70">
                  <option>{isRo ? "Email" : "Email"}</option>
                  <option>{isRo ? "Apel telefonic" : "Phone Call"}</option>
                  <option>{isRo ? "Întâlnire video" : "Video Meeting"}</option>
                </select>
              </label>
              <label className="md:col-span-2 flex flex-col gap-2 text-sm text-slate-200">
                {isRo ? "Detalii proiect" : "Project Details"}
                <textarea
                  rows={5}
                  className="rounded-md border border-slate-600/80 bg-slate-900/90 px-3 py-2.5 text-slate-100 outline-none transition focus:border-cyan-400/70"
                  placeholder={
                    isRo
                    ? "Descrie obiectivele, infrastructura actuală și termenul dorit."
                      : "Tell us about your goals, current setup, and timeline."
                  }
                />
              </label>
              <div className="md:col-span-2 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-slate-400">
                  {isRo
                    ? "Prin trimitere, ești de acord cu politicile legale din footer."
                    : "By submitting, you agree to our legal policies in the footer."}
                </p>
                <button
                  type="button"
                  className="rounded-md border border-cyan-300/40 bg-cyan-500/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-400/25"
                >
                  {isRo ? "Trimite solicitarea" : "Send Request"}
                </button>
              </div>
            </form>

            <aside className="space-y-4">
              <div className="rounded-xl border border-cyan-700/40 bg-cyan-950/25 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Timp de răspuns" : "Typical response"}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-100">
                  {isRo ? "Răspuns inițial în 1 zi lucrătoare" : "Initial reply within 1 business day"}
                </p>
                <p className="mt-2 text-sm leading-7 text-slate-200">
                  {isRo
                    ? "Pentru situații urgente, menționează impactul asupra afacerii și contextul tehnic, iar solicitarea va fi prioritară."
                    : "For urgent situations, include business impact and technical context so we can prioritize your request."}
                </p>
              </div>
              <div className="rounded-xl border border-slate-700/70 bg-slate-900/85 p-4">
                <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                  {isRo ? "Întrebări frecvente" : "Frequently asked"}
                </p>
                <details className="mt-3 rounded-md border border-slate-700/70 bg-slate-950/60 p-3">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                    {isRo
                      ? "Oferiți livrare atât remote, cât și on-site?"
                      : "Do you support both remote and on-site delivery?"}
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {isRo
                      ? "Da. Putem lucra la distanță, la sediu sau într-un model hibrid, în funcție de proiect."
                      : "Yes. We can work remotely, on-site, or in a hybrid model, depending on project needs."}
                  </p>
                </details>
                <details className="mt-2 rounded-md border border-slate-700/70 bg-slate-950/60 p-3">
                  <summary className="cursor-pointer text-sm font-semibold text-slate-100">
                    {isRo
                      ? "Puteți colabora cu echipele IT interne?"
                      : "Can you work with existing internal IT teams?"}
                  </summary>
                  <p className="mt-2 text-sm leading-7 text-slate-200">
                    {isRo
                      ? "Absolut. Colaborăm frecvent cu echipe interne pentru arhitectură, implementare și optimizare operațională."
                      : "Absolutely. We frequently collaborate with in-house teams for architecture guidance, implementation support, and operational optimization."}
                  </p>
                </details>
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-slate-700/70 bg-slate-950/90 p-6 md:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
            {isRo ? "Detalii de identificare" : "Company Identification Details"}
          </p>
          <h2 className="mt-2 text-2xl font-bold text-cyan-50 md:text-3xl">
            VP INVESTMENTS SRL
          </h2>

          <div className="mt-5 grid gap-3 text-sm md:grid-cols-2">
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Denumire" : "Company Name"}
              </p>
              <p className="mt-1 text-slate-100">VP INVESTMENTS SRL</p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Nume piață / Domeniu" : "Market Name / Domain"}
              </p>
              <p className="mt-1 text-slate-100">VP TECHNOLOGIES (vp-tech.ro)</p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                CUI
              </p>
              <p className="mt-1 text-slate-100">51453103</p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Nr. Reg. Com." : "Trade Register Number"}
              </p>
              <p className="mt-1 text-slate-100">J2025018400006</p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                EUID
              </p>
              <p className="mt-1 text-slate-100">ROONRC.J2025018400006</p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Data înființării" : "Incorporation Date"}
              </p>
              <p className="mt-1 text-slate-100">2025-03-13</p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Sediu" : "Registered Office"}
              </p>
              <p className="mt-1 text-slate-100">
                VP INVESTMENTS SRL - informații de contact verificate prin Call Center
              </p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Județ" : "County"}
              </p>
              <p className="mt-1 text-slate-100">Bucuresti</p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Localitate" : "City"}
              </p>
              <p className="mt-1 text-slate-100">
                {isRo ? "Sectorul 3" : "Sector 3"}
              </p>
            </article>
            <article className="rounded-lg border border-slate-700/70 bg-slate-900/75 p-4 md:col-span-2">
              <p className="text-xs uppercase tracking-[0.14em] text-cyan-300/90">
                {isRo ? "Adresă sediu" : "Registered Address"}
              </p>
              <p className="mt-1 text-slate-100">
                Bdul. Basarabia 242 Bl. MY7 Et. 7 Ap. 32 Cod 030352
              </p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}

