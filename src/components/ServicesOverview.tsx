"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Plus, Minus, Cpu, Blocks, Droplets, Settings, Microscope, CircuitBoard, Beaker, CarFront, Magnet, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: "001",
    title: "Surface Mount Technology (SMT)",
    slug: "smt",
    description: "Tos Lanka, with 20+ years in Surface Mount Technology, excels using advanced Panasonic machines and ROHS compliance.",
    icon: Cpu,
    image: "/services/smt_new.webp"
  },
  {
    id: "002",
    title: "Systems Integration",
    slug: "system-integration",
    description: "We provide complete product assemblies and testing, ensuring zero defects using manual and semi-automatic tools.",
    icon: Blocks,
    image: "/services/integration_new.webp"
  },
  {
    id: "003",
    title: "Coating | Potting",
    slug: "coating-potting",
    description: "We offer custom coating for moisture-sensitive PCBs, featuring inline coating and potting facilities for components.",
    icon: Droplets,
    image: "/services/coating_new.webp"
  },
  {
    id: "004",
    title: "Supply Chain Network",
    slug: "supply-chain",
    description: "We provide both consigned and turnkey solutions, adapting seamlessly to customer requirements.\n• PCBs & Components: sourced from Hong Kong, China, Taiwan, Japan, USA, Germany, and India\n• Consumables (solder, flux, chemicals): sourced from Singapore and Malaysia\n• Plastic & Aluminum Parts (including enclosures): sourced from China, Vietnam, and Sri Lanka\nBy leveraging a diverse global supply network, we ensure flexibility, quality, and reliability in every project.",
    icon: Globe,
    image: "/services/supply-chain_new.webp"
  },
  {
    id: "005",
    title: "Test | Inspection",
    slug: "test-inspection",
    description: "Equipped with advanced AOI machines, we ensure quality through inspections, testing, and firmware uploading for circuit boards.",
    icon: Microscope,
    image: "/services/inspection_new.webp"
  },
  {
    id: "006",
    title: "Through Hole Technology",
    slug: "through-hole",
    description: "Through Hole technology utilizes advanced machines for component insertion, supported by skilled, Japan-trained workers for hand soldering.",
    icon: CircuitBoard,
    image: "/services/through-hole_new.webp"
  },
  {
    id: "007",
    title: "Prototype Assembling",
    slug: "prototype-assembling",
    description: "Prototype PCB assemblies are handled by skilled technicians, offering affordable, flexible processes with fast turnaround times.",
    icon: Beaker,
    image: "/services/prototype_new.webp"
  },
  {
    id: "008",
    title: "Automotive Harnessing",
    slug: "automotive-harnessing",
    description: "Extensive experience includes assembling automotive safety sensor harnesses for seat belts and ABS systems for major brands.",
    icon: CarFront,
    image: "/services/automotive_new.webp"
  },
  {
    id: "009",
    title: "Inductive Components Assemblies",
    slug: "inductive-components",
    description: "Specializing in inductive component assemblies, skilled professionals leverage expertise for various industrial applications and needs.",
    icon: Magnet,
    image: "/services/inductive_new.webp"
  }
];

export default function ServicesOverview() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="services"
      className="w-full bg-[#111111] text-[#F5F5F5] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-16 lg:gap-24">

        {/* ─── Header ─── */}
        <div className="w-full space-y-8">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] text-white font-heading">
            Services
          </h2>
          <p className="text-[#F5F5F5]/70 text-lg leading-relaxed max-w-2xl">
            Nine specialized service lines under one roof — from prototype PCB assembly to full-scale automotive harnessing, powered by Japanese precision.
          </p>
        </div>

        {/* ─── Accordion List ─── */}
        <div className="w-full border-t border-white/10">
          {services.map((service, index) => {
            const isOpen = openIndex === index;
            const IconComponent = service.icon;

            return (
              <div
                key={service.id}
                className="group relative border-b border-white/10"
              >
                {/* Accordion Button */}
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between py-10 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#111111] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6 md:gap-12">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide transition-colors duration-300 text-[#F5F5F5] group-hover:text-white">
                      {service.title}
                    </h3>
                  </div>

                  <div
                    className={`relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : "rotate-0"
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 text-[#F5F5F5]/70 group-hover:text-white" strokeWidth={1} />
                    ) : (
                      <Plus className="w-6 h-6 md:w-8 md:h-8 transition-colors duration-300 text-[#F5F5F5]/70 group-hover:text-white" strokeWidth={1} />
                    )}
                  </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        
                        {/* Text Content */}
                        <div className="flex-1 space-y-5 max-w-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                              <IconComponent className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                            </div>
                          </div>
                          <p className="text-[#F5F5F5]/60 text-base md:text-lg leading-relaxed">
                            {service.description}
                          </p>
                          <Link
                            href={`/services/${service.slug}`}
                            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 group/link"
                          >
                            Learn more
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </Link>
                        </div>

                        {/* Image */}
                        <div className="relative w-full md:w-[320px] lg:w-[400px] aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/50 shrink-0">
                          <Image
                            src={service.image}
                            alt={`${service.title} - TOS Lanka contract manufacturing process`}
                            fill
                            sizes="(max-width: 768px) 100vw, 400px"
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
