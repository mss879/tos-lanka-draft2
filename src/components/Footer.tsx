import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const SocialIcon = ({ href, bg, children }: { href: string; bg: string; children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="relative flex items-center justify-center w-12 h-12 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden group shadow-[0_10px_20px_rgba(0,0,0,0.4)]"
    style={{ backgroundColor: bg }}
  >
    {/* 3D Glass Surface Layers */}
    {/* Top White Highlight */}
    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] pointer-events-none" />
    
    {/* Bottom Dark Depth */}
    <div className="absolute inset-0 rounded-2xl shadow-[inset_0_-4px_8px_rgba(0,0,0,0.3)] pointer-events-none" />

    {/* Glass Curve Reflection */}
    <div className="absolute top-0 left-0 w-full h-[45%] bg-gradient-to-b from-white/40 to-transparent rounded-t-2xl pointer-events-none" />
    
    {/* Crisp Outer Rim */}
    <div className="absolute inset-0 rounded-2xl border border-white/30 group-hover:border-white/60 transition-colors duration-300 pointer-events-none" />
    
    <div className="relative z-10 text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300">
      {children}
    </div>
  </a>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white pt-10">
      <div className="relative w-full rounded-t-[40px] overflow-hidden bg-brand-background">
        <div className="relative w-full h-full glass-panel border-t border-[#484849]/30 shadow-[0_-10px_60px_rgba(0,143,40,0.1)] py-10 md:py-16">
        
        {/* Subtle top glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-brand-primary to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
            
            {/* Column 1: Logo & Description */}
          <div className="flex flex-col space-y-6">
            <div className="bg-white p-4 rounded-xl inline-block w-fit shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Image 
                src="/tos-logo.png" 
                alt="TOS Lanka Logo" 
                width={150} 
                height={50} 
                className="object-contain h-auto w-auto max-w-[150px]"
              />
            </div>
            <p className="text-white/90 text-sm leading-relaxed pr-6">
              As the sole international manufacturing facility of Tosslec Co. Ltd., Kyoto, TOS Lanka has engineered Japanese-precision electronics in Sri Lanka since 1995. Operating as a registered BOI Section 17 enterprise, we uphold uncompromising world-class quality standards.
            </p>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-white font-heading font-semibold text-xl mb-6 flex items-center">
              Our Services
              <div className="ml-4 flex-1 h-[1px] bg-gradient-to-r from-brand-primary/50 to-transparent" />
            </h3>
            <ul className="space-y-3 text-sm text-white/90">
              {[
                { label: 'SMT Assembly', slug: 'smt' },
                { label: 'Systems Integration', slug: 'system-integration' },
                { label: 'Through Hole', slug: 'through-hole' },
                { label: 'Coating & Potting', slug: 'coating-potting' },
                { label: 'Test & Inspection', slug: 'test-inspection' },
                { label: 'Prototyping', slug: 'prototype-assembling' },
                { label: 'Automotive Harnessing', slug: 'automotive-harnessing' },
                { label: 'Inductive Components', slug: 'inductive-components' },
                { label: 'Supply Chain', slug: 'supply-chain' },
              ].map((service, i) => (
                <li key={i}>
                  <Link href={`/services/${service.slug}`} className="hover:text-brand-primary transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 mr-2 group-hover:scale-150 group-hover:bg-brand-primary transition-all" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-xl mb-6 flex items-center">
              Quick Links
              <div className="ml-4 flex-1 h-[1px] bg-gradient-to-r from-brand-primary/50 to-transparent" />
            </h3>
            <ul className="space-y-3 text-sm text-white/90">
              {[
                { label: 'Home', href: '/' },
                { label: 'About Us', href: '/about' },
                { label: 'Industries', href: '/industries' },
                { label: 'Services', href: '/#services' },
                { label: 'Certifications', href: '/certification' },
                { label: 'Articles', href: '/articles' },
                { label: 'FAQ', href: '/faq' },
                { label: 'Contact', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-brand-primary transition-colors flex items-center group">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/50 mr-2 group-hover:scale-150 group-hover:bg-brand-primary transition-all" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Socials & Certifications */}
          <div className="flex flex-col space-y-8">
            <div>
              <h3 className="text-white font-heading font-semibold text-xl mb-6 flex items-center">
                Contact Details
                <div className="ml-4 flex-1 h-[1px] bg-gradient-to-r from-brand-primary/50 to-transparent" />
              </h3>
              
              <ul className="space-y-4 text-sm">
                <li>
                  <a href="mailto:dexter@toslanka.com" className="group flex flex-col">
                    <span className="text-white/90 group-hover:text-white transition-colors">dexter@toslanka.com</span>
                    <span className="text-brand-primary text-xs font-semibold mt-0.5">Drop Us a Line</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+94715349933" className="group flex flex-col">
                    <span className="text-white/90 group-hover:text-white transition-colors">+94 715 34 99 33</span>
                    <span className="text-brand-primary text-xs font-semibold mt-0.5">Call Us | WhatsApp us Now</span>
                  </a>
                </li>
                <li>
                  <a href="https://maps.google.com/?q=Block+B+BEPZ+Sri+Lanka" target="_blank" rel="noopener noreferrer" className="group flex flex-col">
                    <span className="text-white/90 group-hover:text-white transition-colors">Block "B", BEPZ, Sri Lanka.</span>
                    <span className="text-brand-primary text-xs font-semibold mt-0.5 hover:underline decoration-brand-primary underline-offset-4">Get Direction</span>
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Icons 3D */}
            <div className="flex items-center space-x-4 pt-4 border-t border-white/10">
              {/* WhatsApp */}
              <SocialIcon href="https://wa.me/+94715349933" bg="#25D366">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.662-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                </svg>
              </SocialIcon>
              
              {/* Facebook */}
              <SocialIcon href="https://web.facebook.com/toslanka" bg="#1b4195">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z"/>
                </svg>
              </SocialIcon>

              {/* LinkedIn */}
              <SocialIcon href="https://www.linkedin.com/company/tos-lanka-co-pvt-ltd/" bg="#0f72aa">
                <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/>
                </svg>
              </SocialIcon>
            </div>
            
          </div>
        </div>

        {/* Bottom Logo, ARC AI Credit, BV_Cert */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10 w-full">
          <div className="flex items-center text-sm text-white/70 md:w-1/3">
            © {currentYear} TOS Lanka Co. (Pvt.) Ltd. All rights reserved.
          </div>
          
          <div className="flex items-center justify-center md:w-1/3 text-sm text-white/70">
            <a
              href="https://www.arcai.agency"
              target="_blank"
              rel="noopener"
              title="ARC AI - Web Design & Digital Solutions"
              className="flex items-center hover:text-white transition-colors group"
            >
              Designed & Developed by
              <img 
                src="/arc%20logo.png" 
                alt="ARC AI - Web Design & Digital Solutions" 
                className="h-8 w-auto ml-2 mt-1 object-contain opacity-90 group-hover:opacity-100 transition-opacity" 
              />
            </a>
          </div>

          <div className="flex items-center justify-end md:w-1/3">
            <Image 
              src="/BV_Cert_ISO_9001_-UKAS_-768x305.png" 
              alt="Bureau Veritas ISO Certification" 
              width={200} 
              height={80} 
              className="object-contain"
            />
          </div>
        </div>

      </div>
        </div>
      </div>
    </footer>
  );
}
