"use client";

import { useEffect, useState } from "react";

type BlogTocProps = {
  title: string;
  items: Array<{ id: string; label: string }>;
};

/** "In this briefing": numbered section links; highlights the section being read. */
export default function BlogToc({ title, items }: BlogTocProps) {
  const [active, setActive] = useState(items[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-120px 0px -60% 0px" },
    );
    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label={title}>
      <p className="text-[12px] font-bold tracking-[0.14em] text-ink-3 uppercase">{title}</p>
      <ol className="mt-3 space-y-1">
        {items.map((item, index) => {
          const on = item.id === active;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex min-h-10 items-start gap-3 rounded-xl border-l-[3px] px-3 py-2 text-[13.5px] leading-snug transition ${
                  on
                    ? "border-accent bg-accent-soft font-semibold text-accent-ink"
                    : "border-transparent text-ink-2 hover:bg-surface-2 hover:text-ink"
                }`}
              >
                <span className={`flex-none font-extrabold tabular-nums ${on ? "text-accent" : "text-ink-3"}`}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
