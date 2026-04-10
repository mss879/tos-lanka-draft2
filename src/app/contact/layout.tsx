import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact TOS Lanka | Electronics Manufacturing & EMS Inquiries Sri Lanka",
  description:
    "Contact TOS Lanka for electronic manufacturing services, contract manufacturing, OEM manufacturing, SMT assembly, THT assembly, PCB assembly, and cable harness inquiries. Located at Biyagama Export Processing Zone, Sri Lanka.",
  keywords: [
    "contact TOS Lanka", "EMS inquiry", "contract manufacturing quote",
    "PCB assembly Sri Lanka", "electronic assembly", "cable harness",
    "Biyagama", "Sri Lanka manufacturer", "electronics manufacturing inquiry",
    "request for quote", "RFQ electronics",
  ],
  openGraph: {
    title: "Contact TOS Lanka | Electronics Manufacturing Inquiries",
    description:
      "Get in touch with Sri Lanka's premier EMS provider. Request a quote for SMT, THT, PCB assembly, cable harness, and contract manufacturing services.",
    url: "https://www.toslanka.com/contact",
    siteName: "TOS Lanka",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "https://www.toslanka.com/tos-logo.png",
        width: 400,
        height: 100,
        alt: "TOS Lanka — Contact Our Electronics Manufacturing Team",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Contact TOS Lanka | EMS Inquiries Sri Lanka",
    description:
      "Request a quote for contract electronics manufacturing. SMT, THT, PCB assembly, and cable harness services.",
  },
  alternates: {
    canonical: "https://www.toslanka.com/contact",
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
