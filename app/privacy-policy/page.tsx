import { privacyPolicyContent } from "../lib/data/privacyPolicy";
import Footer from "../ui/components/Footer";
import HomepageNavbar from "../ui/components/HomepageNavbar";
import InfoList from "../ui/components/InfoList";

export default function PrivacyPolicy() {
  return (
    <div>
      <HomepageNavbar />
      <InfoList listData={privacyPolicyContent} />
      <Footer />
    </div>
  );
}
