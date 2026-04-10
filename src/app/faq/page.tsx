
import React from 'react';
import Link from 'next/link';
import { ArrowRight, MessageSquare } from 'lucide-react';
import SubPageNavbar from '../../components/SubPageNavbar';
import Footer from '../../components/Footer';
import FAQSection from '../../components/FAQSection';

export default function FAQPage() {
  return (
    <div className="w-full bg-[#f8f9fb] flex flex-col min-h-screen">
      <SubPageNavbar />

      <main className="flex-1 w-full relative pt-16 sm:pt-20">
        {/* Soft Background Gradients */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-white via-brand-primary/[0.03] to-[#f8f9fb] pointer-events-none" />
        <div className="absolute top-1/4 -left-1/4 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-brand-tertiary/5 rounded-full blur-[100px] pointer-events-none" />

        <section className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 pb-12">
          <FAQSection />
        </section>

        {/* Call to action section */}
        <section className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 pb-24">
          <div className="w-full bg-white shadow-xl shadow-black/[0.03] border border-black/5 rounded-[2.5rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 overflow-hidden relative group">
            {/* Background glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/0 via-brand-primary/[0.02] to-brand-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
            
            <div className="flex-1 z-10">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-brand-primary/10 text-brand-primary mb-6">
                <MessageSquare size={28} />
              </div>
              <h3 className="text-3xl md:text-4xl font-heading font-bold text-black mb-4">
                Still have questions?
              </h3>
              <p className="text-black/60 text-lg max-w-xl leading-relaxed">
                Can't find the answer you're looking for? Our engineering and sales teams are standing by to help you with your specific project requirements.
              </p>
            </div>
            <div className="z-10 shrink-0">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-lg transition-all shadow-[0_8px_20px_rgba(0,143,40,0.2)] hover:shadow-[0_12px_25px_rgba(0,143,40,0.3)] transform hover:-translate-y-1"
              >
                Get in Touch
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
