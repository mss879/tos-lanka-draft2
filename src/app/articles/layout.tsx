import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Electronics Manufacturing Articles & Expert Guides | SMT, THT, EMS, PCB Assembly",
  description: "Expert articles on Surface Mount Technology (SMT), Through Hole Assembly (THT), Electronic Manufacturing Services (EMS), printed circuit board assembly, contract manufacturing, conformal coating, in-circuit testing, and more from TOS Lanka Sri Lanka.",
  keywords: [
    "SMT articles", "THT guide", "EMS Sri Lanka", "PCB assembly guide",
    "electronic manufacturing articles", "contract manufacturing guide",
    "conformal coating", "in circuit testing", "medical device assembly",
    "automotive electronics", "cable harness", "coil winding"
  ],
  openGraph: {
    title: "Electronics Manufacturing Articles | TOS Lanka",
    description: "Expert guides on SMT, THT, EMS, PCB assembly, and more from Sri Lanka's pioneer electronics manufacturer.",
    type: "website",
  },
  alternates: {
    canonical: "https://www.toslanka.com/articles",
  },
};

export default function ArticlesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
