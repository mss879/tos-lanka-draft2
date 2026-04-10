"use client";

import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';
import { useSearch } from '../context/SearchContext';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { openSearch } = useSearch();

  useEffect(() => {
    const handleScroll = () => {
      // Show floating navbar after scrolling past the Hero section threshold
      if (window.scrollY > 200) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 transform ${
        isScrolled 
          ? 'translate-y-0 opacity-100 pointer-events-auto shadow-sm backdrop-blur-xl bg-white/95 border-b border-gray-100'
          : '-translate-y-full opacity-0 pointer-events-none bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between w-full pl-[21px] lg:pl-[29px] pr-[21px] lg:pr-[25px] py-3">
        
        {/* Left: Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image src="/tos-logo.png" alt="TOS Lanka" width={160} height={40} className="h-8 w-auto object-contain" />
        </Link>

        {/* Right: Menu Navigation */}
        <div className="flex items-center">
          {/* Desktop Full Menu */}
          <div className="hidden xl:flex items-center gap-6 mr-1">
            <Link href="/" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">Home</Link>
            <Link href="/about" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">About</Link>

            <div className="relative group/menu py-2">
              <span className="cursor-default flex items-center gap-1 text-[13px] font-extrabold tracking-widest uppercase text-gray-900 group-hover/menu:text-brand-primary transition-colors">
                Services
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/menu:-scale-y-100"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 overflow-hidden z-[105] py-2">
                <Link href="/services/smt" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">SMT Assembly</Link>
                <Link href="/services/system-integration" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Systems Integration</Link>
                <Link href="/services/through-hole" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Through Hole</Link>
                <Link href="/services/coating-potting" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Coating & Potting</Link>
                <Link href="/services/test-inspection" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Test & Inspection</Link>
                <Link href="/services/prototype-assembling" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Prototyping</Link>
                <Link href="/services/automotive-harnessing" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Automotive Harnessing</Link>
                <Link href="/services/inductive-components" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Inductive Components</Link>
                <Link href="/services/supply-chain" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Supply Chain</Link>
              </div>
            </div>

            <Link href="/industries" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">Industries</Link>
            <Link href="/certification" className="text-[13px] font-extrabold tracking-widest uppercase text-gray-900 hover:text-brand-primary transition-colors">Certifications</Link>
            <div className="relative group/menu py-2">
              <span className="cursor-default flex items-center gap-1 text-[13px] font-extrabold tracking-widest uppercase text-gray-900 group-hover/menu:text-brand-primary transition-colors">
                Resources
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover/menu:-scale-y-100"><polyline points="6 9 12 15 18 9"></polyline></svg>
              </span>
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[160px] bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform translate-y-2 group-hover/menu:translate-y-0 overflow-hidden z-[105] py-2">
                <Link href="/articles" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">Articles</Link>
                <Link href="/faq" className="block px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-brand-primary hover:bg-gray-50 transition-colors">FAQ</Link>
              </div>
            </div>

            <div className="flex items-center gap-4 pl-2 shrink-0">
              <button
                onClick={openSearch}
                className="flex items-center justify-center w-[38px] h-[38px] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200 text-gray-500 hover:text-brand-primary shadow-sm cursor-pointer"
                title="Search (Cmd+K)"
              >
                <Search size={16} />
              </button>

              <Link href="/contact" className="relative group/btn text-[13px] font-bold tracking-widest uppercase text-white overflow-hidden rounded-xl px-6 py-2.5 transition-transform hover:-translate-y-0.5 active:translate-y-0 duration-300 bg-gradient-to-b from-brand-primary/90 to-brand-primary shadow-[0_6px_16px_rgba(0,186,52,0.3),inset_0_2px_4px_rgba(255,255,255,0.4),inset_0_-4px_6px_rgba(0,0,0,0.2)] border border-white/20 backdrop-blur-md">
                <span className="relative z-10 drop-shadow-sm">Contact</span>
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 z-0"></div>
                <div className="absolute inset-0 rounded-xl shadow-[inset_0_0_10px_rgba(255,255,255,0.3)] z-0"></div>
              </Link>
            </div>
          </div>

          {/* Mobile Search and Staggered Menu */}
          <div className="xl:hidden flex items-center gap-3">
            <button
              onClick={openSearch}
              className="flex items-center justify-center w-[44px] h-[44px] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200 text-gray-500 hover:text-gray-700 shadow-sm cursor-pointer"
              title="Search (Cmd+K)"
            >
              <Search size={18} />
            </button>
            <StaggeredMenu />
          </div>
        </div>

      </div>
    </nav>
  );
}
