export const dynamic = "force-dynamic";
import { Metadata } from "next";
import ProductMain from "../sections/products/ProductMain";

export const metadata: Metadata = {
  title: "Products - CytoGenesis",
  description:
    "Explore CytoGenesis's advanced wound care products, powered by science-backed fibroblast technology for faster tissue regeneration.",
  keywords: [
    "CytoGenesis products",
    "wound care products",
    "fibroblast therapies",
    "healing solutions",
    "innovative wound care",
  ],
};
const page = () => {
  return (
    <div>
      <ProductMain />
    </div>
  );
};

export default page;
