"use client";

import React, { Suspense } from 'react';
import { login } from './actions';
import Image from 'next/image';
import { Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function LoginForm() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get('error');

  return (
    <div className="w-full min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 selection:bg-brand-tertiary selection:text-white">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-xl shadow-black/5 border border-black/5 flex flex-col items-center">
           
           <div className="mb-10 w-full flex flex-col items-center">
             <Image 
                src="/tos-logo.png" 
                alt="TOS Lanka Logo" 
                width={160} 
                height={50} 
                className="object-contain h-10 w-auto mb-6"
                priority
             />
             <h1 className="text-2xl font-bold tracking-tight text-center text-black">Admin Access</h1>
             <p className="text-sm text-black/50 text-center mt-2 px-4">Log in to manage articles, announcements, and configuration.</p>
           </div>

           {errorMessage && (
             <div className="w-full mb-6 p-4 rounded-xl flex items-center gap-3 font-semibold text-sm bg-[#fef2f2] text-[#dc2626] border border-[#dc2626]/20">
               <AlertCircle size={18} className="shrink-0" />
               <span>{errorMessage}</span>
             </div>
           )}

           <form action={login} className="w-full flex flex-col gap-5">
              
              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-bold tracking-[0.15em] text-black uppercase pl-1">Email Address</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
                      <Mail size={18} />
                    </div>
                    <input 
                      id="email" 
                      name="email" 
                      type="email" 
                      required 
                      className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl pl-11 pr-5 py-4 text-[14px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all"
                      placeholder="admin@toslanka.com"
                    />
                 </div>
              </div>

              <div className="flex flex-col gap-2">
                 <label className="text-[10px] font-bold tracking-[0.15em] text-black uppercase pl-1">Password</label>
                 <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-black/30 pointer-events-none">
                      <Lock size={18} />
                    </div>
                    <input 
                      id="password" 
                      name="password" 
                      type="password" 
                      required 
                      className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl pl-11 pr-5 py-4 text-[14px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all"
                      placeholder="••••••••"
                    />
                 </div>
              </div>

              <button 
                type="submit"
                className="w-full mt-4 bg-black text-white rounded-2xl py-4 flex items-center justify-center gap-2 font-bold tracking-widest text-[11px] uppercase hover:bg-brand-tertiary transition-all group"
              >
                 Sign In
                 <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>

           </form>

        </div>

        <div className="text-center mt-8 text-black/40 text-[11px] font-bold tracking-[0.15em] uppercase">
          TOS Lanka Co. (Pvt) Ltd.
        </div>
      </motion.div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  )
}
