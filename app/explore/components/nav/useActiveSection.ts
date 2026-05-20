"use client";

import { useEffect, useState } from "react";
import { NAV_SECTIONS, type NavSectionId } from "./navConfig";

/** Highlights the nav link for whichever section is currently in view. */
export function useActiveSection() {
  const [activeId, setActiveId] = useState<NavSectionId>("solar-system");

  useEffect(() => {
    const sectionIds = NAV_SECTIONS.map((s) => s.id);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el != null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id as NavSectionId);
        }
      },
      {
        rootMargin: "-20% 0px -55% 0px",
        threshold: [0, 0.15, 0.35, 0.5],
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return activeId;
}
