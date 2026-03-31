"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [typedText, setTypedText] = useState("");
  const word = "Welcome...";

  // 1. Typing Effect Logic
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(word.substring(0, index));
      index++;
      if (index > word.length) {
        clearInterval(interval);
      }
    }, 120); // Speed of typing
    
    return () => clearInterval(interval);
  }, []);

  // 2. Strict 2.5s Auto-Kill
  useEffect(() => {
    const timer = setTimeout(() => {
      setComplete(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  // Framer Motion drawing mechanics for the SVG lines
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.1 + i * 0.15;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: "spring" as const, duration: 1.8, bounce: 0 },
          opacity: { delay, duration: 0.01 }
        }
      };
    }
  };

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-10vh" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} // Smooth slide up vanish
          className="fixed inset-0 z-[9999] bg-[#f8f9fa] flex flex-col items-center justify-center overflow-hidden pointer-events-none"
        >
          {/* Subtle Glow Behind SVG */}
          <div className="absolute w-[400px] h-[400px] bg-brand-primary/[0.04] rounded-full blur-[100px]" />

          <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] flex items-center justify-center mb-8">
            
            {/* Custom SVG "Circuit Drawing" */}
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 200 200"
              initial="hidden"
              animate="visible"
              className="absolute inset-0 text-brand-primary"
            >
              {/* Outer Microchip Body */}
              <motion.rect
                width="36" height="36" x="82" y="82" rx="4"
                stroke="currentColor" strokeWidth="2.5" fill="none"
                custom={1} variants={draw}
              />
              
              {/* Inner Die */}
              <motion.rect
                width="16" height="16" x="92" y="92" rx="2"
                stroke="currentColor" strokeWidth="1.5" fill="none"
                custom={1.2} variants={draw}
              />

              {/* Pins (small lines entering the chip body) */}
              {[90, 96, 104, 110].map((pos, idx) => (
                <React.Fragment key={`pin-${idx}`}>
                   {/* Left pins */}
                   <motion.line x1="78" y1={pos} x2="82" y2={pos} stroke="currentColor" strokeWidth="1.5" custom={1.3 + idx*0.1} variants={draw} />
                   {/* Right pins */}
                   <motion.line x1="118" y1={pos} x2="122" y2={pos} stroke="currentColor" strokeWidth="1.5" custom={1.4 + idx*0.1} variants={draw} />
                   {/* Top pins */}
                   <motion.line x1={pos} y1="78" x2={pos} y2="82" stroke="currentColor" strokeWidth="1.5" custom={1.5 + idx*0.1} variants={draw} />
                   {/* Bottom pins */}
                   <motion.line x1={pos} y1="118" x2={pos} y2="122" stroke="currentColor" strokeWidth="1.5" custom={1.6 + idx*0.1} variants={draw} />
                </React.Fragment>
              ))}

              {/* TRACE 1: Top Left */}
              <motion.path d="M 78 96 L 56 96 L 40 80 L 25 80" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" custom={2} variants={draw} />
              <motion.circle cx="25" cy="80" r="3" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1 }} />
              
              {/* TRACE 2: Top Left 2 */}
              <motion.path d="M 90 78 L 90 60 L 70 40 L 60 40" stroke="var(--brand-tertiary)" strokeWidth="1.5" fill="none" strokeLinejoin="round" custom={2.2} variants={draw} />
              <motion.circle cx="60" cy="40" r="2.5" fill="var(--brand-tertiary)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.1 }} />

              {/* TRACE 3: Top Right */}
              <motion.path d="M 110 78 L 110 65 L 125 50 L 140 50" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" custom={2.4} variants={draw} />
              <motion.circle cx="140" cy="50" r="3" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.2 }} />

              {/* TRACE 4: Right */}
              <motion.path d="M 122 104 L 140 104 L 155 119 L 165 119" stroke="var(--brand-tertiary)" strokeWidth="1.5" fill="none" strokeLinejoin="round" custom={2.6} variants={draw} />
              <motion.circle cx="165" cy="119" r="2.5" fill="var(--brand-tertiary)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.3 }} />

              {/* TRACE 5: Bottom Right */}
              <motion.path d="M 104 122 L 104 140 L 120 156 L 135 156" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" custom={2.8} variants={draw} />
              <motion.circle cx="135" cy="156" r="3" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 }} />

              {/* TRACE 6: Bottom Left */}
              <motion.path d="M 96 122 L 96 135 L 80 151 L 65 151" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinejoin="round" custom={3.0} variants={draw} />
              <motion.circle cx="65" cy="151" r="3" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.5 }} />

              {/* TRACE 7: Left Bottom */}
              <motion.path d="M 78 110 L 60 110 L 45 125 L 35 125" stroke="var(--brand-tertiary)" strokeWidth="1.5" fill="none" strokeLinejoin="round" custom={3.2} variants={draw} />
              <motion.circle cx="35" cy="125" r="2.5" fill="var(--brand-tertiary)" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.6 }} />

              {/* Connecting Nodes on Die */}
              <motion.circle cx="100" cy="100" r="1.5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7 }} />
              <motion.circle cx="95" cy="95" r="1.5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.75 }} />
              <motion.circle cx="105" cy="105" r="1.5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 }} />
              <motion.circle cx="105" cy="95" r="1.5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.85 }} />
              <motion.circle cx="95" cy="105" r="1.5" fill="currentColor" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9 }} />

              {/* Decorative unconnected vias (through-holes) */}
              <motion.circle cx="45" cy="45" r="1.5" stroke="currentColor" strokeWidth="1" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.7 }} />
              <motion.circle cx="160" cy="150" r="1.5" stroke="var(--brand-tertiary)" strokeWidth="1" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.8 }} />
              <motion.circle cx="120" cy="30" r="1.5" stroke="currentColor" strokeWidth="1" fill="none" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.9 }} />

            </motion.svg>
          </div>

          {/* Typing Text Container */}
          <div className="flex flex-col items-center">
             <div className="h-[30px] flex items-center justify-center">
               <h2 className="text-xl sm:text-2xl font-mono text-black tracking-[0.2em] uppercase font-bold">
                 {typedText}
                 <motion.span
                   animate={{ opacity: [1, 0] }}
                   transition={{ repeat: Infinity, duration: 0.8 }}
                   className="inline-block w-[3px] h-[20px] bg-brand-primary ml-1 align-middle"
                 />
               </h2>
             </div>
           </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
