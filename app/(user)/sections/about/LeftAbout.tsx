import { ZoomInOutReveal } from "@/app/global/components/zoomin";

const LeftAbout = () => {
  return (
    <div
      className="h-screen bg-secondary flex-1 flex px-0 justify-center items-center col-span-2 sticky top-0 "
      id="services"
    >
      <ZoomInOutReveal>
        <div className="text-start  mx-2 md:mx-10">
          <h1 className="text-lg md:text-4xl px-2 lg:text-5xl xl:text-6xl mb-3 font-bold text-white">
            Discover Cyto
            <span className="text-third">G</span>
            enesis{" "}
          </h1>
          <p className="leading-loose text-xs text-white lg:text-lg font-semibold px-2 ">
            Trusted Partner in Wound Healing Solutions Delivering Advanced Care
            for Optimal Recovery
          </p>
        </div>
      </ZoomInOutReveal>
    </div>
  );
};

export default LeftAbout;
