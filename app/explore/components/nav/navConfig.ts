/** Section anchors for the explore page sticky nav. */
export const NAV_SECTIONS = [
  { id: "solar-system", label: "Solar System" },
  { id: "ai-assistant", label: "AI Assistant" },
  { id: "quiz", label: "Quiz" },
  { id: "about", label: "About" },
] as const;

export type NavSectionId = (typeof NAV_SECTIONS)[number]["id"];
