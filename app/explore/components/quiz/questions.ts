import type { QuizQuestion } from "./types";

/** Static astronomy quiz — edit here to add or change questions. */
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "most-moons",
    question: "Which planet has the most moons?",
    options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctIndex: 1,
    explanation:
      "Saturn leads the solar system with over 140 known moons — more than any other planet.",
  },
  {
    id: "red-planet",
    question: "Which planet is called the Red Planet?",
    options: ["Venus", "Mars", "Mercury", "Jupiter"],
    correctIndex: 1,
    explanation:
      "Mars looks reddish because iron oxide (rust) covers much of its surface.",
  },
  {
    id: "hottest-planet",
    question: "What is the hottest planet in the solar system?",
    options: ["Mercury", "Venus", "Earth", "Mars"],
    correctIndex: 1,
    explanation:
      "Venus is hotter than Mercury despite being farther from the Sun, thanks to a runaway greenhouse effect.",
  },
  {
    id: "earth-galaxy",
    question: "Which galaxy contains Earth?",
    options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
    correctIndex: 1,
    explanation:
      "Earth orbits the Sun inside the Milky Way — a barred spiral galaxy with hundreds of billions of stars.",
  },
  {
    id: "largest-planet",
    question: "What is the largest planet?",
    options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
    correctIndex: 2,
    explanation:
      "Jupiter is the biggest planet — more massive than all the other planets combined.",
  },
  {
    id: "sun-type",
    question: "What type of star is the Sun?",
    options: ["Red giant", "White dwarf", "Yellow dwarf", "Neutron star"],
    correctIndex: 2,
    explanation:
      "The Sun is a G-type main-sequence star, often called a yellow dwarf.",
  },
];
