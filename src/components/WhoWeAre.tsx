"use client";

import { motion, Variants } from "framer-motion";

import { ArrowUpRight, Cpu } from "lucide-react";

export default function WhoWeAre() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="w-full bg-white px-[5px] pb-12 md:pb-24 pt-12 md:pt-24">
      <section className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-[#f8f9fa] p-[5px] selection:bg-brand-primary selection:text-white overflow-hidden shadow-sm">

        <div className="w-full h-full mx-auto relative z-10 px-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] h-full"
          >
            {/* Main Left Card - Span 8 */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-8 bg-white rounded-[2.5rem] p-8 md:p-12 md:px-14 flex flex-col justify-between shadow-sm border border-black/5 h-full"
            >
              <div>
                <div className="flex items-center gap-4 mb-10">
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-blue-500 uppercase">
                    Who We Are
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-blue-500/50">/</span>
                  <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] text-blue-500">
                    01
                  </span>
                </div>

                <h2 className="text-3xl md:text-4xl lg:text-5xl leading-[1.1] font-medium tracking-tight text-black mb-8" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
                  Authentic Japanese<br />
                  Manufacturing Discipline.
                </h2>

                <div className="flex flex-col gap-4 text-sm md:text-base text-black/60 max-w-2xl leading-[1.6] font-light mb-12">
                  <p>
                    TOS Lanka Co. (Pvt.) Ltd. is a BOI-registered, fully Japanese-owned electronics manufacturing services (EMS) provider operating from Sri Lanka's Biyagama Export Processing Zone. As the sole overseas production facility of Tosslec Ltd., Kyoto, we bring authentic Japanese manufacturing discipline — precision engineering, zero-defect culture, and continuous improvement — to every PCB assembly, wire harness, and system integration project we undertake.
                  </p>
                  <p>
                    We serve automotive, medical device, industrial control, consumer electronics, and IoT manufacturers across Japan, Europe, North America, and Scandinavia. Whether you need high-volume production runs or specialised small-batch prototypes, TOS Lanka delivers the quality, reliability, and cost efficiency that global OEMs demand.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 mt-auto pt-8">
                <div className="w-12 h-[1px] bg-blue-500"></div>
                <span className="text-xs font-bold tracking-[0.15em] text-blue-500 uppercase">
                  TOS Lanka Pvt Ltd
                </span>
              </div>
            </motion.div>

            {/* Right Column Matrix - Span 4 */}
            <div className="lg:col-span-4 flex flex-col gap-4 lg:gap-6 h-full">

              {/* Video Card */}
              <motion.div
                variants={itemVariants}
                className="relative w-full min-h-[200px] lg:min-h-[250px] flex-1 rounded-[2.5rem] overflow-hidden shadow-sm border border-black/5"
              >
                <video
                  src="/who-we-are-vid-opt.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  suppressHydrationWarning
                  className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-110"
                />
              </motion.div>

              {/* Bottom Two Cards */}
              <div className="grid grid-cols-2 gap-[5px] shrink-0">

                {/* Learn More Card */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.05)" }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-[2.5rem] p-6 lg:p-8 flex flex-col shadow-sm border border-black/5 cursor-pointer group"
                >
                  {/* Unified Identical Top Wrapper for Alignment */}
                  <div className="h-20 lg:h-24 flex items-center justify-start mb-4">
                    <div className="relative w-16 h-16 lg:w-20 lg:h-20 rounded-full border border-blue-500/30 flex items-center justify-center overflow-hidden text-blue-500 group-hover:bg-blue-500 group-hover:border-blue-500 group-hover:text-white transition-colors duration-500">
                      <ArrowUpRight className="absolute w-6 h-6 lg:w-8 lg:h-8 transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[150%] group-hover:-translate-y-[150%]" strokeWidth={1} />
                      <ArrowUpRight className="absolute w-6 h-6 lg:w-8 lg:h-8 translate-x-[-150%] translate-y-[150%] transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0 group-hover:translate-y-0" strokeWidth={1} />
                    </div>
                  </div>

                  {/* Left-Aligned Text at the Bottom */}
                  <div className="mt-auto w-full pt-2 min-h-[85px] flex flex-col justify-start">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="relative flex h-[8px] w-[8px]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[8px] w-[8px] bg-blue-500"></span>
                      </span>
                      <h3 className="text-[12px] lg:text-[13px] font-black tracking-widest text-black uppercase leading-[1.3]">
                        Learn More
                      </h3>
                    </div>
                    <span className="text-[10px] font-bold tracking-[0.1em] text-black/40 uppercase pl-5 block">
                      Inquiry Open
                    </span>
                  </div>
                </motion.div>

                {/* Status Card */}
                <motion.div
                  variants={itemVariants}
                  className="bg-white rounded-[2.5rem] p-6 lg:p-8 flex flex-col shadow-sm border border-black/5"
                >
                  {/* Unified Identical Top Wrapper for Alignment */}
                  <div className="h-20 lg:h-24 flex items-center justify-start mb-4">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center">
                      <motion.svg
                        width="60"
                        height="60"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-500 w-12 h-12 lg:w-[60px] lg:h-[60px]"
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
                  </div>

                  {/* Left-Aligned Text at the Bottom */}
                  <div className="mt-auto w-full pt-2 min-h-[85px] flex flex-col justify-start">
                    <div className="flex items-start gap-3 mb-3">
                      <span className="relative flex h-[8px] w-[8px] mt-[3px] flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-[8px] w-[8px] bg-blue-500"></span>
                      </span>
                      <h3 className="text-[12px] lg:text-[13px] font-black tracking-widest text-black uppercase leading-[1.3]">
                        Status:<br />Operational
                      </h3>
                    </div>
                    <p className="text-[9px] font-bold tracking-[0.15em] text-black/40 uppercase leading-relaxed pl-5">
                      Tokyo Standard<br />Precision<br />Protocol Active
                    </p>
                  </div>
                </motion.div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
