"use client";

import React from 'react';
import SubPageNavbar from '../../components/SubPageNavbar';
import Footer from '../../components/Footer';
import { motion, Variants } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, Send, Globe } from 'lucide-react';

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

export default function ContactPage() {
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
    <div className="w-full bg-black flex flex-col min-h-screen">
      <SubPageNavbar />

      {/* Main Container - matching the 5px inset padding of WhoWeAre */}
      <main className="flex-1 w-full bg-black px-[5px] pb-[5px] pt-24 sm:pt-32">
        <section className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-black p-[5px] selection:bg-brand-tertiary selection:text-white overflow-hidden shadow-sm border border-white/5">
          
          <div className="w-full h-full mx-auto relative z-10 px-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 lg:gap-8 h-full"
            >
              
              {/* TOP SPLIT: FORM & CARDS */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 shrink-0">
                
                {/* === LEFT COLUMN: HEADER & FORM === */}
                <motion.div
                variants={itemVariants}
                className="lg:col-span-7 bg-white rounded-[2.5rem] p-8 md:p-14 flex flex-col justify-between shadow-sm border border-black/5 relative overflow-hidden"
              >
                {/* Tech Grid Background faintly visible in the form card */}
                <div className="absolute inset-0 z-0 bg-white" />
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[70%] rounded-full bg-brand-tertiary/[0.03] blur-[100px] pointer-events-none" />
                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70 pointer-events-none" />

                <div className="relative z-10 w-full mb-12 mt-4">

                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.05] font-medium tracking-tight text-black mb-6 font-heading" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
                    Start a Conversation.<br />
                    <span className="text-black">Request a Quote.</span>
                  </h1>

                  <p className="text-sm md:text-base text-black max-w-xl leading-[1.6] font-light">
                    Direct access to our Japanese manufacturing experts. Whether seeking high-volume EMS integration or rapid prototyping, our global operations center in Sri Lanka is ready to deploy.
                  </p>
                </div>

                {/* Form Input Section */}
                <div className="relative z-10 flex-1 flex flex-col justify-end mt-4">
                  <form className="w-full flex flex-col gap-6 lg:gap-8 border-t border-black/5 pt-8">
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                      {/* Name */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-[0.15em] text-black uppercase pl-1">Name / Organization</label>
                        <input 
                          type="text" 
                          className="w-full bg-[#f3f4f6] border border-black/5 rounded-2xl px-5 py-4 text-[13px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30"
                          placeholder="Your Name"
                        />
                      </div>
                      
                      {/* Service Dropdown */}
                      <div className="flex flex-col gap-2 relative">
                        <label className="text-[10px] font-bold tracking-[0.15em] text-black uppercase pl-1">Requested Service</label>
                        <select 
                          className="w-full bg-[#f3f4f6] border border-black/5 rounded-2xl px-5 py-4 text-[13px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all duration-300 appearance-none cursor-pointer invalid:text-black/30"
                          defaultValue=""
                          required
                        >
                          <option value="" disabled hidden>Select a service</option>
                          <option value="general" className="text-black">General Inquiry</option>
                          <option value="smt" className="text-black">SMT Assembly</option>
                          <option value="integration" className="text-black">Systems Integration</option>
                          <option value="coating" className="text-black">Conformal Coating</option>
                          <option value="bga" className="text-black">BGA Rework</option>
                          <option value="test" className="text-black">Test & Inspection</option>
                          <option value="tht" className="text-black">Through Hole Technology</option>
                          <option value="prototype" className="text-black">Prototype Assembling</option>
                          <option value="harnessing" className="text-black">Automotive Harnessing</option>
                          <option value="inductive" className="text-black">Inductive Components</option>
                        </select>
                        <div className="absolute right-5 top-[38px] pointer-events-none text-black/40">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-[0.15em] text-black uppercase pl-1">Email Address</label>
                        <input 
                          type="email" 
                          className="w-full bg-[#f3f4f6] border border-black/5 rounded-2xl px-5 py-4 text-[13px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30"
                          placeholder="you@company.com"
                        />
                      </div>

                      {/* Phone Number */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold tracking-[0.15em] text-black uppercase pl-1">Phone Number</label>
                        <input 
                          type="tel" 
                          className="w-full bg-[#f3f4f6] border border-black/5 rounded-2xl px-5 py-4 text-[13px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold tracking-[0.15em] text-black uppercase pl-1">Inquiry Details</label>
                      <textarea 
                        rows={4}
                        className="w-full bg-[#f3f4f6] border border-black/5 rounded-2xl px-5 py-4 text-[13px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30 resize-none"
                        placeholder="Project scope, timeline, or requirements..."
                      ></textarea>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/5">
                      <span className="text-[10px] font-bold tracking-[0.15em] text-black uppercase max-w-[200px] hidden sm:block">
                        Secure Submission Protocol
                      </span>
                      
                      <button 
                        type="button" 
                        className="bg-[#f0f2f5] text-black hover:bg-brand-tertiary rounded-full pl-6 pr-2 py-2 flex items-center gap-4 transition-colors duration-500 group shadow-[0_2px_10px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_30px_rgba(58,91,251,0.25)]"
                      >
                        <span className="text-[11px] font-bold tracking-[0.15em] uppercase group-hover:text-white">Submit Form</span>
                        <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center -translate-x-0 group-hover:bg-white text-black group-hover:text-brand-tertiary transition-all duration-500">
                          <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                        </div>
                      </button>
                    </div>

                  </form>
                </div>

              </motion.div>

              {/* === RIGHT COLUMN: MATRIX CARDS === */}
              <div className="lg:col-span-5 flex flex-col gap-5 lg:gap-8 h-full">
                
                {/* Address Card */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 lg:px-8 py-5 flex items-center lg:items-start gap-4 sm:gap-5 shadow-sm border border-black/5 group hover:shadow-lg hover:border-brand-tertiary/30 transition-all duration-500 overflow-hidden relative">
                   <div className="relative shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-brand-tertiary/[0.05] border border-brand-tertiary/10 flex items-center justify-center overflow-hidden text-brand-tertiary group-hover:bg-brand-tertiary group-hover:border-brand-tertiary group-hover:text-white transition-colors duration-500">
                       <MapPin className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col justify-center lg:pt-1 relative z-10">
                      <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.15em] text-brand-tertiary uppercase mb-1 drop-shadow-sm">Headquarters</span>
                      <p className="text-[13px] lg:text-[14px] font-medium text-black leading-[1.6]">
                        Tos Lanka Co. (Pvt) Ltd<br/>
                        Block "B", Export Processing Zone,<br/>
                        Biyagama, 11672<br/>
                        Sri Lanka
                      </p>
                   </div>
                </motion.div>

                {/* Phone Card */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 lg:px-8 py-5 flex items-center lg:items-start gap-4 sm:gap-5 shadow-sm border border-black/5 group hover:shadow-lg hover:border-brand-tertiary/30 transition-all duration-500">
                   <div className="relative shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-brand-tertiary border border-brand-tertiary/10 flex items-center justify-center overflow-hidden text-white shadow-[0_4px_15px_rgba(0,143,40,0.2)]">
                       <Phone className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col justify-center lg:pt-1 w-full">
                      <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.15em] text-black uppercase mb-2">Direct Lines</span>
                      <div className="flex justify-between items-center group/item hover:bg-black/5 p-2 -mx-2 rounded-xl transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase">Tel 1</span>
                        <span className="text-[13px] font-bold text-black">+94 2465160 - 2</span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:bg-black/5 p-2 -mx-2 rounded-xl transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase">Tel 2</span>
                        <span className="text-[13px] font-bold text-black">+94 2996661 - 2</span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:bg-black/5 p-2 -mx-2 rounded-xl transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase">WhatsApp</span>
                        <span className="text-[13px] font-bold text-black">+94 775 775 790</span>
                      </div>
                   </div>
                </motion.div>

                {/* Email Card */}
                <motion.div variants={itemVariants} className="bg-white rounded-[2.5rem] p-6 lg:px-8 py-5 flex items-center lg:items-start gap-4 sm:gap-5 shadow-sm border border-black/5 group hover:shadow-lg hover:border-[#0f172a]/20 transition-all duration-500">
                   <div className="relative shrink-0 w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#f1f5f9] border border-[#e2e8f0] flex items-center justify-center overflow-hidden text-[#0f172a]">
                       <Mail className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                   </div>
                   <div className="flex flex-col justify-center lg:pt-1 w-full overflow-hidden">
                      <span className="text-[10px] lg:text-[11px] font-bold tracking-[0.15em] text-black uppercase mb-2">Email Directory</span>
                      <div className="flex justify-between items-center group/item hover:bg-black/5 p-2 -mx-2 rounded-xl transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase truncate mr-2">General</span>
                        <span className="text-[11px] sm:text-[13px] font-bold text-black truncate">info@toslanka.com</span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:bg-black/5 p-2 -mx-2 rounded-xl transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase truncate mr-2">Quotes / Tech</span>
                        <span className="text-[11px] sm:text-[13px] font-bold text-black truncate">dexter@toslanka.com</span>
                      </div>
                      <div className="flex justify-between items-center group/item hover:bg-black/5 p-2 -mx-2 rounded-xl transition-colors">
                        <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase truncate mr-2">Sales</span>
                        <span className="text-[11px] sm:text-[13px] font-bold text-black truncate">vindya@toslanka.com</span>
                       </div>

                       {/* Social Links Appended Below Email */}
                       <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#e2e8f0]">
                         <span className="text-[10px] font-bold tracking-[0.1em] text-black uppercase mr-auto drop-shadow-sm">Socials</span>
                         <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors duration-300">
                           <LinkedinIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                         </a>
                         <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors duration-300">
                           <FacebookIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                         </a>
                         <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
                           <TwitterIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                         </a>
                       </div>
                    </div>
                 </motion.div>              </div>
              
              </div> {/* End Top Split Grid */}

              {/* === BOTTOM FULL-WIDTH MAP === */}
              <motion.div
                variants={itemVariants}
                className="relative w-full h-[350px] lg:h-[450px] shrink-0 rounded-[2.5rem] overflow-hidden shadow-sm border border-black/5 mt-2 lg:mt-4"
              >
                <iframe 
                  src="https://maps.google.com/maps?q=TOS%20Lanka%20Co.%20(Pvt.)%20Ltd.,%20Biyagama%20Export%20Processing%20Zone,%20Biyagama,%20Sri%20Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 grayscale contrast-125 opacity-70 mix-blend-multiply hover:grayscale-0 hover:opacity-100 hover:mix-blend-normal transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                  title="TOS Lanka Map Location"
                ></iframe>

                {/* Glass Label overlay */}
                <div className="absolute bottom-6 left-6 right-6 lg:left-8 pointer-events-none z-10">
                  <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-black/5 shadow-[0_8px_20px_rgba(0,0,0,0.06)] flex items-center justify-between max-w-[300px]">
                     <div className="flex flex-col">
                      <span className="text-[9px] font-bold tracking-[0.15em] text-black/40 uppercase mb-1 drop-shadow-sm">Headquarters Map View</span>
                      <span className="text-[10px] sm:text-[11px] font-black tracking-widest text-black uppercase">Block "B", BEPZ, LK</span>
                     </div>
                     <div className="w-8 h-8 rounded-full bg-brand-tertiary/10 flex items-center justify-center text-brand-tertiary">
                       <MapPin size={14} strokeWidth={2} />
                     </div>
                  </div>
                </div>
              </motion.div>

            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer natively handles its own white background and top radii */}
      <Footer />
    </div>
  );
}
