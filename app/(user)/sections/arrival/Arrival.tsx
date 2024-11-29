"use client";
import {
  SlideFromLeft,
  SlideFromRight,
} from "@/app/global/components/animations";
import { motion } from "framer-motion";

const Arrival = () => {
  return (
    <div className="h-[90vh] flex flex-col gap-y-10 justify-center items-center">
      <motion.div
        className="text-3xl md:text-5xl flex items-center justify-center px-4 lg:text-7xl font-bold text-secondary"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <SlideFromLeft>
          <h2 className="text-center md:text-start bg-gradient-to-r py-2 from-secondary via-third to-primary bg-clip-text text-transparent">
            Our Latest Arrival{" "}
          </h2>
        </SlideFromLeft>
      </motion.div>

      <div className="text-lg md:text-2xl w-[70%] font-bold text-secondary items-center justify-center grid grid-cols-1 md:grid-cols-002 text-center gap-2 md:gap-10 md:mx-10">
        <SlideFromRight>
          <div className="cols-span-1 flex justify-center items-center border-8 p-4 rounded-lg border-secondary">
            <p className="text-center bg-gradient-to-r py-2 from-secondary via-third to-primary bg-clip-text text-transparent">
              Chitosan solution that helps speed up wound healing with its
              easy-to-apply spray format. CytoSan Spray (Chitosan Solution 1% in
              Spray form) will soon be available to provide effective, gentle
              wound care for all skin types. Order now to be the first to
              experience its benefits
            </p>
          </div>
        </SlideFromRight>
      </div>
    </div>
  );
};

export default Arrival;
