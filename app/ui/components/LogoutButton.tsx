"use client";

import { logout } from "@/app/lib/auth";

export default function LogoutButton() {
  return (
    <button
      className="btn btn-outline border-primary text-primary hover:btn-primary hover:text-white"
      onClick={() => logout()}
    >
      Logout
    </button>
  );
}
