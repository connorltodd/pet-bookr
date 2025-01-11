import { termsOfUseContent } from "../lib/data/termsOfUse";
import Footer from "../ui/components/Footer";
import HomepageNavbar from "../ui/components/HomepageNavbar";
import InfoList from "../ui/components/InfoList";

export default function TermsOfUse() {
  return (
    <div>
      <HomepageNavbar />
      <InfoList listData={termsOfUseContent} />
      <Footer />
    </div>
  );
}
