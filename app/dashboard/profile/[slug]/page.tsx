"use client";

import Address from "@/app/ui/profile/Address";
import { usePathname } from "next/navigation";
import Profile from "../page";
import PersonalDetails from "@/app/ui/profile/PersonalDetails";
import Pets from "@/app/ui/profile/Pets";

export default function ProfileDetails() {
  const pathname = usePathname();

  // Assuming the slug is the last segment of the pathname
  const slug = pathname.split("/").filter(Boolean).pop();

  console.log(slug);

  switch (slug) {
    case "address":
      return <Address />;
    case "personal-details":
      return <PersonalDetails />;
    case "pets":
      return <Pets />;
    default:
      return <Profile />;
  }
}