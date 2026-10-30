import type { ReactNode } from "react";

type PageHeroProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  /** Buttons / chips under the description. */
  actions?: ReactNode;
  /** Right-hand column (e.g. a stat ring or card). */
  aside?: ReactNode;
  /** Extra content below the title block, still on the navy band. */
  children?: ReactNode;
  /**
   * Leaves extra space at the bottom so the first section can overlap the
   * band (pair with `-mt-16` on that section), like the app's KPI row.
   */
  overlap?: boolean;
};

/** Dotted grid + arcs, same artwork as the app's hero header. */
export function HeroArt() {
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 420"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <pattern id="hero-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.3" fill="#93c5fd" opacity=".14" />
        </pattern>
        <linearGradient id="hero-line" x1="0" x2="1">
          <stop offset="0" stopColor="#60a5fa" stopOpacity="0" />
          <stop offset=".5" stopColor="#60a5fa" stopOpacity=".35" />
          <stop offset="1" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="1440" height="420" fill="url(#hero-dots)" />
      <g fill="none" stroke="url(#hero-line)" strokeWidth="1.2">
        <path d="M0 330 C 300 260, 520 380, 820 300 S 1260 230, 1440 290" />
        <path d="M0 360 C 340 300, 560 410, 860 330 S 1280 270, 1440 320" />
      </g>
      <g fill="none" stroke="#60a5fa" strokeOpacity=".18">
        <circle cx="1240" cy="60" r="140" />
        <circle cx="1240" cy="60" r="220" />
      </g>
    </svg>
  );
}

export default function PageHero({
  eyebrow,
  title,
  description,
  actions,
  aside,
  children,
  overlap = false,
}: PageHeroProps) {
  return (
    <header className={`hero-band ${overlap ? "pb-24" : "pb-12"} pt-10 md:pt-14`}>
      <HeroArt />
      <div className="shell relative">
        <div
          className={`grid items-center gap-8 ${aside ? "lg:grid-cols-[minmax(0,1fr)_auto]" : ""}`}
        >
          <div className="min-w-0 max-w-4xl">
            {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
            <h1 className="mt-2.5 text-[30px] font-extrabold leading-[1.1] text-white md:text-[40px]">
              {title}
            </h1>
            {description ? (
              <div className="mt-3.5 max-w-3xl text-base leading-relaxed text-slate-300 md:text-[17px]">
                {description}
              </div>
            ) : null}
            {actions ? <div className="mt-6 flex flex-wrap gap-2.5">{actions}</div> : null}
          </div>
          {aside ? <div className="min-w-0">{aside}</div> : null}
        </div>
        {children}
      </div>
    </header>
  );
}
