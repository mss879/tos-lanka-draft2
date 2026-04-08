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
    <section className="w-full bg-white pt-10 pb-16 md:pt-12 md:pb-24 relative overflow-hidden flex flex-col items-center">
      
      <div className="w-full max-w-[1400px] px-6 sm:px-8 mb-10 lg:mb-14">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-100px" }}
           transition={{ duration: 0.8, ease: "easeOut" }}
           className="text-center"
        >
          <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-blue-500 uppercase mb-4 drop-shadow-sm">
            Global Network
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tighter text-black font-heading mb-4 px-4">
            Our Memberships
          </h2>
          <p className="max-w-md mx-auto text-[14px] md:text-[15px] text-black/50 font-medium leading-relaxed">
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
          transition={{ duration: 40, ease: "linear", repeat: Infinity }}
          className="flex w-max items-center pr-16 gap-16 lg:pr-24 lg:gap-24"
        >
          {scrollItems.map((logo, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 flex items-center justify-center group w-[140px] h-[70px] sm:w-[180px] sm:h-[90px] cursor-pointer"
            >
              <div className="relative w-full h-full opacity-90 hover:opacity-100 transition-all duration-300 ease-out transform group-hover:scale-105">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={180}
                  height={90}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
