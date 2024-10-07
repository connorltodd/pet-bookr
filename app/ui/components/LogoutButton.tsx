"use client";

import { logout } from "@/app/lib/auth";

export default function LogoutButton() {
  return <button onClick={() => logout()}>Logout</button>;
}
