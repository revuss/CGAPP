import ABOUTDATA from "../../util/aboutData.json";
import { SlideFromRight } from "@/app/global/components/animations";
function RightContent() {
  return (
    <>
      {ABOUTDATA.map((solution) => (
        <section
          key={solution.id}
          className="min-h-screen flex flex-col justify-center px-5 overflow-x-hidden"
        >
          <SlideFromRight>
            <div className="text-secondary py-2">
              <h1 className="font-bold text-xl lg:text-4xl">
                {solution.title}
              </h1>
            </div>
            <div className="text-primary text-sm font-semibold md:text-lg bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
              <p>{solution.description}</p>
            </div>
          </SlideFromRight>
        </section>
      ))}
    </>
  );
}

export default RightContent;
