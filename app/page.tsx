import HomepageHero from "./ui/components/HomepageHero";
import HomepageNavbar from "./ui/components/HomepageNavbar";

export default function Home() {
  return (
    <div className="max-w-7xl m-auto">
      <HomepageNavbar />
      <HomepageHero />
      <div id="PRICING" className="h-[100vh]">
        <h1>Pricing section</h1>
      </div>
      {/* Homepage Hero here */}
      {/* Header (Hero Section): "Find the Perfect Groomer for Your Pup, Anytime,
      Anywhere!" Discover top-rated dog groomers near you and book appointments
      24/7 with ease. CTA Button: Get Started Now */}
    </div>
  );
}
