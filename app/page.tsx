import Footer from "./ui/components/Footer";
import HomepageBanner from "./ui/components/HomepageBanner";
import HomepageBenefits from "./ui/components/HomepageBenefits";
import HomepageHero from "./ui/components/HomepageHero";
import HomepageNavbar from "./ui/components/HomepageNavbar";

export default function Home() {
  return (
    <div>
      <div className="max-w-7xl m-auto">
        <HomepageNavbar />
        <HomepageHero />
        <HomepageBenefits />
      </div>
      <HomepageBanner />
      <div className="max-w-7xl m-auto"></div>
      <Footer />
    </div>
  );
}
