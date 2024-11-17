"use client";
import {
  SlideFromLeft,
  SlideFromRight,
} from "@/app/global/components/animations";
import CareerForm from "./CareerForm";

function CareerMain() {
  return (
    <section className="h-screen flex items-center justify-center flex-1 overflow-hidden">
      <div className=" grid md:grid-cols-2 grid-cols-1 gap-7 w-[90%]">
        <div className="col-span-1 ">
          <div className="md:mx-10 space-y-5">
            <SlideFromLeft>
              <h1 className="bg-gradient-to-r md:text-3xl text-2xl md:text-start text-center  from-secondary via-third font-bold to-secondary bg-clip-text text-transparent ">
                Join Our Team
              </h1>
            </SlideFromLeft>
            <div className="space-y-4">
              <SlideFromLeft>
                <p className="bg-gradient-to-r text-center md:text-start text-sm md:text-lg xl:text-xl from-secondary via-primary font-semibold to-secondary bg-clip-text text-transparent ">
                  Are you a graduate passionate about sales and eager to grow in
                  a dynamic environment? At CytoGenesis, we nurture talent and
                  provide the tools for a successful career. If you have strong
                  selling skills and a willingness to learn, you&apos;re in the
                  right place.
                </p>
              </SlideFromLeft>
              <SlideFromLeft>
                <p className="bg-gradient-to-r hidden md:block text-sm md:text-lg xl:text-xl from-secondary via-primary font-semibold to-secondary bg-clip-text text-transparent ">
                  Work alongside industry experts, gain hands-on experience, and
                  grow both personally and professionally. Whether you&apos;re
                  starting out or looking to elevate your career, CytoGenesis is
                  the ideal platform for ambitious individuals.
                </p>
              </SlideFromLeft>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <SlideFromRight>
            <h1 className="bg-gradient-to-r text-xl md:text-3xl text-center from-secondary via-third font-bold to-secondary bg-clip-text text-transparent ">
              Apply Now and Be Part of Our Team!
            </h1>
          </SlideFromRight>
          <div className="flex items-center justify-center">
            <CareerForm />
          </div>
        </div>
      </div>
    </section>
  );
}

export default CareerMain;
