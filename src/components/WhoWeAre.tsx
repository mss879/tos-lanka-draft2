"use client";

import { motion, Variants } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

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

/* Industries we serve */
const industries = [
  { name: "Industrial & Automation", image: "/industries/industrial_v4.png" },
  { name: "Automotive", image: "/industries/automotive_v4.png" },
  { name: "Medical", image: "/industries/medical_v4.png" },
  { name: "Telecommunication", image: "/industries/telecom_v4.png" },
  { name: "IoT & Smart Apparel", image: "/industries/iot_v4.png" },
  { name: "High-end Consumer", image: "/industries/consumer_v4.png" },
  { name: "Agriculture", image: "/industries/agritech_v4.png" },
];

export default function WhoWeAre() {
  return (
    <div className="w-full bg-white px-[5px] pb-12 md:pb-24 pt-12 md:pt-24">
      <section className="relative w-full overflow-hidden rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#f8f9fa] shadow-sm selection:bg-blue-500/30 selection:text-white p-[5px]">

        <div className="w-full flex flex-col gap-8 px-4 py-10 md:px-6 lg:px-8 xl:px-12 lg:gap-10">

          {/* ─── Section Header ─── */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-2">
            <h2 className="text-[32px] md:text-[40px] lg:text-[48px] font-semibold tracking-tighter text-black font-heading leading-tight md:leading-[1.1]">
              <span className="text-black">Authentic Japanese </span>
              <br className="hidden md:block" />
              <span className="text-black/60">Manufacturing Discipline.</span>
            </h2>
            <p className="max-w-[340px] text-[13px] text-black/50 md:text-[15px] leading-relaxed font-medium md:text-right pb-1">
              Precision engineering and zero-defect assembly from Tosslec Ltd.&apos;s sole overseas facility.
            </p>
          </div>

          {/* ─── Bento Grid ─── */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid gap-4 md:gap-5"
          >
            {/* ═══ ROW 1 ═══ */}
            <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12">

              {/* ── Card 1: Main About Copy + Membership Marquee (9 cols) ── */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-white p-5 lg:p-6 lg:col-span-9 shadow-sm flex flex-col justify-between gap-6"
              >
                {/* Watermark */}
                <span className="pointer-events-none absolute -top-8 -right-4 hidden text-[120px] font-black leading-none text-black/[0.02] md:block font-heading">
                  01
                </span>

                <div className="relative flex h-full flex-col justify-between gap-6">
                  {/* Copy */}
                  <div className="max-w-4xl space-y-4 lg:pr-10 xl:pr-20">
                    <h3 className="text-xl font-medium md:text-[26px] font-heading leading-tight text-black">
                      Your Contract Electronics Manufacturing Partner
                    </h3>
                    <div className="flex flex-col gap-4 text-[13px] text-black/60 md:text-[15px] leading-[1.6]">
                      <p>
                        Incorporated in 1995, Tos Lanka is a BOI-approved, wholly owned subsidiary of <a href="https://www.tosslec.co.jp/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 hover:underline transition-colors">Tosslec Company Limited, Kyoto, Japan</a> — and Sri Lanka&apos;s pioneer Electronic Manufacturing Services (EMS) provider.
                      </p>
                      <p>
                        With nearly three decades of expertise, we deliver end-to-end high-tech assembly for global clients across Japan, Germany, Norway, Switzerland, USA, Canada and Australia — spanning automotive, biomedical, telecom, industrial automation, IoT and beyond.
                      </p>
                    </div>
                  </div>

                  {/* Industries We Serve — Infinite Scroll */}
                  <div className="relative flex flex-col justify-center overflow-hidden rounded-[20px] bg-black py-4">
                    {/* Gradient fade edges */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-r from-black to-transparent" />
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-20 bg-gradient-to-l from-black to-transparent" />

                    <div className="animate-infinite-scroll gap-4 items-center">
                      {/* First set */}
                      {industries.map((industry) => {
                        return (
                          <div
                            key={`a-${industry.name}`}
                            className="group flex shrink-0 items-center gap-3 rounded-[14px] border border-white/[0.08] bg-white/[0.06] backdrop-blur-md px-4 py-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.12]"
                          >
                            <span className="text-[13px] sm:text-[14px] font-medium text-white/90 whitespace-nowrap tracking-wide group-hover:text-blue-300 transition-colors duration-300">
                              {industry.name}
                            </span>
                          </div>
                        );
                      })}
                      {/* Duplicate for seamless loop */}
                      {industries.map((industry) => {
                        return (
                          <div
                            key={`b-${industry.name}`}
                            className="group flex shrink-0 items-center gap-3 rounded-[14px] border border-white/[0.08] bg-white/[0.06] backdrop-blur-md px-4 py-3 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.12]"
                          >
                            <span className="text-[13px] sm:text-[14px] font-medium text-white/90 whitespace-nowrap tracking-wide group-hover:text-blue-300 transition-colors duration-300">
                              {industry.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* ── Card 2a & 2b: Stacked Info & CTA (3 cols) ── */}
              <div className="flex flex-col gap-4 md:gap-5 lg:col-span-3 lg:h-full">

                {/* Top Card: Years of Excellence */}
                <motion.div
                  variants={itemVariants}
                  className="relative overflow-hidden flex-1 rounded-[2rem] border border-black/5 bg-black p-5 flex flex-col justify-between shadow-sm lg:min-h-[160px]"
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
                    <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      Established
                    </div>
                  </div>

                  <div className="relative z-10 mt-4">
                    <p className="text-[48px] lg:text-[52px] font-semibold leading-none text-white font-heading tracking-tighter">
                      1995
                    </p>
                    <p className="mt-3 text-[16px] lg:text-[18px] text-white/90 font-medium tracking-wide">
                      Pioneer EMS Provider
                    </p>
                  </div>
                </motion.div>

                {/* Bottom Card: Learn More CTA */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                  className="relative overflow-hidden flex-1 rounded-[2rem] border border-black/5 bg-white p-5 justify-between flex flex-col cursor-pointer group shadow-sm transition-all lg:min-h-[140px]"
                >
                  <a href="/about-us" className="absolute inset-0 z-20" aria-label="Learn More" />

                  <div className="flex flex-col gap-1.5 relative z-10 mt-2">
                    <h3 className="text-[26px] lg:text-[28px] font-semibold leading-tight font-heading text-black tracking-tight">
                      Learn More
                    </h3>
                    <p className="text-[13px] text-black/60 leading-relaxed max-w-[240px]">
                      Discover how our 9 service lines — from prototype to mass production.
                    </p>
                  </div>

                  <div className="relative z-10 mt-3 flex items-center justify-between">
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
            <div className="grid grid-cols-1 gap-4 md:gap-5 lg:grid-cols-12 lg:auto-rows-[minmax(0,1fr)]">

              {/* ── Card 3: Video (5 cols) ── */}
              <motion.div
                variants={itemVariants}
                className="relative overflow-hidden rounded-[2rem] border border-black/5 bg-black lg:col-span-5 shadow-sm min-h-[220px] lg:min-h-[260px]"
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
              <div className="flex flex-col gap-4 md:gap-5 lg:col-span-3 lg:h-full">

                {/* Card 4a: Triple ISO */}
                <motion.div
                  variants={itemVariants}
                  className="flex h-full flex-1 flex-col justify-between rounded-[2rem] border border-black/5 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </span>
                    <span className="hidden h-px flex-1 bg-black/5 sm:block" />
                  </div>
                  <div className="space-y-1 mt-4">
                    <h3 className="text-[18px] md:text-[20px] font-semibold font-heading text-black tracking-tight">Triple ISO Certified</h3>
                    <p className="text-[13px] md:text-[14px] text-black/60 leading-relaxed font-medium">
                      ISO 9001 · 14001 · 45001
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 mt-4">
                    <span className="h-1 lg:h-1 w-6 lg:w-6 rounded-full bg-blue-500" />
                    <span>Quality</span>
                  </div>
                </motion.div>

                {/* Card 4b: Japanese Ownership */}
                <motion.div
                  variants={itemVariants}
                  className="flex h-full flex-1 flex-col justify-between rounded-[2rem] border border-black/5 bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-500">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                        <path d="M2 12h20" />
                      </svg>
                    </span>
                    <span className="hidden h-px flex-1 bg-black/5 sm:block" />
                  </div>
                  <div className="space-y-1 mt-4">
                    <h3 className="text-[18px] md:text-[20px] font-semibold font-heading text-black tracking-tight">100% Japanese</h3>
                    <p className="text-[13px] md:text-[14px] text-black/60 leading-relaxed font-medium">
                      Sole overseas facility of Tosslec Ltd., Kyoto.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.3em] text-black/40 mt-4">
                    <span className="h-1 lg:h-1 w-6 lg:w-6 rounded-full bg-blue-500" />
                    <span>Ownership</span>
                  </div>
                </motion.div>
              </div>

              {/* ── Card 6: Zero Defect Culture Image Card (4 cols) ── */}
              <motion.div
                variants={itemVariants}
                className="group relative flex h-full flex-col justify-between rounded-[2rem] border border-black/5 bg-black p-5 lg:p-6 lg:col-span-4 overflow-hidden shadow-sm min-h-[220px]"
              >
                <div className="absolute inset-0 max-h-full overflow-hidden">
                  <img
                    src="/zero_defect_bg.png"
                    alt="Zero Defect Manufacturing"
                    className="h-full w-full object-cover opacity-60 mix-blend-luminosity transition-transform duration-[800ms] group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/80">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    Manufacturing
                  </div>
                </div>

                <div className="relative z-10 space-y-2 mt-auto pt-10">
                  <h3 className="text-[26px] md:text-[30px] font-semibold font-heading text-white tracking-tight leading-tight group-hover:text-blue-50 transition-colors">
                    Zero-Defect<br />Culture
                  </h3>
                  <div className="flex items-center pt-2 gap-3 opacity-80 mix-blend-lighten">
                    <span className="text-[10px] md:text-[11px] font-bold tracking-[0.2em] text-white/70 uppercase">
                      Precision Assembly
                    </span>
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
