import type { Metadata } from "next";
import SpaceBackground from "../components/SpaceBackground";
import ExploreContent from "./components/ExploreContent";

export const metadata: Metadata = {
  title: "Solar System Explorer | Cosmic Explorer AI",
  description: "Explore the solar system with interactive 3D learning.",
};

export default function ExplorePage() {
  return (
    <SpaceBackground>
      <ExploreContent />
    </SpaceBackground>
  );
}
