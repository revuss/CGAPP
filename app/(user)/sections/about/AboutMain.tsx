import dynamic from "next/dynamic";

const LeftAbout = dynamic(() => import("./LeftAbout"));
const RightAbout = dynamic(() => import("./RightAbout"));
function AboutMain() {
  return (
    <section className="min-h-screen select-none ">
      <div className="grid grid-cols-5 gap-0">
        <LeftAbout />
        <RightAbout />
      </div>
    </section>
  );
}

export default AboutMain;
