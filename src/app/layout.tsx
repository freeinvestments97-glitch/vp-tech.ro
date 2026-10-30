import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import PageTransition from "@/components/page-transition";
import SiteHeader from "@/components/site-header";
import { getLocale } from "@/lib/locale";
import { ONBOARDING_URL } from "@/lib/links";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "VP TECHNOLOGIES | vp-tech.ro",
  description:
    "VP TECHNOLOGIES (vp-tech.ro) - business technology services by VP INVESTMENTS SRL, covering infrastructure, security, cloud, and software solutions.",
};

export const viewport: Viewport = {
  themeColor: "#0b1630",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const isRo = locale === "ro";

  const footerLinks = [
    { href: ONBOARDING_URL, label: isRo ? "Începe" : "Get Started" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: isRo ? "Politică de confidențialitate" : "Privacy Policy" },
    { href: "/cookie-policy", label: isRo ? "Politică cookie" : "Cookie Policy" },
    { href: "/terms-and-conditions", label: isRo ? "Termeni și condiții" : "Terms and Conditions" },
  ];

  return (
    <html lang={locale} className={`${inter.variable} h-full`}>
      <body className="flex min-h-full flex-col">
        <SiteHeader locale={locale} />
        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <footer className="shell">
          <div className="mt-9 flex flex-col gap-5 border-t border-line pt-7 pb-10 text-[13px] text-ink-3 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-1">
              <p className="font-semibold text-ink-2">
                {isRo
                  ? "VP TECHNOLOGIES (vp-tech.ro) · Entitate juridică: VP INVESTMENTS SRL"
                  : "VP TECHNOLOGIES (vp-tech.ro) · Legal entity: VP INVESTMENTS SRL"}
              </p>
              <p>
                {isRo
                  ? "CUI 51453103 · Nr. Reg. Com. J2025018400006 · EUID ROONRC.J2025018400006"
                  : "VAT/Tax ID 51453103 · Trade Register J2025018400006 · EUID ROONRC.J2025018400006"}
              </p>
            </div>
            <nav className="flex flex-wrap items-center gap-x-4">
              {footerLinks.map((link) => (
                <Link key={link.href} className="inline-flex min-h-10 items-center transition hover:text-accent" href={link.href}>
                  {link.label}
                </Link>
              ))}
              <Link
                className="inline-flex min-h-10 items-center font-semibold text-accent-ink transition hover:text-accent"
                href={
                  isRo
                    ? "/docs/VP-TECHNOLOGIES-Prezentare-Client.pdf"
                    : "/docs/VP-TECHNOLOGIES-Client-Presentation.pdf"
                }
                target="_blank"
              >
                {isRo ? "Descarcă prezentarea PDF" : "Download PDF Deck"}
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
