import dynamic from "next/dynamic";

function page() {
  const Introduction = dynamic(
    () => import("../sections/introduction/IntroMain")
  );
  const MissionVision = dynamic(() => import("../sections/mission/MissVision"));
  const AboutMain = dynamic(() => import("../sections/about/AboutMain"));
  return (
    <div className="bg-gray-50 overflow-clip select-none">
      <Introduction />
      <MissionVision />
      <AboutMain />
    </div>
  );
}

export default page;
