"use client";

import Navbar from "@/app/ui/components/Navbar";
import { UserProvider } from "../contexts/userContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1440px] m-auto">
      <UserProvider>
        <Navbar />
        {children}
      </UserProvider>
    </div>
  );
}
