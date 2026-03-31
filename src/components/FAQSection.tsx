"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const faqData = [
  {
    cat: "about",
    catLabel: "About TOS Lanka",
    items: [
      {
        id: "about-0",
        q: "What is TOS Lanka and who owns it?",
        a: "TOS Lanka Co. (Pvt.) Ltd. is a fully Japanese-owned contract electronics manufacturer based in Sri Lanka's Biyagama Export Processing Zone. It is the <strong>only overseas manufacturing facility</strong> of Tosslec Ltd., a respected electronics manufacturer headquartered in Kyoto, Japan, founded in 1982. TOS Lanka itself was established in 1995 and is registered under Sri Lanka's Board of Investment (BOI) under Section 17."
      },
      {
        id: "about-1",
        q: "When was TOS Lanka established, and how long have they been operating?",
        a: "TOS Lanka was incorporated in <strong>1995</strong> — giving the company nearly three decades of electronics manufacturing experience. Over that time it has grown from a single PCB assembly operation into a comprehensive EMS provider offering nine distinct service lines."
      },
      {
        id: "about-2",
        q: "What is TOS Lanka's relationship with Tosslec Ltd. in Japan?",
        a: "TOS Lanka is a <strong>wholly owned subsidiary of Tosslec Ltd.</strong>, Kyoto, Japan. Tosslec was founded in 1982 and has its headquarters in Kyoto plus a Nakatsugawa factory. TOS Lanka is the only Tosslec production facility established outside Japan. This means TOS Lanka operates under the same quality standards, processes, and manufacturing culture as the Japanese parent — and TOS Lanka's team members receive hands-on training at Tosslec's facilities in Japan."
      },
      {
        id: "about-3",
        q: "What awards and recognitions has TOS Lanka received?",
        a: "TOS Lanka has received numerous national and international accolades:<br><br><span class=\"inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold mr-2 mb-2\">Presidential Export Award 2010 & 2011</span><span class=\"inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold mr-2 mb-2\">National Productivity Award 2004, 2005 & 2008</span><span class=\"inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold mr-2 mb-2\">Global Commerce Excellence Award 2012</span><span class=\"inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold mr-2 mb-2\">Social Dialogue Excellence Award 2014</span><span class=\"inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold mr-2 mb-2\">National Exporters Award 2015</span><span class=\"inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold mr-2 mb-2\">Social Dialogue & Workplace Cooperation Award 2019</span><span class=\"inline-block px-3 py-1 bg-black/5 rounded-full text-xs font-bold mr-2 mb-2\">National Business Excellence Award 2024</span><br><br>The company also holds a <strong>Green Channel Customs Clearance Facility</strong> from the Board of Investment of Sri Lanka."
      },
      {
        id: "about-4",
        q: "Which industry associations is TOS Lanka a member of?",
        a: "TOS Lanka is an active member of several industry bodies:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li><strong>SLEMEA</strong> — Sri Lanka Electronic Manufacturers and Exporters Association</li><li><strong>Ceylon Chamber of Commerce</strong></li><li><strong>ECCSL</strong> — European Chamber of Commerce in Sri Lanka</li><li><strong>SLACMA</strong> — Sri Lanka Automotive Component Manufacturers' Association</li><li><strong>SLJBC</strong> — Sri Lanka Japan Business Council</li></ul>"
      }
    ]
  },
  {
    cat: "services",
    catLabel: "Services",
    items: [
      {
        id: "services-0",
        q: "What electronics manufacturing services does TOS Lanka offer?",
        a: "TOS Lanka provides nine distinct service lines under one roof:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li><strong>SMT Assembly</strong> — high-speed surface mount technology</li><li><strong>Systems Integration & Box Build</strong> — full product assembly</li><li><strong>Through Hole Technology (THT)</strong> — automated and manual insertion</li><li><strong>Conformal Coating & Potting</strong> — PCB environmental protection</li><li><strong>BGA Rework & Reballing</strong> — component-level repair</li><li><strong>Test & Inspection</strong> — AOI, ICT, functional testing, X-ray</li><li><strong>Prototype PCB Assembly</strong> — rapid-turnaround, production-grade</li><li><strong>Automotive Wire Harnessing</strong> — vehicle-grade harness manufacturing</li><li><strong>Inductive Component Assembly</strong> — coil winding, transformers, chokes</li></ul>"
      },
      {
        id: "services-1",
        q: "Can TOS Lanka handle both prototype quantities and large-volume production?",
        a: "Yes — TOS Lanka explicitly supports both. Prototype builds start from as few as <strong>5 boards</strong> with no MOQ-based upcharges, and the same Panasonic production lines, solder profiles, and operators are used for prototypes as for high-volume runs. This means prototype-validated boards transition seamlessly to volume production with no re-qualification step needed."
      },
      {
        id: "services-2",
        q: "Does TOS Lanka offer Design for Manufacturability (DFM) review?",
        a: "Yes, and it's <strong>complimentary</strong> for all new product introductions. Before your first board enters the line, TOS Lanka's engineering team reviews your Gerber files, drill files, and Bill of Materials to identify potential issues — pad geometry, component spacing, fiducial placement, solder mask conflicts, thermal management, test point access, and component availability. Feedback is typically returned within 24–48 hours of file submission."
      },
      {
        id: "services-3",
        q: "Does TOS Lanka provide consigned and turnkey sourcing?",
        a: "Both models are supported. You can supply your own components (<strong>consigned</strong>) or have TOS Lanka source everything from your BOM (<strong>turnkey</strong>). The supply chain network spans Hong Kong, China, Taiwan, Japan, USA, Germany, India, Singapore, and Malaysia for components and consumables."
      },
      {
        id: "services-4",
        q: "What makes TOS Lanka's inductive component capability unique?",
        a: "Very few EMS providers worldwide offer custom inductive component manufacturing alongside PCB assembly. TOS Lanka's coil winding, transformer assembly, and inductor fabrication capability is rooted in Tosslec's founding expertise. This means customers who need both PCBAs and custom wound components (inductors, transformers, EMI chokes) can source both from a single vendor — with unified quality, traceability, and logistics. Neither GPV, VarioSystems, nor Syrma SGS offer this combination."
      },
      {
        id: "services-5",
        q: "Which industries does TOS Lanka manufacture for?",
        a: "TOS Lanka serves a broad range of sectors:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li><strong>Automotive</strong> — harnesses, sensor assemblies, control modules</li><li><strong>Medical devices</strong> — patient monitoring, diagnostic, therapeutic equipment</li><li><strong>Industrial controls</strong> — PLCs, drives, factory automation</li><li><strong>Consumer electronics</strong> — high-volume assembly</li><li><strong>IoT & smart devices</strong> — wearables, sensors, edge devices</li><li><strong>Musical instruments</strong> — professional audio (via Tosslec heritage)</li><li><strong>Telecommunications</strong>, <strong>oil drilling</strong>, <strong>smart garments</strong></li></ul>"
      }
    ]
  },
  {
    cat: "quality",
    catLabel: "Quality & certifications",
    items: [
      {
        id: "quality-0",
        q: "What ISO certifications does TOS Lanka hold?",
        a: "TOS Lanka holds three ISO certifications, independently audited by <strong>Bureau Veritas</strong>:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li><strong>ISO 9001:2015</strong> — Quality Management System</li><li><strong>ISO 14001:2015</strong> — Environmental Management System</li><li><strong>ISO 45001:2018</strong> — Occupational Health & Safety Management System</li></ul>All certificates are valid through <strong>June 2027</strong>. This triple certification covers PCB assembly (SMT & THT), box-build, automotive harnessing, LCD monitor assembly, coil winding, and energy-saving lamp production."
      },
      {
        id: "quality-1",
        q: "Is TOS Lanka RoHS compliant?",
        a: "Yes — <strong>full RoHS compliance</strong> is standard across all product lines, not an add-on. Every solder paste, alloy, flux, and process parameter is designed for lead-free, RoHS-compliant manufacturing from the ground up. This ensures compliance for customers shipping to the EU, Japan, North America, and other regulated markets."
      },
      {
        id: "quality-2",
        q: "Does TOS Lanka have medical device manufacturing approval?",
        a: "Yes. TOS Lanka holds a <strong>Certificate of Good Manufacturing Practices</strong> approved by the National Medicines Regulatory Authority (NMRA) of Sri Lanka, confirming compliance with regulatory standards for medical device manufacturing."
      },
      {
        id: "quality-3",
        q: "How does TOS Lanka ensure zero-defect manufacturing?",
        a: "Quality is built in at multiple stages rather than relying on a single end-of-line gate:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li><strong>SPI</strong> (Solder Paste Inspection) — 3D volumetric check before any placement</li><li><strong>AOI</strong> (Automated Optical Inspection) — 100% coverage after reflow</li><li><strong>X-ray inspection</strong> — for BGA, QFN, and other hidden-joint packages</li><li><strong>ICT</strong> (In-Circuit Testing) — electrical integrity of components</li><li><strong>Functional testing</strong> — customer-specified operational verification</li><li><strong>Visual inspection</strong> — per IPC-A-610 Class 2 or Class 3</li><li><strong>Kaizen & SPC</strong> — continuous improvement and statistical process control</li></ul>"
      },
      {
        id: "quality-4",
        q: "Does TOS Lanka follow IPC standards?",
        a: "Yes. Visual inspection and workmanship are performed per <strong>IPC-A-610</strong> (Class 2 or Class 3 as specified). Wire harness assemblies are inspected per <strong>IPC/WHMA-A-620</strong>. BGA rework follows <strong>IPC-7711/7721</strong> guidelines. ESD protection is maintained per <strong>ANSI/ESD S20.20</strong> across the entire production environment."
      }
    ]
  },
  {
    cat: "logistics",
    catLabel: "Quoting & logistics",
    items: [
      {
        id: "logistics-0",
        q: "How quickly can I get a quote from TOS Lanka?",
        a: "TOS Lanka aims to respond with a <strong>comprehensive DFM review and detailed quotation within 48 hours</strong> of receiving your Gerber files, BOM, and assembly requirements. An acknowledgement email is typically sent within 2 hours during business hours (Monday–Friday, 8:00am–7:00pm IST)."
      },
      {
        id: "logistics-1",
        q: "What information should I include in my inquiry?",
        a: "To get the fastest and most accurate quote, include:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li>Project description and target industry</li><li>Gerber files and Bill of Materials (BOM)</li><li>Assembly drawings</li><li>Estimated quantities (prototype, pilot, or production)</li><li>Target delivery timeline</li><li>Special requirements (conformal coating, BGA, automotive standards, test specs)</li></ul>Don't have everything yet? That's fine — submit what you have and TOS Lanka's team will guide you through the process."
      },
      {
        id: "logistics-2",
        q: "Which global markets does TOS Lanka export to?",
        a: "TOS Lanka currently exports to customers in <strong>Japan, Germany, Norway, Switzerland, USA, Canada, and Australia</strong> — spanning four continents. Products manufactured at TOS Lanka operate in automotive electronics, medical systems, industrial controls, IoT devices, and consumer applications worldwide."
      },
      {
        id: "logistics-3",
        q: "What is the China+1 / India+1 strategy and how does TOS Lanka fit?",
        a: "China+1 (or India+1) is a supply chain diversification strategy where manufacturers add a second production location outside China or India to reduce geopolitical and concentration risk. TOS Lanka is positioned as an ideal partner for this — offering <strong>Japanese manufacturing quality</strong> from a BOI Export Processing Zone in Sri Lanka, with competitive labour costs, favourable tax treatment, and proximity to major international shipping lanes connecting Asia, the Middle East, Europe, and the Americas."
      },
      {
        id: "logistics-4",
        q: "How do I contact TOS Lanka?",
        a: "You can reach TOS Lanka through multiple channels:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li><strong>Quotations & technical enquiries:</strong> dexter@toslanka.com</li><li><strong>General enquiries:</strong> info@toslanka.com</li><li><strong>Sales & marketing:</strong> vindya@toslanka.com</li><li><strong>Phone:</strong> +94 112 465 160 / +94 2996661</li><li><strong>WhatsApp:</strong> +94 775775790</li><li><strong>Hours:</strong> Monday–Friday, 8:00am–7:00pm IST (GMT+5:30)</li><li><strong>Address:</strong> Block \"B\", Export Processing Zone, Biyagama, 11672, Sri Lanka</li></ul>"
      }
    ]
  },
  {
    cat: "equipment",
    catLabel: "Equipment & technology",
    items: [
      {
        id: "equipment-0",
        q: "What equipment does TOS Lanka use for SMT assembly?",
        a: "TOS Lanka's SMT production floor runs on <strong>Panasonic high-speed chip-placement machines</strong> — the same platform technology used by leading electronics manufacturers in Japan, Europe, and North America. Supporting equipment includes:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li>Precision screen printers with automatic stencil alignment and 3D SPI</li><li>Multi-zone convection reflow ovens with nitrogen capability</li><li>High-resolution AOI systems with 3D solder joint analysis</li><li>X-ray inspection for BGA and hidden-joint verification</li><li>YAMAHA AOI machines for inspection</li><li>ICT systems for electrical verification</li><li>BGA rework stations with controlled thermal profiles</li><li>Coil winding machines for inductive component manufacturing</li></ul>"
      },
      {
        id: "equipment-1",
        q: "What component types and package sizes can TOS Lanka's SMT lines handle?",
        a: "TOS Lanka's Panasonic placement systems support a wide range of component types:<ul class=\"list-disc pl-5 mt-2 space-y-1\"><li><strong>BGAs</strong> down to 0.4mm pitch</li><li><strong>QFPs</strong> including 0.5mm and 0.4mm pitch</li><li><strong>CSP and Wafer-Level CSP</strong></li><li><strong>01005 chip resistors and capacitors</strong></li><li><strong>Micro-BGA and Package-on-Package (PoP)</strong></li><li>Full range of standard SMD passives and IC packages</li></ul>"
      },
      {
        id: "equipment-2",
        q: "Does TOS Lanka support mixed-technology (SMT + THT) assembly on the same board?",
        a: "Yes. TOS Lanka's production workflow integrates both SMT and through-hole processes seamlessly on the same assembly. SMT components are placed and reflowed first on the Panasonic lines, then through-hole components are inserted (automated or manual), and wave or selective soldering completes the THT connections — all under one roof with a single quality system and traceability record."
      },
      {
        id: "equipment-3",
        q: "Does TOS Lanka's facility use 5S and statistical process control?",
        a: "Yes. The Biyagama production facility operates under strict <strong>5S workplace organisation</strong> principles, and <strong>Statistical Process Control (SPC)</strong> is employed for continuous quality monitoring at every process stage. These practices — rooted in Japanese manufacturing methodology — are embedded in daily operations, not simply documented in manuals. Defect data is analysed weekly and corrective actions are implemented via PDCA methodology."
      }
    ]
  }
];

export default function FAQSection() {
  const [activeCat, setActiveCat] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<{ [key: string]: boolean }>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (val.trim()) {
      setActiveCat('all'); // switch to "all" automatically to search globally
    }
  };

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'about', label: 'About TOS Lanka' },
    { id: 'services', label: 'Services' },
    { id: 'quality', label: 'Quality & certifications' },
    { id: 'logistics', label: 'Quoting & logistics' },
    { id: 'equipment', label: 'Equipment & technology' }
  ];

  // Filter content
  const visibleData = useMemo(() => {
    return faqData.map(section => {
      if (activeCat !== 'all' && section.cat !== activeCat) {
        return { ...section, items: [] };
      }
      
      const filteredItems = section.items.filter(item => {
        if (!searchQuery.trim()) return true;
        const query = searchQuery.toLowerCase();
        return item.q.toLowerCase().includes(query) || item.a.toLowerCase().includes(query);
      });

      return {
        ...section,
        items: filteredItems
      };
    }).filter(section => section.items.length > 0);
  }, [activeCat, searchQuery]);

  return (
    <div className="w-full bg-white rounded-[2.5rem] shadow-sm border border-black/5 p-8 md:p-12 lg:p-16 mb-8 mt-12">
      <div className="flex flex-col mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-bold text-black mb-4">Frequently Asked Questions</h2>
        <p className="text-black/60 max-w-2xl mx-auto">
          Everything you need to know about TOS Lanka's capabilities, quality standards, and how to work with us.
        </p>
      </div>

      <div className="relative mb-8 max-w-2xl mx-auto">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-black/40">
          <Search size={18} />
        </div>
        <input 
          type="text" 
          placeholder="Search questions..." 
          value={searchQuery}
          onChange={handleSearch}
          className="w-full pl-11 pr-4 py-3 bg-[#f8f9fb] border border-black/10 rounded-2xl text-black placeholder:text-black/40 outline-none focus:border-brand-tertiary focus:ring-1 focus:ring-brand-tertiary transition-all"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start mt-8">
        
        {/* LEFT COLUMN: Categories */}
        <div className="w-full lg:w-[300px] shrink-0 sticky top-32 flex flex-row lg:flex-col flex-wrap gap-2 lg:gap-3 z-10">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCat(cat.id)}
              className={`px-5 py-3 lg:py-4 rounded-full lg:rounded-2xl text-[13px] font-bold tracking-wide transition-all duration-300 text-left flex items-center ${
                activeCat === cat.id 
                  ? 'bg-black text-white shadow-md' 
                  : 'bg-[#f8f9fb] text-black/60 border border-black/5 hover:border-black/20 hover:text-black'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* RIGHT COLUMN: FAQ Items */}
        <div className="flex-1 w-full flex flex-col gap-8">
          {visibleData.length > 0 ? (
            visibleData.map(section => (
              <div key={section.cat} className="flex flex-col gap-4">
                <h3 className="text-[11px] lg:text-xs font-bold tracking-[0.2em] text-brand-tertiary uppercase mb-2 ml-2">
                  {section.catLabel}
                </h3>
                
                <div className="flex flex-col gap-3">
                  {section.items.map(item => {
                    const isOpen = openItems[item.id] || false;
                    
                    return (
                      <div 
                        key={item.id} 
                        className={`border border-black/5 rounded-2xl md:rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? 'bg-[#f8f9fa] shadow-sm ring-1 ring-black/5' : 'bg-white hover:border-black/15'}`}
                      >
                        <button 
                          onClick={() => toggleItem(item.id)}
                          className="w-full text-left px-5 md:px-8 py-5 flex items-center justify-between gap-6 outline-none"
                        >
                          <span className={`font-semibold md:text-lg transition-colors leading-snug ${isOpen ? 'text-brand-tertiary' : 'text-black'}`}>
                            {item.q}
                          </span>
                          <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-brand-tertiary text-white' : 'bg-black/5 text-black'}`}>
                            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: 'easeOut' }}>
                              <ChevronDown size={16} strokeWidth={2.5} />
                            </motion.div>
                          </div>
                        </button>
                        
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="px-5 md:px-8 overflow-hidden"
                            >
                              <div 
                                className="pb-6 pt-2 text-black/70 text-sm md:text-base leading-relaxed prose prose-p:my-2 prose-strong:text-black prose-ul:my-2 prose-li:my-1 max-w-none"
                                dangerouslySetInnerHTML={{ __html: item.a }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16 text-black/50 bg-[#f8f9fb] rounded-3xl border border-black/5 border-dashed text-lg font-medium">
              No questions match your search "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
