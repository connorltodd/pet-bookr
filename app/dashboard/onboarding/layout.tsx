import OnboardingProvider from "@/app/contexts/onboardingContext";
import PetBookrLogo from "@/app/ui/components/PetBookrLogo";

export default async function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="p-5 m-0 flex justify-start">
        <PetBookrLogo fontSize="text-xl" height={50} width={50} />
      </div>
      <OnboardingProvider>
        <div className="flex flex-col items-center mt-10 md:mt-20  min-h-lvh ml-4 mr-4">
          <div className="relative min-w-[350px] max-w-[700px] min-h-[400px] form-control p-6 flex gap-4 bg-base-100 rounded-box shadow-xl">
            {children}
          </div>
        </div>
      </OnboardingProvider>
    </div>
  );
}
