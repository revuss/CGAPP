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

        <div className="md:text-md xl:text-[14px] text-secondary text-center text-[10px] font-bold mt-3">
          <h2 className="bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
            Leaders in Advanced Wound Care with Fibroblast-Based Therapies
          </h2>
        </div>
      </SlideFromRight>
    </div>
  );
}

export default HeroImage;
