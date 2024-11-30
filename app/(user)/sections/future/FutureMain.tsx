"use client";

import productsData from "@/app/(user)/util/futureData.json";
import {
  SlideFromLeft,
  SlideFromRight,
} from "@/app/global/components/animations";
import { motion } from "framer-motion";
const FutureMain = () => {
  return (
    <section className="min-h-screen py-10 md:py-2 flex flex-col items-center justify-center bg-gradient-to-r from-secondary via-third to-secondary text-white">
      <div className="max-w-[90%]  text-center flex flex-col items-center justify-center gap-y-5">
        <SlideFromLeft>
          <h2 className="text-4xl font-bold mb-4">Our Future Arrival</h2>
          <p className="md:text-xl text-sm mb-4 font-medium">
            We are constantly pushing the boundaries of cell-based therapies. To
            enhance our offerings, we are excited to introduce the following
            products that will strengthen our solutions and drive greater
            healing potential.
          </p>
        </SlideFromLeft>
      </div>
      <SlideFromRight>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 justify-center">
          {productsData.products.map((product, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-shadow duration-300"
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <h3 className="text-xl font-semibold bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent mb-4">
                {product.title}
              </h3>
              <ul className="list-disc pl-5 space-y-2">
                {product.bulletPoints.map((point, idx) => (
                  <li key={idx} className="text-gray-600">
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </SlideFromRight>
    </section>
  );
};

export default FutureMain;
