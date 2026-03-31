"use client";

import React from 'react';
import Image from 'next/image';
import { Cpu, Blocks, Droplets, Settings, Microscope, CircuitBoard, Beaker, CarFront, Magnet } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: "01",
    title: "SMT",
    description: "Tos Lanka, with 20+ years in Surface Mount Technology, excels using advanced Panasonic machines and ROHS compliance.",
    icon: Cpu,
    image: "/services/smt.jpg"
  },
  {
    id: "02",
    title: "Systems Integration",
    description: "We provide complete product assemblies and testing, ensuring zero defects using manual and semi-automatic tools.",
    icon: Blocks,
    image: "/services/integration.jpg"
  },
  {
    id: "03",
    title: "Coating | Potting",
    description: "We offer custom coating for moisture-sensitive PCBs, featuring inline coating and potting facilities for components.",
    icon: Droplets,
    image: "/services/coating.jpg"
  },
  {
    id: "04",
    title: "BGA REWORK",
    description: "We offer solutions for BGA rework and repair, equipped with advanced systems and skilled, knowledgeable staff.",
    icon: Settings,
    image: "/services/bga-rework.jpg"
  },
  {
    id: "05",
    title: "Test | Inspection",
    description: "Equipped with advanced AOI machines, we ensure quality through inspections, testing, and firmware uploading for circuit boards.",
    icon: Microscope,
    image: "/services/inspection.jpg"
  },
  {
    id: "06",
    title: "Through Hole",
    description: "Through Hole technology utilizes advanced machines for component insertion, supported by skilled, Japan-trained workers for hand soldering.",
    icon: CircuitBoard,
    image: "/services/through-hole.jpg"
  },
  {
    id: "07",
    title: "Prototype Assembling",
    description: "Prototype PCB assemblies are handled by skilled technicians, offering affordable, flexible processes with fast turnaround times.",
    icon: Beaker,
    image: "/services/prototype.jpg"
  },
  {
    id: "08",
    title: "Automotive Harnessing",
    description: "Extensive experience includes assembling automotive safety sensor harnesses for seat belts and ABS systems for major brands.",
    icon: CarFront,
    image: "/services/automotive.jpg"
  },
  {
    id: "09",
    title: "Inductive Components Assemblies",
    description: "Specializing in inductive component assemblies, skilled professionals leverage expertise for various industrial applications and needs.",
    icon: Magnet,
    image: "/services/inductive.jpg"
  }
];

export default function ServicesOverview() {
  return (
    <section id="services" className="relative z-30 pt-20 pb-20 border-t border-white/5 bg-black">
      <div className="w-full flex flex-col lg:flex-row">
        
        {/* Sticky Left Column */}
        <div className="w-full lg:w-1/2 lg:h-screen lg:sticky lg:top-0 flex flex-col justify-center px-6 py-16 md:px-12 lg:px-20 border-r border-white/10">
          <div className="flex flex-col gap-8 max-w-lg z-10 relative">
            
            <h2 className="text-4xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.1] tracking-tight text-white">
              Comprehensive Contract Electronics Manufacturing Services.
            </h2>
            
            <div className="w-full max-w-[240px] md:max-w-[300px] lg:max-w-[360px] aspect-square mt-8 mx-auto opacity-40 mix-blend-screen flex items-center justify-center pointer-events-none">
              <video 
                src="/Circuit_board_icon_202603291514.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline 
                suppressHydrationWarning
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
        
        {/* Scrolling Right Column */}
        <div className="w-full lg:w-1/2 bg-transparent">
          <div className="flex flex-col items-center">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="w-full max-w-2xl group bg-white/[0.02] border border-white/10 my-6 mx-4 md:my-8 py-10 px-6 md:px-10 hover:bg-white/[0.05] rounded-[32px] transition-colors duration-500 min-h-[160px] flex flex-col justify-center gap-6 relative overflow-hidden shadow-2xl shadow-black/50"
              >
                {/* Subtle Hover Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00BA34]/[0.02] to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="flex justify-between items-center w-full mb-1 relative z-10">
                  {/* Icon Box */}
                  <div className="w-12 h-12 md:w-14 md:h-14 flex items-center justify-center rounded-[18px] bg-white/5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.5)] ring-1 ring-white/10 group-hover:ring-[#00BA34]/30 group-hover:bg-[#00BA34]/10 transition-all duration-500 overflow-hidden relative">
                    {/* Inner glowing element */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-[#00BA34]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <service.icon className="w-5 h-5 md:w-6 md:h-6 text-white/50 group-hover:text-[#00BA34] transition-colors duration-500 relative z-10" strokeWidth={1.5} />
                  </div>
                  {/* Watermark Number */}
                  <span className="text-white text-2xl md:text-3xl font-display font-medium transition-colors duration-500">
                    {service.id}
                  </span>
                </div>
                
                <div className="space-y-3 w-full text-center md:text-left relative z-10">
                  <h3 className="text-2xl font-display font-medium tracking-tight text-white group-hover:text-blue-400 transition-colors duration-500">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-base leading-relaxed font-body max-w-xl mx-auto md:mx-0">
                    {service.description}
                  </p>
                  
                  {/* Modern Editorial Image Display - Centered */}
                  <div className="relative w-full max-w-[85%] md:max-w-[420px] mx-auto aspect-[16/10] mt-8 rounded-[24px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.5)] ring-1 ring-white/10 group-hover:shadow-[0_20px_40px_rgba(59,130,246,0.15)] group-hover:ring-blue-500/30 transition-all duration-700 bg-black/20">
                    <Image 
                      src={service.image} 
                      alt={service.title} 
                      fill 
                      sizes="(max-width: 1024px) 85vw, 420px"
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]" 
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
