"use client";

import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, FileText, ArrowLeft, Users, Archive, Mail, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // If we are on the login page entirely, bypass rendering the layout container and sidebar
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#f8fafc] text-black">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-black/5 flex flex-col fixed inset-y-0 left-0 z-10 shadow-[2px_0_10px_rgba(0,0,0,0.02)]">
        <div className="p-6 h-[80px] flex items-center border-b border-black/5">
           <Link href="/" className="group flex items-center">
            <Image 
              src="/tos-logo.png" 
              alt="TOS Lanka Logo" 
              width={140} 
              height={44} 
              className="object-contain h-8 w-auto group-hover:opacity-80 transition-opacity duration-300"
              priority
            />
          </Link>
        </div>
        
        <div className="flex-1 py-6 px-4 flex flex-col gap-2">
          <Link 
            href="/admin" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors group"
          >
            <LayoutDashboard size={18} className="text-black/60 group-hover:text-brand-tertiary transition-colors" />
            Dashboard
          </Link>
          <Link 
            href="/admin/inquiries" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors group"
          >
            <MessageSquare size={18} className="text-black/60 group-hover:text-brand-tertiary transition-colors" />
            Form Inquiries
          </Link>
          <Link 
            href="/admin/crm" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors group"
          >
            <Users size={18} className="text-black/60 group-hover:text-brand-tertiary transition-colors" />
            CRM Pipeline
          </Link>
          <Link 
            href="/admin/contacts" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors group"
          >
            <Archive size={18} className="text-black/60 group-hover:text-brand-tertiary transition-colors" />
            Contacts Archive
          </Link>
          <Link 
            href="/admin/newsletter" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors group"
          >
            <Mail size={18} className="text-black/60 group-hover:text-brand-tertiary transition-colors" />
            Newsletter Subs
          </Link>
          <Link 
            href="/admin/articles" 
            className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-black/5 text-sm font-semibold transition-colors group"
          >
            <FileText size={18} className="text-black/60 group-hover:text-brand-tertiary transition-colors" />
            Articles
          </Link>
        </div>

        <div className="p-4 border-t border-black/5">
          <Link href="/" className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl text-xs font-bold tracking-widest uppercase bg-black hover:bg-brand-tertiary text-white transition-colors duration-300">
            <ArrowLeft size={14} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 ml-64 min-h-screen">
        <div className="p-8 lg:p-12 w-full max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
