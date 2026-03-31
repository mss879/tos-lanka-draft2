"use client";

import React, { useRef } from 'react';
import SubPageNavbar from '../../components/SubPageNavbar';
import Footer from '../../components/Footer';
import { motion, Variants } from 'framer-motion';

// --- CUSTOM ANIMATED SVG ICONS ---
// Designed for light/white themes using currentColor (inject via text-brand-primary or text-brand-tertiary)
const IsoIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" animate={{ rotate: 360 }} transition={{ duration: 24, repeat: Infinity, ease: "linear" }} />
    <motion.circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1.5" />
    <motion.path d="M12 2V6M12 18V22M2 12H6M18 12H22" stroke="currentColor" strokeWidth="1" strokeLinecap="round" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
    <circle cx="12" cy="12" r="2" fill="currentColor" />
  </svg>
);

const NMRAIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="1" strokeDasharray="2 4"/>
    <motion.path d="M9 12H15M12 9V15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" animate={{ scale: [1, 1.15, 1], rotate: [0, 90, 180, 270, 360] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} />
    <motion.path d="M5 12L7 12L8.5 8L11.5 17L13 12L15 12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" animate={{ pathLength: [0, 1, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
  </svg>
);

const ScopeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="15" y="3" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="3" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <rect x="15" y="15" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.5"/>
    <motion.path d="M9 6H15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" animate={{ strokeDashoffset: [0, -10] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    <motion.path d="M9 18H15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" animate={{ strokeDashoffset: [0, 10] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    <motion.path d="M6 9V15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" animate={{ strokeDashoffset: [0, 10] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    <motion.path d="M18 9V15" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" animate={{ strokeDashoffset: [0, -10] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
  </svg>
);

const AwardIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <motion.path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1"/>
    <circle cx="12" cy="12" r="1" fill="currentColor"/>
    <motion.path d="M12 15V20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
  </svg>
);


export default function CertificationPage() {
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

  const listContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.4 },
    },
  };

  const listItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const awards = [
    { title: "Presidential Export Award", desc: "Best Exporter for Electrical and Electronic Sector", year: "2010, 2011" },
    { title: "National Productivity Award Winner", desc: "Recognized for outstanding manufacturing productivity.", year: "2004, 2005, 2008" },
    { title: "Green Channel Customs Facility", desc: "High-priority clearance holder from BOI Sri Lanka.", year: "Active" },
    { title: "Global Commerce Excellence", desc: "Recipient of the celebrated Global Commerce Award.", year: "2012" },
    { title: "Social Dialogue Excellence", desc: "Recognized for exceptional workplace communication.", year: "2014" },
    { title: "National Exporters Award", desc: "Recipient of the National Exporters Award.", year: "2015" },
    { title: "Workplace Cooperation Award", desc: "Awarded for outstanding inter-departmental harmony.", year: "2019" },
    { title: "National Business Excellence", desc: "Recognized for overall leadership and enterprise excellence.", year: "2024" },
  ];

  const scopeItems = [
    "Assembly of Printed Circuit Boards (PCBs) using Surface Mounted Technology (SMT) and Through Hole Technology (THT)",
    "Electronic assembly of musical instruments",
    "Factory automation",
    "Medical and industrial equipment assembly",
    "Automotive harnessing assembly",
    "Assembly of LCD monitors",
    "Production of energy-saving lamps and coil winding"
  ];

  return (
    <div className="w-full bg-[#f8f9fa] flex flex-col min-h-screen selection:bg-brand-primary selection:text-white">
      <SubPageNavbar />

      {/* Main Container with fixed inset padding exactly mimicking the Contact/WhoWeAre white theme structure */}
      <main className="flex-1 w-full bg-[#f8f9fa] px-[5px] pb-[5px] pt-[88px] sm:pt-[96px]">
        <section className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-white shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05),inset_0_2px_20px_rgba(255,255,255,0.8)] border border-black/[0.03] p-2 sm:p-4 md:p-6 overflow-hidden min-h-[85vh]">
          
          {/* Subtle Ambient Clean Gradients */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-tertiary/[0.03] blur-[150px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-primary/[0.04] blur-[150px] pointer-events-none" />
          
          {/* Subtlest tech grid pattern over the f8f9fa background */}
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70 pointer-events-none" />

          <div className="w-full h-full max-w-[1400px] mx-auto relative z-10 px-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-[5px] sm:gap-4 h-full"
            >
              
              {/* === SECTION 1: HERO HEADER === */}
              <motion.div
                variants={itemVariants}
                className="w-full bg-white rounded-[2rem] lg:rounded-[3rem] p-10 md:p-16 lg:p-24 flex flex-col items-center justify-center text-center shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05)] border border-black/[0.03] relative overflow-hidden shrink-0 group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-primary/[0.01] pointer-events-none"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />

                <div className="relative z-10 max-w-4xl flex flex-col items-center">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                    className="inline-flex items-center justify-center gap-3 mb-8 px-6 py-2 rounded-full bg-brand-primary/[0.05] border border-brand-primary/[0.1] shadow-sm backdrop-blur-md"
                  >
                    <IsoIcon className="w-5 h-5 text-brand-primary" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase font-mono">Global Standards & Compliance</span>
                  </motion.div>

                  <h1 className="text-4xl md:text-6xl lg:text-[5.5rem] leading-[1.05] font-medium tracking-tight text-black mb-8 font-heading" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
                    Certified <span className="text-black inline-block mix-blend-multiply relative">
                      Excellence.
                      <motion.span 
                        className="absolute bottom-2 left-0 w-full h-[6px] bg-brand-primary/20 -z-10 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: "100%" }}
                        transition={{ duration: 1, delay: 0.6, ease: "circOut" }}
                      />
                    </span>
                  </h1>

                  <p className="text-base sm:text-lg lg:text-xl text-black/60 max-w-3xl leading-relaxed font-light">
                    At TOS LANKA (PRIVATE) LIMITED, we are committed to maintaining the highest standards of quality and sustainability in our operations. Our dedication to excellence is validated by rigorous management systems and internationally recognized standards.
                  </p>
                </div>
              </motion.div>

              {/* === SECTION 2: ISO CERTIFICATIONS === */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4 shrink-0 mt-2 sm:mt-0">
                
                {/* Left: Certifications List & Scope */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)" }}
                  className="lg:col-span-7 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-center transition-all duration-500"
                >
                  <div className="flex items-center gap-5 mb-10">
                    <div className="relative w-16 h-16 rounded-[1.25rem] bg-brand-tertiary/[0.05] border border-brand-tertiary/10 flex items-center justify-center text-brand-tertiary overflow-hidden group">
                      <motion.div 
                        className="absolute inset-0 bg-brand-tertiary opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      />
                      <IsoIcon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-black font-heading leading-tight">
                        ISO Accreditations
                      </h2>
                      <div className="w-12 h-1 bg-brand-tertiary mt-3 rounded-full" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12">
                    {[
                      { code: "ISO 9001", year: "2015", desc: "Quality Management" },
                      { code: "ISO 14001", year: "2015", desc: "Environmental Systems" },
                      { code: "ISO 45001", year: "2018", desc: "Health & Safety" }
                    ].map((cert, idx) => (
                      <motion.div 
                        key={idx}
                        whileHover={{ y: -5, backgroundColor: "#ffffff" }}
                        className="bg-[#f8f9fa] rounded-2xl p-6 border border-black/5 hover:border-brand-tertiary/20 hover:shadow-[0_10px_30px_-10px_rgba(58,91,251,0.15)] transition-all duration-300 flex flex-col justify-between"
                      >
                         <div className="text-[10px] text-black/40 font-mono tracking-widest mb-3">{cert.year}</div>
                         <div>
                           <h3 className="text-xl md:text-2xl font-bold text-black mb-2 font-heading tracking-tight">{cert.code}</h3>
                           <p className="text-[13px] text-black/60 font-medium leading-[1.4]">{cert.desc}</p>
                         </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-auto bg-white border border-black/[0.05] shadow-[inset_0_2px_15px_rgba(0,0,0,0.02)] p-8 rounded-[2rem] flex flex-col gap-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-brand-tertiary/[0.02] blur-[50px] pointer-events-none rounded-full" />
                     
                     <div className="flex items-center gap-4 relative z-10">
                       <ScopeIcon className="w-6 h-6 text-brand-tertiary" />
                       <span className="text-[11px] md:text-xs font-bold tracking-[0.2em] text-black/80 uppercase">Approved Scope of Operations</span>
                     </div>
                     
                     <div className="h-[1px] w-full bg-black/5 relative z-10" />
                     
                     <motion.div 
                       variants={listContainerVariants}
                       initial="hidden"
                       whileInView="visible"
                       viewport={{ once: true, margin: "-100px" }}
                       className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 relative z-10"
                     >
                       {scopeItems.slice(0, 6).map((item, idx) => (
                         <motion.div variants={listItemVariants} key={idx} className="flex items-start gap-4 group cursor-default">
                           <div className="relative w-6 h-6 mt-[2px] rounded-full border border-black/10 flex items-center justify-center shrink-0 group-hover:border-brand-tertiary/30 transition-colors bg-[#f8f9fa]">
                             <div className="w-1.5 h-1.5 rounded-full bg-brand-tertiary/40 group-hover:bg-brand-tertiary group-hover:shadow-[0_0_8px_rgba(58,91,251,0.6)] transition-all" />
                           </div>
                           <span className="text-[13px] text-black/70 group-hover:text-black transition-colors leading-[1.6] font-medium">{item}</span>
                         </motion.div>
                       ))}
                     </motion.div>
                  </div>
                </motion.div>

                {/* Right: Premium Image Treatment */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)" }}
                  className="lg:col-span-5 bg-white rounded-[2rem] lg:rounded-[3rem] p-5 lg:p-6 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col transition-all duration-500 min-h-[450px]"
                >
                  <div className="relative w-full h-full flex-1 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner">
                    <img 
                      src="/certificates/iso.jpg" 
                      alt="ISO Certificates" 
                      className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6 object-center transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] filter mix-blend-multiply brightness-[0.95]"
                    />

                    {/* Animated Badge */}
                    <motion.div 
                      className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-5 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20"
                    >
                       <div className="flex flex-col">
                         <span className="text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase mb-1">Status</span>
                         <span className="text-[12px] font-bold text-black uppercase tracking-wider">Official Documentation</span>
                       </div>
                       <div className="w-10 h-10 rounded-full bg-brand-tertiary/10 flex items-center justify-center">
                         <div className="w-2.5 h-2.5 rounded-full bg-brand-tertiary animate-pulse" />
                       </div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>

              {/* === SECTION 3: NMRA (Good Manufacturing Practices) === */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4 shrink-0 mt-2 sm:mt-0">
                
                {/* Left: Image */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)" }}
                  className="lg:col-span-4 bg-white rounded-[2rem] lg:rounded-[3rem] p-5 lg:p-6 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col transition-all duration-500 min-h-[400px]"
                >
                  <div className="relative w-full h-full flex-1 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner">
                    <img 
                      src="/certificates/WhatsApp%20Image%202026-03-30%20at%202.32.46%20PM.jpeg" 
                      alt="NMRA Certificate" 
                      className="absolute inset-0 w-full h-full object-contain p-4 sm:p-6 transform scale-100 group-hover:scale-[1.03] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)] filter mix-blend-multiply brightness-[0.95]"
                    />
                    
                    <motion.div 
                      className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-center opacity-0 translate-y-8 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20"
                    >
                       <span className="text-[11px] font-bold text-black uppercase tracking-widest">View Credentials</span>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Right: Content */}
                <motion.div
                  variants={itemVariants}
                  whileHover={{ y: -4, boxShadow: "0 20px 40px -15px rgba(0,0,0,0.06)" }}
                  className="lg:col-span-8 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-20 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col justify-center transition-all duration-500"
                >
                  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-primary/[0.02] blur-[100px] pointer-events-none rounded-full" />

                  <div className="w-20 h-20 rounded-2xl bg-brand-primary/5 border border-brand-primary/10 flex items-center justify-center mb-10 text-brand-primary shadow-sm">
                    <NMRAIcon className="w-10 h-10" />
                  </div>

                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-8 font-heading max-w-2xl leading-[1.05]" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
                    Good Manufacturing <br className="hidden sm:block" />
                    <span className="text-brand-primary drop-shadow-[0_0_15px_rgba(0,143,40,0.2)]">Practices (GMP)</span>
                  </h2>
                  
                  <div className="flex flex-col gap-5 text-sm md:text-lg text-black/60 max-w-2xl font-light leading-[1.6]">
                    <p>
                      We are officially approved for medical device manufacturing by the National Medicines Regulatory Authority (NMRA) of Sri Lanka. 
                    </p>
                    <p>
                      This recognition underscores our strict compliance with stringent regulatory standards, reinforcing our commitment to delivering safe, extremely reliable, and high-quality products specifically tailored for the healthcare industry.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* === SECTION 4: PREMIUM WATERMARK AWARDS GRID === */}
              <motion.div
                variants={itemVariants}
                className="w-full bg-white rounded-[2rem] lg:rounded-[3rem] p-10 md:p-14 lg:p-20 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden shrink-0 mt-2 sm:mt-0"
              >
                <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full bg-brand-primary/[0.02] blur-[150px] pointer-events-none" />

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 relative z-10">
                  <div className="max-w-4xl">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tight text-black mb-6 font-heading leading-tight" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
                      Awards & Recognition
                    </h2>
                    <p className="text-base md:text-lg lg:text-xl text-black/50 font-light leading-relaxed max-w-2xl">
                      A continual testament to our unwavering commitment to excellence, innovation, and sustainable business practices over the last two decades.
                    </p>
                  </div>
                </div>

                <motion.div 
                  variants={listContainerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 relative z-10"
                >
                  {awards.map((award, idx) => (
                    <motion.div 
                       variants={listItemVariants}
                       whileHover={{ scale: 1.01, backgroundColor: "#ffffff" }}
                       key={idx} 
                       className="group relative flex flex-col justify-center py-8 px-8 lg:px-12 rounded-[1.5rem] bg-[#f8f9fa] border border-black/[0.04] hover:border-brand-primary/20 hover:shadow-[0_15px_30px_-10px_rgba(0,143,40,0.1)] transition-all duration-500 overflow-hidden cursor-default min-h-[160px]"
                    >
                       {/* Animated Accent Edge on the Left */}
                       <div className="absolute top-0 left-0 w-1.5 h-full bg-black/[0.04] group-hover:bg-brand-primary transition-colors duration-500" />

                       <div className="relative z-10">
                         {/* Pill Badge */}
                         <div className="inline-block px-3 py-1 bg-white border border-black/5 text-black/50 font-mono text-[11px] font-bold tracking-widest rounded-full mb-4 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-colors duration-500 shadow-sm">
                           {award.year}
                         </div>
                         
                         {/* Title & Description */}
                         <h3 className="text-xl md:text-2xl font-bold text-black mb-2 font-heading tracking-tight group-hover:text-brand-primary transition-colors duration-500 pr-10">
                           {award.title}
                         </h3>
                         <p className="text-[14px] md:text-[15px] text-black/60 font-medium group-hover:text-black/80 transition-colors duration-500 pr-8 lg:pr-12">
                           {award.desc}
                         </p>
                       </div>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
