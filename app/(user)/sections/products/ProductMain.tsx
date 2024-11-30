/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  SlideFromLeft,
  SlideFromRight,
} from "@/app/global/components/animations";
import Button from "@/app/global/components/button";
import { getallProductsAPI } from "@/app/services/userServices/userServices";
import Image from "next/image";
import Link from "next/link";

export const dynamic = "force-dynamic";
interface ProductMainProps {
  limit?: number;
}

const ProductMain: React.FC<ProductMainProps> = async ({ limit }) => {
  let data: any;
  try {
    const response = await getallProductsAPI();
    if (Array.isArray(response)) {
      data = response;
    }
  } catch (err: any) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">
          Error: {err.message || "Failed to load data"}
        </p>
      </div>
    );
  }
  if (data.length === 0) {
    <div className="flex justify-center items-center h-screen">
      <p className="text-gray-500">No data is present</p>
    </div>;
  }

  const displayedData = limit ? data?.slice(0, limit) : data;

  return (
    <>
      <section className="select-none min-h-screen overflow-clip flex flex-1 bg-gray-50 flex-col md:text-start py-7 text-center justify-center space-y-[30px] items-center">
        <SlideFromLeft>
          <h2 className="text-2xl md:text-3xl py-2 xl:text-5xl flex items-center text-center col-span-1 justify-center px-2 lg:text-5xl font-bold bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
            Discover Precision Healing with Our Top Wound Care Products.
          </h2>
        </SlideFromLeft>
        <SlideFromRight>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-[95%] gap-8 p-6 mx-auto">
            {displayedData?.map((product: any) => (
              <div
                key={product.id}
                className="flex flex-col cursor-pointer bg-gradient  bg-gradient-to-r  rounded-lg shadow-lg overflow-hidden h-[350px] w-[100%] transform transition duration-300 hover:scale-105 from-secondary via-third to-secondary hover:via-pink-400 hover:to-secondary"
              >
                <svg
                  className="absolute bottom-0 left-0 mb-7 scale-150 group-hover:scale-[1.65] transition-transform"
                  viewBox="0 0 375 283"
                  fill="none"
                  style={{ opacity: "0.1" }}
                >
                  <rect
                    x="159.52"
                    y="175"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 159.52 175)"
                    fill="white"
                  />
                  <rect
                    y="107.48"
                    width="152"
                    height="152"
                    rx="8"
                    transform="rotate(-45 0 107.48)"
                    fill="white"
                  />
                </svg>

                <div className="relative w-full h-[65%] flex items-center justify-center overflow-hidden">
                  <Image
                    src={product.imageUrl}
                    alt={product.productName}
                    width={1000}
                    height={1000}
                    className="object-contain w-full h-full transition duration-300 hover:scale-110"
                  />
                </div>
                <div className="px-7 flex-1 flex flex-col h-[35%] mb-5 space-y-1 mt-4">
                  <span className="block text-white opacity-75 text-xs truncate">
                    {product.tagLine}
                  </span>
                  <div className="flex justify-between items-center mb-2">
                    <span className="block  font-extrabold text-md truncate bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent">
                      {product.productName}
                    </span>
                  </div>
                  <p className="text-white font-semibold text-xs opacity-80 line-clamp-3 overflow-hidden">
                    {product.productDescription}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SlideFromRight>
        {limit && (
          <div className="w-[95%] flex justify-center md:justify-end px-6 md:mt-10">
            <div>
              <Link href="/products">
                <Button
                  text="More Products...."
                  buttonStyle="px-10 md:text-xl text-md"
                />
              </Link>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default ProductMain;
