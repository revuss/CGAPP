"use client";
import logo from "@/public/logo2.svg";
import { CircleArrowOutUpRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import AdminNav from "./AdminNav";
import NavTop from "./NavTop";

function Header({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <section className="bg-white overflow-x-hidden">
      <motion.aside
        animate={{ x: sidebarOpen ? 0 : -256 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="flex-shrink-0 w-64 fixed top-0 left-0 h-screen space-y-7 pt-7 from-secondary bg-gradient bg-gradient-to-r via-third to-secondary"
      >
        <div className="flex pl-4 items-center space-x-1  w-full">
          <Link
            href="/admin"
            className="flex items-center  rtl:space-x-reverse"
          >
            <Image src={logo} alt="Logo" width={40} height={40} priority />
          </Link>
          <h2 className="font-bold  text-lg text-gray-200 tracking-widest">
            CytoGenesis
          </h2>
        </div>
        <AdminNav />
      </motion.aside>

      <motion.div
        className="bg-theme flex-1 flex flex-col"
        animate={{ marginLeft: sidebarOpen ? 256 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className=" border-none flex items-center p-4 text-gray-900 top-0 sticky from-secondary bg-gradient bg-gradient-to-r via-third to-secondary">
          <div
            className="p-1 mr-4 border-none outline-none "
            onClick={toggleSidebar}
          >
            <motion.div
              animate={{ rotate: sidebarOpen ? 225 : 45 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className=" border-none  cursor-pointer "
            >
              <CircleArrowOutUpRight
                className=" text-white  border-none "
                size={50}
              />
            </motion.div>
          </div>
          <NavTop />
        </div>
        <div className="overflow-y-visible bg-white w-full">{children}</div>
      </motion.div>
    </section>
  );
}

export default Header;
