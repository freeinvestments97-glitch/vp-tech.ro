"use client";

import { useId } from "react";
import Icon, { type IconName } from "@/components/icon";

type ServiceIconProps = {
  slug: string;
  variant?: "glyph" | "panel";
};

function resolveKind(slug: string) {
  if (slug.includes("network-security")) return "security";
  if (slug.includes("network")) return "network";
  if (slug.includes("windows") || slug.includes("linux") || slug.includes("server")) return "server";
  if (slug.includes("cpanel") || slug.includes("whm")) return "hosting";
  if (slug.includes("exchange") || slug.includes("microsoft-365")) return "cloud";
  if (slug.includes("wordpress") || slug.includes("stores")) return "web";
  if (slug.includes("ai")) return "ai";
  if (slug.includes("crm") || slug.includes("erp")) return "business";
  if (slug.includes("support")) return "support";
  if (slug.includes("payment")) return "payment";
  return "server";
}

const KIND_ICON: Record<ReturnType<typeof resolveKind>, IconName> = {
  security: "shieldCheck",
  network: "network",
  server: "server",
  hosting: "globe",
  cloud: "cloud",
  web: "code",
  ai: "sparkles",
  business: "briefcase",
  support: "headset",
  payment: "card",
};

export default function ServiceIcon({ slug, variant = "glyph" }: ServiceIconProps) {
  const icon = KIND_ICON[resolveKind(slug)];
  const patternId = useId();

  if (variant === "panel") {
    // Calm dotted panel with concentric arcs around a large icon tile,
    // echoing the artwork on the app's login screen.
    return (
      <div className="relative grid h-36 w-full place-items-center overflow-hidden rounded-[14px] bg-accent-soft text-accent">
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          viewBox="0 0 400 144"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <pattern id={patternId} width="22" height="22" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity=".18" />
            </pattern>
          </defs>
          <rect width="400" height="144" fill={`url(#${patternId})`} />
          <g fill="none" stroke="currentColor" strokeOpacity=".22" strokeWidth="1.2">
            <circle cx="200" cy="72" r="46" />
            <circle cx="200" cy="72" r="76" />
            <circle cx="200" cy="72" r="110" />
          </g>
        </svg>
        <span className="relative grid h-16 w-16 place-items-center rounded-[18px] bg-accent text-on-accent shadow-card">
          <Icon name={icon} className="h-8 w-8" />
        </span>
      </div>
    );
  }

  return (
    <span className="ico">
      <Icon name={icon} className="h-5 w-5" />
    </span>
  );
}
