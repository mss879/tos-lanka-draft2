"use client";

import React from 'react';
import SubPageNavbar from '../../components/SubPageNavbar';
import Footer from '../../components/Footer';
import FAQSection from '../../components/FAQSection';

export default function FAQPage() {
  return (
    <div className="w-full bg-black flex flex-col min-h-screen">
      <SubPageNavbar />

      <main className="flex-1 w-full bg-black px-[5px] pb-[5px] pt-16 sm:pt-20">
        <section className="relative z-10 w-full px-[5px] pb-12">
          <FAQSection />
        </section>
      </main>

      {/* Footer natively handles its own white background and top radii */}
      <Footer />
    </div>
  );
}
