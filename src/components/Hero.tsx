"use client";

import React, { useRef, useState } from 'react';
import { Settings, ArrowRight, Activity, Globe, ShieldCheck, Clock, User, Menu, Cpu, Earth, BadgeCheck, CircuitBoard, Compass, Search } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import FluidCorner from './ui/FluidCorner';
import StaggeredMenu from './StaggeredMenu';

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
        <div className="absolute inset-0 z-0 bg-brand-background">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-background via-brand-background/90 to-transparent"></div>
          <div className="absolute top-1/4 -right-1/4 w-[800px] h-[800px] bg-brand-primary opacity-[0.05] blur-[120px] rounded-full"></div>
        </div>

        {/* --- ISLANDS OVERLAY --- */}

        {/* 1. Top-Left Logo Island */}
        <div className="absolute top-0 left-0 bg-white rounded-br-[32px] z-50 pt-2 lg:pt-4 pl-4 lg:pl-6 pr-6 pb-4 flex items-center justify-center pointer-events-auto shadow-sm">
          <img
            src="/tos-logo.png"
            alt="TOS Lanka Logo"
            className="h-8 lg:h-10 w-auto object-contain"
          />
          {/* Connecting fluid corners */}
          <FluidCorner position="top-left" radius={24} color="#ffffff" className="top-0 -right-[23.5px]" />
          <FluidCorner position="top-left" radius={24} color="#ffffff" className="left-0 -bottom-[23.5px]" />
        </div>

        {/* 2. Top-Right Nav Island */}
        <div className="absolute top-0 right-0 bg-white rounded-bl-[32px] z-50 pt-2 lg:pt-3 pr-4 lg:pr-5 pl-5 pb-3 flex items-center gap-3 pointer-events-auto shadow-sm">
          {/* Search Trigger */}
          <button 
            onClick={openSearch}
            className="flex items-center justify-center w-[44px] h-[44px] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200 text-gray-500 hover:text-gray-700 shadow-sm"
            title="Search (Cmd+K)"
          >
            <Search size={18} />
          </button>
          <StaggeredMenu />

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
                <p className="text-[10px] text-brand-primary font-mono mt-1 tracking-wider uppercase">PANASONIC HIGH-SPEED</p>
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

            <motion.p variants={textItemVariants} className="text-base lg:text-lg text-white/70 max-w-[580px] leading-relaxed mb-6 font-light">
              TOS Lanka is the only overseas manufacturing facility of Tosslec Ltd., Japan — delivering world-class printed circuit board assembly, systems integration, and contract electronics manufacturing to global OEMs since 1995.
            </motion.p>

            <motion.div variants={textItemVariants} className="flex flex-col sm:flex-row items-center gap-5 mt-2">
              <button className="w-full sm:w-auto px-8 py-4 bg-brand-primary text-white font-bold text-base rounded-full hover:bg-brand-primary-hover hover:shadow-[0_0_24px_rgba(0,186,52,0.4)] transition-all flex items-center justify-center gap-2 group">
                Get Your Free Quote
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
        <div className="absolute bottom-0 left-0 w-full lg:w-[calc(100%-400px)] border-t border-white/10 bg-black/40 backdrop-blur-md z-30 py-6 px-6 sm:px-12 lg:px-20 hidden md:block">
          <motion.div
            variants={bottomBarContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center justify-start gap-6 lg:gap-10 text-xs lg:text-sm text-white/50 font-medium"
          >
            <motion.div variants={bottomItemVariants} className="flex items-center gap-5 group cursor-default">
              <div className="text-white/80 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 mt-1">
                <BadgeCheck size={36} strokeWidth={1} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 font-mono tracking-[0.25em] uppercase mb-1">Quality Assurance</span>
                <span className="text-[13px] text-white/90 tracking-widest uppercase font-light">Triple ISO Certified</span>
              </div>
            </motion.div>

            <motion.div variants={bottomItemVariants} className="hidden sm:block w-px h-12 bg-white/10"></motion.div>

            <motion.div variants={bottomItemVariants} className="flex items-center gap-5 group cursor-default">
              <div className="text-white/80 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 mt-1">
                <Earth size={36} strokeWidth={1} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 font-mono tracking-[0.25em] uppercase mb-1">Global Reach</span>
                <span className="text-[13px] text-white/90 tracking-widest uppercase font-light">Exporting to 4 Continents</span>
              </div>
            </motion.div>

            <motion.div variants={bottomItemVariants} className="hidden sm:block w-px h-12 bg-white/10"></motion.div>

            <motion.div variants={bottomItemVariants} className="flex items-center gap-5 group cursor-default">
              <div className="text-white/80 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 mt-1">
                <CircuitBoard size={36} strokeWidth={1} />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] text-white/40 font-mono tracking-[0.25em] uppercase mb-1">Infrastructure</span>
                <span className="text-[13px] text-white/90 tracking-widest uppercase font-light">Panasonic Equipment</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </div>
  );
}
