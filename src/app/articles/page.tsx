"use client";

import React, { useEffect, useState } from 'react';
import SubPageNavbar from '../../components/SubPageNavbar';
import Footer from '../../components/Footer';
import { motion, Variants } from 'framer-motion';
import { ArrowRight, Calendar, ArrowUpRight } from 'lucide-react';
import { createClient } from '../../lib/supabase/client';
import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { data, error } = await supabase
          .from('published_articles')
          .select('id, title, slug, cover_image, created_at, content')
          .eq('published', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setArticles(data || []);
      } catch (err) {
        console.error("Failed to fetch articles", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Extract a short excerpt from html content
  const extractExcerpt = (html: string) => {
    if (!html) return '';
    const text = html.replace(/<[^>]+>/g, '');
    return text.length > 120 ? text.substring(0, 120) + '...' : text;
  };

  return (
    <div className="w-full bg-black flex flex-col min-h-screen">
      <SubPageNavbar />

      <main className="flex-1 w-full bg-black px-[5px] pb-[5px] pt-24 sm:pt-32">
        <section className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-black p-[5px] overflow-hidden shadow-sm border border-white/5 min-h-[80vh]">
          
          <div className="w-full h-full mx-auto relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5 lg:gap-8 h-full"
            >
              
              {/* Header Box */}
              <motion.div
                variants={itemVariants}
                className="w-full bg-white rounded-[2.5rem] p-8 md:p-14 shadow-sm border border-black/5 relative overflow-hidden"
              >
                <div className="absolute inset-0 z-0 bg-white" />
                <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[70%] rounded-full bg-brand-tertiary/[0.03] blur-[100px] pointer-events-none" />
                <div className="absolute inset-0 z-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:30px_30px] opacity-70 pointer-events-none" />

                <div className="relative z-10 w-full mb-12 mt-4 max-w-4xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-[4rem] leading-[1.05] font-medium tracking-tight text-black mb-6" style={{ wordSpacing: '-0.02em', letterSpacing: '-0.02em' }}>
                    Industry Insights.<br />
                    <span className="text-black/40">News & Perspectives.</span>
                  </h1>

                  <p className="text-sm md:text-base text-black/70 max-w-xl leading-[1.6]">
                    Stay at the forefront of electronics manufacturing. Explore our latest technological advancements, facility milestones, and expert analysis on the dynamic landscape of global assembly capabilities.
                  </p>
                </div>
              </motion.div>

              {/* Grid of Articles */}
              <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 w-full pb-10">
                {isLoading ? (
                  // Loading Skeletons
                  Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="bg-white rounded-[2.5rem] h-[400px] p-6 border border-black/5 shadow-sm animate-pulse flex flex-col gap-4">
                      <div className="w-full h-[200px] bg-black/5 rounded-2xl" />
                      <div className="w-[100px] h-4 bg-black/5 rounded mt-4" />
                      <div className="w-[80%] h-8 bg-black/5 rounded" />
                      <div className="w-full h-12 bg-black/5 rounded mt-auto" />
                    </div>
                  ))
                ) : articles.length > 0 ? (
                  articles.map((article) => (
                    <Link href={`/articles/${article.slug}`} key={article.id} className="group block h-full">
                      <div className="bg-white rounded-[2.5rem] p-6 lg:p-8 flex flex-col h-full shadow-sm border border-black/5 hover:shadow-xl hover:border-brand-tertiary/20 transition-all duration-500 overflow-hidden relative">
                         
                         {/* Cover Image Container */}
                         <div className="relative w-full aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-black/5 mb-6">
                            {article.cover_image ? (
                               <Image 
                                 src={article.cover_image} 
                                 alt={article.title} 
                                 fill 
                                 className="object-cover group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                               />
                            ) : (
                               <div className="w-full h-full bg-[#f1f5f9] flex items-center justify-center">
                                  <span className="text-black/20 font-medium">No Image</span>
                               </div>
                            )}
                         </div>

                         {/* Date Label */}
                         <div className="flex items-center gap-2 mb-4">
                           <Calendar size={12} className="text-black/40" />
                           <span className="text-[10px] font-bold tracking-[0.15em] text-black/40 uppercase">
                             {format(new Date(article.created_at), 'MMMM dd, yyyy')}
                           </span>
                         </div>

                         {/* Title */}
                         <h3 className="text-xl md:text-2xl font-bold text-black mb-3 leading-[1.2] group-hover:text-brand-tertiary transition-colors duration-300 line-clamp-2">
                           {article.title}
                         </h3>

                         {/* Excerpt */}
                         <p className="text-[13px] text-black/60 leading-relaxed mb-8 flex-1 line-clamp-3">
                           {extractExcerpt(article.content)}
                         </p>

                         {/* Read More Link */}
                         <div className="flex items-center gap-2 mt-auto pt-4 border-t border-black/5">
                            <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-black group-hover:text-brand-tertiary transition-colors">Read Article</span>
                            <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center group-hover:bg-brand-tertiary text-black group-hover:text-white transition-all ml-auto">
                              <ArrowRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </div>
                         </div>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 lg:col-span-3 bg-white rounded-[2.5rem] p-16 border border-black/5 shadow-sm text-center">
                    <h3 className="text-2xl font-bold text-black mb-2">No Articles Found</h3>
                    <p className="text-black/60">Check back later for new updates and insights.</p>
                  </div>
                )}
              </motion.div>

            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
