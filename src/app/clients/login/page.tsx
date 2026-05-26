import Link from "next/link";
import { getLocale } from "@/lib/locale";
import ClientLoginTerminal from "@/components/client-login-terminal";

export default async function ClientLoginPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";

  const features = isRo
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
      ];

  return (
    <div className="command-bg min-h-screen text-slate-100">
      {/* Back link */}
      <div className="px-6 pt-6 md:px-10 xl:px-14">
        <Link
          href="/"
          className="inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Home" : "Back to Home"}
        </Link>
      </div>

      {/* Full-width hero banner */}
      <div className="mt-6 border-y border-cyan-500/25 bg-slate-950/80 px-6 py-10 md:px-10 md:py-14 xl:px-14">
        <div className="flex flex-col gap-2">
          <p className="text-xs uppercase tracking-[0.28em] text-cyan-400">
            {isRo ? "Portal securizat · VP TECHNOLOGIES" : "Secure Portal · VP TECHNOLOGIES"}
          </p>
          <h1
            className="text-3xl font-black leading-tight text-white md:text-5xl xl:text-6xl"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            {isRo ? "Autentificare Client" : "Client Login"}
          </h1>
          <p className="mt-1 max-w-2xl text-lg text-slate-400">
            {isRo
              ? "Acces securizat la rapoarte, proiecte si documentatie tehnica."
              : "Secure access to reports, projects, and technical documentation."}
          </p>
        </div>
      </div>

      {/* Main content — full width */}
      <div className="px-6 py-10 md:px-10 md:py-12 xl:px-14">
        <div className="grid gap-10 xl:grid-cols-[1fr_1.4fr] xl:items-start">

          {/* Left panel */}
          <div className="flex flex-col gap-6">
            {/* Access badge */}
            <div className="flex items-center gap-3 rounded-xl border border-cyan-500/30 bg-cyan-950/25 px-5 py-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-400/40 bg-cyan-500/15 text-lg text-cyan-300">
                &#x1F512;
              </span>
              <div>
                <p className="text-sm font-bold text-cyan-100">
                  {isRo ? "Zona cu acces restrictionat" : "Restricted Access Zone"}
                </p>
                <p className="text-xs text-slate-400">
                  {isRo ? "Numai clienti activi cu credentiale valide" : "Active clients with valid credentials only"}
                </p>
              </div>
            </div>

            {/* What you get */}
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.2em] text-slate-500">
                {isRo ? "Ce ai acces" : "What you can access"}
              </p>
              <ul className="space-y-3">
                {features.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-slate-300">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded border border-cyan-500/30 bg-cyan-950/30 text-xs text-cyan-400">
                      ›
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* No credentials */}
            <div className="rounded-xl border border-slate-700/60 bg-slate-900/70 px-5 py-4">
              <p className="text-sm font-semibold text-slate-200">
                {isRo ? "Nu ai inca credentiale?" : "No credentials yet?"}
              </p>
              <p className="mt-1 text-sm text-slate-400">
                {isRo
                  ? "Contacteaza managerul tau de cont pentru a configura accesul la portal."
                  : "Contact your account manager to set up portal access."}
              </p>
              <Link
                href="/contact"
                className="mt-3 inline-block rounded-md border border-cyan-400/40 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-500/20"
              >
                {isRo ? "Contacteaza-ne" : "Get in touch"}
              </Link>
            </div>
          </div>

          {/* Right: terminal — larger and more prominent */}
          <div className="flex flex-col gap-3">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              {isRo ? "Terminal autentificare" : "Authentication terminal"}
            </p>
            <ClientLoginTerminal locale={locale} />
            <p className="text-center text-xs text-slate-600">
              {isRo
                ? "Sesiune criptata TLS 1.3 · Acces monitorizat"
                : "TLS 1.3 encrypted session · Access monitored"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
