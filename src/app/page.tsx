import Hero from "../components/Hero";
import WhoWeAre from "../components/WhoWeAre";
import ServicesOverview from "../components/ServicesOverview";
import ProcessSection from "../components/ProcessSection";
import CtaSection from "../components/CtaSection";
import Footer from "../components/Footer";
import MembershipLogos from "../components/MembershipLogos";
import Preloader from "../components/Preloader";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-brand-background text-white">
      <Preloader />
      <Hero />
      <WhoWeAre />
      <MembershipLogos />
      <ServicesOverview />
      <ProcessSection />
      <CtaSection />
      <Footer />
    </main>
  );
}
