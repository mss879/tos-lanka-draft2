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
  // Duplicate arrays to create a sufficiently long strip that seamless scrolls
  // We need enough copies so the strip is wider than any plausible screen width
  const scrollItems = [...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="w-full pt-4 pb-16 sm:pt-8 sm:pb-24 bg-white relative overflow-hidden flex flex-col items-center">
      

      <div className="w-full max-w-[1400px] px-6 sm:px-8 mb-12 sm:mb-16">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center"
        >
          <span className="inline-block text-[10px] sm:text-[12px] font-bold tracking-[0.2em] text-brand-primary uppercase mb-4">
            Global Network
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-medium tracking-tight text-black mb-6" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
            Our Memberships
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-black/60 font-medium leading-[1.6]">
            Proudly associating with leading organizations and industry authorities to ensure world-class standards.
          </p>
        </motion.div>
      </div>

      {/* Marquee Container */}
      <div 
        className="relative w-full overflow-hidden py-4"
        style={{ 
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <motion.div 
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex w-max items-center pr-16 gap-16 lg:pr-24 lg:gap-24"
        >
          {scrollItems.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity duration-300 w-[140px] h-[70px] sm:w-[180px] sm:h-[90px] cursor-pointer"
            >
              <Image
                src={logo.src}
                alt={logo.alt}
                width={180}
                height={90}
                className="w-full h-full object-contain"
                // Using intrinsic scaling to prevent distortion, object-contain is perfect here.
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
