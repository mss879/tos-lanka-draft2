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
    { label: 'Services', href: '/#services' },
    { label: 'Certifications', href: '/certification' },
    { label: 'Articles', href: '/articles' },
    { label: 'FAQ', href: '/faq' },
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
              <Link 
                key={link.label}
                href={link.href}
                className="px-5 py-2.5 text-[14px] font-bold tracking-wide text-black/60 hover:text-brand-primary transition-colors duration-300 rounded-full hover:bg-black/5"
              >
                {link.label}
              </Link>
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
              className="inline-flex items-center justify-center px-7 py-2.5 bg-brand-primary text-white text-[15px] font-bold rounded-full hover:bg-brand-primary-hover transition-colors shadow-sm"
            >
              Contact Us
            </Link>
            
          </div>
        </nav>
      </div>
    </motion.div>
  );
}
