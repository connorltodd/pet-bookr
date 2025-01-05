import HomepageBenefits from "./ui/components/HomepageBenefits";
import HomepageHero from "./ui/components/HomepageHero";
import HomepageNavbar from "./ui/components/HomepageNavbar";

export default function Home() {
  return (
    <div className="max-w-7xl m-auto">
      <HomepageNavbar />
      <HomepageHero />
      <HomepageBenefits />
      <div id="PRICING" className="h-[100vh]">
        <h1>Pricing section</h1>
      </div>
    </div>
  );
}
