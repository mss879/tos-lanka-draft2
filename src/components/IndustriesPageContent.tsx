"use client";

import React, { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, Variants, useReducedMotion } from "framer-motion";
import { ChevronRight, ArrowRight, CheckCircle2 } from "lucide-react";
import { industriesData, IndustryCategory } from "../data/industriesData";

/* ─── NARRATIVE ENRICHMENT MAP ─────────────────────────
 * We use the original basic data for structure, but enrich the
 * text here for SEO and storytelling without hallucinating facts.
 *───────────────────────────────────────────────────────*/
const expandedNarratives: Record<string, string> = {
  "Industrial & Automation":
    "We deliver advanced electronic solutions engineered for the most demanding environments. Whether it's manufacturing robust components capable of withstanding the harsh conditions of oil drilling operations, or precision boards for rail tracking, our ISO-certified processes ensure absolute reliability. Our automated mounting lines produce vital components for strict quality-controlled sectors including factory automation, energy metering, and industrial power supplies.",
  Automotive:
    "Safety and precision are paramount in automotive electronics. TOS Lanka leverages over three decades of Japanese-backed manufacturing excellence to produce critical components. We support the evolving needs of modern mobility—from complex motor control circuits to highly sensitive airbag sensor harnesses and high-voltage EV cable assemblies—ensuring every unit meets stringent automotive industry standards.",
  Medical:
    "We partner with healthcare innovators to produce high-reliability medical electronics where failure is not an option. Operating out of our Biyagama facility, we assemble precision devices spanning from patient health monitoring systems to critical components for general anesthesia equipment. Every board goes through rigorous In-Circuit Testing (ICT) and Automated Optical Inspection (AOI) to guarantee compliance.",
  Telecommunication:
    "In a highly connected world, hardware reliability is the backbone of communication. We strengthen global networks by manufacturing robust telecommunication solutions. From wide-area signal repeaters to complex assemblies for set-top boxes, our Surface Mount Technology (SMT) and intricate box-build capabilities ensure faster, more dependable communication hardware.",
  "IoT & Smart Apparel":
    "As technology integrates deeply into everyday life and wearables, we provide the miniaturized, precise assembly required for IoT. Our capabilities directly support manufacturers of smart home systems and smart garments. By offering conformal coating and potting, we ensure environmental monitoring devices and wearable electronics remain protected against moisture, dust, and vibration.",
  "High-end Consumer":
    "We blend innovation with high-volume production for the consumer electronics market. Our zero-defect contract manufacturing supports the assembly of sophisticated age-assistance tools, precision temperature control systems, and reliable backup devices. We provide end-to-end solutions from rapid prototyping to full-scale box build assembly.",
  Agriculture:
    "TOS Lanka is pioneering high-tech electronic solutions to promote sustainable agricultural practices worldwide. We manufacture vital components for pesticide-free agriculture initiatives, such as specialized Anti-Moth LED Lamps, designed to help farmers manage crops safely without relying on harmful environmental chemicals.",
};

export default function IndustriesPageContent() {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReduced ? { opacity: 0 } : { y: 40, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReduced ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const textReveal: Variants = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const cardReveal: Variants = {
    hidden: { opacity: 0, x: prefersReduced ? 0 : 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.2 } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="flex flex-col gap-[5px] sm:gap-4"
    >
      {/* ═══════════════════════════════════════════════
          SECTION 1: HERO
      ═══════════════════════════════════════════════ */}
      <section id="industries-hero" aria-label="Industries overview">
        <motion.div
          variants={itemVariants}
          className="bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05)] border border-black/[0.03] relative overflow-hidden"
        >
          {/* Ambient gradients */}
          <div 
            className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-primary/[0.03] blur-[100px] pointer-events-none rounded-full" 
            style={{ willChange: "transform" }}
            aria-hidden="true"
          />
          <div 
            className="absolute top-0 left-0 w-[300px] h-[300px] bg-brand-tertiary/[0.03] blur-[100px] pointer-events-none rounded-full" 
            style={{ willChange: "transform" }}
            aria-hidden="true"
          />

          {/* Left Side: Text Content */}
          <div className="flex flex-col relative z-10 w-full lg:w-[55%]">
            {/* Breadcrumb — semantic nav */}
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-[11px] font-medium text-black/50 mb-8">
              <Link href="/" className="hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded">Home</Link>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
              <span className="text-brand-primary font-semibold" aria-current="page">Industries</span>
            </nav>

            {/* Title */}
            <h1 className="text-3xl md:text-5xl lg:text-[4rem] leading-[1.08] font-medium tracking-tight text-black mb-8 font-heading lg:max-w-4xl" style={{ letterSpacing: "-0.02em" }}>
              Electronic Manufacturing for {" "}
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-primary-hover">
                Mission-Critical
              </span> Industries
            </h1>

            {/* Body text */}
            <div className="flex flex-col gap-6 lg:max-w-3xl">
              <p className="text-[15px] md:text-lg text-black/65 leading-[1.8] font-light">
                TOS Lanka proudly supports global innovators across highly specialized and heavily regulated sectors. By combining our Japanese-trained engineering expertise with ISO-certified facilities, we provide flawless electronic assembly tailored precisely to the demands of each industry.
              </p>
              <p className="text-[15px] md:text-lg text-black/65 leading-[1.8] font-light">
                From safety-critical automotive systems and high-reliability medical devices to robust industrial automation boards, our manufacturing processes guarantee zero defects. Explore how our custom EMS capabilities align with your sector&apos;s specific needs.
              </p>
            </div>
          </div>

          {/* Right Side: Creative Image Arrangement */}
          <div className="hidden lg:block relative z-10 w-[45%] h-[400px]">
             {/* Big main image (Industrial/Automotive themed) */}
             <motion.div 
               variants={cardReveal}
               className="absolute top-0 right-0 w-[85%] h-[85%] rounded-[2rem] overflow-hidden shadow-2xl border border-black/5"
             >
               <Image 
                 src="/industries/automotive_electronics_v5.webp" 
                 alt="Advanced automotive electronic assembly" 
                 fill 
                 priority
                 quality={85}
                 sizes="(max-width: 1024px) 100vw, 50vw"
                 className="object-cover hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
             </motion.div>

             {/* Small overlapping image (Medical themed) */}
             <motion.div 
               variants={textReveal}
               className="absolute bottom-0 left-0 w-[55%] h-[55%] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.15)] border-[6px] border-white z-20"
             >
               <Image 
                 src="/industries/medical_electronics_v5.webp" 
                 alt="Precision medical electronic manufacturing" 
                 fill 
                 quality={85}
                 sizes="(max-width: 1024px) 50vw, 25vw"
                 className="object-cover filter hover:brightness-110 transition-all duration-700" 
               />
             </motion.div>
             
             {/* Decorative Element */}
             <div className="absolute -bottom-6 -right-6 w-24 h-24 tech-grid-dark rounded-full opacity-20 pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: Z-PATTERN INDUSTRIES SHOWCASE
      ═══════════════════════════════════════════════ */}
      <section id="industries-list" aria-label="Detailed industry breakdown" className="flex flex-col gap-[5px] sm:gap-4">
        {industriesData.map((category, idx) => {
          const Icon = category.icon;
          const isEven = idx % 2 === 0;
          const narrativeText = expandedNarratives[category.title] || category.description;
          
          return (
            <motion.article
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="group bg-white rounded-[2rem] lg:rounded-[3rem] border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col md:flex-row"
            >
              {/* Background Glow */}
              <div 
                className={`absolute ${isEven ? '-top-20 -left-20' : '-bottom-20 -right-20'} w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-40 transition-opacity duration-700 ${isEven ? 'bg-brand-primary/10' : 'bg-brand-tertiary/10'}`} 
                aria-hidden="true"
              />

              {/* Text Side */}
              <motion.div 
                variants={textReveal}
                className={`flex-1 p-8 md:p-12 lg:p-16 flex flex-col justify-center ${isEven ? 'md:order-1' : 'md:order-2'}`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border shadow-sm ${isEven ? 'bg-brand-primary/[0.05] border-brand-primary/10 text-brand-primary' : 'bg-brand-tertiary/[0.05] border-brand-tertiary/10 text-brand-tertiary'}`}>
                    <Icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-black tracking-tight font-heading leading-tight pt-1">
                    {category.title}
                  </h2>
                </div>

                <p className="text-[15px] md:text-base leading-[1.8] text-black/65 font-light mb-8 max-w-xl">
                  {narrativeText}
                </p>

                <Link
                  href="/contact"
                  className={`inline-flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 rounded w-fit ${isEven ? 'text-brand-primary hover:text-brand-primary-hover focus-visible:outline-brand-primary' : 'text-brand-tertiary hover:text-brand-tertiary/80 focus-visible:outline-brand-tertiary'}`}
                >
                  Discuss your project 
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </motion.div>

              {/* Glassmorphic Capability Chips Side */}
              <motion.div 
                variants={cardReveal}
                className={`flex-1 bg-[#f8f9fa] p-8 md:p-12 lg:p-16 flex flex-col justify-center border-l border-black/5 relative ${isEven ? 'md:order-2 border-l' : 'md:order-1 border-r'}`}
              >
                 <div className="absolute inset-0 tech-grid-dark pointer-events-none" aria-hidden="true" />
                 
                 <div className="relative z-10">
                   <h3 className="text-[11px] font-bold tracking-[0.2em] text-black/50 uppercase mb-6">
                     Specialized Assemblies
                   </h3>
                   
                   <ul className="flex flex-col gap-3" role="list">
                     {category.items.map((item, itemIdx) => (
                       <li 
                         key={itemIdx} 
                         className="flex items-center gap-4 p-4 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                       >
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${isEven ? 'bg-brand-primary/10 text-brand-primary' : 'bg-brand-tertiary/10 text-brand-tertiary'}`}>
                           <CheckCircle2 className="w-5 h-5" aria-hidden="true" />
                         </div>
                         <span className="text-[14px] md:text-[15px] font-semibold text-black/80">{item}</span>
                       </li>
                     ))}
                   </ul>
                 </div>
              </motion.div>
            </motion.article>
          );
        })}
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: CTA
      ═══════════════════════════════════════════════ */}
      <section aria-label="Call to action">
        <motion.div 
          variants={itemVariants} 
          className="bg-brand-background rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-16 flex flex-col items-center text-center relative overflow-hidden mt-0 sm:mt-2"
        >
          <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" aria-hidden="true" />
          <div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/10 blur-[150px] pointer-events-none rounded-full" 
            style={{ willChange: "transform" }}
            aria-hidden="true"
          />

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-6 font-heading leading-[1.1]">
              Ready to Accelerate Your <span className="text-brand-primary">Growth?</span>
            </h2>
            <p className="text-[15px] md:text-lg text-white/60 font-light leading-[1.7] mb-10">
              Transform your innovative ideas into world-class electronics. Our dedicated engineering team provides zero-defect manufacturing support across every industry standard and specification.
            </p>

            <Link 
              href="/contact" 
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-brand-primary hover:bg-brand-primary-hover text-white text-[14px] font-bold tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,143,40,0.3)] hover:shadow-[0_15px_40px_rgba(0,143,40,0.4)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Contact Our Experts
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
            </Link>
          </div>
        </motion.div>
      </section>
      
    </motion.div>
  );
}
