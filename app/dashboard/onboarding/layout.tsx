import OnboardingProvider from "@/app/contexts/onboardingContext";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <OnboardingProvider>
        <div className="flex items-center justify-center min-h-lvh ml-4 mr-4">
          <div className="relative min-w-[350px] max-w-[700px] min-h-[400px] form-control p-6 flex gap-4 bg-base-100 rounded-box shadow-xl">
            {children}
          </div>
        </div>
      </OnboardingProvider>
    </div>
  );
}
