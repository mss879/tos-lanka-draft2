"use client";

import React, { useEffect, useState, use } from 'react';
import SubPageNavbar from '../../../components/SubPageNavbar';
import Footer from '../../../components/Footer';
import { motion, Variants } from 'framer-motion';
import { Calendar, Share2, Link as LinkIcon, Check } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function ArticleDetailPage({ 
  params 
}: { 
  // 'params' is a Promise in React 19 / Next.js 15+ App Router
  params: Promise<{ slug: string }> 
}) {
  const resolvedParams = use(params);
  const { slug } = resolvedParams;

  const [article, setArticle] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const { data, error } = await supabase
          .from('published_articles')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (error) {
           console.error("Failed to fetch article", error);
           router.push('/articles'); // fallback
           return;
        }
        
        setArticle(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [slug, router]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
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

  // Modern sharing API fallback
  const handleShare = async () => {
    const shareData = {
      title: article?.title,
      text: "Check out this article from TOS Lanka",
      url: window.location.href,
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.warn("Share failed", err);
      }
    } else {
      // Fallback: Copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
     return (
       <div className="min-h-screen bg-black flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-white/20 border-t-white rounded-full animate-spin" />
       </div>
     );
  }

  if (!article) return null;

  return (
    <div className="w-full bg-black flex flex-col min-h-screen">
      <SubPageNavbar />

      <main className="flex-1 w-full bg-black px-[5px] pb-[5px] pt-24 sm:pt-32">
        <section className="relative w-full rounded-[32px] sm:rounded-[40px] md:rounded-[48px] bg-black p-[5px] overflow-hidden shadow-sm border border-white/5 min-h-[80vh]">
          
          <div className="w-full h-full mx-auto relative z-10 flex flex-col lg:flex-row gap-5 lg:gap-8 lg:p-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 flex flex-col gap-5 lg:gap-8 max-w-5xl mx-auto w-full"
            >
              
              {/* Main Article Card */}
              <motion.div
                variants={itemVariants}
                className="w-full bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-sm border border-black/5 relative overflow-hidden flex flex-col"
              >
                 {/* Title & Meta Info */}
                 <div className="mb-10 max-w-3xl mx-auto text-center">
                    <div className="flex items-center justify-center gap-2 mb-6 text-black/50">
                       <Calendar size={14} />
                       <span className="text-[11px] font-bold tracking-[0.15em] uppercase">
                          {format(new Date(article.created_at), 'MMMM dd, yyyy')}
                       </span>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl leading-[1.1] font-bold text-black mb-8">
                      {article.title}
                    </h1>

                    {/* Share Bar */}
                    <div className="flex items-center justify-center gap-3">
                       <button 
                         onClick={handleShare}
                         className="flex items-center gap-2 px-5 py-3 rounded-full border border-black/10 bg-[#f8fafc] text-black hover:bg-brand-tertiary hover:text-white hover:border-brand-tertiary transition-colors duration-300 text-[11px] font-bold uppercase tracking-widest shadow-sm group"
                       >
                          {copied ? <Check size={16} /> : <Share2 size={16} />}
                          {copied ? 'Copied Link!' : 'Share Article'}
                       </button>
                    </div>
                 </div>

                 {/* Cover Image */}
                 {article.cover_image && (
                   <div className="relative w-full aspect-[21/9] md:aspect-[16/7] rounded-[2rem] overflow-hidden mb-12 shadow-md">
                      <Image 
                        src={article.cover_image} 
                        alt={article.title}
                        fill
                        priority
                        className="object-cover"
                      />
                   </div>
                 )}

                 {/* Rich Text Content */}
                 <div className="max-w-3xl mx-auto w-full">
                    {/* Inject raw HTML gracefully using typography utilities */}
                    <article 
                      className="prose prose-lg max-w-none prose-p:text-black/80 prose-p:leading-[1.8] prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black prose-a:text-brand-tertiary hover:prose-a:text-black prose-strong:text-black prose-img:rounded-[1.5rem] prose-img:shadow-sm selection:bg-brand-tertiary selection:text-white pb-12"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                 </div>
                 
                 {/* Bottom Ext Share Box */}
                 <div className="max-w-3xl mx-auto w-full pt-12 border-t border-black/5 mt-auto flex flex-col sm:flex-row items-center justify-between gap-6">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">Enjoyed this reading? Share it.</span>
                    <div className="flex items-center gap-3">
                       <button onClick={handleShare} className="w-12 h-12 rounded-full border border-black/10 flex items-center justify-center text-black hover:bg-brand-tertiary hover:text-white hover:border-brand-tertiary transition-all">
                          {copied ? <Check size={18} /> : <LinkIcon size={18} />}
                       </button>
                    </div>
                 </div>

              </motion.div>

            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
