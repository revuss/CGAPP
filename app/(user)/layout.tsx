"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";

const Navbar = dynamic(() => import("./components/Navbar"));
const Footer = dynamic(() => import("./components/Footer"));
export default function Layout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const disableRightClick = (e: MouseEvent) => {
      e.preventDefault();
    };

    const disableKeyCombination = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey &&
          e.shiftKey &&
          (e.key === "" || e.key === "J" || e.key === "C")) ||
        (e.ctrlKey && e.key === "U")
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener("contextmenu", disableRightClick);
    document.addEventListener("keydown", disableKeyCombination);

    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
      document.removeEventListener("keydown", disableKeyCombination);
    };
  }, []);
  return (
    <section className="select-none bg-gray-50">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
