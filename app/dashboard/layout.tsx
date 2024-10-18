import Navbar from "@/app/ui/components/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[1440px] m-auto">
      <Navbar />
      {children}
    </div>
  );
}
