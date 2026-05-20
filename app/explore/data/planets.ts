/** Planet facts for the 3D solar system (distances are real; sizes/orbits are scaled for the scene). */
export type PlanetData = {
  id: string;
  name: string;
  description: string;
  distanceFromSun: string;
  /** Real-world size (e.g. diameter) label for the UI card */
  sizeLabel: string;
  /** Average temperature label for the UI card */
  averageTemperature: string;
  /** Number of natural satellites */
  moons: number;
  /** A short “wow” fact for the UI card */
  funFact: string;
  color: string;
  /** Visual radius in the 3D scene */
  size: number;
  /** Distance from the Sun in scene units */
  orbitRadius: number;
  /** Orbit speed in radians per second */
  orbitSpeed: number;
  /** Starting position on the orbit (radians) */
  startAngle: number;
  hasRings?: boolean;
};

export const PLANETS: PlanetData[] = [
  {
    id: "mercury",
    name: "Mercury",
    description:
      "The smallest planet and closest to the Sun, with extreme temperatures and a heavily cratered surface.",
    distanceFromSun: "57.9 million km",
    sizeLabel: "4,880 km diameter",
    averageTemperature: "167°C (avg)",
    moons: 0,
    funFact: "A day on Mercury (sunrise to sunrise) lasts about 176 Earth days.",
    color: "#b5b5b5",
    size: 0.14,
    orbitRadius: 2.2,
    orbitSpeed: 1.6,
    startAngle: 0.5,
  },
  {
    id: "venus",
    name: "Venus",
    description:
      "A thick atmosphere of carbon dioxide creates a runaway greenhouse effect and surface temperatures hot enough to melt lead.",
    distanceFromSun: "108.2 million km",
    sizeLabel: "12,104 km diameter",
    averageTemperature: "464°C (avg)",
    moons: 0,
    funFact: "Venus spins backwards—its sun rises in the west and sets in the east.",
    color: "#e8cda0",
    size: 0.22,
    orbitRadius: 3.2,
    orbitSpeed: 1.2,
    startAngle: 2.1,
  },
  {
    id: "earth",
    name: "Earth",
    description:
      "Our home world—the only known planet with liquid water on the surface and life across its oceans and continents.",
    distanceFromSun: "149.6 million km",
    sizeLabel: "12,742 km diameter",
    averageTemperature: "15°C (avg)",
    moons: 1,
    funFact: "Earth is the densest planet in the solar system.",
    color: "#4f8fde",
    size: 0.24,
    orbitRadius: 4.2,
    orbitSpeed: 1.0,
    startAngle: 4.0,
  },
  {
    id: "mars",
    name: "Mars",
    description:
      "The Red Planet hosts the largest volcano in the solar system and polar ice caps made of water and dry ice.",
    distanceFromSun: "227.9 million km",
    sizeLabel: "6,779 km diameter",
    averageTemperature: "-65°C (avg)",
    moons: 2,
    funFact: "Mars has the tallest volcano we know: Olympus Mons.",
    color: "#c1442e",
    size: 0.18,
    orbitRadius: 5.4,
    orbitSpeed: 0.8,
    startAngle: 1.2,
  },
  {
    id: "jupiter",
    name: "Jupiter",
    description:
      "A gas giant more massive than all other planets combined, famous for its Great Red Spot storm and dozens of moons.",
    distanceFromSun: "778.5 million km",
    sizeLabel: "139,820 km diameter",
    averageTemperature: "-110°C (cloud tops)",
    moons: 95,
    funFact: "Jupiter’s Great Red Spot is a storm that’s been raging for centuries.",
    color: "#d4a574",
    size: 0.75,
    orbitRadius: 7.5,
    orbitSpeed: 0.45,
    startAngle: 5.2,
  },
  {
    id: "saturn",
    name: "Saturn",
    description:
      "Known for its spectacular ring system made of ice and rock particles, orbiting a pale gas giant with low density.",
    distanceFromSun: "1.43 billion km",
    sizeLabel: "116,460 km diameter",
    averageTemperature: "-140°C (avg)",
    moons: 146,
    funFact: "Saturn could float in water—its average density is less than water.",
    color: "#e8d5a3",
    size: 0.62,
    orbitRadius: 9.5,
    orbitSpeed: 0.35,
    startAngle: 3.4,
    hasRings: true,
  },
  {
    id: "uranus",
    name: "Uranus",
    description:
      "An ice giant that rotates on its side, with a faint ring system and a blue-green hue from methane in its atmosphere.",
    distanceFromSun: "2.87 billion km",
    sizeLabel: "50,724 km diameter",
    averageTemperature: "-195°C (avg)",
    moons: 27,
    funFact: "Uranus rotates on its side, likely due to an ancient colossal collision.",
    color: "#9fd4e8",
    size: 0.42,
    orbitRadius: 11.5,
    orbitSpeed: 0.25,
    startAngle: 0.8,
  },
  {
    id: "neptune",
    name: "Neptune",
    description:
      "The windiest planet, with supersonic storms and a deep blue atmosphere driven by internal heat far from the Sun.",
    distanceFromSun: "4.50 billion km",
    sizeLabel: "49,244 km diameter",
    averageTemperature: "-200°C (avg)",
    moons: 14,
    funFact: "Neptune’s winds can exceed 2,000 km/h—faster than the speed of sound.",
    color: "#3e5fce",
    size: 0.4,
    orbitRadius: 13.5,
    orbitSpeed: 0.2,
    startAngle: 2.8,
  },
];
