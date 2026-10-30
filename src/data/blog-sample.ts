import type { Article } from "@/lib/blog-types";

// Local design preview only (served when NODE_ENV is "development" and
// Firestore has no articles). Evergreen guidance, no news claims.
export const sampleArticle: Article = {
  id: "sample",
  slug: "design-preview-weekly-tech-briefing",
  publishedAt: "2026-10-26T07:00:00.000Z",
  updatedAt: "2026-10-26T07:00:00.000Z",
  weekStart: "2026-10-19",
  weekEnd: "2026-10-25",
  topics: ["security", "outages", "networking", "ai"],
  services: ["network-security-solutions", "microsoft-365-administration", "on-site-remote-it-support"],
  sample: true,
  sources: [
    {
      title: "Known Exploited Vulnerabilities Catalog",
      url: "https://www.cisa.gov/known-exploited-vulnerabilities-catalog",
      publisher: "CISA",
    },
    {
      title: "How to check Microsoft 365 service health",
      url: "https://learn.microsoft.com/en-us/microsoft-365/enterprise/view-service-health",
      publisher: "Microsoft Learn",
    },
    {
      title: "Directoratul Național de Securitate Cibernetică",
      url: "https://www.dnsc.ro",
      publisher: "DNSC",
    },
  ],
  en: {
    title: "Design preview: your weekly tech briefing",
    summary:
      "A preview of how each weekly article will look: the week's major tech events, explained for business owners, with practical next steps.",
    sections: [
      {
        heading: "Security: patch what attackers are already using",
        paragraphs: [
          "Each week, real articles will cover the most important vulnerabilities and incidents, starting with flaws that are being actively exploited.",
          "The rule of thumb for small and medium businesses is simple: anything on public lists of exploited vulnerabilities goes to the front of the patch queue.",
        ],
        bullets: [
          "Firewalls, VPN gateways and remote-access tools first",
          "Then email servers and anything reachable from the internet",
          "Then laptops and desktops through automatic updates",
        ],
      },
      {
        heading: "Outages: know where to look when Microsoft 365 is down",
        paragraphs: [
          "When email or Teams stops working, the first question is whether the problem is yours or the provider's. The service health dashboard answers that in seconds and saves hours of troubleshooting.",
        ],
      },
      {
        heading: "Networking and AI",
        paragraphs: [
          "Real articles will also cover connectivity (including satellite links such as Starlink for remote sites) and AI tools that change how small teams work, always with the question: what does this mean for your business this week?",
        ],
      },
    ],
    takeaways: [
      "Check that automatic updates are on for every company laptop",
      "Bookmark the Microsoft 365 service health page for your admin",
      "Make sure remote-access tools use multi-factor authentication",
    ],
  },
  ro: {
    title: "Previzualizare design: briefingul tău tehnologic săptămânal",
    summary:
      "O previzualizare a felului în care va arăta fiecare articol săptămânal: evenimentele tech majore ale săptămânii, explicate pentru antreprenori, cu pași practici.",
    sections: [
      {
        heading: "Securitate: actualizează ce folosesc deja atacatorii",
        paragraphs: [
          "În fiecare săptămână, articolele reale vor acoperi cele mai importante vulnerabilități și incidente, începând cu cele exploatate activ.",
          "Regula simplă pentru IMM-uri: tot ce apare pe listele publice de vulnerabilități exploatate trece primul la actualizări.",
        ],
        bullets: [
          "Întâi firewall-uri, gateway-uri VPN și instrumente de acces remote",
          "Apoi serverele de email și tot ce e accesibil din internet",
          "Apoi laptopurile și desktopurile, prin actualizări automate",
        ],
      },
      {
        heading: "Întreruperi: unde verifici când Microsoft 365 nu merge",
        paragraphs: [
          "Când emailul sau Teams nu funcționează, prima întrebare este dacă problema e la tine sau la furnizor. Pagina de stare a serviciilor răspunde în câteva secunde și economisește ore de depanare.",
        ],
      },
      {
        heading: "Rețelistică și AI",
        paragraphs: [
          "Articolele reale vor acoperi și conectivitatea (inclusiv legături prin satelit precum Starlink pentru locații izolate) și instrumentele AI care schimbă felul în care lucrează echipele mici, mereu cu întrebarea: ce înseamnă asta pentru afacerea ta săptămâna aceasta?",
        ],
      },
    ],
    takeaways: [
      "Verifică dacă actualizările automate sunt pornite pe toate laptopurile firmei",
      "Salvează pagina de stare Microsoft 365 la îndemâna administratorului",
      "Asigură-te că instrumentele de acces remote folosesc autentificare în doi pași",
    ],
  },
};
