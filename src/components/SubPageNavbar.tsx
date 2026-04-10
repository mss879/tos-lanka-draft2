"use client";

import React from 'react';
import { Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';

export default function SubPageNavbar() {
  const { openSearch } = useSearch();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { 
      label: 'Services', 
      subLinks: [
        { label: 'SMT Assembly', href: '/services/smt' },
        { label: 'Systems Integration', href: '/services/system-integration' },
        { label: 'Through Hole', href: '/services/through-hole' },
        { label: 'Coating & Potting', href: '/services/coating-potting' },
        { label: 'Test & Inspection', href: '/services/test-inspection' },
        { label: 'Prototyping', href: '/services/prototype-assembling' },
        { label: 'Automotive Harnessing', href: '/services/automotive-harnessing' },
        { label: 'Inductive Components', href: '/services/inductive-components' },
        { label: 'Supply Chain', href: '/services/supply-chain' },
      ]
    },
    { label: 'Industries', href: '/industries' },
    { label: 'Certifications', href: '/certification' },
    { 
      label: 'Resources', 
      subLinks: [
        { label: 'Articles', href: '/articles' },
        { label: 'FAQ', href: '/faq' },
      ]
    },
  ];

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-xl border-b border-black/10 shadow-sm"
    >
      <div className="w-full mx-auto max-w-[1440px]">
        <nav className="flex items-center justify-between px-6 sm:px-10 py-4 sm:py-5 w-full">
          
          {/* Left: Logo */}
          <Link href="/" className="group flex-shrink-0 flex items-center h-full">
            <Image 
              src="/tos-logo.png" 
              alt="TOS Lanka Logo" 
              width={160} 
              height={50} 
              className="object-contain h-8 sm:h-11 w-auto group-hover:opacity-80 transition-opacity duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.05)]"
              priority
            />
          </Link>

          {/* Middle: Inline Links (Desktop/Tablet) */}
          <div className="hidden lg:flex items-center justify-center flex-1 space-x-1 mx-4">
            {navLinks.map((link) => (
              link.subLinks ? (
                <div key={link.label} className="relative group/menu py-2">
                  <span className="cursor-default px-5 py-2.5 text-[14px] font-bold tracking-wide text-black/60 group-hover/menu:text-brand-primary transition-colors duration-300 rounded-full hover:bg-black/5 flex items-center gap-1">
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/menu:-scale-y-100"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </span>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 overflow-hidden z-[105] py-2 max-h-[70vh] overflow-y-auto">
                    {link.subLinks.map((sub) => (
                      <Link key={sub.label} href={sub.href} className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link 
                  key={link.label}
                  href={link.href!}
                  className="px-5 py-2.5 text-[14px] font-bold tracking-wide text-black/60 hover:text-brand-primary transition-colors duration-300 rounded-full hover:bg-black/5"
                >
                  {link.label}
                </Link>
              )
            ))}
          </div>

          {/* Right: Search & Contact CTA */}
          <div className="flex items-center justify-end space-x-3 shrink-0">
            
            {/* Search Bar Profile Trigger */}
            <button 
              onClick={openSearch}
              className="flex items-center justify-center w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-full transition-all duration-300 border border-gray-200 text-gray-500 hover:text-gray-700 shadow-sm"
              title="Search (Cmd+K)"
            >
              <Search size={18} />
            </button>

            <Link 
              href="/contact"
              className="relative group/btn inline-flex items-center justify-center px-7 py-2.5 text-[13px] font-bold tracking-widest uppercase text-white overflow-hidden rounded-xl transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(0,186,52,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-md"
            >
              <span className="relative z-10 drop-shadow-sm">Contact</span>
              <span className="absolute inset-0 bg-gradient-to-t from-white/0 to-white/10 pointer-events-none" />
            </Link>
            
          </div>
        </nav>
      </div>
    </motion.div>
  );
}
