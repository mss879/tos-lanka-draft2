import { Metadata } from "next";
import SubPageNavbar from "../../components/SubPageNavbar";
import Footer from "../../components/Footer";
import AboutPageContent from "../../components/AboutPageContent";

/* ─── SEO METADATA ───────────────────────────────────── */
export const metadata: Metadata = {
  title:
    "About TOS Lanka — Pioneer EMS & Electronics Manufacturer, Sri Lanka",
  description:
    "TOS Lanka (Pvt) Ltd is a 100% Japanese-owned EMS provider established in 1995. We deliver world-class electronic manufacturing, contract manufacturing & OEM solutions from Sri Lanka to global markets.",
  keywords: [
    "about TOS Lanka",
    "EMS provider Sri Lanka",
    "Electronic Manufacturing Services",
    "Japanese electronics manufacturer Sri Lanka",
    "contract manufacturing Sri Lanka",
    "OEM manufacturing",
    "electronic assembly",
    "Biyagama Export Processing Zone",
    "Tosslec Company",
    "TOS Lanka history",
  ],
  openGraph: {
    title: "About TOS Lanka — Pioneer EMS Provider in Sri Lanka",
    description:
      "A fully Japanese-owned Electronic Manufacturing Services provider with 30+ years of expertise, serving global markets from Sri Lanka.",
    url: "https://www.toslanka.com/about",
    type: "website",
    images: [
      {
        url: "/about/WhatsApp Image 2026-03-30 at 2.32.19 PM.jpeg",
        width: 1200,
        height: 630,
        alt: "TOS Lanka manufacturing team on the electronics assembly floor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TOS Lanka — Pioneer EMS Provider in Sri Lanka",
    description:
      "100% Japanese-owned EMS provider with 30+ years of expertise. SMT, THT, PCB assembly, cable harness & more from Sri Lanka.",
    images: ["/about/WhatsApp Image 2026-03-30 at 2.32.19 PM.jpeg"],
  },
  alternates: {
    canonical: "https://www.toslanka.com/about",
  },
};

/* ─── PAGE-SPECIFIC JSON-LD ──────────────────────────── */
const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": "https://www.toslanka.com/about/#aboutpage",
      name: "About TOS Lanka",
      url: "https://www.toslanka.com/about",
      description:
        "TOS Lanka (Pvt) Ltd is a fully Japanese-owned Electronic Manufacturing Services provider established in 1995, delivering world-class electronic assembly from Sri Lanka's Biyagama Export Processing Zone.",
      mainEntity: {
        "@id": "https://www.toslanka.com/#organization",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.toslanka.com/about/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.toslanka.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Us",
          item: "https://www.toslanka.com/about",
        },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://www.toslanka.com/about/#president",
      name: "Jitsuo Mikasa",
      jobTitle: "President",
      worksFor: {
        "@id": "https://www.toslanka.com/#organization",
      },
      image: "https://www.toslanka.com/about images/president.jpeg",
    },
    {
      "@type": "Person",
      "@id": "https://www.toslanka.com/about/#ceo",
      name: "Merrick Gooneratne",
      jobTitle: "Chief Executive Officer",
      worksFor: {
        "@id": "https://www.toslanka.com/#organization",
      },
      image: "https://www.toslanka.com/about images/Ceo.jpeg",
      award: [
        "Order of the Rising Sun Gold Rays with Rosette (2014)",
        "Japanese Foreign Minister's Commendation (2011)",
      ],
    },
  ],
};

export default function AboutPage() {
  return (
    <div className="w-full bg-[#f8f9fa] flex flex-col min-h-screen selection:bg-brand-primary selection:text-white">
      <SubPageNavbar />

      {/* Page-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <main className="flex-1 w-full bg-[#f8f9fa] px-[5px] pb-[5px] pt-[88px] sm:pt-[96px]">
        <article className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-white shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05),inset_0_2px_20px_rgba(255,255,255,0.8)] border border-black/[0.03] p-2 sm:p-4 md:p-6 overflow-hidden">
          {/* Ambient gradients — server-rendered, zero JS cost */}
          <div
            className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-tertiary/[0.03] blur-[150px] pointer-events-none"
            style={{ willChange: "transform" }}
            aria-hidden="true"
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-primary/[0.04] blur-[150px] pointer-events-none"
            style={{ willChange: "transform" }}
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70 pointer-events-none"
            aria-hidden="true"
          />

          <div className="w-full h-full max-w-[1400px] mx-auto relative z-10 px-0">
            <AboutPageContent />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
