"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { SearchCheck, ClipboardCheck, Cpu, ShieldCheck, PackageCheck } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Discovery & Consultation",
    desc: "We analyze your product requirements, BOM, and manufacturing goals to define the optimal approach.",
    icon: <SearchCheck size={28} strokeWidth={1.6} />,
  },
  {
    number: "02",
    title: "DFM Validation",
    desc: "Our engineers review your designs for manufacturability to ensure optimal production efficiency.",
    icon: <ClipboardCheck size={28} strokeWidth={1.6} />,
  },
  {
    number: "03",
    title: "Prototyping & Assembly",
    desc: "We begin with rapid prototyping before moving to full-scale PCB assembly and integration.",
    icon: <Cpu size={28} strokeWidth={1.6} />,
  },
  {
    number: "04",
    title: "Quality Testing",
    desc: "Rigorous AOI, ICT, and functional testing to guarantee zero-defect performance.",
    icon: <ShieldCheck size={28} strokeWidth={1.6} />,
  },
  {
    number: "05",
    title: "Packaging & Delivery",
    desc: "Final inspection, custom packaging, and secure global shipment to your facility.",
    icon: <PackageCheck size={28} strokeWidth={1.6} />,
  },
];

/* ── Scroll-triggered animation variants ── */
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

const headingVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

/* ── Dot with pulse/glow ── */
function ProcessDot() {
  return (
    <div className="relative w-7 h-7 flex items-center justify-center">
      <div className="absolute inset-0 rounded-full border-2 border-brand-primary/30 bg-brand-primary/5 animate-ping [animation-duration:2.5s]" />
      <div className="absolute w-4 h-4 rounded-full border-2 border-brand-primary/40 bg-brand-primary/10" />
      <div className="relative w-2.5 h-2.5 rounded-full bg-brand-primary shadow-[0_0_12px_rgba(0,143,40,0.5)]" />
    </div>
  );
}

/* ── Main Section ── */
export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    mass: 0.6,
  });

  const lineHeight = useTransform(springProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="process-section"
      className="relative bg-[#fafafa] py-24 md:py-32 overflow-hidden text-neutral-900"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Heading ── */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-20"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-5 tracking-tight text-neutral-900 font-heading">
            Our Manufacturing Process
          </h2>
          <p className="text-lg text-neutral-500 leading-relaxed max-w-2xl mx-auto font-body">
            A proven process designed to transform your designs into
            high-quality electronic products — precisely and efficiently.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <motion.div
          ref={containerRef}
          className="relative max-w-4xl mx-auto"
          variants={headingVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Background track */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-[2px] bg-neutral-200 md:-translate-x-1/2" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-[28px] md:left-1/2 top-0 w-[3px] rounded-full md:-translate-x-[1.5px] bg-gradient-to-b from-brand-primary via-brand-primary-hover to-brand-primary origin-top"
            style={{ height: lineHeight }}
          />

          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => {
              const isEven = index % 2 === 1;
              const isFirst = index === 0;
              const isLast = index === steps.length - 1;

              return (
                <motion.div
                  key={step.number}
                  className={`relative flex items-start md:items-center ${
                    isFirst ? "pt-0" : "pt-16 md:pt-20"
                  } ${isLast ? "pb-0" : ""}`}
                  variants={itemVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* ── Mobile layout ── */}
                  <div className="md:hidden flex w-full">
                    <div className="flex-shrink-0 w-14 flex flex-col items-center pt-1">
                      <ProcessDot />
                      {!isLast && <div className="w-[2px] flex-1 bg-transparent" />}
                    </div>
                    <div className="flex-1 pl-4 pb-2">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-12 h-12 rounded-xl bg-white border border-neutral-100 shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08),0_2px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-2.5 relative">
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
                          {step.icon}
                        </div>
                        <span className="text-3xl font-bold text-brand-primary/30 select-none font-heading">
                          {step.number}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-neutral-900 mb-2 font-heading">
                        {step.title}
                      </h3>
                      <p className="text-neutral-500 leading-relaxed font-body">
                        {step.desc}
                      </p>
                    </div>
                  </div>

                  {/* ── Desktop layout ── */}
                  <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr] md:items-center w-full">
                    {/* Left column */}
                    <div className={`${isEven ? "text-right pr-8" : "flex justify-end pr-8"}`}>
                      {!isEven ? (
                        <div className="inline-flex items-center gap-5">
                          <span className="text-6xl font-bold text-brand-primary/20 select-none font-heading leading-none">
                            {step.number}
                          </span>
                          <motion.div
                            className="w-[72px] h-[72px] rounded-2xl bg-white border border-neutral-100 shadow-[0_15px_40px_-8px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-4 relative"
                            whileHover={{
                              scale: 1.1,
                              rotateY: 8,
                              rotateX: -4,
                              transition: { duration: 0.3 },
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
                            {step.icon}
                          </motion.div>
                        </div>
                      ) : (
                        <div>
                          <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">
                            {step.title}
                          </h3>
                          <p className="text-neutral-500 leading-relaxed text-[17px] font-body">
                            {step.desc}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="flex justify-center">
                      <ProcessDot />
                    </div>

                    {/* Right column */}
                    <div className={`${isEven ? "flex pl-8" : "pl-8"}`}>
                      {!isEven ? (
                        <div>
                          <h3 className="text-2xl font-bold text-neutral-900 mb-2 font-heading">
                            {step.title}
                          </h3>
                          <p className="text-neutral-500 leading-relaxed text-[17px] font-body">
                            {step.desc}
                          </p>
                        </div>
                      ) : (
                        <div className="inline-flex items-center gap-5">
                          <motion.div
                            className="w-[72px] h-[72px] rounded-2xl bg-white border border-neutral-100 shadow-[0_15px_40px_-8px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.04)] flex items-center justify-center text-brand-primary p-4 relative"
                            whileHover={{
                              scale: 1.1,
                              rotateY: -8,
                              rotateX: -4,
                              transition: { duration: 0.3 },
                            }}
                            style={{ transformStyle: "preserve-3d" }}
                          >
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/90 to-transparent pointer-events-none" />
                            {step.icon}
                          </motion.div>
                          <span className="text-6xl font-bold text-brand-primary/20 select-none font-heading leading-none">
                            {step.number}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
