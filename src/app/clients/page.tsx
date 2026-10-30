import Image from "next/image";
import Link from "next/link";
import Icon, { type IconName } from "@/components/icon";
import PageHero, { HeroArt } from "@/components/page-hero";
import { getLocale } from "@/lib/locale";
import { CLIENT_PORTAL_URL, ONBOARDING_URL } from "@/lib/links";

// A selection of clients, not the full portfolio. Public info only: name, logo
// and the general type of work (matching the labels used in app.vp-tech.ro).
type Client = {
  name: string;
  slug: string;
  logo?: { src: string; width: number; height: number };
  work: { en: string; ro: string; icon: IconName };
};

const clients: Client[] = [
  {
    name: "RSG Global",
    slug: "rsg-global",
    work: { en: "Store IT installations & support", ro: "Instalări IT și suport în magazine", icon: "wrench" },
  },
  {
    name: "TheCryptoHub LLC",
    slug: "thecryptohub",
    logo: { src: "/clients/thecryptohub.png", width: 600, height: 80 },
    work: { en: "Software development & management", ro: "Dezvoltare și management software", icon: "code" },
  },
  {
    name: "DSV",
    slug: "dsv",
    work: { en: "Site surveys & installations", ro: "Survey-uri de site și instalări", icon: "pin" },
  },
  {
    name: "BlueWireless",
    slug: "bluewireless",
    logo: { src: "/clients/bluewireless.png", width: 264, height: 52 },
    work: { en: "Network installations", ro: "Instalări de rețea", icon: "network" },
  },
];

export default async function ClientsPage() {
  const locale = await getLocale();
  const isRo = locale === "ro";

  const principles: Array<{ title: string; body: string; icon: IconName }> = isRo
    ? [
        { title: "Confidențial implicit", body: "Nu publicăm detalii despre proiectele, locațiile sau datele clienților noștri.", icon: "lock" },
        { title: "Raportare clară", body: "Fiecare client își urmărește lucrările, rapoartele și facturile în portalul de client.", icon: "file" },
        { title: "Echipă pe teren și remote", body: "Instalări la fața locului și suport remote, coordonate de aceeași echipă.", icon: "headset" },
      ]
    : [
        { title: "Confidential by default", body: "We don't publish details about our clients' projects, locations or data.", icon: "lock" },
        { title: "Clear reporting", body: "Every client follows their work, reports and invoices in the client portal.", icon: "file" },
        { title: "Onsite and remote", body: "Field installations and remote support, coordinated by the same team.", icon: "headset" },
      ];

  return (
    <>
      <PageHero
        overlap
        eyebrow={isRo ? "Clienți" : "Clients"}
        title={isRo ? "Companii care lucrează cu VP TECHNOLOGIES" : "Companies That Work With VP TECHNOLOGIES"}
        description={
          isRo
            ? "Câteva dintre organizațiile care se bazează pe noi pentru instalări, suport și software. Detaliile colaborărilor rămân confidențiale."
            : "A few of the organisations that rely on us for installations, support and software. The details of each engagement stay confidential."
        }
        actions={
          <>
            <Link href="/contact" className="btn primary">
              {isRo ? "Contacteaza-ne" : "Get in Touch"}
              <Icon name="arrowRight" className="h-4 w-4" />
            </Link>
            <Link href={ONBOARDING_URL} className="btn on-dark">
              {isRo ? "Începe acum" : "Get Started"}
            </Link>
            <Link href={CLIENT_PORTAL_URL} className="btn on-dark">
              <Icon name="lock" className="h-4 w-4" />
              {isRo ? "Login client" : "Client Login"}
            </Link>
          </>
        }
      />

      <main className="shell pb-6">
        {/* Selected clients: logo wall */}
        <section className="relative -mt-16 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {clients.map((client) => (
            <article key={client.slug} className="card flex flex-col !p-4">
              {/* logos sit on a white plate so they read in light and dark mode */}
              <div className="grid h-28 place-items-center rounded-[14px] border border-line bg-white px-6">
                {client.logo ? (
                  <Image
                    src={client.logo.src}
                    alt={client.name}
                    width={client.logo.width}
                    height={client.logo.height}
                    className="h-auto max-h-11 w-auto max-w-full"
                  />
                ) : (
                  <span className="text-center text-[26px] leading-none font-extrabold tracking-[0.08em] text-[#0b1630] uppercase">
                    {client.name}
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-[17px] font-bold text-ink">{client.name}</h3>
              <p className="mt-1.5 flex items-center gap-2 text-sm text-ink-2">
                <Icon name={client.work.icon} className="h-4 w-4 text-accent" />
                {isRo ? client.work.ro : client.work.en}
              </p>
            </article>
          ))}
        </section>
        <p className="mt-3 text-[13px] text-ink-3">
          {isRo
            ? "O selecție din portofoliul nostru de clienți."
            : "A selection from our client portfolio."}
        </p>

        {/* How we work with clients */}
        <section className="mt-7 grid gap-[18px] md:grid-cols-3">
          {principles.map((item) => (
            <article key={item.title} className="card">
              <span className="ico mb-3">
                <Icon name={item.icon} />
              </span>
              <h3 className="text-base font-bold text-ink">{item.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-2">{item.body}</p>
            </article>
          ))}
        </section>
        {/* CTA */}
        <section className="hero-band mt-7 rounded-[18px] p-6 shadow-card md:p-8">
          <HeroArt />
          <div className="relative">
            <p className="eyebrow">{isRo ? "Urmatorul pas" : "Next Step"}</p>
            <h2 className="mt-2 text-2xl font-extrabold text-white md:text-3xl">
              {isRo ? "Hai să discutăm despre proiectul tău" : "Let\u2019s talk about your project"}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-300">
              {isRo
                ? "Programeaza o sesiune de descoperire de 60 de minute. Analizam obiectivele tale, identificam prioritatile si livram un plan concret — fara angajament necesar."
                : "Book a 60-minute discovery session. We map your goals, identify priorities, and deliver a concrete plan — no commitment required."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <Link href="/contact" className="btn primary">
                <Icon name="calendar" className="h-4 w-4" />
                {isRo ? "Programeaza o discutie" : "Book a Discovery Call"}
              </Link>
              <Link
                href={
                  isRo
                    ? "/docs/VP-TECHNOLOGIES-Prezentare-Client.pdf"
                    : "/docs/VP-TECHNOLOGIES-Client-Presentation.pdf"
                }
                target="_blank"
                className="btn on-dark"
              >
                <Icon name="download" className="h-4 w-4" />
                {isRo ? "Descarcă prezentarea PDF" : "Download PDF Deck"}
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
