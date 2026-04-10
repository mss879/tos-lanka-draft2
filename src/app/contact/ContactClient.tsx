"use client";

import React from 'react';
import SubPageNavbar from '../../components/SubPageNavbar';
import Footer from '../../components/Footer';
import { motion, Variants, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Mail, Phone, MapPin, Send, Globe, ChevronDown, Check } from 'lucide-react';

const serviceOptions = [
  { value: "general", label: "General Inquiry" },
  { value: "smt", label: "SMT Assembly" },
  { value: "integration", label: "Systems Integration" },
  { value: "coating", label: "Conformal Coating" },
  { value: "supply-chain", label: "Supply Chain Network" },
  { value: "test", label: "Test & Inspection" },
  { value: "tht", label: "Through Hole Technology" },
  { value: "prototype", label: "Prototype Assembling" },
  { value: "harnessing", label: "Automotive Harnessing" },
  { value: "inductive", label: "Inductive Components" },
];

function ServiceDropdown({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = serviceOptions.find(o => o.value === value);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full bg-[#f8f9fa] border rounded-2xl px-5 py-4 text-sm font-medium text-left flex items-center justify-between transition-all duration-300 cursor-pointer ${
          open ? 'border-brand-tertiary/50 ring-1 ring-brand-tertiary/50' : 'border-black/5'
        }`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select a service"
      >
        <span className={selected ? 'text-black' : 'text-black/30'}>
          {selected ? selected.label : 'Select a service'}
        </span>
        <ChevronDown className={`w-4 h-4 text-black/40 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute z-50 top-full mt-2 left-0 right-0 bg-white border border-black/[0.06] rounded-2xl shadow-[0_12px_40px_-10px_rgba(0,0,0,0.12)] overflow-hidden py-2 max-h-[280px] overflow-y-auto list-none p-2 m-0"
            role="listbox"
          >
            {serviceOptions.map((option) => (
              <li
                key={option.value}
                role="option"
                aria-selected={value === option.value}
                onClick={() => { onChange(option.value); setOpen(false); }}
                className={`flex items-center justify-between px-4 py-3 text-sm font-medium cursor-pointer rounded-xl transition-colors duration-150 ${
                  value === option.value
                    ? 'bg-brand-tertiary/5 text-brand-tertiary'
                    : 'text-black hover:bg-[#f8f9fa]'
                }`}
              >
                {option.label}
                {value === option.value && <Check className="w-4 h-4" />}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);

import { createClient } from '@/lib/supabase/client';

export default function ContactPage() {
  const supabase = createClient();
  const [formData, setFormData] = React.useState({
    name: '',
    service: '',
    email: '',
    phone: '',
    details: ''
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase.rpc('submit_contact_form', {
        p_full_name: formData.name,
        p_email: formData.email,
        p_phone: formData.phone,
        p_company: '', // Optional or parsed from name, we keep simple
        p_subject: `Website Inquiry: ${formData.service || 'General'}`,
        p_message: formData.details,
        p_notes: '',
        p_source: 'Contact Page',
        p_metadata: { service: formData.service }
      });

      if (error) throw error;
      setSubmitStatus('success');
      setFormData({ name: '', service: '', email: '', phone: '', details: '' });
    } catch (err) {
      console.error(err);
      setSubmitStatus('error');
    }
    setIsSubmitting(false);
  };

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
    <div className="w-full bg-[#FAFAFA] flex flex-col min-h-screen text-black selection:bg-brand-tertiary selection:text-white">
      <SubPageNavbar />

      <main className="flex-1 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 pb-16 pt-32 sm:pt-40" id="main-content" role="main">
        <motion.div
           variants={containerVariants}
           initial="hidden"
           animate="visible"
           className="flex flex-col gap-16 lg:gap-24 h-full"
        >
          
          {/* TOP SPLIT: CONTACT INFO (LEFT) & FORM (RIGHT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 xl:gap-28">
            
            {/* === LEFT COLUMN: CONTACT DETAILS === */}
            <motion.section
              variants={itemVariants}
              className="lg:col-span-5 flex flex-col pt-2 md:pt-6"
              aria-labelledby="contact-heading"
            >
              <h1 id="contact-heading" className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-black mb-6 font-heading" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
                Let's get in touch.
              </h1>
              <p className="text-sm md:text-base text-black/60 max-w-md leading-relaxed font-light mb-14">
                Direct access to our Japanese manufacturing experts. Whether seeking high-volume EMS integration or rapid prototyping, our global operations center in Sri Lanka is ready to deploy.
              </p>

              <address className="flex flex-col gap-10 not-italic">
                {/* Headquarters */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-black/[0.03] flex items-center justify-center shrink-0 text-brand-tertiary group-hover:bg-brand-tertiary group-hover:text-white transition-colors duration-500" aria-hidden="true">
                    <MapPin className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h2 className="text-xs font-bold tracking-[0.1em] text-black/40 uppercase mb-2">Headquarters</h2>
                    <p className="text-sm md:text-base font-medium text-black leading-relaxed">
                      Tos Lanka Co. (Pvt) Ltd<br/>
                      Block "B", Export Processing Zone,<br/>
                      Biyagama, 11672<br/>
                      Sri Lanka
                    </p>
                  </div>
                </div>

                {/* Direct Lines */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-black/[0.03] flex items-center justify-center shrink-0 text-brand-tertiary group-hover:bg-brand-tertiary group-hover:text-white transition-colors duration-500" aria-hidden="true">
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="w-full">
                    <h2 className="text-xs font-bold tracking-[0.1em] text-black/40 uppercase mb-3">Direct Lines</h2>
                    <dl className="flex flex-col gap-3 max-w-[300px]">
                      <div className="flex justify-between items-center pb-2 border-b border-black-[0.05]">
                        <dt className="text-sm text-black/60 font-medium">Head Office</dt>
                        <dd className="text-sm font-semibold text-black">
                          <a href="tel:+9424651602" aria-label="Call head office: +94 2465160-2">+94 2465160 - 2</a>
                        </dd>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-black-[0.05]">
                        <dt className="text-sm text-black/60 font-medium">Sales</dt>
                        <dd className="text-sm font-semibold text-black">
                          <a href="tel:+9429966612" aria-label="Call sales: +94 2996661-2">+94 2996661 - 2</a>
                        </dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-sm text-black/60 font-medium">WhatsApp</dt>
                        <dd className="text-sm font-semibold text-black">
                          <a href="https://wa.me/94775775790" aria-label="WhatsApp: +94 775 775 790" target="_blank" rel="noopener noreferrer">+94 775 775 790</a>
                        </dd>
                      </div>
                    </dl>
                  </div>
                </div>

                {/* Email Directory */}
                <div className="flex items-start gap-5 group">
                  <div className="w-12 h-12 rounded-full bg-black/[0.03] flex items-center justify-center shrink-0 text-brand-tertiary group-hover:bg-brand-tertiary group-hover:text-white transition-colors duration-500" aria-hidden="true">
                    <Mail className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <div className="w-full">
                    <h2 className="text-xs font-bold tracking-[0.1em] text-black/40 uppercase mb-3">Email Directory</h2>
                    <dl className="flex flex-col gap-3 max-w-[300px]">
                      <div className="flex justify-between items-center pb-2 border-b border-black-[0.05]">
                        <dt className="text-sm text-black/60 font-medium">General</dt>
                        <dd><a href="mailto:info@toslanka.com" className="text-sm font-semibold text-black hover:text-brand-tertiary transition-colors" aria-label="Email general inquiries: info@toslanka.com">info@toslanka.com</a></dd>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b border-black-[0.05]">
                        <dt className="text-sm text-black/60 font-medium">Quotes / Tech</dt>
                        <dd><a href="mailto:dexter@toslanka.com" className="text-sm font-semibold text-black hover:text-brand-tertiary transition-colors" aria-label="Email for quotes and technical inquiries: dexter@toslanka.com">dexter@toslanka.com</a></dd>
                      </div>
                      <div className="flex justify-between items-center">
                        <dt className="text-sm text-black/60 font-medium">Sales</dt>
                        <dd><a href="mailto:vindya@toslanka.com" className="text-sm font-semibold text-black hover:text-brand-tertiary transition-colors" aria-label="Email sales: vindya@toslanka.com">vindya@toslanka.com</a></dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </address>

              {/* Socials */}
              <nav className="flex items-center gap-4 mt-6 pt-8 border-t border-black/[0.05] max-w-[300px] ml-[68px]" aria-label="Social media links">
                <span className="text-xs font-bold tracking-[0.1em] text-black/40 uppercase mr-auto">Socials</span>
                <a href="https://www.linkedin.com/company/tos-lanka-co-pvt-ltd/" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-colors duration-300 shadow-sm" aria-label="TOS Lanka on LinkedIn" target="_blank" rel="noopener noreferrer">
                  <LinkedinIcon className="w-4 h-4" />
                </a>
                <a href="https://web.facebook.com/toslanka" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors duration-300 shadow-sm" aria-label="TOS Lanka on Facebook" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-white border border-black/5 flex items-center justify-center text-black hover:bg-black hover:text-white hover:border-black transition-colors duration-300 shadow-sm" aria-label="TOS Lanka on X (Twitter)">
                  <TwitterIcon className="w-4 h-4" />
                </a>
              </nav>
            </motion.section>

            {/* === RIGHT COLUMN: FORM === */}
            <motion.section
              variants={itemVariants}
              className="lg:col-span-7"
              aria-labelledby="form-heading"
            >
              <div className="bg-white rounded-[2rem] p-8 sm:p-10 lg:p-14 shadow-[0_8px_40px_rgb(0,0,0,0.03)] border border-black/[0.03] relative overflow-hidden">
                
                <h2 id="form-heading" className="text-2xl font-semibold text-black mb-8">Send us a message</h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6 lg:gap-8 w-full relative z-10" aria-label="Contact inquiry form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8">
                    {/* Name */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-name" className="text-[11px] font-bold tracking-[0.1em] text-black/60 uppercase pl-1">Name / Organization</label>
                      <input 
                        id="contact-name"
                        type="text" 
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full bg-[#f8f9fa] border border-black/5 rounded-2xl px-5 py-4 text-sm font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/50 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30"
                        placeholder="Your Name"
                      />
                    </div>
                    
                    {/* Service — Custom Dropdown */}
                    <div className="flex flex-col gap-2 relative">
                      <label className="text-[11px] font-bold tracking-[0.1em] text-black/60 uppercase pl-1">Requested Service</label>
                      <ServiceDropdown
                        value={formData.service}
                        onChange={(val) => setFormData({...formData, service: val})}
                      />
                      {/* Hidden native select for form validation */}
                      <select
                        required
                        value={formData.service}
                        onChange={() => {}}
                        className="sr-only"
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <option value="">Select a service</option>
                        <option value="general">General Inquiry</option>
                      </select>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-email" className="text-[11px] font-bold tracking-[0.1em] text-black/60 uppercase pl-1">Email Address</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        required
                        autoComplete="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full bg-[#f8f9fa] border border-black/5 rounded-2xl px-5 py-4 text-sm font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/50 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30"
                        placeholder="you@company.com"
                      />
                    </div>

                    {/* Phone */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="contact-phone" className="text-[11px] font-bold tracking-[0.1em] text-black/60 uppercase pl-1">Phone Number</label>
                      <input 
                        id="contact-phone"
                        type="tel" 
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full bg-[#f8f9fa] border border-black/5 rounded-2xl px-5 py-4 text-sm font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/50 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="contact-details" className="text-[11px] font-bold tracking-[0.1em] text-black/60 uppercase pl-1">Inquiry Details</label>
                    <textarea 
                      id="contact-details"
                      rows={4}
                      required
                      value={formData.details}
                      onChange={(e) => setFormData({...formData, details: e.target.value})}
                      className="w-full bg-[#f8f9fa] border border-black/5 rounded-2xl px-5 py-4 text-sm font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/50 focus:border-brand-tertiary transition-all duration-300 placeholder:text-black/30 resize-none"
                      placeholder="Project scope, timeline, or requirements..."
                    ></textarea>
                  </div>

                  {submitStatus === 'success' && (
                    <div className="bg-[#e6f4ea] border border-[#a2dcb3] text-[#1e4620] px-4 py-3 rounded-xl text-sm font-medium" role="alert">
                      Thank you! We have received your inquiry.
                    </div>
                  )}
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium" role="alert">
                      There was an error. Please try again.
                    </div>
                  )}

                  <div className="flex items-center justify-between mt-2 pt-4 border-t border-black/[0.03]">
                    <span className="text-[10px] font-bold tracking-[0.15em] text-black/40 uppercase hidden sm:block" aria-hidden="true">
                      Secure Submission
                    </span>
                    
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      aria-label={isSubmitting ? 'Sending your inquiry...' : 'Submit contact form'}
                      className="ml-auto sm:ml-0 bg-black text-white hover:bg-brand-tertiary rounded-full pl-6 pr-2 py-2 flex items-center gap-4 transition-colors duration-500 group shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(58,91,251,0.3)] disabled:opacity-50 disabled:pointer-events-none"
                    >
                      <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                        {isSubmitting ? 'Sending...' : 'Submit Form'}
                      </span>
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center -translate-x-0 group-hover:bg-white text-white group-hover:text-brand-tertiary transition-all duration-500" aria-hidden="true">
                        <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            </motion.section>

          </div>

          {/* === BOTTOM FULL-WIDTH MAP === */}
          <motion.section
            variants={itemVariants}
            className="relative w-full h-[350px] lg:h-[400px] shrink-0 rounded-[2rem] overflow-hidden shadow-sm border border-black/[0.05]"
            aria-label="TOS Lanka headquarters location map"
          >
            <iframe 
              src="https://maps.google.com/maps?q=TOS%20Lanka%20Co.%20(Pvt.)%20Ltd.,%20Biyagama%20Export%20Processing%20Zone,%20Biyagama,%20Sri%20Lanka&t=&z=14&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
              title="TOS Lanka headquarters at Biyagama Export Processing Zone, Sri Lanka"
            ></iframe>

            {/* Glass Label overlay */}
            <div className="absolute bottom-6 left-6 pointer-events-none z-10" aria-hidden="true">
              <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-black/5 shadow-lg flex items-center gap-4">
                 <div className="flex flex-col">
                  <span className="text-[9px] font-bold tracking-[0.15em] text-black/50 uppercase mb-1 drop-shadow-sm">Headquarters Map View</span>
                  <span className="text-[11px] font-black tracking-widest text-black uppercase">Block "B", BEPZ, LK</span>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-brand-tertiary/10 flex items-center justify-center text-brand-tertiary ml-4">
                   <MapPin size={16} strokeWidth={2} />
                 </div>
              </div>
            </div>
          </motion.section>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
