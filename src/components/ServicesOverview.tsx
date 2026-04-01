"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { Plus, Minus, Cpu, Blocks, Droplets, Settings, Microscope, CircuitBoard, Beaker, CarFront, Magnet } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    id: "001",
    title: "Surface Mount Technology (SMT)",
    description: "Tos Lanka, with 20+ years in Surface Mount Technology, excels using advanced Panasonic machines and ROHS compliance.",
    icon: Cpu,
    image: "/services/smt.jpg"
  },
  {
    id: "002",
    title: "Systems Integration",
    description: "We provide complete product assemblies and testing, ensuring zero defects using manual and semi-automatic tools.",
    icon: Blocks,
    image: "/services/integration.jpg"
  },
  {
    id: "003",
    title: "Coating | Potting",
    description: "We offer custom coating for moisture-sensitive PCBs, featuring inline coating and potting facilities for components.",
    icon: Droplets,
    image: "/services/coating.jpg"
  },
  {
    id: "004",
    title: "BGA Rework",
    description: "We offer solutions for BGA rework and repair, equipped with advanced systems and skilled, knowledgeable staff.",
    icon: Settings,
    image: "/services/bga-rework.jpg"
  },
  {
    id: "005",
    title: "Test | Inspection",
    description: "Equipped with advanced AOI machines, we ensure quality through inspections, testing, and firmware uploading for circuit boards.",
    icon: Microscope,
    image: "/services/inspection.jpg"
  },
  {
    id: "006",
    title: "Through Hole Technology",
    description: "Through Hole technology utilizes advanced machines for component insertion, supported by skilled, Japan-trained workers for hand soldering.",
    icon: CircuitBoard,
    image: "/services/through-hole.jpg"
  },
  {
    id: "007",
    title: "Prototype Assembling",
    description: "Prototype PCB assemblies are handled by skilled technicians, offering affordable, flexible processes with fast turnaround times.",
    icon: Beaker,
    image: "/services/prototype.jpg"
  },
  {
    id: "008",
    title: "Automotive Harnessing",
    description: "Extensive experience includes assembling automotive safety sensor harnesses for seat belts and ABS systems for major brands.",
    icon: CarFront,
    image: "/services/automotive.jpg"
  },
  {
    id: "009",
    title: "Inductive Components Assemblies",
    description: "Specializing in inductive component assemblies, skilled professionals leverage expertise for various industrial applications and needs.",
    icon: Magnet,
    image: "/services/inductive.jpg"
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
                    <span className="text-lg md:text-xl font-mono transition-colors duration-300 text-[#F5F5F5]/40 group-hover:text-[#F5F5F5]/70">
                      /{service.id}
                    </span>
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
                      <div className="pb-10 pl-[calc(1.5rem+theme(spacing.6))] md:pl-[calc(1.25rem+theme(spacing.12))] lg:pl-[calc(1.25rem+theme(spacing.12))] flex flex-col md:flex-row gap-8 md:gap-12 items-start">
                        
                        {/* Text Content */}
                        <div className="flex-1 space-y-5 max-w-xl">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 ring-1 ring-white/10">
                              <IconComponent className="w-5 h-5 text-blue-400" strokeWidth={1.5} />
                            </div>
                            <span className="text-xs uppercase tracking-[0.3em] text-white/40 font-medium">
                              Service Line {service.id}
                            </span>
                          </div>
                          <p className="text-[#F5F5F5]/60 text-base md:text-lg leading-relaxed">
                            {service.description}
                          </p>
                          <a
                            href={`/services/${service.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                            className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors duration-300 group/link"
                          >
                            Learn more
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </a>
                        </div>

                        {/* Image */}
                        <div className="relative w-full md:w-[320px] lg:w-[400px] aspect-[16/10] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-2xl shadow-black/50 shrink-0">
                          <Image
                            src={service.image}
                            alt={service.title}
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
