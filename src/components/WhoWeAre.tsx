"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight, BadgeCheck } from "lucide-react";

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

/* Membership logos for the marquee */
const membershipLogos = [
  { src: "/Memberships/Picture2.png", name: "SLEEMEA" },
  { src: "/Memberships/Picture3.png", name: "Ceylon Chamber" },
  { src: "/Memberships/Picture4.png", name: "ECCSL" },
  { src: "/Memberships/Picture5.png", name: "SLACMA" },
  { src: "/Memberships/Picture6.png", name: "SL-Japan Business Council" },
];

export default function WhoWeAre() {
  return (
    <div className="w-full bg-white px-[5px] pb-12 md:pb-24 pt-12 md:pt-24">
      <section className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#f8f9fa] shadow-sm selection:bg-blue-500/30 selection:text-white p-[5px]">
        
        <div className="w-full flex flex-col gap-10 px-4 py-12 md:px-8 lg:px-12 xl:px-16 lg:gap-14">

          {/* ─── Section Header ─── */}
          <div className="flex flex-col gap-5">
            <div className="space-y-4">
              <h2 className="text-4xl font-semibold tracking-tighter text-black md:text-5xl lg:text-6xl font-heading leading-tight md:leading-[1.1]">
                <span className="text-black">Authentic Japanese </span>
                <br className="hidden md:block" />
                <span className="text-black/60">Manufacturing Discipline.</span>
              </h2>
              <p className="max-w-[560px] text-sm text-black/60 md:text-base leading-relaxed font-light">
                Precision engineering, zero-defect culture, and continuous improvement — powered by the sole overseas facility of Tosslec Ltd., Kyoto.
              </p>
            </div>
          </div>

          {/* ─── Bento Grid ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-3"
          >
            {/* ═══ ROW 1 ═══ */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">

              {/* ── Card 1: Main About Copy + Membership Marquee (9 cols) ── */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-white p-6 lg:p-8 lg:col-span-9 shadow-sm flex flex-col justify-between"
              >
                {/* Watermark */}
                <span className="pointer-events-none absolute -top-10 -right-4 hidden text-[160px] font-black leading-none text-black/[0.02] md:block font-heading">
                  01
                </span>

                <div className="relative flex h-full flex-col justify-between gap-8">
                  {/* Copy */}
                  <div className="max-w-4xl space-y-6 lg:pr-12 xl:pr-24">
                    <h3 className="text-2xl font-medium md:text-3xl font-heading leading-tight text-black">
                      Your Contract Electronics Manufacturing Partner
                    </h3>
                    <div className="flex flex-col gap-5 text-sm text-black/60 md:text-base leading-[1.7]">
                      <p>
                        Tos Lanka (Pvt) Ltd. is a fully Japanese-owned enterprise, approved by the Board of Investment of Sri Lanka under Section 17, and incorporated in 1995. It is a wholly owned subsidiary of <a href="https://www.tosslec.co.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 hover:underline transition-colors">Tosslec Company Limited, Kyoto, Japan</a>, situated in the second-largest export processing zone in Sri Lanka, with easy access to major logistics hubs including the airport and seaport.
                      </p>
                      <p>
                        As the pioneer Electronic Manufacturing Services (EMS) provider in Sri Lanka, Tos Lanka delivers complete solutions for high-tech electronic assembly. With nearly three decades of proven expertise, we serve global markets across Japan, Germany, Norway, Switzerland, USA, Canada, and Australia. Our customer base spans diverse industries including automotive, biomedical, telecommunications, industrial automation, oil drilling, smart garments and IoT electronics.
                      </p>
                      <p>
                        The Company has emerged as a global centre of relevance in supplying electronic manufacturing services due to its proven commitment to quality standards, delivery schedules and competitive pricing.
                      </p>
                    </div>
                  </div>

                  {/* Membership Logo Marquee */}
                  <div className="relative overflow-hidden rounded-2xl border border-black/5 bg-[#f8f9fa] p-3">
                    {/* Gradient fade edges */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-r from-[#f8f9fa] to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-12 bg-gradient-to-l from-[#f8f9fa] to-transparent" />

                    <div className="animate-infinite-scroll gap-4 items-center" aria-hidden="true">
                      {/* First set */}
                      {membershipLogos.map((logo, i) => (
                        <div key={`a-${i}`} className="group relative flex w-[180px] shrink-0 flex-col gap-2">
                          <div className="relative h-[80px] overflow-hidden flex items-center justify-center p-1">
                            <img
                              src={logo.src}
                              alt={logo.name}
                              className={`max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105 ${
                                logo.name === "SLACMA" ? "scale-[1.8] group-hover:scale-[1.9]" : ""
                              }`}
                              loading="lazy"
                            />
                          </div>
                          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-black/50 px-1">
                            <span className="truncate">{logo.name}</span>
                            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-black/10 bg-white shrink-0 text-blue-500">
                              <BadgeCheck className="h-[10px] w-[10px]" />
                            </span>
                          </div>
                        </div>
                      ))}
                      {/* Duplicate for seamless loop */}
                      {membershipLogos.map((logo, i) => (
                        <div key={`b-${i}`} className="group relative flex w-[180px] shrink-0 flex-col gap-2">
                          <div className="relative h-[80px] overflow-hidden flex items-center justify-center p-1">
                            <img
                              src={logo.src}
                              alt={logo.name}
                              className={`max-h-full max-w-full object-contain transition duration-500 group-hover:scale-105 ${
                                logo.name === "SLACMA" ? "scale-[1.8] group-hover:scale-[1.9]" : ""
                              }`}
                              loading="lazy"
                            />
                          </div>
                          <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-black/50 px-1">
                            <span className="truncate">{logo.name}</span>
                            <span className="flex h-4 w-4 items-center justify-center rounded-full border border-black/10 bg-white shrink-0 text-blue-500">
                              <BadgeCheck className="h-[10px] w-[10px]" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── Card 2a & 2b: Stacked Info & CTA (3 cols) ── */}
              <div className="flex flex-col gap-3 lg:col-span-3 lg:h-full">
                
                {/* Top Card: Years of Excellence */}
                <motion.div
                  variants={itemVariants}
                  className="relative overflow-hidden flex-1 rounded-[2.5rem] border border-black/5 bg-black p-6 flex flex-col justify-between shadow-sm min-h-[220px]"
                >
                  <div className="absolute inset-0 max-h-full overflow-hidden">
                    <img
                      src="/SMT_Line-scaled.jpg"
                      alt="TOS Lanka Factory"
                      className="h-full w-full object-cover opacity-20 grayscale"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                  </div>
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
                      Established
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-6">
                     <p className="text-[56px] lg:text-[64px] font-semibold leading-none text-white font-heading tracking-tighter">
                        1995
                     </p>
                     <p className="mt-5 text-lg lg:text-xl text-white/90 font-medium tracking-wide">
                        Pioneer EMS Provider
                     </p>
                     <p className="mt-2.5 text-[14px] text-white/60 leading-relaxed max-w-[240px]">
                        Nearly three decades of proven expertise in high-tech assembly.
                     </p>
                  </div>
                </motion.div>

                {/* Bottom Card: Learn More CTA */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="relative overflow-hidden flex-1 rounded-[2.5rem] border border-black/5 bg-white p-6 justify-between flex flex-col cursor-pointer group shadow-sm transition-all min-h-[220px]"
                >
                  <a href="/about-us" className="absolute inset-0 z-20" aria-label="Learn More" />
                  
                  <div className="space-y-5 relative z-10">
                    <p className="text-[10px] uppercase tracking-[0.3em] text-black/40 font-medium">
                      <span className="text-blue-500">*</span> BOI Processing Zone
                    </p>
                    <div className="space-y-3">
                      <h3 className="text-3xl lg:text-[32px] font-semibold leading-tight font-heading text-black tracking-tight">
                        Learn More
                      </h3>
                      <p className="text-[14px] text-black/60 leading-relaxed max-w-[240px]">
                        Discover how our 9 service lines — from prototype to mass production — operate under one roof.
                      </p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-black line-clamp-1">
                      <span className="relative flex h-[6px] w-[6px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                        <span className="relative inline-flex rounded-full h-[6px] w-[6px] bg-blue-500" />
                      </span>
                      Inquiry Open
                    </div>
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-black/10 bg-black/5 transition-all duration-500 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white overflow-hidden relative shrink-0">
                      <ArrowUpRight className="absolute h-4 w-4 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" strokeWidth={1.5} />
                      <ArrowUpRight className="absolute h-4 w-4 translate-x-[-150%] translate-y-[150%] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={1.5} />
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ═══ ROW 2 ═══ */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-12 lg:auto-rows-[minmax(0,1fr)]">

              {/* ── Card 3: Video (5 cols) ── */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2.5rem] border border-black/5 bg-black lg:col-span-5 shadow-sm min-h-[300px]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <video
                    src="/who-we-are-vid-opt.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    suppressHydrationWarning
                    className="h-full w-full object-cover border-none outline-none"
                  />
                </div>
              </motion.div>

              {/* ── Card 4+5: Two Stacked Cards (3 cols) ── */}
              <div className="flex flex-col gap-3 lg:col-span-3 lg:h-full">

                {/* Card 4a: Triple ISO */}
                <motion.div
                  variants={itemVariants}
                  className="flex h-full flex-1 flex-col justify-between rounded-[2.5rem] border border-black/5 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <span className="hidden h-px flex-1 bg-black/5 sm:block" />
                  </div>
                  <div className="space-y-2 mt-5">
                    <h3 className="text-xl md:text-2xl font-semibold font-heading text-black tracking-tight">Triple ISO Certified</h3>
                    <p className="text-[14px] md:text-[15px] text-black/60 leading-relaxed font-medium">
                      ISO 9001 · 14001 · 45001
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-black/40 mt-5">
                    <span className="h-1 lg:h-1.5 w-6 lg:w-8 rounded-full bg-blue-500" />
                    <span>Quality</span>
                  </div>
                </motion.div>

                {/* Card 4b: Japanese Ownership */}
                <motion.div
                  variants={itemVariants}
                  className="flex h-full flex-1 flex-col justify-between rounded-[2.5rem] border border-black/5 bg-white p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                    </span>
                    <span className="hidden h-px flex-1 bg-black/5 sm:block" />
                  </div>
                  <div className="space-y-2 mt-5">
                    <h3 className="text-xl md:text-2xl font-semibold font-heading text-black tracking-tight">100% Japanese</h3>
                    <p className="text-[14px] md:text-[15px] text-black/60 leading-relaxed font-medium">
                      Sole overseas facility of Tosslec Ltd., Kyoto.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-black/40 mt-5">
                    <span className="h-1 lg:h-1.5 w-6 lg:w-8 rounded-full bg-blue-500" />
                    <span>Ownership</span>
                  </div>
                </motion.div>
              </div>

              {/* ── Card 6: Zero Defect Culture (4 cols) ── */}
              <motion.div
                variants={itemVariants}
                className="relative flex h-full flex-col gap-6 rounded-[2.5rem] border border-black/5 bg-white p-6 lg:p-8 lg:col-span-4 overflow-hidden shadow-sm"
              >
                <div className="relative space-y-3">
                  <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.3em] text-black/40">
                    <span>Manufacturing</span>
                    <span className="h-2 lg:h-2.5 w-2 lg:w-2.5 rounded-full bg-blue-500 animate-pulse" />
                  </div>
                  <h3 className="text-2xl md:text-[32px] md:leading-tight font-semibold font-heading text-black tracking-tight">
                    Zero-Defect Culture
                  </h3>
                </div>

                {/* Animated Chip SVG */}
                <div className="relative flex items-center justify-center flex-1 py-2">
                  <motion.svg
                    width="90"
                    height="90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-blue-500"
                  >
                    <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                    <rect x="9" y="9" width="6" height="6" />
                    <motion.line x1="9" y1="1" x2="9" y2="4" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="15" y1="1" x2="15" y2="4" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 0.5, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="9" y1="20" x2="9" y2="23" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 1, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="15" y1="20" x2="15" y2="23" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 1.5, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="20" y1="9" x2="23" y2="9" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 0.2, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="20" y1="14" x2="23" y2="14" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 0.7, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="1" y1="9" x2="4" y2="9" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 1.2, repeat: Infinity, ease: "linear" }} />
                    <motion.line x1="1" y1="14" x2="4" y2="14" animate={{ pathLength: [0, 1, 0], opacity: [0.2, 1, 0.2] }} transition={{ duration: 3, delay: 1.7, repeat: Infinity, ease: "linear" }} />
                  </motion.svg>
                </div>

                {/* Status Text */}
                <div className="relative space-y-5">
                  <div className="flex items-start gap-3">
                    <span className="relative flex h-[8px] w-[8px] mt-[6px] flex-shrink-0">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                      <span className="relative inline-flex rounded-full h-[8px] w-[8px] bg-blue-500" />
                    </span>
                    <div>
                      <p className="text-[11px] lg:text-[12px] font-bold tracking-[0.15em] text-black/50 uppercase leading-[1.7]">
                        Precision Assembly<br />Continuous Kaizen<br />RoHS Compliant
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.3em] text-black/40">
                    <span className="h-1 lg:h-1.5 w-6 lg:w-8 rounded-full bg-blue-500" />
                    <span>Tosslec DNA</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
