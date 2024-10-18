import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pet Bookr",
  description: "Welcome to Pet Bookr",
};

import { Inter } from "@next/font/google";

const inter = Inter({
  subsets: ["latin"], // or add more subsets like 'latin-ext' if needed
  weight: ["400", "500", "700"], // specify weights you need
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased min-h-lvh`}>
        {children}
      </body>
    </html>
  );
}
