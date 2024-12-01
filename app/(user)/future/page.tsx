import { Metadata } from "next";
import FutureMain from "../sections/future/FutureMain";

export const metadata: Metadata = {
  title: "Future Plans - CytoGenesis",
  description:
    "Discover CytoGenesis's future plans to revolutionize wound care, advancing fibroblast therapies and driving innovation in healing solutions.",
  keywords: [
    "CytoGenesis future plans",
    "wound care innovations",
    "fibroblast advancements",
    "future of wound healing",
    "science-driven therapies",
  ],
};
const page = () => {
  return (
    <div className="overflow-clip">
      <FutureMain />
    </div>
  );
};

export default page;
