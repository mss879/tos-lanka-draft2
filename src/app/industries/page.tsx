import { Metadata } from "next";
import SubPageNavbar from "../../components/SubPageNavbar";
import Footer from "../../components/Footer";
import IndustriesPageContent from "../../components/IndustriesPageContent";

/* ─── SEO METADATA ───────────────────────────────────── */
export const metadata: Metadata = {
  title: "Industries We Serve | Automotive, Medical & Industrial EMS | TOS Lanka",
  description: "TOS Lanka empowers global innovators through world-class Electronic Manufacturing Services (EMS). Serving Automotive, Medical, Telecommunications, IoT, and more.",
  keywords: [
    "automotive electronics manufacturing",
    "medical device assembly",
    "industrial electronics EMS",
    "IoT device assembly",
    "telecommunications manufacturing",
    "smart garments electronics",
    "EMS industries Sri Lanka",
    "TOS Lanka capabilities",
    "contract manufacturing industries"
  ],
  openGraph: {
    title: "Industries We Serve | Automotive, Medical & Industrial EMS",
    description: "World-class Electronic Manufacturing Services empowering sectors from Automotive to Medical devices and IoT. Partner with Sri Lanka's pioneer EMS provider.",
    type: "website",
    url: "https://www.toslanka.com/industries",
    images: [
      {
        url: "/tos-logo.png", // Will default to logo, assuming specific industry graphic isn't designated for OG
        width: 1200,
        height: 630,
        alt: "TOS Lanka Industries Served",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Industries We Serve | Automotive, Medical & Industrial EMS | TOS Lanka",
    description: "Driving innovation across Automotive, Medical, Telecommunications, and IoT through world-class Electronic Manufacturing Services.",
  },
  alternates: {
    canonical: "https://www.toslanka.com/industries",
  },
};

/* ─── PAGE-SPECIFIC JSON-LD ──────────────────────────── */
const industriesJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": "https://www.toslanka.com/industries/#webpage",
      name: "Industries Served by TOS Lanka",
      url: "https://www.toslanka.com/industries",
      description: "TOS Lanka provides specialized electronic manufacturing solutions for Industrial Automation, Automotive, Medical Devices, Telecommunications, IoT, and High-end Consumer electronics.",
      isPartOf: {
        "@id": "https://www.toslanka.com/#website",
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.toslanka.com/industries/#breadcrumb",
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
          name: "Industries",
          item: "https://www.toslanka.com/industries",
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": "https://www.toslanka.com/industries/#itemlist",
      name: "Key Industries Supported by TOS Lanka",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Industrial & Automation",
          description: "Advanced electronic solutions for oil drilling, factory automation, and energy management."
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Automotive",
          description: "Safety-critical electronics including airbag sensor harnesses and EV cable assemblies."
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Medical",
          description: "High-reliability manufacturing for health monitoring devices and anesthesia equipment."
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Telecommunication",
          description: "Connectivity solutions such as signal repeaters and set-top boxes."
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "IoT & Smart Apparel",
          description: "Smart home systems, smart garments, and environmental monitoring devices."
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "High-end Consumer",
          description: "Temperature control systems and sophisticated age-assistance computing devices."
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Agriculture",
          description: "High-tech environmental solutions like pesticide-free Anti Moth LED Lamps."
        }
      ]
    }
  ],
};

export default function IndustriesPage() {
  return (
    <div className="w-full bg-[#f8f9fa] flex flex-col min-h-screen selection:bg-brand-primary selection:text-white">
      <SubPageNavbar />

      {/* Page-specific JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(industriesJsonLd) }}
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
            <IndustriesPageContent />
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
