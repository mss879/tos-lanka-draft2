"use client";

import React, { useRef, useState } from 'react';
import { Settings, ArrowRight, Activity, Globe, ShieldCheck, Clock, User, Menu, Cpu, Earth, BadgeCheck, CircuitBoard, Compass, Search } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FluidCorner from './ui/FluidCorner';
import StaggeredMenu from './StaggeredMenu';
import Image from 'next/image';
import Link from 'next/link';

gsap.registerPlugin(useGSAP);

const leftContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 2.8 }
  }
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: "spring", stiffness: 60, damping: 15 }
  }
};

const rightContentVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, x: 40, rotateY: 10 },
  visible: {
    opacity: 1, scale: 1, x: 0, rotateY: 0,
    transition: { delay: 3.2, type: "spring", stiffness: 50, damping: 20 }
  }
};

const bottomBarContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 3.6 } }
};

const bottomItemVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

import { useSearch } from '../context/SearchContext';

export default function Hero() {
  const activityIconRef = useRef<HTMLDivElement>(null);
  const settingsIconRef = useRef<HTMLDivElement>(null);
  const { openSearch } = useSearch();

  useGSAP(() => {
    // 1. Heartbeat sequence for the Activity icon
    const heartbeatTl = gsap.timeline({ repeat: -1 });
    heartbeatTl
      .to(activityIconRef.current, { scale: 1.15, duration: 0.15, ease: "power1.out" })
      .to(activityIconRef.current, { scale: 1, duration: 0.12, ease: "power1.in" })
      .to(activityIconRef.current, { scale: 1.15, duration: 0.15, ease: "power1.out" })
      .to(activityIconRef.current, { scale: 1, duration: 1.5, ease: "power1.in" });

    // 2. Slow continuous rotation for the settings gear
    gsap.to(settingsIconRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "linear",
    });
  });

  return (
    // Outer white bounding box viewport
    <div className="h-screen max-h-screen overflow-hidden bg-white font-body p-[5px] selection:bg-brand-primary/30">

      {/* Inner Dark Cutout Container */}
      <div className="relative w-full h-full rounded-[32px] bg-brand-surface overflow-hidden glow-border pointer-events-auto shadow-2xl">

        {/* Cinematic Background Layer */}
        <div className="absolute inset-0 z-0 bg-brand-background pointer-events-none transform-gpu">
          <Image 
            src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=60&w=1600&auto=format&fit=crop"
            alt="Circuit Board Background"
            fill
            priority
            unoptimized
            className="object-cover object-center opacity-[0.35] mix-blend-luminosity will-change-transform"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/70 to-transparent"></div>
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-primary opacity-10 blur-[120px] rounded-full transform-gpu will-change-transform"></div>
        </div>

        {/* --- ISLANDS OVERLAY --- */}

        {/* 1. Top-Left Logo Island */}
        <div className="absolute top-0 left-0 bg-white rounded-br-[32px] z-[60] pt-2 lg:pt-4 pl-4 lg:pl-6 pr-6 pb-4 flex items-center justify-center pointer-events-auto shadow-sm">
          <Image
            src="/tos-logo.png"
            alt="TOS Lanka Logo"
            width={160}
            height={40}
            priority
            quality={90}
            className="h-8 lg:h-10 w-auto object-contain"
          />
          {/* Connecting fluid corners */}
          <FluidCorner position="top-left" radius={24} color="#ffffff" className="top-0 -right-[23.5px]" />
          <FluidCorner position="top-left" radius={24} color="#ffffff" className="left-0 -bottom-[23.5px]" />
        </div>

        {/* 2. Top-Right Nav Island */}
        <div className="absolute top-0 right-0 bg-white rounded-bl-[32px] z-[60] pt-2 lg:pt-3 pr-4 lg:pr-5 pl-5 pb-3 flex items-center gap-3 pointer-events-auto shadow-sm">
          {/* Desktop Full Menu */}
          <div className="hidden xl:flex items-center gap-6 mr-1">
            <Link href="/" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">Home</Link>
            <Link href="/about" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">About</Link>

            <div className="relative group/menu py-2">
              <span className="cursor-default flex items-center gap-1 text-[13px] font-extrabold tracking-widest uppercase text-gray-900 group-hover/menu:text-brand-primary transition-colors">
                Services
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/menu:-scale-y-100"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 overflow-hidden z-[70] py-2">
                <Link href="/services/smt" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">SMT Assembly</Link>
                <Link href="/services/system-integration" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Systems Integration</Link>
                <Link href="/services/through-hole" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Through Hole</Link>
                <Link href="/services/coating-potting" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Coating & Potting</Link>
                <Link href="/services/test-inspection" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Test & Inspection</Link>
                <Link href="/services/prototype-assembling" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Prototyping</Link>
                <Link href="/services/automotive-harnessing" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Automotive Harnessing</Link>
                <Link href="/services/inductive-components" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Inductive Components</Link>
                <Link href="/services/supply-chain" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Supply Chain</Link>
              </div>
            </div>

            <Link href="/industries" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">Industries</Link>
            <Link href="/certification" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">Certifications</Link>
            <div className="relative group/menu py-2">
              <span className="cursor-default flex items-center gap-1 text-[13px] font-extrabold tracking-widest uppercase text-gray-900 group-hover/menu:text-brand-primary transition-colors">
                Resources
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/menu:-scale-y-100"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[160px] bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 overflow-hidden z-[70] py-2">
                <Link href="/articles" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Articles</Link>
                <Link href="/faq" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">FAQ</Link>
              </div>
            </div>

            <div className="flex items-center gap-4 pl-2">
              <button
                onClick={openSearch}
                className="flex items-center justify-center w-[38px] h-[38px] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200 text-gray-500 hover:text-brand-primary shadow-sm cursor-pointer"
                title="Search (Cmd+K)"
              >
                <Search size={16} />
              </button>

              <Link href="/contact" className="relative group/btn text-[13px] font-bold tracking-widest uppercase text-white overflow-hidden rounded-xl px-6 py-3 transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(0,186,52,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-md">
                <span className="relative z-10 drop-shadow-sm">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] z-0"></div>
              </Link>
            </div>
          </div>

          {/* Mobile Search and Staggered Menu */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={openSearch}
              className="flex items-center justify-center w-[44px] h-[44px] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200 text-gray-500 hover:text-gray-700 shadow-sm cursor-pointer"
              title="Search (Cmd+K)"
            >
              <Search size={18} />
            </button>
            <StaggeredMenu />
          </div>

          <FluidCorner position="top-right" radius={24} color="#ffffff" className="top-0 -left-[23.5px]" />
          <FluidCorner position="top-right" radius={24} color="#ffffff" className="right-0 -bottom-[23.5px]" />
        </div>

        {/* 3. Bottom-Right Product/SMT Card Island */}
        <div className="absolute bottom-0 right-0 bg-white rounded-tl-[40px] z-50 pt-4 pl-4 pb-0 pr-0 pointer-events-auto hidden lg:block shadow-sm">

          <motion.div
            variants={rightContentVariants}
            initial="hidden"
            animate="visible"
            className="w-[340px] relative z-10 bg-brand-surface rounded-tl-[32px] rounded-br-[24px] rounded-tr-[24px] rounded-bl-[24px] p-6 text-white overflow-hidden group shadow-2xl border border-white/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent z-0 pointer-events-none"></div>

            <div className="relative z-10 flex justify-between items-center mb-5">
              <div>
                <h3 className="font-heading text-lg font-bold text-white leading-tight">SMT ASSEMBLY</h3>
              </div>
              <div className="w-10 h-10 rounded-[12px] bg-white/5 flex items-center justify-center border border-white/10">
                <div ref={activityIconRef} className="flex">
                  <Activity size={18} className="text-brand-tertiary" />
                </div>
              </div>
            </div>

            <div className="w-full h-[180px] rounded-[16px] overflow-hidden relative mb-5 border border-white/5">
              <div className="absolute inset-0 bg-brand-primary/10 mix-blend-color z-10 group-hover:opacity-0 transition-opacity duration-500"></div>
              <video
                src="/Robotic_head_placing_202603290616.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                suppressHydrationWarning
                className="w-full h-full object-cover transform scale-[1.03] group-hover:scale-100 transition-transform duration-700"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="grid grid-cols-2 gap-3 mb-1"
            >
              <div className="bg-black/30 rounded-[12px] p-3 border border-white/5 backdrop-blur-sm">
                <div className="text-[11px] text-white/50 mb-1 tracking-wide uppercase">Experience</div>
                <div className="font-heading font-bold text-white text-base">20+ Years</div>
              </div>
              <div className="bg-black/30 rounded-[12px] p-3 border border-white/5 backdrop-blur-sm">
                <div className="text-[11px] text-white/50 mb-1 tracking-wide uppercase">Compliance</div>
                <div className="font-heading font-bold text-white text-base">Full RoHS</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Fluid Corners */}
          <FluidCorner position="bottom-right" radius={32} color="#ffffff" className="bottom-0 -left-[31.5px]" />
          <FluidCorner position="bottom-right" radius={32} color="#ffffff" className="right-0 -top-[31.5px]" />
        </div>


        {/* --- MAIN CONTENT LAYER --- */}
        <div className="relative z-20 w-full h-full flex items-center px-6 sm:px-12 lg:px-20">

          <motion.div
            className="flex flex-col justify-center space-y-6 lg:space-y-8 max-w-[1100px] pt-12 lg:pt-0"
            variants={leftContainerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={textItemVariants} className="text-4xl md:text-5xl lg:text-7xl xl:text-[4.8rem] 2xl:text-[5.5rem] font-bold tracking-tight leading-[1.05] font-heading mb-6 text-white">
              Japanese Excellence in <br className="hidden md:block" />
              <span className="text-brand-tertiary whitespace-nowrap">Precision Manufacturing</span>
            </motion.h1>

            <motion.p variants={textItemVariants} className="text-base lg:text-[19px] text-white/70 max-w-[800px] leading-relaxed mb-8 font-light">
              Established in 1995 as the sole overseas facility of Tosslec Ltd., Japan, we provide comprehensive contract electronics manufacturing and PCB assembly for global OEMs.
            </motion.p>

            <motion.div variants={textItemVariants} className="flex flex-col sm:flex-row items-center gap-5 mt-2">
              <button className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold text-base rounded-2xl hover:bg-brand-primary-hover hover:shadow-[0_0_24px_rgba(0,186,52,0.4)] transition-all flex items-center justify-center gap-2 group">
                Contact Us
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#capabilities" className="text-white/80 hover:text-white font-medium text-base flex items-center gap-3 transition-colors group">
                Explore Our Capabilities
                <div className="p-2.5 rounded-full border border-white/20 group-hover:border-white/40 transition-colors flex items-center justify-center bg-white/5">
                  <div ref={settingsIconRef} className="flex">
                    <Settings size={18} />
                  </div>
                </div>
              </a>
            </motion.div>

          </motion.div>

        </div>

        {/* Bottom Left Info Bar */}
        <div className="absolute bottom-0 left-0 w-full lg:w-[calc(100%-400px)] border-t border-white/10 bg-black/40 backdrop-blur-md z-30 py-4 xl:py-6 px-4 sm:px-6 lg:px-4 xl:px-20 hidden md:block">
          <motion.div
            variants={bottomBarContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-nowrap items-center justify-between xl:justify-start gap-2 lg:gap-3 xl:gap-10 text-xs lg:text-sm text-white/50 font-medium overflow-hidden"
          >
            <motion.div variants={bottomItemVariants} className="flex items-center gap-2 xl:gap-5 group cursor-default shrink-0">
              <div className="text-white/80 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 xl:mt-1 flex shrink-0">
                <Globe className="w-6 h-6 lg:w-7 lg:h-7 xl:w-9 xl:h-9" strokeWidth={1} />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-[8px] lg:text-[9px] xl:text-[10px] text-white/40 font-mono tracking-[0.2em] xl:tracking-[0.25em] uppercase mb-0.5 xl:mb-1 whitespace-nowrap">Ownership & Heritage</span>
                <span className="text-[10px] lg:text-[11px] xl:text-[13px] text-white/90 tracking-widest uppercase font-light whitespace-nowrap">100% Japanese Owned</span>
              </div>
            </motion.div>

            <motion.div variants={bottomItemVariants} className="block w-px h-8 xl:h-12 bg-white/10 shrink-0"></motion.div>

            <motion.div variants={bottomItemVariants} className="flex items-center gap-2 xl:gap-5 group cursor-default shrink-0">
              <div className="text-white/80 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 xl:mt-1 flex shrink-0">
                <ShieldCheck className="w-6 h-6 lg:w-7 lg:h-7 xl:w-9 xl:h-9" strokeWidth={1} />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-[8px] lg:text-[9px] xl:text-[10px] text-white/40 font-mono tracking-[0.2em] xl:tracking-[0.25em] uppercase mb-0.5 xl:mb-1 whitespace-nowrap">Quality & Compliance</span>
                <span className="text-[10px] lg:text-[11px] xl:text-[13px] text-white/90 tracking-widest uppercase font-light whitespace-nowrap">Triple ISO Certified</span>
              </div>
            </motion.div>

            <motion.div variants={bottomItemVariants} className="block w-px h-8 xl:h-12 bg-white/10 shrink-0"></motion.div>

            <motion.div variants={bottomItemVariants} className="flex items-center gap-2 xl:gap-5 group cursor-default shrink-0">
              <div className="text-white/80 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 xl:mt-1 flex shrink-0">
                <BadgeCheck className="w-6 h-6 lg:w-7 lg:h-7 xl:w-9 xl:h-9" strokeWidth={1} />
              </div>
              <div className="flex flex-col shrink-0">
                <span className="text-[8px] lg:text-[9px] xl:text-[10px] text-white/40 font-mono tracking-[0.2em] xl:tracking-[0.25em] uppercase mb-0.5 xl:mb-1 whitespace-nowrap">Investment Status</span>
                <span className="text-[10px] lg:text-[11px] xl:text-[13px] text-white/90 tracking-widest uppercase font-light whitespace-nowrap">BOI Approved Facility</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
