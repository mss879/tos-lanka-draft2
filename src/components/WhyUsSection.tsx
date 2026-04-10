"use client";

import React from 'react';
import { motion, Variants } from 'framer-motion';

const whyUsPoints = [
  {
    title: "Japanese Subsidiary",
    description: "The only Japanese-owned EMS company in the region.",
  },
  {
    title: "BOI Company",
    description: "Section 17 company approved by Board of Investment of Sri Lanka.",
  },
  {
    title: "Industry Experience",
    description: "Over 30 years of expertise in Electronic Manufacturing Services.",
  },
  {
    title: "Manufacturing Flexibility",
    description: "Capability to handle low-volume, high-precision jobs with efficiency.",
  },
  {
    title: "Comprehensive Solutions",
    description: "One-stop shop for turnkey projects or consigned value-add services.",
  },
  {
    title: "Skilled Workforce",
    description: "Highly trained and quality-focused employees, including staff trained in Japan.",
  },
  {
    title: "Competitive Pricing",
    description: "Cost-effective solutions without compromising quality.",
  },
  {
    title: "Strategic Location",
    description: "Situated along major sea and air routes, ensuring efficient logistics.",
  },
  {
    title: "Political Stability",
    description: "Operating in a stable environment favorable to long-term partnerships.",
  },
  {
    title: "Operational Continuity",
    description: "Ability to maintain production 365 days a year.",
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 30, opacity: 0, filter: "blur(8px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function WhyUsSection() {
  // Split into two rows for a better infinite scrolling effect
  const row1 = whyUsPoints.slice(0, 5);
  const row2 = whyUsPoints.slice(5, 10);

  return (
    <div className="w-full bg-white px-[5px] pb-12 md:pb-24">
      <section className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#f8f9fa] shadow-sm p-[5px]">
        {/* Soft Animated Background Gradients for Glassmorphism Context */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px]">
          <div className="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-blue-100/40 opacity-70 blur-[120px] rounded-full mix-blend-multiply" />
          <div className="absolute bottom-[-10%] left-[-5%] w-[800px] h-[800px] bg-green-100/40 opacity-70 blur-[120px] rounded-full mix-blend-multiply" />
          <div className="absolute top-[20%] left-[20%] w-[500px] h-[500px] bg-purple-100/30 opacity-60 blur-[100px] rounded-full mix-blend-multiply" />
        </div>

        <div className="relative z-10 w-full flex flex-col gap-8 py-16 lg:py-24">
          
          <div className="px-4 md:px-12 lg:px-20 mb-6 lg:mb-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col md:flex-row md:items-end justify-between gap-6"
            >
              <div>
                <motion.div variants={itemVariants} className="flex items-center gap-2 mb-4">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-primary" />
                  <span className="text-[12px] font-bold tracking-[0.2em] uppercase text-black/40">Our Advantage</span>
                </motion.div>
                <motion.h2 variants={itemVariants} className="text-[36px] md:text-[48px] lg:text-[56px] font-semibold tracking-tighter text-black font-heading leading-tight">
                  Why Tos Lanka
                </motion.h2>
              </div>
              <motion.p variants={itemVariants} className="max-w-[420px] text-[15px] md:text-[16px] text-black/60 leading-relaxed font-medium pb-2">
                We combine Japanese manufacturing excellence with strategic Sri Lankan operations to deliver unparalleled electronic manufacturing services.
              </motion.p>
            </motion.div>
          </div>

          <div className="relative w-full flex flex-col gap-6 overflow-hidden py-4">
            {/* Edge fade gradients */}
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-16 md:w-32 bg-gradient-to-r from-[#f8f9fa] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-16 md:w-32 bg-gradient-to-l from-[#f8f9fa] to-transparent" />

            {/* Row 1 Infinite Scroll */}
            <div className="animate-infinite-scroll flex gap-6">
              {/* Render twice for continuous loop */}
              {[...row1, ...row1].map((point, index) => {
                return (
                  <div 
                    key={`row1-${index}`}
                    className="shrink-0 w-[300px] md:w-[380px] rounded-[24px] bg-white/40 backdrop-blur-xl border border-white/80 p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  >
                    <div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-gray-900 font-heading mb-2">{point.title}</h3>
                      <p className="text-[14px] leading-relaxed text-gray-600 font-medium">{point.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Row 2 Infinite Scroll (Reversed by altering animation delay conceptually or just a distinct scroll, assuming infinite-scroll goes left) */}
            <div className="animate-infinite-scroll flex gap-6 pb-4" style={{ animationDirection: 'reverse', animationDuration: '45s' }}>
              {/* Render twice for continuous loop */}
              {[...row2, ...row2].map((point, index) => {
                return (
                  <div 
                    key={`row2-${index}`}
                    className="shrink-0 w-[300px] md:w-[380px] rounded-[24px] bg-white/40 backdrop-blur-xl border border-white/80 p-6 md:p-8 flex flex-col shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  >
                    <div>
                      <h3 className="text-[18px] md:text-[20px] font-semibold text-gray-900 font-heading mb-2">{point.title}</h3>
                      <p className="text-[14px] leading-relaxed text-gray-600 font-medium">{point.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
