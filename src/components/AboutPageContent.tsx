"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  MapPin,
  Calendar,
  Shield,
  Target,
  Quote,
  ChevronRight,
  ExternalLink,
  Factory,
  Award,
  TrendingUp,
} from "lucide-react";

// --- Animated SVG Icons ---
const JapanFlagIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
    <circle cx="12" cy="12" r="5" fill="currentColor" opacity={0.15} />
    <circle cx="12" cy="12" r="3" fill="currentColor" opacity={0.3} />
    <motion.circle cx="12" cy="12" r="1.5" fill="currentColor" animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }} />
  </svg>
);

const NetworkIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4" />
    <motion.path d="M2 12C2 12 6 6 12 6C18 6 22 12 22 12C22 12 18 18 12 18C6 18 2 12 2 12Z" stroke="currentColor" strokeWidth="1" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
    <circle cx="6" cy="8" r="1.5" fill="currentColor" />
    <circle cx="18" cy="8" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
    <motion.path d="M6 8L12 18M18 8L12 18M6 8L18 8" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" animate={{ strokeDashoffset: [0, -10] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
  </svg>
);

export default function AboutPageContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stats = [
    { value: "1995", label: "Established", icon: Calendar },
    { value: "30+", label: "Years of Expertise", icon: TrendingUp },
    { value: "7+", label: "Countries Served", icon: Globe2 },
    { value: "100%", label: "Japanese Owned", icon: Shield },
  ];

  const markets = ["Japan", "Germany", "Norway", "Switzerland", "USA", "Canada", "Australia"];
  const industries = ["Automotive", "Biomedical", "Telecommunications", "Industrial Automation", "Oil Drilling", "Smart Garments", "IoT Electronics"];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-[5px] sm:gap-4"
    >
      {/* ═══════════════════════════════════════════════
          SECTION 1: HERO — WHO WE ARE
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4">
        {/* Left: Main Hero Copy */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 flex flex-col justify-center shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05)] border border-black/[0.03] relative overflow-hidden"
        >
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-primary/[0.02] blur-[100px] pointer-events-none rounded-full" />

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-[11px] font-medium text-black/40 mb-8 relative z-10">
            <Link href="/" className="hover:text-brand-primary transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-brand-primary font-semibold">About Us</span>
          </div>

          {/* Tag */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
            className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-brand-primary/[0.05] border border-brand-primary/[0.1] shadow-sm backdrop-blur-md w-fit"
          >
            <JapanFlagIcon className="w-5 h-5 text-brand-primary" />
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase font-mono">
              Japanese-Owned · Est. 1995
            </span>
          </motion.div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.08] font-medium tracking-tight text-black mb-8 font-heading relative z-10" style={{ letterSpacing: "-0.02em" }}>
            Sri Lanka's Pioneer{" "}
            <span className="relative inline-block">
              EMS Partner
              <motion.span
                className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-primary/20 -z-10 rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
              />
            </span>
          </h1>

          {/* Body */}
          <div className="flex flex-col gap-5 relative z-10">
            <p className="text-[15px] md:text-base text-black/60 leading-[1.8] font-light">
              TOS Lanka (Pvt) Ltd. is a fully Japanese-owned enterprise, approved by the Board of Investment of Sri Lanka under Section 17, and incorporated in 1995. A wholly owned subsidiary of{" "}
              <a href="https://www.tosslec.co.jp/" target="_blank" rel="noopener noreferrer" className="text-brand-tertiary font-medium hover:underline inline-flex items-center gap-1">
                Tosslec Company Limited, Kyoto
                <ExternalLink className="w-3 h-3" />
              </a>
              , we are situated in Sri Lanka's second-largest export processing zone with easy access to major logistics hubs — airport and seaport.
            </p>
            <p className="text-[15px] md:text-base text-black/60 leading-[1.8] font-light">
              As the pioneer Electronic Manufacturing Services (EMS) provider in Sri Lanka, we deliver complete solutions for high-tech electronic assembly — serving global markets with nearly three decades of proven expertise. Our commitment to quality standards, delivery schedules, and competitive pricing has established us as a global centre of relevance in electronics manufacturing.
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 relative z-10">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -3, backgroundColor: "#ffffff" }}
                  className="bg-[#f8f9fa] rounded-2xl p-4 border border-black/5 hover:border-brand-primary/20 hover:shadow-[0_10px_30px_-10px_rgba(0,143,40,0.12)] transition-all duration-300 flex flex-col items-center text-center"
                >
                  <Icon className="w-4 h-4 text-brand-primary/60 mb-2" />
                  <span className="text-xl md:text-2xl font-bold text-black font-heading tracking-tight">{stat.value}</span>
                  <span className="text-[10px] font-semibold text-black/40 tracking-wider uppercase mt-1">{stat.label}</span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Right: Creative asymmetric image mosaic */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 flex flex-col gap-[5px] sm:gap-4"
        >
          {/* Top: Large landscape — Team on factory floor */}
          <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-3 lg:p-4 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="relative w-full aspect-[16/9] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner">
              <Image
                src="/about/WhatsApp Image 2026-03-30 at 2.32.19 PM.jpeg"
                alt="TOS Lanka — Our Team on the Electronics Manufacturing Floor"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                priority
              />
              <motion.div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl rounded-xl p-3 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20">
                <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase mb-0.5">Our People</span>
                  <span className="text-[11px] font-bold text-black tracking-wider">Expert Manufacturing Team</span>
                </div>
                <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom row: Factory image + Location badge — side by side */}
          <div className="grid grid-cols-2 gap-[5px] sm:gap-4">
            {/* Factory aerial — square crop */}
            <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-3 lg:p-4 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden">
              <div className="relative w-full aspect-square rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner">
                <Image
                  src="/about/factory.png"
                  alt="TOS Lanka — State-of-the-Art Manufacturing Facility"
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                />
              </div>
            </div>

            {/* Location + Quick fact badge */}
            <div className="bg-brand-background rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-between">
              <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-brand-primary/15 blur-[60px] pointer-events-none rounded-full" />
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <MapPin className="w-5 h-5 text-brand-primary mb-3" />
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1">Location</p>
                  <p className="text-[13px] font-bold text-white leading-snug">Biyagama Export Processing Zone</p>
                  <p className="text-[11px] text-white/40 mt-1">Sri Lanka</p>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/40 uppercase mb-1">Parent Company</p>
                  <p className="text-[12px] font-semibold text-white/80">Tosslec Co. Ltd</p>
                  <p className="text-[10px] text-white/40">Kyoto, Japan</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 2: CHAIRMAN'S MESSAGE
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4 mt-0.5 sm:mt-0">
        {/* Left: Chairman Image */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-4 bg-white rounded-[2rem] lg:rounded-[3rem] p-3 lg:p-4 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col"
        >
          <div className="relative w-full aspect-[3/4] lg:aspect-auto lg:flex-1 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner">
            <Image
              src="/about/sacho-scaled.jpg"
              alt="Chairman — Tosslec Company Limited, Kyoto"
              fill
              sizes="(max-width: 1024px) 100vw, 33vw"
              className="object-cover object-top transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
            />
            <motion.div className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex flex-col items-center text-center opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20">
              <span className="text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase mb-1">Chairman</span>
              <span className="text-[13px] font-bold text-black tracking-wider">Tosslec Company Limited</span>
              <span className="text-[10px] text-black/40 mt-0.5">Kyoto, Japan · Founded 1982</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Chairman Message */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-8 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-center"
        >
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-tertiary/[0.02] blur-[120px] pointer-events-none rounded-full" />

          <div className="flex items-center gap-5 mb-10 relative z-10">
            <div className="relative w-16 h-16 rounded-[1.25rem] bg-brand-tertiary/[0.05] border border-brand-tertiary/10 flex items-center justify-center text-brand-tertiary overflow-hidden">
              <Quote className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black font-heading leading-tight">
                Chairman's Message
              </h2>
              <div className="w-12 h-1 bg-brand-tertiary mt-3 rounded-full" />
            </div>
          </div>

          {/* Big quote */}
          <div className="relative z-10 mb-8">
            <div className="absolute -top-4 -left-2 text-brand-tertiary/10 pointer-events-none">
              <Quote className="w-20 h-20" />
            </div>
            <blockquote className="relative z-10 text-xl md:text-2xl lg:text-[1.75rem] font-medium text-black/80 leading-[1.5] font-heading tracking-tight italic pl-6 border-l-4 border-brand-tertiary/30">
              Our vision is to be a trusted business partner, delivering exceptional value to customers with efficiency and reliability.
            </blockquote>
          </div>

          <div className="flex flex-col gap-5 relative z-10">
            <p className="text-[14px] md:text-[15px] text-black/55 leading-[1.8] font-light">
              Founded in Kyoto in 1982, our company has dedicated itself to advancing circuit assembly and electronics manufacturing. We have contributed to the production of computer equipment, precision motors, electronic devices, and LCD systems for world-class companies with a global presence.
            </p>
            <p className="text-[14px] md:text-[15px] text-black/55 leading-[1.8] font-light">
              In 1995, we expanded by establishing a production base in Sri Lanka, aiming to serve the growing markets of India, Asia, and China. We approach every project with passion and ambition, finding joy in growing alongside our partners through continuous improvement.
            </p>
            <p className="text-[14px] md:text-[15px] text-black/55 leading-[1.8] font-light">
              Today, we focus on nurturing exceptional talent across our Kyoto headquarters, Nakatsugawa factory, Sri Lanka production base, and our group company Mikasa Human Techno Co., Ltd. Our ultimate goal is to evolve into a company that consistently creates and delivers meaningful value to customers worldwide.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ═══════════════════════════════════════════════
          SECTION 3: VISION + GLOBAL REACH + CTA
      ═══════════════════════════════════════════════ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4 mt-0.5 sm:mt-0">
        {/* Left: Vision + Markets */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-7 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-between"
        >
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/[0.02] blur-[120px] pointer-events-none rounded-full" />

          {/* Vision */}
          <div className="relative z-10 mb-12">
            <div className="flex items-center gap-5 mb-8">
              <div className="relative w-16 h-16 rounded-[1.25rem] bg-brand-primary/[0.05] border border-brand-primary/10 flex items-center justify-center text-brand-primary">
                <Target className="w-8 h-8" />
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black font-heading leading-tight">Our Vision</h2>
                <div className="w-12 h-1 bg-brand-primary mt-3 rounded-full" />
              </div>
            </div>
            <p className="text-[15px] md:text-base text-black/60 leading-[1.8] font-light max-w-2xl">
              To become the preferred global destination of relevance for electronics manufacturing solutions, partnering the country's national effort towards export-led growth in harmony with the environment, human resource development, and enhancing quality of life in the community.
            </p>
          </div>

          {/* Global Markets */}
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <NetworkIcon className="w-6 h-6 text-brand-tertiary" />
              <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-black/80 uppercase">Global Markets</span>
            </div>
            <div className="h-[1px] w-full bg-black/5 mb-6" />
            <div className="flex flex-wrap gap-2.5">
              {markets.map((market, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 rounded-full bg-[#f3f4f6] text-[12px] font-semibold text-black/60 tracking-wide border border-black/[0.04] hover:border-brand-tertiary/20 hover:bg-white hover:text-brand-tertiary hover:shadow-[0_5px_15px_-5px_rgba(58,91,251,0.15)] transition-all duration-300 cursor-default"
                >
                  <Globe2 className="w-3 h-3 inline mr-1.5 -mt-0.5" />
                  {market}
                </motion.span>
              ))}
            </div>

            {/* Industries */}
            <div className="flex items-center gap-4 mb-6 mt-10">
              <Factory className="w-5 h-5 text-brand-primary" />
              <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-black/80 uppercase">Industries Served</span>
            </div>
            <div className="h-[1px] w-full bg-black/5 mb-6" />
            <div className="flex flex-wrap gap-2.5">
              {industries.map((ind, idx) => (
                <motion.span
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  viewport={{ once: true }}
                  className="px-4 py-2 rounded-full bg-[#f3f4f6] text-[12px] font-semibold text-black/60 tracking-wide border border-black/[0.04] hover:border-brand-primary/20 hover:bg-white hover:text-brand-primary hover:shadow-[0_5px_15px_-5px_rgba(0,143,40,0.15)] transition-all duration-300 cursor-default"
                >
                  {ind}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Right: CTA */}
        <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col gap-[5px] sm:gap-4">
          {/* CTA Card */}
          <div className="bg-brand-background rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden flex-1 min-h-[350px]">
            <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] pointer-events-none rounded-full" />

            <div className="relative z-10">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6 font-heading leading-[1.1]" style={{ letterSpacing: "-0.02em" }}>
                Partner with <span className="text-brand-primary">TOS Lanka</span>
              </h2>
              <p className="text-[14px] text-white/50 font-light leading-[1.7] mb-8 max-w-md">
                Whether you need high-volume production or specialized prototyping, our engineering team is ready to support your next project with precision manufacturing and on-time delivery.
              </p>
            </div>

            <div className="flex flex-col gap-3 relative z-10">
              <Link href="/contact" className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-brand-primary hover:bg-brand-primary-hover text-white text-[13px] font-bold tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,143,40,0.3)] hover:shadow-[0_15px_40px_rgba(0,143,40,0.4)] hover:-translate-y-0.5">
                Get in Touch
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <Link href="/#services" className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[13px] font-bold tracking-wider uppercase rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20">
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Quick-facts mini card */}
          <div className="bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-10 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-[200px] h-[200px] bg-brand-tertiary/[0.02] blur-[80px] pointer-events-none rounded-full" />

            <div className="flex items-center gap-4 mb-5 relative z-10">
              <Award className="w-5 h-5 text-brand-primary" />
              <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-black/80 uppercase">Why TOS Lanka</span>
            </div>
            <div className="h-[1px] w-full bg-black/5 mb-5 relative z-10" />
            <ul className="flex flex-col gap-3 relative z-10">
              {[
                "BOI-approved under Section 17",
                "Subsidiary of Tosslec, Kyoto Japan",
                "Located in Biyagama Export Zone",
                "ISO 9001 · ISO 14001 · ISO 45001",
                "Multiple Presidential Export Awards",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 group cursor-default">
                  <div className="relative w-5 h-5 mt-[2px] rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:border-brand-primary/30 transition-colors bg-[#f8f9fa]">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 group-hover:bg-brand-primary group-hover:shadow-[0_0_8px_rgba(0,143,40,0.6)] transition-all" />
                  </div>
                  <span className="text-[13px] text-black/60 group-hover:text-black transition-colors leading-[1.6] font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
