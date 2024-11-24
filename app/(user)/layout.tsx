"use client";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { useVisit } from "../services/userServices/userHooks";

const Navbar = dynamic(() => import("./components/Navbar"));
const Footer = dynamic(() => import("./components/Footer"));
export default function Layout({ children }: { children: React.ReactNode }) {
  const { mutate: triggerVisit } = useVisit();
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

  useEffect(() => {
    const fetchIpAndTriggerVisit = async () => {
      try {
        const visitAlreadyTriggered = sessionStorage.getItem("hasVisited");

        if (!visitAlreadyTriggered) {
          const ipResponse = await fetch("https://api.ipify.org?format=json");
          const { ip } = await ipResponse.json();

          triggerVisit({ ipAddress: ip });

          sessionStorage.setItem("hasVisited", "true");
        }
      } catch (error) {
        console.error("Failed to fetch IP address or trigger visit:", error);
      }
    };

    fetchIpAndTriggerVisit();
  }, [triggerVisit]);

  return (
    <section className="select-none bg-gray-50">
      <Navbar />
      {children}
      <Footer />
    </section>
  );
}
