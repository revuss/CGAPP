"use client";
import { SlideFromLeft } from "@/app/global/components/animations";
import { ZoomInOutReveal } from "@/app/global/components/zoomin";
import { motion } from "framer-motion";
import teamMembers from "../../util/teamData.json";
import Image from "next/image";

function TeamMain() {
  return (
    <section className="min-h-screen flex-col items-center justify-between flex-1 flex bg-secondary bg-gradient-to-r from-secondary via-third to-secondary text-white">
      <div className="text-2xl md:text-4xl px-2 xl:text-6xl mb-3 font-bold text-blue-200 mt-20">
        <ZoomInOutReveal>
          <h1>Our Team</h1>
        </ZoomInOutReveal>
      </div>
      <SlideFromLeft>
        <div>
          <h2 className="text-white mx-5 md:mx-20 text-center text-xs font-semibold md:text-lg xl:text-xl mb-4">
            Our Strength Lies in the Knowledge, Experience, and Dedication of
            Our Leadership Team. Each Member Brings a Wealth of Expertise From
            Diverse Domains, Ensuring That We Remain at the Forefront of
            Advanced FibroTech Solutions. Together, We Drive Our Mission to
            Deliver Innovative Healing Solutions With a Commitment to Excellence
            and Care.
          </h2>
        </div>
      </SlideFromLeft>
      <div className="flex md:flex-row flex-col space-x-5 justify-between w-[90vw] text-center text-blue-200 font-semibold">
        {teamMembers.map(({ name, role, imgSrc }, index) => (
          <motion.div
            key={index}
            className="cursor-pointer flex flex-col mb-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ZoomInOutReveal>
              <Image
                className="mx-auto mb-4 rounded-full"
                src={imgSrc}
                alt={`${name} Avatar`}
                width={150}
                height={150}
              />
            </ZoomInOutReveal>
            <h2 className="whitespace-nowrap">{name}</h2>
            <p>{role}</p>
          </motion.div>
        ))}
      </div>
      <div></div>
    </section>
  );
}

export default TeamMain;
