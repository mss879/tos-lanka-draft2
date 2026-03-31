import React from 'react';
import { ArrowRight, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

export default function CtaSection() {
  return (
    <section className="bg-white text-black py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6">
          Ready to Start Your Project?
        </h2>
        <p className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Whether you need a rapid prototype, a production run of 10,000 units, or a custom automotive harness — our engineering team is ready to discuss your requirements.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link 
            href="/contacts" 
            className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white bg-brand-primary rounded-full hover:bg-brand-primary-hover transition-all duration-300 transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(0,143,40,0.3)]"
          >
            Request a Free Quote
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-gray-600">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-brand-primary" />
            <span>Prefer email? <a href="mailto:dexter@toslanka.com" className="font-semibold text-black hover:text-brand-primary transition-colors">dexter@toslanka.com</a></span>
          </div>
          <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300"></div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-brand-primary" />
            <span>Call us <a href="tel:+94112465160" className="font-semibold text-black hover:text-brand-primary transition-colors">+94 112 465 160</a> <span className="text-sm">(Mon–Fri, 8am–7pm IST)</span></span>
          </div>
        </div>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gray-100 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute top-1/2 -right-24 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-3xl opacity-50"></div>
      </div>
    </section>
  );
}
