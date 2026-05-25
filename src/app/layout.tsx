import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono } from "next/font/google";
import LanguageSwitcher from "@/components/language-switcher";
import PageTransition from "@/components/page-transition";
import SiteStatusBar from "@/components/site-status-bar";
import { getLocale } from "@/lib/locale";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VP TECHNOLOGIES | vp-tech.ro",
  description:
    "VP TECHNOLOGIES (vp-tech.ro) - business technology services by VP INVESTMENTS SRL, covering infrastructure, security, cloud, and software solutions.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const isRo = locale === "ro";

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteStatusBar locale={locale} />
        <div className="flex-1">
          <PageTransition>{children}</PageTransition>
        </div>
        <footer className="border-t border-cyan-900/45 bg-slate-950/95 px-6 py-6 md:px-10 xl:px-14">
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-1">
              <p className="text-xs text-slate-300">
                {isRo
                  ? "VP TECHNOLOGIES (vp-tech.ro) | Entitate juridică: VP INVESTMENTS SRL"
                  : "VP TECHNOLOGIES (vp-tech.ro) | Legal entity: VP INVESTMENTS SRL"}
              </p>
              <p className="text-xs text-slate-400">
                {isRo
                  ? "CUI 51453103 | Nr. Reg. Com. J2025018400006 | EUID ROONRC.J2025018400006"
                  : "VAT/Tax ID 51453103 | Trade Register J2025018400006 | EUID ROONRC.J2025018400006"}
              </p>
              <LanguageSwitcher locale={locale} />
            </div>
            <nav className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-cyan-300">
              <Link className="transition hover:text-cyan-200" href="/get-started">
                {isRo ? "Începe" : "Get Started"}
              </Link>
              <Link className="transition hover:text-cyan-200" href="/contact">
                {isRo ? "Contact" : "Contact"}
              </Link>
              <Link className="transition hover:text-cyan-200" href="/privacy-policy">
                {isRo ? "Politică de confidențialitate" : "Privacy Policy"}
              </Link>
              <Link className="transition hover:text-cyan-200" href="/cookie-policy">
                {isRo ? "Politică cookie" : "Cookie Policy"}
              </Link>
              <Link
                className="transition hover:text-cyan-200"
                href="/terms-and-conditions"
              >
                {isRo ? "Termeni și condiții" : "Terms and Conditions"}
              </Link>
            </nav>
          </div>
        </footer>
      </body>
    </html>
  );
}
