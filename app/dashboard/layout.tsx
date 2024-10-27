"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/ui/components/Navbar";
import { UserProvider } from "../contexts/userContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  return (
    <div className="max-w-[1440px] m-auto">
      <UserProvider>
        {!pathname.includes("/onboarding") && <Navbar />}
        {children}
      </UserProvider>
    </div>
  );
}
