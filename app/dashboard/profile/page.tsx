"use client";

import { useUserContext } from "@/app/contexts/userContext";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function Profile() {
  const { user } = useUserContext();

  return (
    <div className="px-4">
      <div className="w-90 max-w-[550px] m-auto mt-10">
        <h1 className="text-xl my-7">
          Welcome {user?.first_name} {user?.last_name}
        </h1>
        <div className="flex flex-col gap-6">
          <Link
            href="/dashboard/profile/personal-details"
            className="size-full bg-base-100 rounded-box shadow-xl h-[50px] flex justify-between items-center px-6"
          >
            <p>Personal Details</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="fas fa-arrow-right h-4 w-4"
            />
          </Link>
          <Link
            href="/dashboard/profile/address"
            className="size-full bg-base-100 rounded-box shadow-xl h-[50px] flex justify-between items-center px-6"
          >
            <p>Address</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="fas fa-arrow-right h-4 w-4"
            />
          </Link>
          <Link
            href="/dashboard/profile/pets"
            className="size-full bg-base-100 rounded-box shadow-xl h-[50px] flex justify-between items-center px-6"
          >
            <p>Pets</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="fas fa-arrow-right h-4 w-4"
            />
          </Link>
          <button className="size-full bg-base-100 rounded-box shadow-xl h-[50px] flex justify-between items-center px-6">
            <p>Manage Payment Methods</p>
            <FontAwesomeIcon
              icon={faArrowRight}
              className="fas fa-arrow-right h-4 w-4"
            />
          </button>
        </div>
      </div>
    </div>
  );
}
