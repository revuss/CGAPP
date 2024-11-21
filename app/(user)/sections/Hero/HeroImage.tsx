import heroImg from "@/public/hero.jpg";
import Image from "next/image";
import { SlideFromRight } from "@/app/global/components/animations";

function HeroImage() {
  return (
    <div className="col-span-2 flex flex-col mx-3 my-5 md:mx-0 items-center justify-center">
      <SlideFromRight>
        <Image
          className="rounded-lg"
          src={heroImg}
          alt="Hero Image"
          width={500}
          height={800}
          priority
        />

        <div className="md:text-md xl:text-[14px] text-secondary text-center text-[10px] font-bold mt-3 relative">
          <h2 className="absolute inset-0 text-gray-300 opacity-40 translate-x-1 translate-y-1">
            Leaders in Advanced Wound Care with Fibroblast-Based Therapies
          </h2>
          <h2 className="bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent relative">
            Leaders in Advanced Wound Care with Fibroblast-Based Therapies
          </h2>
        </div>
      </SlideFromRight>
    </div>
  );
}

export default HeroImage;
