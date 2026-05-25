"use client";

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

export default function ServiceIcon({ slug, variant = "glyph" }: ServiceIconProps) {
  const kind = resolveKind(slug);

  if (variant === "panel") {
    return (
      <svg viewBox="0 0 240 120" className="h-24 w-full" aria-hidden="true">
        <circle
          cx="120"
          cy="60"
          r="44"
          className="vector-orbit fill-none stroke-cyan-300/35"
          strokeWidth="2"
          strokeDasharray="8 10"
        />
        <rect x="28" y="58" width="184" height="4" rx="2" className="vector-scan fill-cyan-300/30" />
        <circle cx="78" cy="24" r="3" className="telemetry-pulse fill-cyan-300/85" />
        <circle cx="164" cy="98" r="2.5" className="telemetry-pulse fill-cyan-200/70" />

        {kind === "network" ? (
          <>
            <circle cx="42" cy="60" r="16" className="fill-cyan-400/25 stroke-cyan-300" />
            <circle cx="120" cy="28" r="16" className="fill-cyan-400/25 stroke-cyan-300" />
            <circle cx="198" cy="60" r="16" className="fill-cyan-400/25 stroke-cyan-300" />
            <circle cx="120" cy="92" r="16" className="fill-cyan-400/25 stroke-cyan-300" />
            <path
              d="M58 60H104M136 28L182 54M136 92L182 66M104 34L58 54M104 86L58 66"
              className="stroke-cyan-300/90"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : kind === "cloud" ? (
          <>
            <path
              d="M74 80c-13 0-24-10-24-23s11-23 24-23c4-14 17-24 33-24 18 0 33 13 35 30 11 1 20 10 20 22 0 12-10 22-22 22H74z"
              className="fill-cyan-400/20 stroke-cyan-300"
              strokeWidth="3"
            />
            <path
              d="M98 85l22-23 16 15 20-20"
              className="stroke-cyan-200"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
          </>
        ) : kind === "web" || kind === "business" ? (
          <>
            <rect
              x="28"
              y="18"
              width="184"
              height="84"
              rx="10"
              className="fill-cyan-400/15 stroke-cyan-300"
              strokeWidth="3"
            />
            <path d="M28 42h184" className="stroke-cyan-300" strokeWidth="3" />
            <circle cx="44" cy="30" r="4" className="fill-cyan-300" />
            <circle cx="58" cy="30" r="4" className="fill-cyan-300/80" />
            <circle cx="72" cy="30" r="4" className="fill-cyan-300/60" />
            <path
              d="M50 72h50M50 84h35M124 64h62M124 76h62M124 88h40"
              className="stroke-cyan-200"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        ) : kind === "security" ? (
          <>
            <path
              d="M120 18l50 18v30c0 26-17 38-50 48-33-10-50-22-50-48V36l50-18z"
              className="fill-cyan-400/15 stroke-cyan-300"
              strokeWidth="3"
            />
            <path
              d="M98 62l14 14 30-30"
              className="stroke-cyan-200"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </>
        ) : (
          <>
            <rect
              x="32"
              y="16"
              width="176"
              height="88"
              rx="12"
              className="fill-cyan-400/15 stroke-cyan-300"
              strokeWidth="3"
            />
            <rect
              x="56"
              y="34"
              width="128"
              height="52"
              rx="8"
              className="fill-cyan-300/15 stroke-cyan-200"
              strokeWidth="3"
            />
            <path
              d="M120 34v52M56 60h128"
              className="stroke-cyan-200"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    );
  }

  return (
    <div className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-cyan-500/35 bg-cyan-950/35 text-cyan-200">
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
        {kind === "network" ? (
          <>
            <circle cx="5" cy="12" r="2.2" />
            <circle cx="12" cy="6" r="2.2" />
            <circle cx="19" cy="12" r="2.2" />
            <circle cx="12" cy="18" r="2.2" />
            <path d="M7 12h3M13.5 7.5l3.2 3M13.5 16.5l3.2-3M10.5 7.5l-3.2 3M10.5 16.5l-3.2-3" />
          </>
        ) : kind === "security" ? (
          <>
            <path d="M12 3l7 2.5V11c0 4.2-2.8 6.3-7 8-4.2-1.7-7-3.8-7-8V5.5L12 3z" />
            <path d="M9 11.8l2 2 4-4" />
          </>
        ) : kind === "cloud" ? (
          <>
            <path d="M7.5 18h9.2a3.3 3.3 0 0 0 .3-6.6A5.2 5.2 0 0 0 7.3 9a4.2 4.2 0 0 0 .2 9z" />
            <path d="M8.8 14.5l2.2-2.2 1.8 1.8 2.5-2.5" />
          </>
        ) : kind === "web" ? (
          <>
            <rect x="3.5" y="4.5" width="17" height="14" rx="2.5" />
            <path d="M3.5 8h17M8 4.5v14" />
          </>
        ) : kind === "ai" ? (
          <>
            <path d="M8 7.5A3.5 3.5 0 0 1 11.5 4h1A3.5 3.5 0 0 1 16 7.5v9A3.5 3.5 0 0 1 12.5 20h-1A3.5 3.5 0 0 1 8 16.5z" />
            <path d="M6 10h2M16 10h2M6 14h2M16 14h2" />
          </>
        ) : kind === "business" ? (
          <>
            <path d="M4 20h16M6 20V8l6-3 6 3v12M9 20v-5h6v5" />
          </>
        ) : kind === "support" ? (
          <>
            <path d="M5.5 9.5a6.5 6.5 0 1 1 13 0v1.8a2.2 2.2 0 0 1-2.2 2.2h-1.3v-4h1.5M9.2 9.5h5.6v4H9.2z" />
            <path d="M8.5 17.5h4.5" />
          </>
        ) : kind === "payment" ? (
          <>
            <rect x="3.5" y="5.5" width="17" height="13" rx="2.5" />
            <path d="M3.5 10h17M7 14h4M15.5 14h1" />
          </>
        ) : kind === "hosting" ? (
          <>
            <rect x="4" y="5" width="16" height="5" rx="1.5" />
            <rect x="4" y="14" width="16" height="5" rx="1.5" />
            <path d="M8 7.5h.01M8 16.5h.01" />
          </>
        ) : (
          <>
            <rect x="4" y="4.5" width="16" height="15" rx="2.5" />
            <path d="M8 8h8M8 12h8M8 16h5" />
          </>
        )}
      </svg>
    </div>
  );
}
