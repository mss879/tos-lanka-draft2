"use client";

import React, { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants, useReducedMotion } from "framer-motion";
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

/* ─── ANIMATED SVG ICONS (memoised to prevent re-renders) ── */
const JapanFlagIcon = memo(function JapanFlagIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Japanese heritage icon"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="4 4"
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="12" cy="12" r="5" fill="currentColor" opacity={0.15} />
      <circle cx="12" cy="12" r="3" fill="currentColor" opacity={0.3} />
      <motion.circle
        cx="12"
        cy="12"
        r="1.5"
        fill="currentColor"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
});

const NetworkIcon = memo(function NetworkIcon({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Global network icon"
    >
      <motion.circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="2 4"
      />
      <motion.path
        d="M2 12C2 12 6 6 12 6C18 6 22 12 22 12C22 12 18 18 12 18C6 18 2 12 2 12Z"
        stroke="currentColor"
        strokeWidth="1"
        animate={{ pathLength: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />
      <circle cx="6" cy="8" r="1.5" fill="currentColor" />
      <circle cx="18" cy="8" r="1.5" fill="currentColor" />
      <circle cx="12" cy="18" r="1.5" fill="currentColor" />
      <motion.path
        d="M6 8L12 18M18 8L12 18M6 8L18 8"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeDasharray="2 2"
        animate={{ strokeDashoffset: [0, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
      />
    </svg>
  );
});

/* ─── MAIN COMPONENT ─────────────────────────────────── */
export default function AboutPageContent() {
  const prefersReduced = useReducedMotion();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: prefersReduced ? 0 : 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: prefersReduced
      ? { opacity: 0 }
      : { y: 40, opacity: 0, scale: 0.98 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: prefersReduced ? 0.2 : 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stats = [
    { value: "1995", label: "Established", icon: Calendar },
    { value: "30+", label: "Years of Expertise", icon: TrendingUp },
    { value: "7+", label: "Countries Served", icon: Globe2 },
    { value: "100%", label: "Japanese Owned", icon: Shield },
  ];

  const markets = [
    "Japan",
    "Germany",
    "Norway",
    "Switzerland",
    "USA",
    "Canada",
    "Australia",
  ];
  const industries = [
    "Automotive",
    "Biomedical",
    "Telecommunications",
    "Industrial Automation",
    "Oil Drilling",
    "Smart Garments",
    "IoT Electronics",
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.05 }}
      className="flex flex-col gap-[5px] sm:gap-4"
    >
      {/* ═══════════════════════════════════════════════
          SECTION 1: HERO — WHO WE ARE
      ═══════════════════════════════════════════════ */}
      <section id="overview" aria-label="Company overview">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4">
          {/* Left: Main Hero Copy */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 flex flex-col justify-center shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05)] border border-black/[0.03] relative overflow-hidden"
          >
            <div
              className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-primary/[0.02] blur-[100px] pointer-events-none rounded-full"
              style={{ willChange: "transform" }}
              aria-hidden="true"
            />

            {/* Breadcrumb — semantic nav */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 text-[11px] font-medium text-black/50 mb-8 relative z-10"
            >
              <Link
                href="/"
                className="hover:text-brand-primary transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded"
              >
                Home
              </Link>
              <ChevronRight className="w-3 h-3" aria-hidden="true" />
              <span className="text-brand-primary font-semibold" aria-current="page">
                About Us
              </span>
            </nav>

            {/* Tag */}
            <motion.div
              initial={prefersReduced ? {} : { scale: 0.9, opacity: 0 }}
              whileInView={prefersReduced ? {} : { scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
              className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-brand-primary/[0.05] border border-brand-primary/[0.1] shadow-sm backdrop-blur-md w-fit"
            >
              <JapanFlagIcon className="w-5 h-5 text-brand-primary" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase font-mono">
                Japanese-Owned · Est. 1995
              </span>
            </motion.div>

            {/* Title */}
            <h1
              className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.08] font-medium tracking-tight text-black mb-8 font-heading relative z-10"
              style={{ letterSpacing: "-0.02em" }}
            >
              Sri Lanka&apos;s Pioneer{" "}
              <span className="relative inline-block">
                EMS Partner
                <motion.span
                  className="absolute bottom-1 left-0 w-full h-[6px] bg-brand-primary/20 -z-10 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: prefersReduced ? 0.2 : 1, delay: 0.6, ease: "circOut" }}
                />
              </span>
            </h1>

            {/* Body */}
            <div className="flex flex-col gap-5 relative z-10">
              <p className="text-[15px] md:text-base text-black/65 leading-[1.8] font-light">
                TOS Lanka (Pvt) Ltd. is a fully Japanese-owned enterprise,
                approved by the Board of Investment of Sri Lanka under Section
                17, and incorporated in 1995. A wholly owned subsidiary of{" "}
                <a
                  href="https://www.tosslec.co.jp/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-tertiary font-medium hover:underline inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-tertiary rounded"
                >
                  Tosslec Company Limited, Kyoto
                  <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  <span className="sr-only">(opens in new tab)</span>
                </a>
                , we are situated in Sri Lanka&apos;s second-largest export
                processing zone with easy access to major logistics hubs —
                airport and seaport.
              </p>
              <p className="text-[15px] md:text-base text-black/65 leading-[1.8] font-light">
                As the pioneer{" "}
                <Link
                  href="/services"
                  className="text-brand-primary font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded"
                >
                  Electronic Manufacturing Services (EMS)
                </Link>{" "}
                provider in Sri Lanka, we deliver complete solutions for
                high-tech electronic assembly — serving global markets with
                nearly three decades of proven expertise. Our commitment to{" "}
                <Link
                  href="/certification"
                  className="text-brand-primary font-medium hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary rounded"
                >
                  quality standards
                </Link>
                , delivery schedules, and competitive pricing has established us
                as a global centre of relevance in electronics manufacturing.
              </p>
            </div>

            {/* Stats row — semantic definition list */}
            <dl className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 relative z-10">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={prefersReduced ? {} : { y: -3, backgroundColor: "#ffffff" }}
                    className="bg-[#f8f9fa] rounded-2xl p-4 border border-black/5 hover:border-brand-primary/20 hover:shadow-[0_10px_30px_-10px_rgba(0,143,40,0.12)] transition-all duration-300 flex flex-col items-center text-center"
                  >
                    <Icon
                      className="w-4 h-4 text-brand-primary/60 mb-2"
                      aria-hidden="true"
                    />
                    <dt className="sr-only">{stat.label}</dt>
                    <dd className="flex flex-col items-center">
                      <span className="text-xl md:text-2xl font-bold text-black font-heading tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-[10px] font-semibold text-black/50 tracking-wider uppercase mt-1">
                        {stat.label}
                      </span>
                    </dd>
                  </motion.div>
                );
              })}
            </dl>
          </motion.div>

          {/* Right: Creative asymmetric image mosaic */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col gap-[5px] sm:gap-4"
          >
            {/* Top: Large landscape — Team on factory floor */}
            <figure className="bg-white rounded-[2rem] lg:rounded-[3rem] p-3 lg:p-4 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden">
              <div className="relative w-full aspect-[16/9] rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner">
                <Image
                  src="/about/WhatsApp Image 2026-03-30 at 2.32.19 PM.jpeg"
                  alt="TOS Lanka team of skilled technicians working on the electronics manufacturing floor at Biyagama factory"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  priority
                />
                <div
                  className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-xl rounded-xl p-3 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20"
                  aria-hidden="true"
                >
                  <div className="flex flex-col">
                    <span className="text-[9px] font-bold tracking-[0.2em] text-black/50 uppercase mb-0.5">
                      Our People
                    </span>
                    <span className="text-[11px] font-bold text-black tracking-wider">
                      Expert Manufacturing Team
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                  </div>
                </div>
              </div>
              <figcaption className="sr-only">
                TOS Lanka expert manufacturing team on the electronics assembly floor
              </figcaption>
            </figure>

            {/* Bottom row: Factory image + Location badge — side by side */}
            <div className="grid grid-cols-2 gap-[5px] sm:gap-4">
              {/* Factory aerial — square crop */}
              <figure className="bg-white rounded-[2rem] lg:rounded-[3rem] p-3 lg:p-4 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden">
                <div className="relative w-full aspect-square rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner">
                  <Image
                    src="/about/factory.png"
                    alt="Aerial view of TOS Lanka's state-of-the-art manufacturing facility in Biyagama Export Processing Zone, Sri Lanka"
                    fill
                    sizes="(max-width: 1024px) 50vw, 20vw"
                    quality={75}
                    className="object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  />
                </div>
                <figcaption className="sr-only">
                  TOS Lanka manufacturing facility aerial view
                </figcaption>
              </figure>

              {/* Location + Quick fact badge */}
              <aside
                className="bg-brand-background rounded-[2rem] lg:rounded-[3rem] p-6 lg:p-8 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-between"
                aria-label="Company location details"
              >
                <div className="absolute inset-0 tech-grid opacity-30 pointer-events-none" aria-hidden="true" />
                <div
                  className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-brand-primary/15 blur-[60px] pointer-events-none rounded-full"
                  style={{ willChange: "transform" }}
                  aria-hidden="true"
                />
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <MapPin className="w-5 h-5 text-brand-primary mb-3" aria-hidden="true" />
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-1">
                      Location
                    </p>
                    <p className="text-[13px] font-bold text-white leading-snug">
                      Biyagama Export Processing Zone
                    </p>
                    <p className="text-[11px] text-white/50 mt-1">Sri Lanka</p>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[10px] font-bold tracking-[0.2em] text-white/50 uppercase mb-1">
                      Parent Company
                    </p>
                    <p className="text-[12px] font-semibold text-white/80">
                      Tosslec Co. Ltd
                    </p>
                    <p className="text-[10px] text-white/50">Kyoto, Japan</p>
                  </div>
                </div>
              </aside>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 2: OUR LEADERSHIP
      ═══════════════════════════════════════════════ */}
      <section id="leadership" aria-label="Company leadership">
        {/* President Section */}
        <div className="mt-0.5 sm:mt-0">
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-16 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden group flex flex-col md:flex-row items-center md:items-center gap-8 lg:gap-16"
          >
            <div
              className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/[0.02] blur-[100px] pointer-events-none rounded-full"
              style={{ willChange: "transform" }}
              aria-hidden="true"
            />
            <figure className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full lg:rounded-[2.5rem] overflow-hidden shrink-0 shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-black/5 bg-[#f8f9fa] group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ willChange: "filter" }}
            >
              <Image
                src="/about images/president.jpeg"
                alt="Jitsuo Mikasa, President of TOS Lanka and Tosslec Group"
                fill
                sizes="250px"
                quality={75}
                className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              <figcaption className="sr-only">Jitsuo Mikasa, President</figcaption>
            </figure>

            <div className="flex flex-col flex-1 justify-center text-center md:text-left relative z-10 w-full">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase mb-2 md:mb-3">
                President
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tighter text-black font-heading mb-4 md:mb-6">
                Jitsuo Mikasa
              </h2>

              <div className="p-5 lg:p-6 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 inline-flex flex-col md:flex-row items-center md:items-start gap-4 text-left">
                <JapanFlagIcon className="w-8 h-8 text-brand-primary shrink-0 opacity-80 md:mt-1 hidden sm:block" />
                <p className="text-[15px] md:text-base lg:text-lg text-black/70 font-medium leading-[1.6]">
                  &ldquo;Tosslec Group — a pioneering Japanese investor in Sri
                  Lanka, shaping the region&apos;s electronics manufacturing
                  landscape since 1995.&rdquo;
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* CEO Section */}
        <div className="mt-[5px] sm:mt-4">
          <motion.div
            variants={itemVariants}
            className="bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-16 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col md:flex-row gap-8 lg:gap-16 group items-center md:items-start"
          >
            <div
              className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-tertiary/[0.02] blur-[120px] pointer-events-none rounded-full"
              style={{ willChange: "transform" }}
              aria-hidden="true"
            />

            <div className="flex flex-col items-center md:items-start shrink-0 text-center md:text-left relative z-10 w-full md:w-auto md:max-w-xs xl:max-w-sm">
              <figure className="relative w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full lg:rounded-[2.5rem] overflow-hidden shadow-[0_15px_40px_-10px_rgba(0,0,0,0.1)] border border-black/5 bg-[#f8f9fa] mb-6 lg:mb-8 group-hover:scale-[1.03] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ willChange: "filter" }}
              >
                <Image
                  src="/about images/Ceo.jpeg"
                  alt="Merrick Gooneratne, CEO of TOS Lanka, recipient of the Order of the Rising Sun"
                  fill
                  sizes="300px"
                  quality={75}
                  className="object-cover object-top filter grayscale group-hover:grayscale-0 transition-all duration-700"
                />
                <figcaption className="sr-only">Merrick Gooneratne, CEO</figcaption>
              </figure>
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-brand-tertiary uppercase mb-3">
                Chief Executive Officer
              </span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tighter text-black font-heading">
                Merrick Gooneratne
              </h2>
            </div>

            <div className="flex flex-col flex-1 justify-center relative z-10">
              <div className="relative mb-10 lg:mb-12">
                <div
                  className="absolute -top-5 -left-5 text-brand-tertiary/[0.08] pointer-events-none"
                  aria-hidden="true"
                >
                  <Quote className="w-16 h-16 md:w-20 md:h-20" />
                </div>
                <blockquote
                  className="relative z-10 text-[16px] md:text-lg lg:text-[1.25rem] font-medium text-black/80 leading-[1.7] italic font-heading tracking-tight pl-6 md:pl-8 border-l-[3px] border-brand-tertiary/30"
                  cite="https://www.toslanka.com/about"
                >
                  &ldquo;At Tos Lanka, we are committed to building strong
                  global partnerships that power the future of high‑tech
                  electronic assembly. By connecting innovation with a reliable
                  supply chain, we deliver quality, speed, and trust to our
                  customers worldwide—driving progress together.&rdquo;
                </blockquote>
              </div>

              <div className="flex flex-col xl:flex-row gap-4">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-brand-tertiary/5 to-transparent border border-brand-tertiary/10 flex-1 hover:shadow-md transition-all duration-300">
                  <figure className="relative w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl overflow-hidden bg-white border border-black/5 flex items-center justify-center p-1 md:p-1.5 shadow-sm">
                    <Image
                      src="/about images/Order of the Rising Sun Gold Rays with Rosette.jpeg"
                      alt="Order of the Rising Sun Gold Rays with Rosette medal awarded by the Emperor of Japan"
                      fill
                      sizes="80px"
                      quality={75}
                      className="object-contain p-1"
                    />
                    <figcaption className="sr-only">Order of the Rising Sun medal</figcaption>
                  </figure>
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] text-brand-tertiary uppercase mb-1">
                      State Honour · 2014
                    </span>
                    <p className="text-[12px] md:text-[13px] text-black/70 font-medium leading-[1.5]">
                      Recipient of the &ldquo;Order of the Rising Sun Gold Rays
                      with Rosette&rdquo; from the Emperor of Japan.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gradient-to-br from-brand-primary/5 to-transparent border border-brand-primary/10 flex-1 hover:shadow-md transition-all duration-300">
                  <div
                    className="w-14 h-14 md:w-16 md:h-16 shrink-0 rounded-xl bg-white border border-black/5 flex items-center justify-center text-brand-primary shadow-sm"
                    aria-hidden="true"
                  >
                    <Award className="w-6 h-6 md:w-7 md:h-7 opacity-80" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <span className="text-[9px] md:text-[10px] font-bold tracking-[0.1em] text-brand-primary uppercase mb-1">
                      Commendation · 2011
                    </span>
                    <p className="text-[12px] md:text-[13px] text-black/70 font-medium leading-[1.5]">
                      Recipient of the Japanese Foreign Minister&apos;s
                      commendation for outstanding contribution to mutual
                      understanding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════
          SECTION 3: VISION + GLOBAL REACH + CTA
      ═══════════════════════════════════════════════ */}
      <section id="vision" aria-label="Vision and global markets">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4 mt-0.5 sm:mt-0">
          {/* Left: Vision + Markets */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-7 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-start"
          >
            <div
              className="absolute top-0 right-0 w-[400px] h-[400px] bg-brand-primary/[0.02] blur-[120px] pointer-events-none rounded-full"
              style={{ willChange: "transform" }}
              aria-hidden="true"
            />

            {/* Vision */}
            <div className="relative z-10 mb-16 md:mb-20">
              <div className="flex items-center gap-5 mb-8">
                <div
                  className="relative w-16 h-16 rounded-[1.25rem] bg-brand-primary/[0.05] border border-brand-primary/10 flex items-center justify-center text-brand-primary"
                  aria-hidden="true"
                >
                  <Target className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black font-heading leading-tight">
                    Our Vision
                  </h2>
                  <div className="w-12 h-1 bg-brand-primary mt-3 rounded-full" aria-hidden="true" />
                </div>
              </div>
              <p className="text-[15px] md:text-base text-black/65 leading-[1.8] font-medium max-w-2xl">
                To be the premier global partner for electronics manufacturing
                solutions, driving export-led growth while championing
                sustainable practices, human development, and community
                well-being.
              </p>
            </div>

            {/* Global Markets */}
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <NetworkIcon className="w-6 h-6 text-brand-tertiary" />
                <h3 className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-black/80 uppercase">
                  Global Markets
                </h3>
              </div>
              <div className="h-[1px] w-full bg-black/5 mb-6" aria-hidden="true" />
              <ul className="flex flex-wrap gap-2.5 list-none" role="list" aria-label="Markets served by TOS Lanka">
                {markets.map((market, idx) => (
                  <motion.li
                    key={idx}
                    initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 rounded-full bg-[#f3f4f6] text-[12px] font-semibold text-black/65 tracking-wide border border-black/[0.04] hover:border-brand-tertiary/20 hover:bg-white hover:text-brand-tertiary hover:shadow-[0_5px_15px_-5px_rgba(58,91,251,0.15)] transition-all duration-300 cursor-default"
                  >
                    <Globe2 className="w-3 h-3 inline mr-1.5 -mt-0.5" aria-hidden="true" />
                    {market}
                  </motion.li>
                ))}
              </ul>

              {/* Industries */}
              <div className="flex items-center gap-4 mb-6 mt-10">
                <Factory className="w-5 h-5 text-brand-primary" aria-hidden="true" />
                <h3 className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-black/80 uppercase">
                  Industries Served
                </h3>
              </div>
              <div className="h-[1px] w-full bg-black/5 mb-6" aria-hidden="true" />
              <ul className="flex flex-wrap gap-2.5 list-none" role="list" aria-label="Industries served by TOS Lanka">
                {industries.map((ind, idx) => (
                  <motion.li
                    key={idx}
                    initial={prefersReduced ? {} : { opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    className="px-4 py-2 rounded-full bg-[#f3f4f6] text-[12px] font-semibold text-black/65 tracking-wide border border-black/[0.04] hover:border-brand-primary/20 hover:bg-white hover:text-brand-primary hover:shadow-[0_5px_15px_-5px_rgba(0,143,40,0.15)] transition-all duration-300 cursor-default"
                  >
                    {ind}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Right: CTA */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 flex flex-col gap-[5px] sm:gap-4"
          >
            {/* CTA Card */}
            <aside
              className="bg-brand-background rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden flex-1 min-h-[350px]"
              aria-label="Get in touch with TOS Lanka"
            >
              <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" aria-hidden="true" />
              <div
                className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] pointer-events-none rounded-full"
                style={{ willChange: "transform" }}
                aria-hidden="true"
              />

              <div className="relative z-10">
                <h2
                  className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6 font-heading leading-[1.1]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  Partner with{" "}
                  <span className="text-brand-primary">TOS Lanka</span>
                </h2>
                <p className="text-[14px] text-white/55 font-light leading-[1.7] mb-8 max-w-md">
                  Whether you need high-volume production or specialized
                  prototyping, our engineering team is ready to support your next
                  project with precision manufacturing and on-time delivery.
                </p>
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-brand-primary hover:bg-brand-primary-hover text-white text-[13px] font-bold tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,143,40,0.3)] hover:shadow-[0_15px_40px_rgba(0,143,40,0.4)] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Get in Touch
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </Link>
                <Link
                  href="/industries"
                  className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-[13px] font-bold tracking-wider uppercase rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Explore Industries
                  <ArrowRight
                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </aside>

            {/* Quick-facts mini card */}
            <aside
              className="bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-10 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden"
              aria-label="Key facts about TOS Lanka"
            >
              <div
                className="absolute top-0 left-0 w-[200px] h-[200px] bg-brand-tertiary/[0.02] blur-[80px] pointer-events-none rounded-full"
                style={{ willChange: "transform" }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-4 mb-5 relative z-10">
                <Award className="w-5 h-5 text-brand-primary" aria-hidden="true" />
                <h3 className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-black/80 uppercase">
                  Why TOS Lanka
                </h3>
              </div>
              <div className="h-[1px] w-full bg-black/5 mb-5 relative z-10" aria-hidden="true" />
              <ul className="flex flex-col gap-3 relative z-10 list-none" role="list">
                {[
                  "BOI-approved under Section 17",
                  "Subsidiary of Tosslec, Kyoto Japan",
                  "Located in Biyagama Export Zone",
                  "ISO 9001 · ISO 14001 · ISO 45001",
                  "Multiple Presidential Export Awards",
                ].map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 group cursor-default"
                  >
                    <div
                      className="relative w-5 h-5 mt-[2px] rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:border-brand-primary/30 transition-colors bg-[#f8f9fa]"
                      aria-hidden="true"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary/40 group-hover:bg-brand-primary group-hover:shadow-[0_0_8px_rgba(0,143,40,0.6)] transition-all" />
                    </div>
                    <span className="text-[13px] text-black/65 group-hover:text-black transition-colors leading-[1.6] font-medium">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Awards Gallery */}
              <div className="mt-10 pt-8 border-t border-black/5 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <Award className="w-4 h-4 text-brand-primary" aria-hidden="true" />
                  <h3 className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-black/55 uppercase">
                    Our Awards
                  </h3>
                </div>
                <div
                  className="flex flex-wrap gap-4 items-center"
                  role="list"
                  aria-label="TOS Lanka awards and certifications"
                >
                  {[
                    {
                      src: "Global Commerce Excellence.jpeg",
                      alt: "Global Commerce Excellence Award received by TOS Lanka for outstanding export performance",
                    },
                    {
                      src: "NCE Export Award.jpeg",
                      alt: "National Chamber of Exporters (NCE) Export Award for electronics manufacturing excellence",
                    },
                    {
                      src: "Presudental export award.jpeg",
                      alt: "Presidential Export Award recognising TOS Lanka's contribution to Sri Lanka's export sector",
                    },
                    {
                      src: "service sector medium scale merit award.jpeg",
                      alt: "Service Sector Medium Scale Merit Award for outstanding manufacturing services",
                    },
                    {
                      src: "social dialogue & wordplace co-operation award 2014.jpeg",
                      alt: "Social Dialogue and Workplace Co-operation Award 2014 for exemplary labour relations",
                    },
                  ].map((a) => (
                    <figure
                      key={a.src}
                      className="relative w-16 h-20 md:w-20 md:h-28 overflow-hidden rounded-lg border border-black/5 shadow-sm hover:scale-105 transition-transform bg-[#f8f9fa]"
                      role="listitem"
                    >
                      <Image
                        src={`/about images/${a.src}`}
                        alt={a.alt}
                        fill
                        sizes="80px"
                        quality={75}
                        className="object-contain p-2"
                      />
                    </figure>
                  ))}
                </div>
              </div>
            </aside>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
