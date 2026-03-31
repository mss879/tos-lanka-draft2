"use client";

import React, { useState } from 'react';
import { Menu, Search } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import StaggeredMenu from './StaggeredMenu';
import { useSearch } from '../context/SearchContext';

export default function SubPageNavbar() {
  const { openSearch } = useSearch();

  return (
    <motion.div 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[100] w-full bg-white/95 backdrop-blur-xl border-b border-black/10 shadow-sm"
    >
      <div className="w-full mx-auto max-w-[1400px]">
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

          {/* Right: Menu & Search */}
          <div className="flex items-center space-x-2">
            
            {/* Search Bar Profile Trigger */}
            <button 
              onClick={openSearch}
              className="flex items-center justify-center w-[44px] h-[44px] bg-gray-50 hover:bg-gray-100 rounded-xl transition-all duration-300 border border-gray-200 text-gray-500 hover:text-gray-700 shadow-sm"
              title="Search (Cmd+K)"
            >
              <Search size={18} />
            </button>

            {/* Menu Button - Now Animated Staggered Menu */}
            <StaggeredMenu />
            
          </div>

        </nav>
        
      </div>
    </motion.div>
  );
}
