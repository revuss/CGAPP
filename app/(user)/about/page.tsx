import { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "About Us - CytoGenesis",
  description:
    "Learn about CytoGenesis, a leader in advanced wound care, pioneering fibroblast-based therapies for faster and effective healing.",
  keywords: [
    "About CytoGenesis",
    "advanced wound care",
    "fibroblast therapies",
    "healing solutions",
    "wound healing company",
  ],
};

function page() {
  const Introduction = dynamic(
    () => import("../sections/introduction/IntroMain")
  );
  const MissionVision = dynamic(() => import("../sections/mission/MissVision"));
  const AboutMain = dynamic(() => import("../sections/about/AboutMain"));
  return (
    <div className="bg-gray-50 overflow-clip select-none">
      <Introduction />
      <MissionVision />
      <AboutMain />
    </div>
  );
}

export default page;
