"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PetBookrLogo from "./PetBookrLogo";
import LogoutButton from "./LogoutButton";

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
    <div className="">
      {/* Hamburger Icon */}
      <div className="flex justify-end lg:hidden pt-5 pr-7 pb-0 md:p-12">
        <button
          onClick={toggleDrawer}
          className="text-black focus:outline-none focus:text-black"
        >
          <FontAwesomeIcon icon={faBars} className="fas fa-bars h-7 w-7" />
        </button>
      </div>

      {/* Desktop Menu */}
      <nav
        className="lg:flex hidden justify-between items-center py-4 px-8"
        role="navigation"
      >
        {/* Logo */}
        <Link href="/dashboard/businesses">
          <PetBookrLogo height={60} width={60} fontSize="text-xl" />
        </Link>
        <div className="flex gap-12 items-center">
          <Link className="text-md" href="/dashboard/businesses">
            Find a Groomer
          </Link>
          <Link className="text-md" href="/dashboard/bookings">
            Bookings
          </Link>
          <Link className="text-md" href="/dashboard/profile">
            Profile
          </Link>
          <LogoutButton />
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 z-20 right-0 bg-white w-64 transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <nav className="bg-white p-4" role="navigation">
          <Link href="/dashboard/businesses">
            <div className="flex justify-center items-center gap-4">
              <PetBookrLogo height={60} width={60} fontSize="text-xl" />
            </div>
          </Link>
          <div className="w-[170px] m-auto flex flex-col gap-8 mt-8">
            <Link className="text-md" href="/dashboard/businesses">
              Find a Groomer
            </Link>
            <Link className="text-md" href="/dashboard/bookings">
              Bookings
            </Link>
            <Link className="text-md" href="/dashboard/profile">
              Profile
            </Link>
            <LogoutButton />
          </div>
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
