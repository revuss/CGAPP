"use client";
import dynamic from "next/dynamic";
import { ParallaxText } from "./InteractiveMarq";

const HeroContent = dynamic(() => import("./HeroContent"));
const HeroImage = dynamic(() => import("./HeroImage"));
function HeroMain() {
  const marqueeText =
    "CytoGenesis advances wound healing across all phases, from hemostasis and inflammation to proliferation and remodeling.";
  return (
    <section>
      <div className="flex flex-col items-center justify-center bg-secondary bg-gradient-to-r from-secondary via-third to-secondary text-white">
        <ParallaxText baseVelocity={-0.7}>{marqueeText}</ParallaxText>
        <ParallaxText baseVelocity={0.7}>{marqueeText}</ParallaxText>{" "}
      </div>
      <div className="flex flex-1 pt-7">
        <div className="w-full md:min-h-[65vh] lg:min-h-[60vh] min-h-[75vh] flex flex-col items-center justify-center mx-4 py-2 mb-10 mt-2">
          <div className="grid md:grid-cols-5 grid-cols-1 justify-center items-center">
            <HeroContent />
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroMain;
