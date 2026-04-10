"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ArrowRight, ArrowUpRight, ChevronRight, Mail, Phone } from "lucide-react";
import SubPageNavbar from "./SubPageNavbar";
import Footer from "./Footer";
import type { ServiceData } from "../data/servicesData";
import { servicesData } from "../data/servicesData";

interface ServicePageContentProps {
  service: {
    slug: string;
    title: string;
    shortTitle: string;
    tagline: string;
    iconName: string;
    image: string;
    heroParagraphs: string[];
    capabilities: { title: string; description: string }[];
    industries: string[];
    relatedSlugs: string[];
  };
}

export default function ServicePageContent({ service }: ServicePageContentProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const relatedServices = servicesData.filter((s) =>
    service.relatedSlugs.includes(s.slug)
  );

  return (
    <div className="w-full bg-[#f8f9fa] flex flex-col min-h-screen selection:bg-brand-primary selection:text-white">
      <SubPageNavbar />

      <main
        className="flex-1 w-full bg-[#f8f9fa] px-[5px] pb-[5px] pt-[88px] sm:pt-[96px]"
        id="main-content"
        role="main"
      >
        <article
          className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-white shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05),inset_0_2px_20px_rgba(255,255,255,0.8)] border border-black/[0.03] p-2 sm:p-4 md:p-6 overflow-hidden"
          aria-label={`${service.title} — TOS Lanka Service`}
          itemScope
          itemType="https://schema.org/Service"
        >
          {/* Ambient gradients — decorative, hidden from assistive tech */}
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-tertiary/[0.03] blur-[150px] pointer-events-none" aria-hidden="true" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-brand-primary/[0.04] blur-[150px] pointer-events-none" aria-hidden="true" />
          <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70 pointer-events-none" aria-hidden="true" />

          <div className="w-full h-full max-w-[1400px] mx-auto relative z-10 px-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-[5px] sm:gap-4"
            >
              {/* ═══════════════════════════════════════════════
                  SECTION 1: HERO
              ═══════════════════════════════════════════════ */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4">
                {/* Left: Copy */}
                <motion.header
                  variants={itemVariants}
                  className="lg:col-span-7 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 flex flex-col justify-center shadow-[0_2px_40px_-15px_rgba(0,0,0,0.05)] border border-black/[0.03] relative overflow-hidden"
                >
                  <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-primary/[0.02] blur-[100px] pointer-events-none rounded-full" aria-hidden="true" />

                  {/* Breadcrumb — semantic nav with structured data */}
                  <nav
                    aria-label="Breadcrumb"
                    className="flex items-center gap-2 text-[11px] font-medium text-black/40 mb-8 relative z-10"
                  >
                    <ol
                      className="flex items-center gap-2 list-none p-0 m-0"
                      itemScope
                      itemType="https://schema.org/BreadcrumbList"
                    >
                      <li
                        className="flex items-center gap-2"
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                      >
                        <Link
                          href="/"
                          className="hover:text-brand-primary transition-colors"
                          itemProp="item"
                        >
                          <span itemProp="name">Home</span>
                        </Link>
                        <meta itemProp="position" content="1" />
                        <ChevronRight className="w-3 h-3" aria-hidden="true" />
                      </li>
                      <li
                        className="flex items-center gap-2"
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                      >
                        <Link
                          href="/#services"
                          className="hover:text-brand-primary transition-colors"
                          itemProp="item"
                        >
                          <span itemProp="name">Services</span>
                        </Link>
                        <meta itemProp="position" content="2" />
                        <ChevronRight className="w-3 h-3" aria-hidden="true" />
                      </li>
                      <li
                        itemProp="itemListElement"
                        itemScope
                        itemType="https://schema.org/ListItem"
                      >
                        <span
                          className="text-brand-primary font-semibold"
                          itemProp="name"
                          aria-current="page"
                        >
                          {service.shortTitle}
                        </span>
                        <meta itemProp="position" content="3" />
                      </li>
                    </ol>
                  </nav>

                  {/* Tag */}
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6, type: "spring" }}
                    className="inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full bg-brand-primary/[0.05] border border-brand-primary/[0.1] shadow-sm backdrop-blur-md w-fit"
                    role="status"
                    aria-label={`Tagline: ${service.tagline}`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" aria-hidden="true" />
                    <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-brand-primary uppercase font-mono">
                      {service.tagline}
                    </span>
                  </motion.div>

                  {/* Title — single H1 per page */}
                  <h1
                    className="text-3xl md:text-5xl lg:text-[3.5rem] leading-[1.08] font-medium tracking-tight text-black mb-8 font-heading relative z-10"
                    style={{ letterSpacing: "-0.02em" }}
                    itemProp="name"
                  >
                    {service.title}
                  </h1>

                  {/* Body Copy */}
                  <div className="flex flex-col gap-5 relative z-10" itemProp="description">
                    {service.heroParagraphs.map((p, i) => (
                      <p
                        key={i}
                        className="text-[15px] md:text-base text-black/60 leading-[1.8] font-light"
                      >
                        {p}
                      </p>
                    ))}
                  </div>

                  {/* Industries served */}
                  <div
                    className="flex flex-wrap gap-2 mt-10 relative z-10"
                    role="list"
                    aria-label="Industries served"
                  >
                    {service.industries.map((ind, i) => (
                      <span
                        key={i}
                        role="listitem"
                        className="px-3 py-1.5 rounded-full bg-[#f3f4f6] text-[11px] font-semibold text-black/50 tracking-wide border border-black/[0.04]"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </motion.header>

                {/* Right: Hero Image */}
                <motion.div
                  variants={itemVariants}
                  className="lg:col-span-5 bg-white rounded-[2rem] lg:rounded-[3rem] p-4 lg:p-5 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col min-h-[280px] lg:min-h-[400px]"
                >
                  <figure className="relative w-full h-full flex-1 rounded-[1.5rem] lg:rounded-[2rem] overflow-hidden bg-[#f3f4f6] group shadow-inner m-0">
                    <Image
                      src={service.image}
                      alt={`${service.title} — precision electronic manufacturing at TOS Lanka's facility in Sri Lanka`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover transform scale-100 group-hover:scale-[1.04] transition-transform duration-[1.5s] ease-[cubic-bezier(0.22,1,0.36,1)]"
                      priority
                      itemProp="image"
                    />

                    {/* Floating badge */}
                    <motion.div
                      className="absolute bottom-5 left-5 right-5 bg-white/90 backdrop-blur-xl rounded-2xl p-4 border border-white shadow-[0_10px_30px_rgba(0,0,0,0.1)] flex items-center justify-between opacity-0 translate-y-6 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] z-20"
                      aria-hidden="true"
                    >
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold tracking-[0.2em] text-black/40 uppercase mb-1">
                          Service Line
                        </span>
                        <span className="text-[12px] font-bold text-black uppercase tracking-wider">
                          {service.shortTitle}
                        </span>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-brand-primary/10 flex items-center justify-center">
                        <div className="w-2.5 h-2.5 rounded-full bg-brand-primary animate-pulse" />
                      </div>
                    </motion.div>
                  </figure>
                </motion.div>
              </div>

              {/* ═══════════════════════════════════════════════
                  SECTION 2: CAPABILITIES BENTO
              ═══════════════════════════════════════════════ */}
              <motion.section
                variants={itemVariants}
                className="w-full bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-14 lg:p-16 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden mt-0.5 sm:mt-0"
                aria-labelledby="capabilities-heading"
              >
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-tertiary/[0.02] blur-[120px] pointer-events-none rounded-full" aria-hidden="true" />

                <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 relative z-10">
                  <div className="max-w-2xl">
                    <h2
                      id="capabilities-heading"
                      className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-black mb-4 font-heading leading-[1.1]"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      Our Capabilities
                    </h2>
                    <p className="text-[15px] text-black/50 font-light leading-relaxed">
                      Engineered processes and specialized equipment delivering
                      consistent, world-class results.
                    </p>
                  </div>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 relative z-10"
                  role="list"
                  aria-label={`${service.shortTitle} capabilities`}
                >
                  {service.capabilities.map((cap, idx) => (
                    <motion.div
                      key={idx}
                      whileHover={{
                        y: -4,
                        backgroundColor: "#ffffff",
                      }}
                      className="group relative flex flex-col justify-center p-8 lg:p-10 rounded-[1.5rem] bg-[#f8f9fa] border border-black/[0.04] hover:border-brand-primary/20 hover:shadow-[0_15px_30px_-10px_rgba(0,143,40,0.1)] transition-all duration-500 overflow-hidden cursor-default"
                      role="listitem"
                    >
                      {/* Left accent */}
                      <div className="absolute top-0 left-0 w-1 h-full bg-black/[0.04] group-hover:bg-brand-primary transition-colors duration-500 rounded-r-full" aria-hidden="true" />

                      <div className="relative z-10">
                        {/* Number */}
                        <div
                          className="inline-block px-3 py-1 bg-white border border-black/5 text-black/40 font-mono text-[11px] font-bold tracking-widest rounded-full mb-5 group-hover:text-brand-primary group-hover:border-brand-primary/20 transition-colors duration-500 shadow-sm"
                          aria-hidden="true"
                        >
                          0{idx + 1}
                        </div>

                        <h3 className="text-xl md:text-2xl font-bold text-black mb-3 font-heading tracking-tight group-hover:text-brand-primary transition-colors duration-500">
                          {cap.title}
                        </h3>
                        <p className="text-[14px] md:text-[15px] text-black/55 font-medium leading-[1.7] group-hover:text-black/70 transition-colors duration-500">
                          {cap.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* ═══════════════════════════════════════════════
                  SECTION 3: CTA + RELATED SERVICES
              ═══════════════════════════════════════════════ */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-[5px] sm:gap-4 mt-0.5 sm:mt-0">
                {/* Left: CTA */}
                <motion.section
                  variants={itemVariants}
                  className="lg:col-span-5 bg-brand-background rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-14 flex flex-col justify-between relative overflow-hidden min-h-[350px]"
                  aria-labelledby="cta-heading"
                >
                  {/* Subtle grid */}
                  <div className="absolute inset-0 tech-grid opacity-50 pointer-events-none" aria-hidden="true" />
                  <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-brand-primary/10 blur-[100px] pointer-events-none rounded-full" aria-hidden="true" />

                  <div className="relative z-10">
                    <h2
                      id="cta-heading"
                      className="text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight text-white mb-6 font-heading leading-[1.1]"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      Ready to discuss{" "}
                      <span className="text-brand-primary">
                        {service.shortTitle}
                      </span>
                      ?
                    </h2>
                    <p className="text-[14px] text-white/50 font-light leading-[1.7] mb-8 max-w-md">
                      Our engineering team is available for technical
                      consultations, RFQ reviews, and facility tours. Get in
                      touch to explore how we can support your next project.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 relative z-10">
                    <Link
                      href="/contact"
                      className="group inline-flex items-center justify-center gap-3 px-7 py-4 bg-brand-primary hover:bg-brand-primary-hover text-white text-[13px] font-bold tracking-wider uppercase rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(0,143,40,0.3)] hover:shadow-[0_15px_40px_rgba(0,143,40,0.4)] hover:-translate-y-0.5"
                      aria-label={`Request a quote for ${service.shortTitle} services`}
                    >
                      Request a Quote
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true" />
                    </Link>

                    <address className="flex items-center gap-4 mt-4 pt-4 border-t border-white/10 not-italic">
                      <a
                        href="mailto:dexter@toslanka.com"
                        className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white transition-colors"
                        aria-label="Email us at dexter@toslanka.com"
                      >
                        <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                        dexter@toslanka.com
                      </a>
                      <span className="w-1 h-1 rounded-full bg-white/20" aria-hidden="true" />
                      <a
                        href="tel:+94715349933"
                        className="flex items-center gap-2 text-[12px] text-white/50 hover:text-white transition-colors"
                        aria-label="Call us at +94 715 349 933"
                      >
                        <Phone className="w-3.5 h-3.5" aria-hidden="true" />
                        +94 715 349 933
                      </a>
                    </address>
                  </div>
                </motion.section>

                {/* Right: Related Services */}
                <motion.aside
                  variants={itemVariants}
                  className="lg:col-span-7 bg-white rounded-[2rem] lg:rounded-[3rem] p-8 md:p-12 lg:p-14 border border-black/[0.03] shadow-[0_2px_20px_-10px_rgba(0,0,0,0.03)] relative overflow-hidden flex flex-col"
                  aria-labelledby="related-heading"
                >
                  <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-tertiary/[0.02] blur-[120px] pointer-events-none rounded-full" aria-hidden="true" />

                  <h3
                    id="related-heading"
                    className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-8 font-heading relative z-10"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    Related Services
                  </h3>

                  <nav
                    className="flex flex-col gap-3 relative z-10 flex-1"
                    aria-label="Related services"
                  >
                    {relatedServices.map((rs) => (
                      <Link
                        key={rs.slug}
                        href={`/services/${rs.slug}`}
                        className="group flex items-center justify-between p-5 lg:p-6 rounded-2xl bg-[#f8f9fa] border border-black/[0.04] hover:border-brand-tertiary/20 hover:shadow-[0_10px_25px_-8px_rgba(58,91,251,0.12)] transition-all duration-500"
                        aria-label={`${rs.shortTitle} — ${rs.tagline}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white border border-black/5 flex items-center justify-center overflow-hidden shadow-sm">
                            <Image
                              src={rs.image}
                              alt={`${rs.shortTitle} service`}
                              width={48}
                              height={48}
                              className="w-full h-full object-cover rounded-xl"
                              loading="lazy"
                            />
                          </div>
                          <div>
                            <h4 className="text-[15px] font-bold text-black group-hover:text-brand-tertiary transition-colors duration-300 font-heading tracking-tight">
                              {rs.shortTitle}
                            </h4>
                            <p className="text-[12px] text-black/40 font-medium mt-0.5">
                              {rs.tagline}
                            </p>
                          </div>
                        </div>
                        <ArrowUpRight className="w-5 h-5 text-black/20 group-hover:text-brand-tertiary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" aria-hidden="true" />
                      </Link>
                    ))}
                  </nav>

                  {/* View all link */}
                  <div className="mt-6 pt-5 border-t border-black/5 relative z-10">
                    <Link
                      href="/#services"
                      className="inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.15em] text-black/40 hover:text-brand-primary uppercase transition-colors"
                      aria-label="View all TOS Lanka electronic manufacturing services"
                    >
                      View All Services
                      <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.aside>
              </div>
            </motion.div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
