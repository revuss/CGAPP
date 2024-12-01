import { Metadata } from "next";
import dynamic from "next/dynamic";
import ProductMain from "./sections/products/ProductMain";
import Arrival from "./sections/arrival/Arrival";
import FutureMain from "./sections/future/FutureMain";

export const metadata: Metadata = {
  title: "CytoGenesis - Advanced Wound Care",
  description:
    "CytoGenesis specializes in advanced wound care, offering science-backed fibroblast therapies for faster healing of chronic and acute wounds.",
  keywords: [
    "CytoGenesis",
    "advanced wound care",
    "fibroblasts",
    "tissue regeneration",
    "chronic wounds",
    "acute wounds",
    "innovative therapies",
    "healing solutions",
  ],
};

const HeroMain = dynamic(() => import("./sections/Hero/HeroMain"));
const IntroMain = dynamic(() => import("./sections/introduction/IntroMain"));
const MissVision = dynamic(() => import("./sections/mission/MissVision"));
const About = dynamic(() => import("./sections/about/AboutMain"));
const Choose = dynamic(() => import("./sections/choose/ChooseMain"));
const Team = dynamic(() => import("./sections/team/TeamMain"));
const Partners = dynamic(() => import("./sections/partner/PartnerMain"));
const Career = dynamic(() => import("./sections/career/CareerMain"));
const Contact = dynamic(() => import("./sections/contact/ContactMain"));

export default async function Page() {
  return (
    <div className="overflow-clip">
      <HeroMain />
      <IntroMain />
      <MissVision />
      <About />
      <ProductMain limit={3} />
      <FutureMain />
      <Choose />
      <Team />
      <Partners />
      <Arrival />
      <Career />
      <Contact />
    </div>
  );
}
