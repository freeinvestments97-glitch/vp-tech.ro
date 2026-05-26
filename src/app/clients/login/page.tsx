import Link from "next/link";
import { getLocale } from "@/lib/locale";
import ClientLoginTerminal from "@/components/client-login-terminal";

export default async function ClientLoginPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";

  return (
    <div className="command-bg min-h-screen px-6 py-8 text-slate-100 md:px-10 md:py-10 xl:px-14">
      <main className="mx-auto w-full max-w-5xl">
        <Link
          href="/clients"
          className="mb-6 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          &larr; {isRo ? "Înapoi la Clienti" : "Back to Clients"}
        </Link>

        <div className="grid gap-8 xl:grid-cols-[1fr_1.15fr] xl:items-start">
          {/* Left: description */}
          <div className="flex flex-col gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-300/90">
                {isRo ? "Portal client securizat" : "Secure Client Portal"}
              </p>
              <h1 className="mt-2 text-3xl font-bold text-cyan-50 md:text-4xl">
                {isRo ? "Acces cont client" : "Client Account Access"}
              </h1>
              <p className="mt-4 text-base leading-8 text-slate-300">
                {isRo
                  ? "Clientii activi VP TECHNOLOGIES pot accesa rapoarte, statusul proiectelor si documentatia tehnica prin acest portal securizat."
                  : "Active VP TECHNOLOGIES clients can access reports, project status, and technical documentation through this secure portal."}
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

            <div className="rounded-lg border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-sm text-slate-400">
              {isRo
                ? "Nu ai inca credentiale? Contacteaza managerul tau de cont VP TECHNOLOGIES pentru a configura accesul."
                : "No credentials yet? Contact your VP TECHNOLOGIES account manager to set up access."}
              <div className="mt-3">
                <Link
                  href="/contact"
                  className="text-cyan-300 font-semibold transition hover:text-cyan-200"
                >
                  {isRo ? "Contacteaza-ne →" : "Get in touch →"}
                </Link>
              </div>
            </div>
          </div>

          {/* Right: terminal */}
          <ClientLoginTerminal locale={locale} />
        </div>
      </main>
    </div>
  );
}
