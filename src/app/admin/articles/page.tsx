"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '../../../lib/supabase/client';
import RichTextEditor from '../../../components/ui/RichTextEditor';
import { UploadCloud, CheckCircle2, AlertCircle, Loader2, Eye, EyeOff, Trash2, Plus, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';

export default function AdminArticlesDashboard() {
  // Navigation & UI State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articlesList, setArticlesList] = useState<any[]>([]);
  const [isLoadingArticles, setIsLoadingArticles] = useState(true);

  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const supabase = createClient();

  // --------------------------------------------------------------------------
  // DATABASE MANAGEMENT
  // --------------------------------------------------------------------------
  
  const fetchArticles = async () => {
    setIsLoadingArticles(true);
    const { data, error } = await supabase
      .from('published_articles')
      .select('id, title, slug, published, created_at')
      .order('created_at', { ascending: false });
    
    if (!error && data) {
      setArticlesList(data);
    }
    setIsLoadingArticles(false);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const togglePublishStatus = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from('published_articles')
      .update({ published: !currentStatus })
      .eq('id', id);
    if (!error) fetchArticles();
  };

  const deleteArticle = async (id: string) => {
    if (!confirm("Are you sure you want to completely delete this article?")) return;
    const { error } = await supabase
      .from('published_articles')
      .delete()
      .eq('id', id);
    if (!error) fetchArticles();
  };

  // --------------------------------------------------------------------------
  // CREATION / FORM LOGIC
  // --------------------------------------------------------------------------

  // Generate slug dynamically from title if untouched manually
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setTitle(newTitle);
    
    // Only auto-update slug if it was dynamically set previously or is empty
    const oldExpectedSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    if (!slug || slug === oldExpectedSlug) {
      setSlug(newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImageFile(file);
      const objectUrl = URL.createObjectURL(file);
      setImagePreview(objectUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);

    try {
      if (!title || !slug || !content) {
        throw new Error("Title, Slug, and Content are required.");
      }

      let coverImageUrl = null;

      // 1. Upload Image to Supabase
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${slug}-${Date.now()}.${fileExt}`;
        const filePath = `covers/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('article_images')
          .upload(filePath, imageFile, { upsert: true });

        if (uploadError) throw new Error(`Image Upload Error: ${uploadError.message}`);

        const { data: { publicUrl } } = supabase.storage
          .from('article_images')
          .getPublicUrl(filePath);
          
        coverImageUrl = publicUrl;
      }

      // 2. Insert Article into Supabase Database
      const { error: dbError } = await supabase
        .from('published_articles')
        .insert([{ title, slug, content, cover_image: coverImageUrl, published: isPublished }]);

      if (dbError) throw new Error(`Database Error: ${dbError.message}`);

      setStatus({ type: 'success', message: 'Article successfully published!' });
      
      // Auto-collapse after 1.5 seconds on success
      setTimeout(() => {
         setIsModalOpen(false);
         // Reset form
         setTitle(''); setSlug(''); setContent(''); setImageFile(null); setImagePreview(null); setIsPublished(false);
         setStatus(null);
      }, 1500);
      
      // Refresh list in background immediately
      fetchArticles();

    } catch (err: any) {
      console.error(err);
      setStatus({ type: 'error', message: err.message || 'Failed to submit article' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Override close handling to ask for unsaved changes confirmation
  const handleCloseModal = () => {
    if (title || content || imageFile) {
      if (!confirm("You have unsaved changes. Are you sure you want to close?")) return;
    }
    // Clean close
    setIsModalOpen(false);
    setStatus(null);
  };

  return (
    <div className="w-full h-full flex flex-col gap-8 pb-20">
      
      {/* --------------------------------------------------------------------------
          DASHBOARD HEADER
          -------------------------------------------------------------------------- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-black/10 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-1">Articles Dashboard</h1>
          <p className="text-black/60">Manage your published news, insights, and media.</p>
        </div>
        
        <button 
          onClick={() => setIsModalOpen(true)}
          className="group relative flex items-center justify-center gap-2 px-6 py-4 bg-brand-tertiary text-white rounded-xl shadow-[0_4px_20px_rgba(58,91,251,0.3)] hover:shadow-[0_8px_30px_rgba(58,91,251,0.4)] transition-all overflow-hidden font-bold tracking-widest text-xs uppercase"
        >
          <div className="absolute inset-0 bg-white/20 -translate-x-[120%] group-hover:translate-x-[120%] transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
          <Plus size={18} /> Add New Article
        </button>
      </div>

      {/* --------------------------------------------------------------------------
          DATA TABLE LIST (Primary View)
          -------------------------------------------------------------------------- */}
      <div className="bg-white/80 backdrop-blur-3xl rounded-[2rem] border border-black/5 shadow-sm overflow-hidden flex-1 relative">
         {isLoadingArticles ? (
           <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
             <Loader2 size={32} className="animate-spin text-brand-tertiary" />
           </div>
         ) : null}

         {articlesList.length === 0 && !isLoadingArticles ? (
           <div className="h-[400px] flex flex-col items-center justify-center text-center px-6">
             <div className="w-20 h-20 bg-[#f8fafc] flex items-center justify-center rounded-3xl mb-4 border border-black/5">
                <AlertCircle className="w-8 h-8 text-black/20" />
             </div>
             <h3 className="text-xl font-bold text-black mb-1">No Articles Found</h3>
             <p className="text-sm font-medium text-black/40 max-w-[250px] mx-auto">Get started by creating your first piece of content for your readers.</p>
           </div>
         ) : (
           <div className="w-full overflow-x-auto min-h-[500px]">
             <table className="w-full text-left border-collapse min-w-[750px]">
               <thead>
                  <tr className="bg-[#f8fafc] border-b border-black/5">
                     <th className="px-8 py-5 text-[10px] font-bold tracking-[0.15em] text-black uppercase w-10">#</th>
                     <th className="px-6 py-5 text-[10px] font-bold tracking-[0.15em] text-black uppercase">Article Details</th>
                     <th className="px-6 py-5 text-[10px] font-bold tracking-[0.15em] text-black uppercase">Date Published</th>
                     <th className="px-6 py-5 text-[10px] font-bold tracking-[0.15em] text-black uppercase text-center w-32">Status</th>
                     <th className="px-8 py-5 text-[10px] font-bold tracking-[0.15em] text-black uppercase text-right w-40">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-black/5">
                  {articlesList.map((article, i) => (
                    <tr key={article.id} className="hover:bg-[#f8fafc] transition-colors group">
                       <td className="px-8 py-5 text-sm font-bold text-black/20">{(i + 1).toString().padStart(2, '0')}</td>
                       <td className="px-6 py-5">
                          <span className="text-sm font-bold text-black block mb-0.5">{article.title}</span>
                          <span className="text-xs text-black/40 font-mono block">/{article.slug}</span>
                       </td>
                       <td className="px-6 py-5">
                          <span className="text-sm font-bold text-black/80 block">{format(new Date(article.created_at), 'MMM dd, yyyy')}</span>
                          <span className="text-[10px] font-bold tracking-widest uppercase text-black/30 mt-1 block">{format(new Date(article.created_at), 'HH:mm aaa')}</span>
                       </td>
                       <td className="px-6 py-5 text-center">
                          <span className={`inline-flex px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest border ${
                            article.published 
                              ? 'bg-[#ecfdf5] text-[#059669] border-[#059669]/20' 
                              : 'bg-[#fef2f2] text-[#dc2626] border-[#dc2626]/20'
                          }`}>
                            {article.published ? 'Live' : 'Hidden'}
                          </span>
                       </td>
                       <td className="px-8 py-5">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                             <button 
                               onClick={() => togglePublishStatus(article.id, article.published)}
                               className="p-2.5 rounded-xl bg-white border border-black/5 shadow-sm hover:shadow hover:border-black/10 text-black transition-all"
                               title={article.published ? "Hide Article" : "Publish Article"}
                             >
                                {article.published ? <EyeOff size={16} /> : <Eye size={16} />}
                             </button>
                             <button 
                               onClick={() => deleteArticle(article.id)}
                               className="p-2.5 rounded-xl bg-[#fef2f2] text-[#dc2626] border border-[#dc2626]/10 shadow-sm hover:shadow hover:border-[#dc2626]/30 hover:bg-[#fee2e2] transition-all"
                               title="Delete permanently"
                             >
                                <Trash2 size={16} />
                             </button>
                          </div>
                       </td>
                    </tr>
                  ))}
               </tbody>
             </table>
           </div>
         )}
      </div>

      {/* --------------------------------------------------------------------------
          CREATION MODAL POPUP
          -------------------------------------------------------------------------- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-8">
            
            {/* Dark Backdrop Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-md"
              onClick={handleCloseModal}
            />

            {/* Scale-in Modal Content */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.5 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-[#f8fafc] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col border border-white/20"
            >
               {/* Modal Sticky Header */}
               <div className="px-8 py-6 bg-white border-b border-black/5 flex items-center justify-between z-10 sticky top-0">
                  <div>
                    <h2 className="text-2xl font-bold text-black tracking-tight">Create New Article</h2>
                    <p className="text-sm text-black/50 font-medium">Draft your content and format it securely.</p>
                  </div>
                  <button 
                    onClick={handleCloseModal}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-[#f1f5f9] text-black hover:bg-black hover:text-white transition-colors"
                  >
                    <X size={18} strokeWidth={3} />
                  </button>
               </div>

               {/* Scrollable Form Body */}
               <div className="flex-1 overflow-y-auto w-full p-8 pb-32 custom-scrollbar">
                 <AnimatePresence>
                   {status && (
                     <motion.div
                       initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                       animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                       exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                       className={`p-4 rounded-xl flex items-center gap-3 font-semibold text-sm shadow-sm border overflow-hidden ${
                         status.type === 'success' 
                           ? "bg-[#ecfdf5] text-[#059669] border-[#059669]/20" 
                           : "bg-[#fef2f2] text-[#dc2626] border-[#dc2626]/20"
                       }`}
                     >
                       {status.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
                       {status.message}
                     </motion.div>
                   )}
                 </AnimatePresence>

                 <form id="article-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
                   
                   {/* Meta Details Fields */}
                   <div className="bg-white rounded-3xl p-6 md:p-8 border border-black/5 shadow-sm flex flex-col gap-6">
                     <div className="flex items-center gap-3 ml-1">
                       <input 
                         type="checkbox" 
                         id="modal-published"
                         checked={isPublished}
                         onChange={(e) => setIsPublished(e.target.checked)}
                         className="w-4 h-4 rounded text-brand-tertiary border-black/20 focus:ring-brand-tertiary bg-white" 
                       />
                       <label htmlFor="modal-published" className="text-sm font-semibold text-black select-none cursor-pointer">
                         Publish this article immediately upon uploading
                       </label>
                     </div>

                     <div className="flex flex-col md:flex-row gap-6 border-t border-black/5 pt-6">
                       <div className="flex-1 flex flex-col gap-2">
                         <label className="text-[11px] font-bold tracking-[0.15em] text-black uppercase pl-1">Article Title</label>
                         <input 
                           type="text" 
                           value={title}
                           onChange={handleTitleChange}
                           required
                           className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-5 py-4 text-[14px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all"
                           placeholder="The Future of PCBA..."
                         />
                       </div>
                       
                       <div className="flex-1 flex flex-col gap-2">
                         <label className="text-[11px] font-bold tracking-[0.15em] text-black uppercase pl-1">URL Slug</label>
                         <input 
                           type="text" 
                           value={slug}
                           onChange={(e) => setSlug(e.target.value)}
                           required
                           className="w-full bg-[#f8fafc] border border-black/5 rounded-2xl px-5 py-4 text-[14px] font-medium text-black focus:outline-none focus:ring-1 focus:ring-brand-tertiary/30 focus:border-brand-tertiary transition-all disabled:opacity-50"
                           placeholder="the-future-of-pcba"
                         />
                       </div>
                     </div>
                   </div>

                   {/* Cover Image Upload (Optional but Recommended) */}
                   <div className="bg-white rounded-3xl p-6 md:p-8 border border-black/5 shadow-sm flex flex-col gap-3">
                     <label className="text-[11px] font-bold tracking-[0.15em] text-black uppercase pl-1">Cover Image Header</label>
                     <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border-2 border-dashed border-black/10 bg-[#f8fafc] hover:bg-[#f1f5f9] transition-colors group flex items-center justify-center cursor-pointer">
                       <input 
                         type="file" 
                         accept="image/*"
                         onChange={handleImageChange}
                         className="absolute inset-0 opacity-0 cursor-pointer z-10 w-full h-full"
                       />
                       
                       {imagePreview ? (
                         <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                       ) : (
                         <div className="flex flex-col items-center gap-3 text-black/40 group-hover:text-brand-tertiary transition-colors">
                           <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center border border-black/5">
                             <UploadCloud size={24} />
                           </div>
                           <div className="text-center font-medium">
                             <span className="text-brand-tertiary text-sm block">Click to upload cover image</span>
                             <span className="text-xs text-black/40 mt-1">1920x1080px recommended</span>
                           </div>
                         </div>
                       )}
                       
                       {imagePreview && (
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-0">
                            <span className="text-white font-bold bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md">Swap Image</span>
                         </div>
                       )}
                     </div>
                   </div>

                   {/* True TipTap Editor Instance */}
                   <div className="bg-white rounded-3xl p-6 md:p-8 border border-black/5 shadow-sm flex flex-col gap-3">
                      <label className="text-[11px] font-bold tracking-[0.15em] text-black uppercase pl-1">Full Article Body</label>
                      <RichTextEditor 
                        content={content} 
                        onChange={(html: string) => setContent(html)} 
                      />
                   </div>

                 </form>
               </div>

               {/* Modal Sticky Footer Action Bar */}
               <div className="absolute bottom-0 left-0 w-full px-8 py-5 bg-white border-t border-black/5 flex items-center justify-between z-10 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                 <button 
                   type="button" 
                   onClick={handleCloseModal}
                   className="px-6 py-3 rounded-full text-black/60 font-bold text-xs uppercase tracking-widest hover:text-black hover:bg-black/5 transition-colors"
                 >
                   Cancel
                 </button>
                 <button 
                   type="submit"
                   form="article-form"
                   disabled={isSubmitting}
                   className="px-8 py-4 bg-brand-tertiary text-white rounded-full font-bold tracking-widest text-xs uppercase hover:bg-[#2044f5] transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg"
                 >
                   {isSubmitting ? (
                     <>
                       <Loader2 size={16} className="animate-spin" /> Uploading...
                     </>
                   ) : (
                     <>Confirm Upload</>
                   )}
                 </button>
               </div>
               
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(0,0,0,0.1);
          border-radius: 20px;
        }
      `}</style>
    </div>
  );
}
