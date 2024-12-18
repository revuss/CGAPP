"use client";
import {
  SlideFromLeft,
  SlideFromRight,
} from "@/app/global/components/animations";
import { motion } from "framer-motion";

function MissVision() {
  const floatingVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, 20, 0],
      transition: {
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative h-screen flex flex-col items-center justify-center py-20 md:gap-y-[10px] gap-y-5 overflow-hidden bg-gray-50">
      <motion.div
        className="absolute top-0 left-0 w-[250px] h-[250px] rounded-full bg-blue-300 opacity-50 z-0"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ x: "-50%", y: "-50%" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-[350px] h-[350px] rounded-full bg-blue-300 opacity-50 z-0"
        variants={floatingVariants}
        initial="initial"
        animate="animate"
        style={{ x: "50%", y: "50%" }}
      />

      <div className="grid md:grid-cols-2 grid-cols-1 mx-10 text-center items-center z-10">
        <div className="cols-span-1 p-4">
          <SlideFromLeft>
            <h2 className="text-2xl md:text-3xl xl:text-6xl flex items-center col-span-1 justify-center px-2 lg:text-5xl font-bold bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
              What We Stand For
            </h2>
          </SlideFromLeft>
        </div>
        <SlideFromRight>
          <div className="cols-span-1 border-8 p-4 rounded-lg border-secondary">
            <p className="md:text-lg xl:tex-xl text-xs font-bold">
              We aim to be the partner of choice in wound care management across
              PAN India. Our commitment is to deliver innovative solutions that
              prevent amputations and improve patient compliance.
            </p>
          </div>
        </SlideFromRight>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-5 mx-10 md:my-10 text-center items-center z-10">
        <div className="cols-span-1 px-4  md:hidden block">
          <SlideFromRight>
            <h2 className="text-2xl md:text-3xl xl:text-6xl flex items-center col-span-1 justify-center px-2 lg:text-5xl font-bold bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
              What We Aim To Achieve
            </h2>
          </SlideFromRight>
        </div>
        <SlideFromLeft>
          <div className="cols-span-1 border-8 p-4 rounded-lg border-secondary">
            <p className="md:text-lg xl:tex-xl text-xs font-bold">
              We aim to become the leading marketing company in the nation in
              the upcoming years, offering unique and innovative wound care
              solutions. Our goal is to be the go-to solution for preventing
              amputations.
            </p>
          </div>
        </SlideFromLeft>

        <div className="cols-span-1 p-4  md:block hidden">
          <SlideFromRight>
            <h2 className="text-2xl md:text-3xl xl:text-6xl flex items-center col-span-1 justify-center px-2 lg:text-5xl font-bold bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
              What We Aim To Achieve
            </h2>
          </SlideFromRight>
        </div>
      </div>
    </section>
  );
}

export default MissVision;
