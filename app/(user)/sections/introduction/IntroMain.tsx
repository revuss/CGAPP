"use client";
import { ZoomInOutReveal } from "@/app/global/components/zoomin";
import { motion } from "framer-motion";

const IntroMain = () => {
  return (
    <section
      id="knowMore"
      className="h-screen items-center w-[100vw] justify-center flex-1 overflow-x-hidden flex bg-secondary bg-gradient-to-r from-secondary via-third to-secondary text-white"
    >
      <ZoomInOutReveal>
        <motion.h2
          className="text- bg-gradient-to-r from-blue-500 to-blue-800 bg-clip-text md:mx-20 mx-5 text-center font-semibold text-[20px] md:text-[34px] md:leading-normal leading-loose tracking-wider capitalize relative"
          initial={{
            textShadow: "2px 2px 8px rgba(255, 215, 0, 0.7)",
          }}
          whileHover={{
            textShadow: "4px 4px 15px rgba(0, 216, 255, 0.9)",
            color: "#FFFFFF",
          }}
        >
          Since our lau
          <span className="text-blue-200 relative">
            nch on March 7, 2024. We&apos;ve been dedicated to transforming
            wound care. Our innovativ
          </span>
          e solutions enha
          <span className="text-blue-200">
            nce healing and minimize the risk of amputations, ensuring better
            out
          </span>
          comes for every patient. Join us in improving recovery and health!
        </motion.h2>
      </ZoomInOutReveal>
    </section>
  );
};

export default IntroMain;
