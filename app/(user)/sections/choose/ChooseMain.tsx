"use client";
import {
  SlideFromLeft,
  SlideFromRight,
} from "@/app/global/components/animations";
import { motion } from "framer-motion";
import { useEffect } from "react";

function ChooseMain() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="min-h-screen flex flex-col items-center justify-center space-y-12 bg-gradient-to-r from-gray-50 via-purple-50 to-pink-50 p-6">
      <motion.div
        className="text-3xl md:text-5xl flex items-center justify-center px-4 lg:text-7xl font-bold text-secondary"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <SlideFromLeft>
          <h2 className="text-center md:text-start bg-gradient-to-r py-2 from-secondary via-third to-primary bg-clip-text text-transparent">
            CytoGenesis Advantage
          </h2>
        </SlideFromLeft>
      </motion.div>

      <div className="text-xs md:text-lg font-semibold text-secondary justify-center grid grid-cols-1 md:grid-cols-002 text-center gap-2 md:gap-10 md:mx-10">
        <SlideFromLeft>
          <div className="bg-secondary text-white p-6 rounded-lg shadow-lg col-span-1 transition-transform transform">
            <p className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              We are committed to delivering top-tier wound care solutions by
              partnering with renowned manufacturers. Our offerings include Type
              1 Collagen in multiple forms, all sourced from certified
              facilities with strict quality controls. By working with industry
              leaders, we ensure that our products meet the highest standards,
              helping healthcare providers achieve the best outcomes for their
              patients and promoting faster, more effective healing.
            </p>
          </div>
        </SlideFromLeft>

        <SlideFromRight>
          <div className="bg-secondary text-white p-6 rounded-lg shadow-lg col-span-1 transition-transform transform">
            <p className="bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent">
              We are constantly evolving to meet the growing demands of advanced
              wound healing. With new and innovative solutions under
              development, our mission is to stay ahead in the industry. We
              empower healthcare providers with cutting-edge products designed
              to enhance recovery and improve patient well-being. Trust us to be
              your reliable partner in achieving the best possible outcomes and
              promoting faster, more effective healing.
            </p>
          </div>
        </SlideFromRight>
      </div>
    </section>
  );
}

export default ChooseMain;
