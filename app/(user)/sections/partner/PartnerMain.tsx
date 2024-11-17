import { SlideFromRight } from "@/app/global/components/animations";
import { ZoomInOutReveal } from "@/app/global/components/zoomin";
import Link from "next/link";

function PartnerMain() {
  return (
    <section className="py-24 bg-gradient-to-r from-secondary via-third to-secondary text-white flex justify-center items-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <ZoomInOutReveal>
            <h2 className="text-4xl text-white text-center font-semibold">
              Our Partner
            </h2>
          </ZoomInOutReveal>
        </div>
        <SlideFromRight>
          <div className=" justify-center text-center items-center gap-12 xl:flex xl:justify-between">
            <h1>
              We proudly collaborate with{" "}
              <Link
                href={"https://synerheal.com/"}
                target="_blank"
                className="font-bold text-primary text-xl"
              >
                &nbsp;Synerheal Pharmaceuticals&nbsp;
              </Link>
              , a leading name in collagen manufacturing with decades of
              experience and industry recognition. This partnership allows us to
              deliver high-quality wound care solutions, leveraging
              Synerheal&apos;s expertise in advanced collagen-based products.
            </h1>
          </div>
        </SlideFromRight>
      </div>
    </section>
  );
}

export default PartnerMain;
