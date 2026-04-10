"use client";

import React, { useEffect, useState } from 'react';
import SubPageNavbar from '../../../components/SubPageNavbar';
import Footer from '../../../components/Footer';
import { motion, Variants } from 'framer-motion';
import { Calendar, Share2, Link as LinkIcon, Check } from 'lucide-react';
import { createClient } from '../../../lib/supabase/client';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface StaticArticleProps {
  title: string;
  content: string;
  coverImage: string;
  createdAt: string;
  excerpt: string;
}

export default function ArticleDetailClient({
  slug,
  staticArticle,
}: {
  slug: string;
  staticArticle: StaticArticleProps | null;
}) {
  const [article, setArticle] = useState<any>(staticArticle ? {
    title: staticArticle.title,
    content: staticArticle.content,
    cover_image: staticArticle.coverImage,
    created_at: staticArticle.createdAt,
  } : null);
  const [isLoading, setIsLoading] = useState(!staticArticle);
  const [copied, setCopied] = useState(false);
  const router = useRouter();

  // Only fetch from Supabase if this is NOT a static article
  useEffect(() => {
    if (staticArticle) return;
    const supabase = createClient();

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
  }, [slug, staticArticle, router]);

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
       <div className="min-h-screen bg-[#f8f9fb] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-brand-primary/20 border-t-brand-primary rounded-full animate-spin" />
       </div>
     );
  }

  if (!article) return null;

  return (
    <div className="w-full bg-[#f8f9fb] flex flex-col min-h-screen">
      <SubPageNavbar />

      <main className="flex-1 w-full relative pt-24 sm:pt-32 pb-24">
        {/* Soft Background Gradients */}
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-white via-brand-tertiary/[0.03] to-[#f8f9fb] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -left-1/4 w-[600px] h-[600px] bg-brand-tertiary/5 rounded-full blur-[100px] pointer-events-none" />

        <section className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 min-h-[80vh]">
          
          <div className="w-full h-full mx-auto relative z-10 flex flex-col lg:flex-row gap-5 lg:gap-8 lg:p-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="flex-1 flex flex-col gap-6 md:gap-10 max-w-5xl mx-auto w-full"
            >
              
              {/* Main Article Card */}
              <motion.div
                variants={itemVariants}
                className="w-full bg-white rounded-[2.5rem] p-6 sm:p-10 md:p-14 shadow-sm border border-black/5 relative overflow-hidden flex flex-col"
              >
                 {/* Breadcrumb for SEO */}
                 <nav className="mb-8 max-w-3xl mx-auto w-full" aria-label="Breadcrumb">
                    <ol className="flex items-center gap-2 text-[11px] font-medium tracking-wide uppercase text-black/40">
                       <li><Link href="/" className="hover:text-brand-tertiary transition-colors">Home</Link></li>
                       <li>/</li>
                       <li><Link href="/articles" className="hover:text-brand-tertiary transition-colors">Articles</Link></li>
                       <li>/</li>
                       <li className="text-black/60 truncate max-w-[200px]">{article.title}</li>
                    </ol>
                 </nav>

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
                      className="prose prose-lg max-w-none prose-p:text-black/80 prose-p:leading-[1.8] prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-black prose-a:text-brand-tertiary hover:prose-a:text-black prose-strong:text-black prose-img:rounded-[1.5rem] prose-img:shadow-sm prose-table:border-collapse prose-th:bg-black/5 prose-th:border prose-th:border-black/10 prose-th:px-4 prose-th:py-2 prose-td:border prose-td:border-black/10 prose-td:px-4 prose-td:py-2 prose-li:marker:text-brand-tertiary selection:bg-brand-tertiary selection:text-white pb-12"
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
