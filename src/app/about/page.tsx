import { Metadata } from "next";
import SubPageNavbar from "../../components/SubPageNavbar";
import Footer from "../../components/Footer";
import AboutPageContent from "../../components/AboutPageContent";

export const metadata: Metadata = {
  title:
    "About TOS Lanka | Pioneer EMS Provider in Sri Lanka — Japanese-Owned Electronics Manufacturing",
  description:
    "TOS Lanka (Pvt) Ltd — a fully Japanese-owned EMS provider established in 1995, delivering world-class electronic manufacturing solutions from Sri Lanka. Subsidiary of Tosslec Company, Kyoto. Serving global markets: Japan, Germany, USA, Norway, Switzerland, Canada & Australia.",
  openGraph: {
    title: "About TOS Lanka | Pioneer EMS Provider in Sri Lanka",
    description:
      "A fully Japanese-owned Electronic Manufacturing Services provider with 30+ years of expertise, serving global markets from Sri Lanka's Biyagama Export Processing Zone.",
    type: "website",
    images: [
      {
        url: "/about/WhatsApp Image 2026-03-30 at 2.32.19 PM.jpeg",
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#f8f9fa] flex flex-col min-h-screen selection:bg-brand-primary selection:text-white">
      <SubPageNavbar />

      <main className="flex-1 w-full bg-[#f8f9fa] px-[5px] pb-[5px] pt-[88px] sm:pt-[96px]">
        <section className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-white shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05),inset_0_2px_20px_rgba(255,255,255,0.8)] border border-black/[0.03] p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Ambient gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-tertiary/[0.03] blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-primary/[0.04] blur-[150px] pointer-events-none" />
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70 pointer-events-none" />

          <div className="w-full h-full max-w-[1400px] mx-auto relative z-10 px-0">
            <AboutPageContent />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
