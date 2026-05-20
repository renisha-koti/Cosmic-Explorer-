"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/** Lightweight Framer Motion feature bundle (smaller than full `motion`). */
export function ScrollRevealProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in seconds for sequential section reveals. */
  delay?: number;
  id?: string;
  "aria-label"?: string;
  as?: "section" | "header" | "div";
};

const motionMap = {
  section: m.section,
  header: m.header,
  div: m.div,
} as const;

/**
 * Fades + slides content in when scrolled into view.
 * Uses `once` + transform/opacity only for smooth GPU-friendly animation.
 */
export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  id,
  "aria-label": ariaLabel,
  as,
}: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const tag = as ?? (id ? "section" : "div");
  const MotionTag = motionMap[tag];

  if (reduceMotion) {
    const Tag = tag;
    return (
      <Tag id={id} className={className} aria-label={ariaLabel}>
        {children}
      </Tag>
    );
  }

  return (
    <MotionTag
      id={id}
      className={className}
      aria-label={ariaLabel}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{
        once: true,
        amount: 0.12,
        margin: "0px 0px -10% 0px",
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </MotionTag>
  );
}
