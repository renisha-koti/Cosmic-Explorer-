import type { DifficultyOption, QuizDifficulty, QuizQuestion } from "./types";

export const DIFFICULTY_OPTIONS: DifficultyOption[] = [
  {
    id: "easy",
    label: "Easy",
    eyebrow: "Cadet orbit",
    description: "Solar system basics and familiar sky objects.",
  },
  {
    id: "medium",
    label: "Medium",
    eyebrow: "Mission control",
    description: "Planet science, galaxies, and spaceflight clues.",
  },
  {
    id: "hard",
    label: "Hard",
    eyebrow: "Deep space",
    description: "Stellar physics and sharper astronomy concepts.",
  },
];

/** Static astronomy quiz questions by difficulty. Edit here to tune each level. */
export const QUIZ_QUESTIONS_BY_DIFFICULTY: Record<
  QuizDifficulty,
  QuizQuestion[]
> = {
  easy: [
    {
      id: "easy-red-planet",
      question: "Which planet is called the Red Planet?",
      options: ["Venus", "Mars", "Mercury", "Jupiter"],
      correctIndex: 1,
      explanation:
        "Mars looks reddish because iron oxide, or rust, covers much of its surface.",
    },
    {
      id: "easy-earth-galaxy",
      question: "Which galaxy contains Earth?",
      options: ["Andromeda", "Milky Way", "Triangulum", "Sombrero"],
      correctIndex: 1,
      explanation:
        "Earth orbits the Sun inside the Milky Way, a barred spiral galaxy.",
    },
    {
      id: "easy-largest-planet",
      question: "What is the largest planet in our solar system?",
      options: ["Saturn", "Neptune", "Jupiter", "Uranus"],
      correctIndex: 2,
      explanation:
        "Jupiter is the biggest planet and is more massive than all the other planets combined.",
    },
    {
      id: "easy-moon-orbits",
      question: "What does the Moon orbit?",
      options: ["Mars", "Earth", "The Sun only", "Venus"],
      correctIndex: 1,
      explanation:
        "The Moon is Earth's natural satellite and travels around Earth as both move around the Sun.",
    },
    {
      id: "easy-sun-type",
      question: "What type of object is the Sun?",
      options: ["A planet", "A comet", "A star", "An asteroid"],
      correctIndex: 2,
      explanation:
        "The Sun is a star, producing energy through nuclear fusion in its core.",
    },
    {
      id: "easy-rings",
      question: "Which planet is famous for its bright ring system?",
      options: ["Saturn", "Mars", "Mercury", "Earth"],
      correctIndex: 0,
      explanation:
        "Saturn has the most visible ring system, made mostly of ice and rock particles.",
    },
  ],
  medium: [
    {
      id: "medium-most-moons",
      question: "Which planet has the most confirmed moons?",
      options: ["Jupiter", "Saturn", "Uranus", "Neptune"],
      correctIndex: 1,
      explanation:
        "Saturn leads the solar system with more confirmed moons than any other planet.",
    },
    {
      id: "medium-hottest-planet",
      question: "What is the hottest planet in the solar system?",
      options: ["Mercury", "Venus", "Earth", "Mars"],
      correctIndex: 1,
      explanation:
        "Venus is hotter than Mercury because its dense atmosphere traps heat in a runaway greenhouse effect.",
    },
    {
      id: "medium-sun-type",
      question: "What type of star is the Sun?",
      options: ["Red giant", "White dwarf", "Yellow dwarf", "Neutron star"],
      correctIndex: 2,
      explanation:
        "The Sun is a G-type main-sequence star, often called a yellow dwarf.",
    },
    {
      id: "medium-asteroid-belt",
      question: "Where is the main asteroid belt located?",
      options: [
        "Between Earth and Mars",
        "Between Mars and Jupiter",
        "Beyond Neptune",
        "Inside Mercury's orbit",
      ],
      correctIndex: 1,
      explanation:
        "Most main-belt asteroids orbit the Sun between Mars and Jupiter.",
    },
    {
      id: "medium-light-year",
      question: "What does a light-year measure?",
      options: ["Time", "Distance", "Brightness", "Temperature"],
      correctIndex: 1,
      explanation:
        "A light-year is the distance light travels in one year, not a unit of time.",
    },
    {
      id: "medium-iss",
      question: "What does the International Space Station orbit?",
      options: ["The Moon", "Mars", "Earth", "Jupiter"],
      correctIndex: 2,
      explanation: "The ISS is a crewed laboratory in low Earth orbit.",
    },
  ],
  hard: [
    {
      id: "hard-main-sequence",
      question: "What powers a main-sequence star like the Sun?",
      options: [
        "Hydrogen fusion",
        "Chemical combustion",
        "Radio waves",
        "Gravitational lensing",
      ],
      correctIndex: 0,
      explanation:
        "Main-sequence stars shine because hydrogen nuclei fuse into helium in their cores.",
    },
    {
      id: "hard-event-horizon",
      question: "What is the event horizon of a black hole?",
      options: [
        "Its visible surface",
        "The boundary beyond which light cannot escape",
        "A ring of asteroids",
        "The center of a galaxy",
      ],
      correctIndex: 1,
      explanation:
        "The event horizon marks the point where escape velocity exceeds the speed of light.",
    },
    {
      id: "hard-redshift",
      question: "In astronomy, what does redshift usually indicate?",
      options: [
        "An object moving away",
        "An object getting colder only",
        "A planet's surface color",
        "A telescope error",
      ],
      correctIndex: 0,
      explanation:
        "Light from objects moving away is stretched toward longer, redder wavelengths.",
    },
    {
      id: "hard-white-dwarf",
      question: "What is a white dwarf?",
      options: [
        "A newborn gas giant",
        "The dense remnant core of a Sun-like star",
        "A type of comet",
        "A small spiral galaxy",
      ],
      correctIndex: 1,
      explanation:
        "After shedding outer layers, many Sun-like stars leave behind hot, dense white dwarf cores.",
    },
    {
      id: "hard-exoplanet-dip",
      question: "What does the transit method look for when finding exoplanets?",
      options: [
        "Tiny dips in a star's brightness",
        "Radio messages from planets",
        "New craters on moons",
        "Changes in asteroid color",
      ],
      correctIndex: 0,
      explanation:
        "A planet crossing in front of its star can cause a small, repeated brightness dip.",
    },
    {
      id: "hard-neutron-star",
      question: "What kind of object can form after a massive star explodes?",
      options: [
        "A neutron star",
        "A meteor shower",
        "A brown dwarf",
        "A nebular planet",
      ],
      correctIndex: 0,
      explanation:
        "Some massive stars collapse after supernova explosions, leaving compact neutron stars behind.",
    },
  ],
};
