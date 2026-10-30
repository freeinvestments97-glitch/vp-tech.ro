import type { IconName } from "@/components/icon";

// The four service areas shown on the homepage and used to filter /services.
// Every service slug in services.ts belongs to exactly one area.
export type ServiceArea = {
  id: string;
  icon: IconName;
  title: string;
  summary: string;
  slugs: string[];
};

const areas: Array<Omit<ServiceArea, "title" | "summary"> & {
  en: { title: string; summary: string };
  ro: { title: string; summary: string };
}> = [
  {
    id: "infrastructure",
    icon: "server",
    slugs: [
      "windows-server-administration",
      "linux-server-management",
      "cpanel-whm-server-management",
      "microsoft-exchange-services",
      "microsoft-365-administration",
    ],
    en: {
      title: "Infrastructure & Cloud",
      summary: "Servers, email and Microsoft 365 that stay up, stay patched and scale with you.",
    },
    ro: {
      title: "Infrastructură & Cloud",
      summary: "Servere, email și Microsoft 365 care rămân funcționale, actualizate și cresc odată cu tine.",
    },
  },
  {
    id: "network-security",
    icon: "shieldCheck",
    slugs: [
      "network-design-implementation",
      "network-cable-installations",
      "network-security-solutions",
    ],
    en: {
      title: "Network & Security",
      summary: "Reliable networks from cabling to firewall, built to keep threats and downtime out.",
    },
    ro: {
      title: "Rețea & Securitate",
      summary: "Rețele fiabile, de la cablare la firewall, construite să țină departe amenințările și întreruperile.",
    },
  },
  {
    id: "software",
    icon: "code",
    slugs: [
      "wordpress-development",
      "online-stores",
      "custom-crm-erp-development",
      "ai-development",
    ],
    en: {
      title: "Software & Digital",
      summary: "Websites, online stores, CRM/ERP and AI tools that win customers and automate work.",
    },
    ro: {
      title: "Software & Digital",
      summary: "Website-uri, magazine online, CRM/ERP și instrumente AI care aduc clienți și automatizează munca.",
    },
  },
  {
    id: "support",
    icon: "headset",
    slugs: [
      "on-site-remote-it-support",
      "microsoft-windows-support",
      "payment-terminal-services",
    ],
    en: {
      title: "Support & Field Services",
      summary: "Onsite and remote help for your team, devices and payment terminals when you need it.",
    },
    ro: {
      title: "Suport & Servicii pe teren",
      summary: "Ajutor la fața locului și remote pentru echipă, dispozitive și terminale de plată, când ai nevoie.",
    },
  },
];

export function getServiceAreas(locale: "en" | "ro"): ServiceArea[] {
  return areas.map(({ en, ro, ...area }) => ({ ...area, ...(locale === "ro" ? ro : en) }));
}
