import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Certifications & Quality Standards | ISO 9001, ISO 14001, ISO 45001 & NMRA | TOS Lanka",
  description:
    "TOS Lanka holds triple ISO certification (ISO 9001:2015, ISO 14001:2015, ISO 45001:2018) and NMRA approval for medical device assembly. Presidential Export Awards winner — Sri Lanka's most certified EMS provider.",
  keywords: [
    "ISO 9001", "ISO 14001", "ISO 45001", "IATF", "NMRA",
    "medical device assembly", "quality certifications",
    "EMS certifications", "Sri Lanka", "electronics manufacturing",
    "Presidential Export Award", "Bureau Veritas", "quality management",
    "environmental management", "occupational health safety",
  ],
  openGraph: {
    title: "Certifications & Quality Standards | TOS Lanka",
    description:
      "Triple ISO certified, NMRA approved, Presidential Export Awards winner. Sri Lanka's most certified EMS provider.",
    url: "https://www.toslanka.com/certification",
    siteName: "TOS Lanka",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.toslanka.com/certificates/iso.webp",
        width: 1200,
        height: 630,
        alt: "TOS Lanka ISO Certifications — ISO 9001, ISO 14001, ISO 45001",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications & Quality Standards | TOS Lanka",
    description:
      "Triple ISO certified, NMRA approved, Presidential Export Awards winner.",
    images: ["https://www.toslanka.com/certificates/iso.webp"],
  },
  alternates: {
    canonical: "https://www.toslanka.com/certification",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
};

export default function CertificationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
