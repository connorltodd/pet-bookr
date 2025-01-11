"use client";

import moment from "moment";
import PetBookrLogo from "./PetBookrLogo";
import Link from "next/link";

export default function Footer() {
  return (
    <div className="bg-primary">
      <footer className="footer m-auto max-w-7xl text-white p-10">
        <aside>
          <PetBookrLogo height={40} width={40} fontSize="text-xl" />
          <p className="w-[60%] mb-2">
            Discover top-rated dog groomers near you and book appointments 24/7
            with ease.
          </p>
          <p>Copyright © {moment().year()} - All rights reserved</p>
        </aside>
        <nav>
          <h6 className="footer-title">Links</h6>
          <button
            onClick={() =>
              document
                .getElementById("BENEFITS")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="link link-hover"
          >
            Benefits
          </button>
          <button
            onClick={() =>
              document
                .getElementById("FAQ")
                ?.scrollIntoView({ behavior: "smooth", block: "start" })
            }
            className="link link-hover"
          >
            FAQ
          </button>
          <Link className="link link-hover" href="/login">
            Login / Signup
          </Link>
          {/* TODO: connect the correct link here */}
          <a className="link link-hover">Business Signup</a>
        </nav>
        <nav>
          <h6 className="footer-title">Legal</h6>
          <Link href="/cookie-policy" className="link link-hover">
            Cookie policy
          </Link>
          <Link href="/privacy-policy" className="link link-hover">
            Privacy policy
          </Link>
          <Link href="/terms-of-use" className="link link-hover">
            Terms of use
          </Link>
        </nav>
      </footer>
    </div>
  );
}
