"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  return (
    <div>
      {/* Hamburger Icon */}
      <div className="flex justify-end lg:hidden pt-4 pb-0 md:p-12">
        <button
          onClick={toggleDrawer}
          className="text-white focus:outline-none focus:text-white"
        >
          <FontAwesomeIcon icon={faBars} className="fas fa-bars h-10 w-10" />
        </button>
      </div>

      {/* Desktop Menu */}
      <nav className="lg:flex hidden bg-white" role="navigation">
        <Link className="text-blue-500 text-2xl" href="/home">
          Home
        </Link>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 z-20 right-0 bg-white w-64 transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <nav className="bg-white" role="navigation">
          <Link className="text-blue-500 text-2xl" href="/home">
            Home
          </Link>
        </nav>
      </div>

      {/* Mobile Menu Overlay (hidden by default) */}
      {drawerOpen && (
        <div
          onClick={toggleDrawer}
          className="fixed inset-0 z-10 bg-black opacity-80 lg:hidden"
        ></div>
      )}
    </div>
  );
}
