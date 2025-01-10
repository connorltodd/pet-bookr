"use client";

import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import PetBookrLogo from "./PetBookrLogo";

export default function HomepageNavbar() {
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
      <div className="flex justify-between items-center lg:hidden pt-5 px-7 pb-0 md:p-12">
        <Link href={"/"}>
          <div className="flex justify-center items-center gap-4">
            <PetBookrLogo height={40} width={40} fontSize="text-xl" />
          </div>
        </Link>
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
        <Link href={"/"}>
          <PetBookrLogo height={60} width={60} fontSize="text-xl" />
        </Link>
        <div className="flex gap-12 items-center">
          <button
            onClick={() =>
              document
                .getElementById("BENEFITS")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="text-md cursor-pointer"
          >
            Benefits
          </button>
          <button
            onClick={() =>
              document
                .getElementById("FAQ")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="text-md cursor-pointer"
          >
            FAQ
          </button>
          <Link
            className="text-md cursor-pointer btn btn-primary"
            href="/login"
          >
            Login / Signup
          </Link>
          {/* TODO: connect the correct link here */}
          <a className="text-md cursor-pointer btn btn-outline border-primary text-primary hover:btn-primary hover:text-white">
            Business Signup
          </a>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-y-0 z-20 right-0 bg-white w-64 transform ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 lg:hidden`}
      >
        <nav className="bg-white p-4" role="navigation">
          <Link href="/">
            <div className="flex justify-center items-center gap-4">
              <PetBookrLogo height={60} width={60} fontSize="text-xl" />
            </div>
          </Link>
          <div className="w-[170px] m-auto flex flex-col gap-8 mt-8">
            <button
              onClick={() => {
                setDrawerOpen(false);
                document
                  .getElementById("BENEFITS")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-md cursor-pointer"
            >
              Benefits
            </button>
            <button
              onClick={() => {
                setDrawerOpen(false);
                document
                  .getElementById("FAQ")
                  ?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="text-md cursor-pointer"
            >
              FAQ
            </button>
            <Link
              className="text-md cursor-pointer btn btn-primary"
              href="/login"
            >
              Login / Signup
            </Link>
            {/* TODO: connect the correct link here */}
            <a className="text-md cursor-pointer btn btn-outline border-primary text-primary hover:btn-primary hover:text-white">
              Business Signup
            </a>
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
