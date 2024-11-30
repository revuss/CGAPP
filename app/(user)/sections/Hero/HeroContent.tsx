"use client";
import { useRouter } from "next/navigation";
import Button from "@/app/global/components/button";
import { SlideFromLeft } from "@/app/global/components/animations";
function HeroContent() {
  const router = useRouter();
  const scrollToKnowMore = () => {
    const element = document.getElementById("knowMore");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className="col-span-3 px-4 ">
      <SlideFromLeft>
        <div className="md:text-3xl xl:text-5xl pt-2 text-center tracking-wide md:text-start text-xl font-bold mb-4 relative">
          <h1 className="absolute inset-0 text-gray-400 opacity-40 py-2 translate-x-1 translate-y-1">
            Trusted Partner in Advanced Wound Care Therapy
          </h1>
          <h1 className="bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent py-2 relative">
            Trusted Partner in Advanced Wound Care Therapy
          </h1>
        </div>
      </SlideFromLeft>

      <SlideFromLeft>
        <div className="md:text-md lg:text-md xl:text-lg text-xs md:text-start text-center text-primary font-medium">
          <h1 className="capitalize">
            We specialize in advanced wound care, offering innovative,
            science-backed solutions. By harnessing the healing power of
            fibroblasts, we promote faster tissue regeneration, ensuring
            effective and reliable therapies for chronic and acute wounds.
          </h1>
        </div>
      </SlideFromLeft>
      <SlideFromLeft>
        <div className="flex md:flex-row flex-col md:w-[50%] w-full gap-x-5 mt-4 justify-center items-center  space-y-2 md:space-y-0">
          <Button
            text="  Contact us"
            buttonStyle="text-sm"
            onClick={() => router.push("/contact")}
          />
          <Button
            text="Know More"
            buttonStyle="text-sm "
            onClick={scrollToKnowMore}
          />
        </div>
      </SlideFromLeft>
    </div>
  );
}

export default HeroContent;
