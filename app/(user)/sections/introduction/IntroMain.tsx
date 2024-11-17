import { ZoomInOutReveal } from "@/app/global/components/zoomin";

const IntroMain = () => {
  return (
    <section
      id="knowMore"
      className="h-screen items-center w-[100vw] justify-center flex-1 overflow-x-hidden  flex bg-secondary bg-gradient-to-r from-secondary via-third to-secondary text-white"
    >
      <ZoomInOutReveal>
        <h2 className="text-white md:mx-20 mx-5 text-center font-semibold text-[20px] md:text-[34px] md:leading-normal leading-loose tracking-wider capitalize">
          Since our lau
          <span className="text-blue-200">
            nch on March 7, 2024. We&apos;ve been dedicated to transforming
            wound care. Our innovativ
          </span>
          e solutions enha
          <span className="text-blue-200">
            nce healing and minimize the risk of amputations, ensuring better
            out
          </span>
          comes for every patient. Join us in improving recovery and health!
        </h2>
      </ZoomInOutReveal>
    </section>
  );
};

export default IntroMain;
