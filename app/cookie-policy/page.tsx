import { cookiePolicyContent } from "../lib/data/cookiePolicy";
import Footer from "../ui/components/Footer";
import HomepageNavbar from "../ui/components/HomepageNavbar";
import InfoList from "../ui/components/InfoList";

export default function CookiePolicy() {
  return (
    <div>
      <HomepageNavbar />
      <InfoList listData={cookiePolicyContent} />
      <Footer />
    </div>
  );
}
