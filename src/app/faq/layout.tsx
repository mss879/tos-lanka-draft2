import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | EMS, PCB Assembly & Contract Manufacturing",
  description: "Get answers about TOS Lanka's electronic manufacturing services — lead times, minimum order quantities, prototyping, printed circuit board assembly, SMT & THT capabilities, and shipping for contract manufacturing in Sri Lanka.",
  keywords: [
    "EMS FAQ", "PCB assembly questions", "contract manufacturing FAQ",
    "SMT assembly", "THT assembly", "prototyping", "electronic assembly",
    "Sri Lanka manufacturing"
  ],
  alternates: {
    canonical: "https://www.toslanka.com/faq",
  },
};

export default function FAQLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
