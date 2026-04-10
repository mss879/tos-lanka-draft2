import type { Metadata } from "next";
import { Rajdhani, Manrope } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toslanka.com"),
  title: {
    default: "TOS Lanka | EMS & Contract Electronics Manufacturing in Sri Lanka — SMT, THT, PCB Assembly",
    template: "%s | TOS Lanka",
  },
  description: "TOS Lanka is Sri Lanka's pioneer Electronic Manufacturing Services (EMS) provider — a 100% Japanese-owned facility delivering world-class SMT assembly, through hole assembly (THT), printed circuit board (PCB) assembly, box build, cable harness manufacturing, conformal coating, in-circuit testing, coil winding, and prototyping. Contract manufacturing and OEM manufacturing for automotive, medical, and industrial electronics.",
  keywords: [
    "SMT", "Surface Mount Technology", "THT", "Through hole assembly",
    "EMS", "Electronic Manufacturing Services", "electronic assembly",
    "contract manufacturing", "OEM manufacturing",
    "cable harness", "automotive electronics", "medical electronics",
    "industrial electronics", "coil winding", "control systems",
    "printed circuit boards", "PCB assembly",
    "box build assembly", "prototyping",
    "reflow soldering", "wave soldering", "manual soldering",
    "epoxy filling", "conformal coating",
    "in circuit testing", "medical device assembly",
    "Sri Lanka", "electronics manufacturing Sri Lanka"
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "TOS Lanka",
    title: "TOS Lanka | EMS & Contract Electronics Manufacturing in Sri Lanka",
    description: "Sri Lanka's pioneer EMS provider — 100% Japanese-owned, triple ISO certified. SMT, THT, PCB assembly, cable harness, conformal coating, prototyping, and box build for global OEMs.",
  },
  alternates: {
    canonical: "https://www.toslanka.com",
  },
};

import { SearchProvider } from "@/context/SearchContext";
import GlobalSearch from "@/components/GlobalSearch";
import { AiChatWidget } from "@/components/ai-chat-widget";
import Navbar from "@/components/Navbar";

/* JSON-LD Structured Data */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.toslanka.com/#organization",
      name: "TOS Lanka Co. (Pvt.) Ltd.",
      alternateName: "TOS Lanka",
      url: "https://www.toslanka.com",
      logo: "https://www.toslanka.com/tos-logo.png",
      description: "Sri Lanka's pioneer Electronic Manufacturing Services (EMS) provider — 100% Japanese-owned subsidiary of Tosslec Company Limited, Kyoto. Contract electronics manufacturing including SMT, THT, PCB assembly, cable harness, conformal coating, and box build assembly.",
      foundingDate: "1995",
      parentOrganization: {
        "@type": "Organization",
        name: "Tosslec Company Limited",
        url: "https://www.tosslec.co.jp/",
      },
      sameAs: [
        "https://www.linkedin.com/company/tos-lanka-co-pvt-ltd/",
        "https://web.facebook.com/toslanka",
      ],
      contactPoint: [
        {
          "@type": "ContactPoint",
          telephone: "+94-715-349-933",
          contactType: "sales",
          email: "dexter@toslanka.com",
          availableLanguage: ["English", "Japanese"],
        },
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Block B, Biyagama Export Processing Zone",
        addressLocality: "Biyagama",
        postalCode: "11672",
        addressCountry: "LK",
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://www.toslanka.com/#localbusiness",
      name: "TOS Lanka Co. (Pvt.) Ltd.",
      image: "https://www.toslanka.com/tos-logo.png",
      telephone: "+94-715-349-933",
      email: "info@toslanka.com",
      url: "https://www.toslanka.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Block B, Biyagama Export Processing Zone",
        addressLocality: "Biyagama",
        addressRegion: "Western Province",
        postalCode: "11672",
        addressCountry: "LK",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 7.0234,
        longitude: 79.9811,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "17:00",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${rajdhani.variable} ${manrope.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <SearchProvider>
          <Navbar />
          {children}
          <GlobalSearch />
          <AiChatWidget />
        </SearchProvider>
      </body>
    </html>
  );
}
