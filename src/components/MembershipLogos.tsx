"use client";

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const LOGOS = [
  { src: '/Memberships/Picture2.png', alt: 'Membership Logo 2' },
  { src: '/Memberships/Picture3.png', alt: 'Membership Logo 3' },
  { src: '/Memberships/Picture4.png', alt: 'Membership Logo 4' },
  { src: '/Memberships/Picture5.png', alt: 'Membership Logo 5' },
  { src: '/Memberships/Picture6.png', alt: 'Membership Logo 6' },
];

export default function MembershipLogos() {
  const scrollItems = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="w-full bg-[#f8f9fb] pt-8 pb-16 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col items-center">
      
      {/* Prominent Grid Background */}
      <div className="absolute inset-x-0 top-0 h-[300px] bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:30px_30px] opacity-100 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-tertiary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-[1400px] px-6 sm:px-8 mb-8 md:mb-12 relative z-10 flex justify-center">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="w-full max-w-3xl text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-blue-600 uppercase">
              Global Network
            </span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-semibold tracking-tighter text-black font-heading mb-5">
            Professional Memberships
          </h2>
          
          <p className="text-[14px] md:text-base text-black/60 leading-relaxed font-medium">
            We proudly associate with leading global organizations. These strategic memberships reflect our unwavering commitment to world-class manufacturing and compliance standards.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden py-4 z-10"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 45, ease: "linear", repeat: Infinity }}
          className="flex w-max items-center pr-16 gap-16 md:pr-24 md:gap-24"
        >
          {scrollItems.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center justify-center group w-[120px] h-[60px] sm:w-[150px] sm:h-[80px] md:w-[180px] md:h-[90px]"
            >
              <div className="relative w-full h-full transition-transform duration-500 ease-out transform group-hover:scale-[1.05]">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  quality={60}
                  sizes="(max-width: 768px) 120px, (max-width: 1024px) 150px, 180px"
                  className="object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
