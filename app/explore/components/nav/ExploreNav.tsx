"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import { NAV_SECTIONS, type NavSectionId } from "./navConfig";
import { useActiveSection } from "./useActiveSection";

/** Sticky glassmorphism nav with smooth scroll and mobile menu. */
export default function ExploreNav() {
  const activeId = useActiveSection();
  const [mobileOpen, setMobileOpen] = useState(false);

  const scrollToSection = useCallback((id: NavSectionId) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileOpen(false);
  }, []);

  const linkClass = (id: NavSectionId) => {
    const isActive = activeId === id;
    return [
      "relative rounded-full px-3.5 py-2 text-xs font-semibold tracking-[0.12em] uppercase transition-all duration-300",
      isActive
        ? "bg-cyan-300/10 text-cyan-100 shadow-[0_0_22px_rgba(34,211,238,0.12)]"
        : "text-slate-400 hover:bg-white/5 hover:text-white",
    ].join(" ");
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-2xl border border-white/10 bg-[#020617]/55 shadow-[0_18px_70px_rgba(0,0,0,0.42)] backdrop-blur-2xl backdrop-saturate-150">
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan-200/70 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-500/8 via-white/[0.025] to-indigo-500/8" />

        <nav
          className="relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[4.25rem] sm:px-6 lg:px-8"
          aria-label="Explore page sections"
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <Link
              href="/"
              className="group inline-flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/25 px-3 py-1.5 text-[11px] text-slate-300 shadow-inner shadow-white/5 transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-white sm:px-3.5"
            >
              <svg
                className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">Home</span>
            </Link>

            <button
              type="button"
              onClick={() => scrollToSection("solar-system")}
              className="min-w-0 text-left"
            >
              <p className="truncate text-[10px] font-semibold tracking-[0.35em] text-cyan-200/90 uppercase">
                Mission control
              </p>
              <p className="truncate text-sm font-semibold tracking-wide text-white sm:text-base">
                Cosmic Explorer
              </p>
            </button>
          </div>

          <ul className="hidden items-center gap-1 md:flex">
            {NAV_SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={linkClass(id)}
                >
                  {label}
                  {activeId === id && (
                    <span
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_12px_rgba(34,211,238,0.85)]"
                      aria-hidden
                    />
                  )}
                </button>
              </li>
            ))}
          </ul>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/25 text-slate-200 transition-all duration-300 hover:border-cyan-300/45 hover:bg-cyan-300/10 hover:text-white md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="explore-mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileOpen((o) => !o)}
          >
            <span className="sr-only">Menu</span>
            {mobileOpen ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </nav>

        <div
          id="explore-mobile-menu"
          className={`overflow-hidden border-t border-white/10 bg-[#020617]/80 backdrop-blur-xl transition-all duration-300 md:hidden ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 px-4 py-3">
            {NAV_SECTIONS.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all duration-300 ${
                    activeId === id
                      ? "border-cyan-300/40 bg-cyan-400/10 text-cyan-100"
                      : "border-transparent bg-black/20 text-slate-300 hover:border-white/10 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <span className="font-medium tracking-wide uppercase">
                    {label}
                  </span>
                  {activeId === id && (
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
