"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/icon";
import LanguageSwitcher from "@/components/language-switcher";
import type { Locale } from "@/lib/locale";
import { CLIENT_PORTAL_URL, ONBOARDING_URL } from "@/lib/links";

type SiteHeaderProps = {
  locale: Locale;
};

export default function SiteHeader({ locale }: SiteHeaderProps) {
  const pathname = usePathname();
  const isRo = locale === "ro";

  const tabs = [
    { href: "/", label: isRo ? "Acasă" : "Home" },
    { href: "/services", label: isRo ? "Servicii" : "Services" },
    { href: "/clients", label: isRo ? "Clienți" : "Clients" },
    { href: "/contact", label: "Contact" },
    { href: ONBOARDING_URL, label: isRo ? "Începe" : "Get Started" },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="hero-band sticky top-0 z-30 overflow-visible border-b border-white/10 shadow-[0_6px_20px_rgba(11,22,48,0.18)]">
      <div className="shell flex min-h-[62px] items-center gap-3 py-2.5 md:min-h-[68px]">
        <Link href="/" className="flex min-w-0 flex-1 items-center gap-2.5 text-white no-underline">
          <span className="grid h-8 w-8 flex-none place-items-center rounded-[9px] bg-white/12">
            <Icon name="layers" className="h-[17px] w-[17px]" />
          </span>
          <span className="min-w-0 leading-tight">
            {/* short name on narrow phones, like the app's top bar */}
            <span className="block text-[12px] font-bold tracking-[0.24em] whitespace-nowrap text-indigo-200">
              <span className="min-[430px]:hidden">VP TECH</span>
              <span className="hidden min-[430px]:inline">VP TECHNOLOGIES</span>
            </span>
            <span className="block truncate text-[12.5px] text-slate-300">vp-tech.ro</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label={isRo ? "Principal" : "Main"}>
          {tabs.map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              className={`rounded-[10px] px-3 py-2 text-[14.5px] font-semibold transition ${
                isActive(tab.href)
                  ? "bg-white/12 text-white"
                  : "text-slate-200/70 hover:text-white"
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-none items-center gap-2">
          <LanguageSwitcher locale={locale} />
          <Link
            href={CLIENT_PORTAL_URL}
            className="btn on-dark !px-3"
            aria-label={isRo ? "Autentificare client" : "Client login"}
            title={isRo ? "Autentificare client" : "Client login"}
          >
            <Icon name="user" className="h-[19px] w-[19px]" />
            <span className="hidden sm:inline">{isRo ? "Cont client" : "Client login"}</span>
          </Link>
        </div>
      </div>

      {/* Mobile / tablet: app-style underline tabs */}
      <nav
        className="shell flex overflow-x-auto [scrollbar-width:none] max-sm:!px-1.5 max-[374px]:[mask-image:linear-gradient(to_right,#000_85%,transparent)] lg:hidden [&::-webkit-scrollbar]:hidden"
        aria-label={isRo ? "Principal" : "Main"}
      >
        {tabs.map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex-none border-b-[3px] px-2 pt-2.5 pb-3 text-[14px] font-semibold transition sm:px-3 sm:text-[14.5px] ${
              isActive(tab.href)
                ? "border-accent-2 text-white"
                : "border-transparent text-slate-200/70 hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
