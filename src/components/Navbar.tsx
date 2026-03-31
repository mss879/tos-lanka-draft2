import React from 'react';
import { Search, User } from 'lucide-react';
import StaggeredMenu from './StaggeredMenu';

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between w-full mx-auto max-w-7xl px-2">
      {/* 
        This Navbar is now structurally an invisible wrapper. 
        The background colors and cutouts are handled by Hero.tsx in absolute layers.
      */}
      <div className="flex items-center">
        <span className="text-2xl font-bold tracking-tighter text-black font-heading">
          TOS <span className="text-brand-primary">Lanka</span>
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 rounded-full hover:bg-black/5 transition-colors text-black" aria-label="Search">
          <Search size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-black/5 transition-colors text-black mr-2 md:hidden" aria-label="User account">
          <User size={20} />
        </button>
        <div className="md:hidden">
          <StaggeredMenu />
        </div>
      </div>
    </nav>
  );
}
