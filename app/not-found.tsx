import Link from "next/link";
import notFound from "@/public/notFound.svg";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center flex-1 flex-col h-screen px-2 bg-gray-50">
      <h1 className="md:text-4xl text-xl font-semibold mb-5 text-center">
        Oops! Page Not Found (404)
      </h1>
      <p className="text-sm md:text-md font-semibold w-[90%] md:w-[50%] text-center">
        It looks like the page you’re looking for doesn’t exist. This might be
        due to a typo, an outdated link, or the page may have been moved.
      </p>
      <Image src={notFound} width={700} height={600} priority alt="404 Page" />
      <div className="bg-secondary cursor-pointer px-7 py-2 rounded-lg text-white font-semibold text-xs md:text-xl">
        <div className="flex space-x-4 md:space-x-10">
          <div className="hover:underline underline-offset-4 ease-in-out duration-500 cursor-pointer">
            <Link href={"/"}>Home</Link>
          </div>
          <div className="hover:underline underline-offset-4 ease-in-out duration-500 cursor-pointer">
            <Link href={"about"}>About</Link>
          </div>
          <div className="hover:underline underline-offset-4 ease-in-out duration-500 cursor-pointer">
            <Link href={"products"}> Products</Link>
          </div>
          <div className="hover:underline underline-offset-4 ease-in-out duration-500 cursor-pointer">
            <Link href={"contact"}> Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
