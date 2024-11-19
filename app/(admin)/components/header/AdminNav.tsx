"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminNav: React.FC = () => {
  const pathname = usePathname();

  const navItems = [
    { path: "/admin/visitors", label: "Visitors Details" },
    { path: "/admin/contacts", label: "Contact Details" },
    { path: "/admin/careers", label: "Career Details" },
    { path: "/admin/users", label: "User Details" },
    { path: "/admin/products", label: "Product Details" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="flex-1 w-full px-2 text-white font-medium space-y-1">
      {navItems.map((item) => (
        <Link
          key={item.path}
          href={item.path}
          className={`cursor-pointer text-start p-2 block  ${
            isActive(item.path) ? "bg-white text-theme" : ""
          } hover:bg-white hover:text-theme transition-all duration-300 rounded w-full`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default AdminNav;
