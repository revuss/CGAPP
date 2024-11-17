import dynamic from "next/dynamic";

const HeroContent = dynamic(() => import("./HeroContent"));
const HeroImage = dynamic(() => import("./HeroImage"));
function HeroMain() {
  return (
    <section>
      <div className="flex flex-1 pt-7">
        <div className="w-full md:h-[70vh] h-[75vh] flex flex-col items-center justify-center mx-4 py-2 mb-10 mt-2">
          <div className="grid md:grid-cols-5 grid-cols-1 justify-center items-center">
            <HeroContent />
            <HeroImage />
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroMain;
