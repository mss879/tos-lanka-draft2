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
  title: "TOS Lanka - Precision Electronics Manufacturing",
  description: "TOS Lanka is the only overseas manufacturing facility of Tosslec Ltd., Japan — delivering world-class printed circuit board assembly.",
};

import { SearchProvider } from "@/context/SearchContext";
import GlobalSearch from "@/components/GlobalSearch";

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
      <body className="min-h-full flex flex-col">
        <SearchProvider>
          {children}
          <GlobalSearch />
        </SearchProvider>
      </body>
    </html>
  );
}
