"use client";

import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Activity, Users, Settings, TrendingUp, Presentation, Globe, Plus, Trash2, Edit2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

// Local Types
type AdminNote = {
  id: string;
  content: string;
  created_at: string;
  updated_at: string;
};

export default function AdminDashboardPage() {
  const supabase = createClient();
  const [stats, setStats] = useState({
    leads: "0",
    subscribers: "0",
    visitors: "0",
    articles: "24" // Static placeholder for existing articles route
  });

  const [notes, setNotes] = useState<AdminNote[]>([]);
  const [newNote, setNewNote] = useState("");
  const [editingNote, setEditingNote] = useState<AdminNote | null>(null);

  useEffect(() => {
    fetchStats();
    fetchNotes();
  }, []);

  const fetchStats = async () => {
    try {
      const [leadsRes, subsRes, visitsRes] = await Promise.all([
        supabase.from('leads').select('*', { count: 'exact', head: true }),
        supabase.from('email_subscriptions').select('*', { count: 'exact', head: true }),
        supabase.from('page_visits').select('*', { count: 'exact', head: true }),
      ]);

      setStats(prev => ({
        ...prev,
        leads: leadsRes.count?.toString() || "0",
        subscribers: subsRes.count?.toString() || "0",
        visitors: visitsRes.count?.toString() || "0"
      }));
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    }
  };

  const fetchNotes = async () => {
    const { data } = await supabase.from('admin_notes').select('*').order('created_at', { ascending: false });
    if (data) setNotes(data);
  };

  const saveNote = async () => {
    if (!newNote.trim()) return;
    
    if (editingNote) {
      const { error } = await supabase.from('admin_notes').update({ content: newNote }).eq('id', editingNote.id);
      if (!error) {
        setEditingNote(null);
        setNewNote("");
        fetchNotes();
      }
    } else {
      const { error } = await supabase.from('admin_notes').insert({ content: newNote });
      if (!error) {
        setNewNote("");
        fetchNotes();
      }
    }
  };

  const deleteNote = async (id: string) => {
    await supabase.from('admin_notes').delete().eq('id', id);
    fetchNotes();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-8 w-full">
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Admin Dashboard</h1>
        <p className="text-black/60">Overview of your telemetry and workspace.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Number of Leads", value: stats.leads, icon: <Users size={20} /> },
          { label: "Email Subscribers", value: stats.subscribers, icon: <Presentation size={20} /> },
          { label: "Total Page Visits", value: stats.visitors, icon: <Globe size={20} /> },
          { label: "Articles", value: stats.articles, icon: <TrendingUp size={20} /> },
        ].map((stat, i) => (
          <motion.div key={i} variants={itemVariants} className="bg-white rounded-2xl p-6 border border-black/5 shadow-sm flex flex-col gap-4 hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-brand-tertiary/10 flex items-center justify-center text-brand-tertiary">
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-bold text-black">{stat.value}</p>
              <p className="text-xs uppercase tracking-widest text-black/50 font-bold mt-1">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div variants={itemVariants} className="bg-white rounded-[2rem] p-8 border border-black/5 shadow-sm min-h-[400px] flex flex-col">
         <h2 className="text-xl font-bold mb-6 text-black">Admin Notes & Reminders</h2>
         
         <div className="flex gap-4 mb-8">
           <input 
             type="text" 
             value={newNote}
             onChange={e => setNewNote(e.target.value)}
             placeholder="Write a new note or reminder..."
             className="flex-1 bg-[#f8fafc] border border-black/10 rounded-xl px-4 py-3 outline-none focus:border-brand-tertiary transition-colors text-black"
             onKeyDown={e => e.key === 'Enter' && saveNote()}
           />
           <button 
             onClick={saveNote}
             className="bg-black hover:bg-brand-tertiary text-white rounded-xl px-6 py-3 font-semibold flex items-center gap-2 transition-colors"
           >
             {editingNote ? "Update" : <><Plus size={18} /> Add</>}
           </button>
           {editingNote && (
             <button 
                onClick={() => { setEditingNote(null); setNewNote(""); }}
                className="bg-black/5 hover:bg-black/10 text-black rounded-xl px-6 py-3 font-semibold transition-colors"
             >
                Cancel
             </button>
           )}
         </div>

         <div className="flex flex-col gap-4">
           {notes.length === 0 ? (
             <p className="text-black/40 text-center py-8">No notes yet.</p>
           ) : (
             notes.map(note => (
               <div key={note.id} className="group flex justify-between items-start bg-[#f8fafc] p-4 rounded-xl border border-black/5">
                 <p className="text-black/80">{note.content}</p>
                 <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                   <button onClick={() => { setEditingNote(note); setNewNote(note.content); }} className="p-2 text-black/40 hover:text-blue-600 transition-colors">
                     <Edit2 size={16} />
                   </button>
                   <button onClick={() => deleteNote(note.id)} className="p-2 text-black/40 hover:text-red-500 transition-colors">
                     <Trash2 size={16} />
                   </button>
                 </div>
               </div>
             ))
           )}
         </div>
      </motion.div>

    </motion.div>
  );
}
