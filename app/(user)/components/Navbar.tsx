"use client";
import { AlignJustify } from "lucide-react";
import routes from "../util/routes.json";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/public/logo2.svg";
import { useEffect, useState } from "react";

function Navbar() {
  const pathname = usePathname();

  const [hasShadow, setHasShadow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 0.1) {
        setHasShadow(true);
      } else {
        setHasShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 bg-gray-50 overflow-x-hidden z-20 select-none start-0 w-full transition-shadow duration-300 ${
        hasShadow ? "shadow-md" : ""
      }`}
    >
      <div className="w-full flex flex-wrap items-center justify-between mx-auto px-4 py-2">
        <Link
          href="/"
          className="flex items-center justify-start space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={logo}
            alt="Logo"
            className="bg-gray-50"
            width={100}
            height={50}
            priority
          />
          <p className="font-bold text-lg md:text-xl bg-gradient-to-r from-secondary via-third to-primary bg-clip-text text-transparent">
            CytoGenesis | Pvt Ltd
          </p>
        </Link>

        <input type="checkbox" id="menu-toggle" className="hidden peer" />

        <label
          htmlFor="menu-toggle"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
        >
          <span className="sr-only">Toggle menu</span>
          <AlignJustify className="block peer-checked:hidden" />
        </label>
        <div className="hidden w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 ml-10 md:flex-row md:space-x-20 rtl:space-x-reverse md:mt-0">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  href={route.path}
                  className={`block py-2 px-3 uppercase tracking-wider md:hover:text-secondary md:p-0 font-semibold ${
                    pathname === route.path
                      ? "text-secondary font-bold"
                      : "text-primary"
                  }`}
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="w-full md:hidden overflow-hidden peer-checked:max-h-96 max-h-0 transition-all duration-1000 ease-in-out">
          <ul className="font-medium flex flex-col p-4 mt-4  rounded-lg bg-blue-800 text-blue-200 mb-10">
            {routes.map((route, index) => (
              <li key={index}>
                <Link
                  href={route.path}
                  className="block py-2 px-3 rounded hover:bg-blue-100 hover:text-blue-800"
                >
                  {route.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
