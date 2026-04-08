"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

type Pipeline = { id: string; name: string; sort_order: number };
type Stage = { id: string; pipeline_id: string; name: string; sort_order: number };
type Lead = { 
  id: string; 
  full_name: string; 
  email: string | null; 
  company: string | null;
  stage_id: string; 
  sort_order: number;
  created_at: string;
};

export default function KanbanBoard() {
  const supabase = createClient();
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [stages, setStages] = useState<Stage[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  const [activePipelineId, setActivePipelineId] = useState<string | null>(null);

  // Modal states
  const [showPipelineModal, setShowPipelineModal] = useState(false);
  const [showStageModal, setShowStageModal] = useState(false);
  const [showLeadModal, setShowLeadModal] = useState<string | null>(null); // holds stage_id if open

  // Form states
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formCompany, setFormCompany] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCRMData();
  }, []);

  const fetchCRMData = async () => {
    setLoading(true);
    const [pRes, sRes, lRes] = await Promise.all([
      supabase.from('pipelines').select('*').order('sort_order', { ascending: true }),
      supabase.from('stages').select('*').order('sort_order', { ascending: true }),
      supabase.from('leads').select('id, full_name, email, company, stage_id, sort_order, created_at').order('sort_order', { ascending: true })
    ]);

    if (pRes.data) {
        setPipelines(pRes.data);
        if (pRes.data.length > 0 && !activePipelineId) {
            setActivePipelineId(pRes.data[0].id);
        }
    }
    if (sRes.data) setStages(sRes.data);
    if (lRes.data) setLeads(lRes.data);
    setLoading(false);
  };

  const createPipeline = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;
    setIsSubmitting(true);
    const newOrder = (pipelines[pipelines.length - 1]?.sort_order || 0) + 10;
    
    const { data: inserted } = await supabase.from('pipelines').insert({
        name: formName,
        sort_order: newOrder
    }).select().single();

    if (inserted) {
        setPipelines(prev => [...prev, inserted]);
        setActivePipelineId(inserted.id);
    }
    setFormName('');
    setShowPipelineModal(false);
    setIsSubmitting(false);
  };

  const createStage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !activePipelineId) return;
    setIsSubmitting(true);
    const pStages = stages.filter(s => s.pipeline_id === activePipelineId);
    const newOrder = (pStages[pStages.length - 1]?.sort_order || 0) + 10;
    
    const { data: inserted } = await supabase.from('stages').insert({
        pipeline_id: activePipelineId,
        name: formName,
        sort_order: newOrder
    }).select().single();

    if (inserted) setStages(prev => [...prev, inserted]);
    setFormName('');
    setShowStageModal(false);
    setIsSubmitting(false);
  };

  const createLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !showLeadModal || !activePipelineId) return;
    setIsSubmitting(true);
    const sLeads = leads.filter(l => l.stage_id === showLeadModal);
    const newOrder = (sLeads[sLeads.length - 1]?.sort_order || 0) + 10;
    
    const { data: inserted } = await supabase.from('leads').insert({
        full_name: formName,
        email: formEmail,
        phone: formPhone,
        company: formCompany,
        pipeline_id: activePipelineId,
        stage_id: showLeadModal,
        sort_order: newOrder
    }).select('id, full_name, email, phone, company, stage_id, sort_order, created_at').single();

    if (inserted) setLeads(prev => [...prev, inserted]);
    
    setFormName('');
    setFormEmail('');
    setFormPhone('');
    setFormCompany('');
    setShowLeadModal(null);
    setIsSubmitting(false);
  };

  // Drag and Drop Logic
  const onDragStart = (e: React.DragEvent, leadId: string) => {
    e.dataTransfer.setData("leadId", leadId);
  };
  const onDragOver = (e: React.DragEvent) => e.preventDefault();
  const onDrop = async (e: React.DragEvent, targetStageId: string) => {
    e.preventDefault();
    const leadId = e.dataTransfer.getData("leadId");
    if (!leadId) return;

    const stageLeads = leads.filter(l => l.stage_id === targetStageId);
    const newSortOrder = (stageLeads[stageLeads.length - 1]?.sort_order || 0) + 10;
    setLeads(prev => prev.map(l => l.id === leadId ? { ...l, stage_id: targetStageId, sort_order: newSortOrder } : l));
    
    await supabase.rpc('move_lead', { p_lead_id: leadId, p_new_stage_id: targetStageId, p_new_sort_order: newSortOrder });
  };

  if (loading) return <div className="p-12 text-black/50 font-medium tracking-wide">Initializing Pipeline...</div>;

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Pipeline Navigation / Toolbar */}
      <div className="flex items-center justify-between bg-white px-4 py-3 border border-black/5 rounded-2xl shadow-sm">
        <div className="flex items-center gap-3 overflow-x-auto custom-scrollbar pr-4">
            {pipelines.length === 0 ? (
                <span className="text-black/50 text-sm italic py-1.5">No pipelines exist yet</span>
            ) : pipelines.map(p => (
                <button
                    key={p.id}
                    onClick={() => setActivePipelineId(p.id)}
                    className={`px-4 py-1.5 rounded-full text-sm font-bold whitespace-nowrap transition-colors ${activePipelineId === p.id ? 'bg-black text-white' : 'bg-[#f8fafc] text-black hover:bg-black/5'}`}
                >
                    {p.name}
                </button>
            ))}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 border-l border-black/5 pl-4">
            <button 
                onClick={() => { setFormName(''); setShowPipelineModal(true); }}
                className="text-xs font-bold px-3 py-1.5 border border-black/10 rounded-lg hover:bg-black/5 transition-colors"
            >
               + New Pipeline
            </button>
            {activePipelineId && (
                <button 
                    onClick={() => { setFormName(''); setShowStageModal(true); }}
                    className="text-xs font-bold px-3 py-1.5 bg-black text-white rounded-lg hover:bg-brand-tertiary transition-colors border border-transparent"
                >
                    + Add Stage
                </button>
            )}
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex bg-[#f8fafc] w-full overflow-x-auto pb-4 gap-6 h-[calc(100vh-280px)]">
        {!activePipelineId ? (
          <div className="w-full flex items-center justify-center border-2 border-dashed border-black/5 rounded-2xl">
             <p className="text-black/40 font-medium">Create and select a pipeline to begin managing your stages.</p>
          </div>
        ) : (
          stages.filter(s => s.pipeline_id === activePipelineId).length === 0 ? (
            <div className="w-full flex flex-col gap-3 items-center justify-center border-2 border-dashed border-black/5 rounded-2xl">
                <p className="text-black/40 font-medium">This pipeline has no stages yet.</p>
                <button onClick={() => setShowStageModal(true)} className="text-sm font-bold border border-black/10 px-4 py-2 rounded-xl">Create your first stage</button>
            </div>
          ) : (
            stages
              .filter(s => s.pipeline_id === activePipelineId)
              .sort((a,b) => a.sort_order - b.sort_order)
              .map(stage => (
              <div 
                key={stage.id} 
                className="flex-shrink-0 w-[320px] flex flex-col bg-black/5 rounded-2xl p-4 border border-black/5 overflow-hidden gap-3"
                onDragOver={onDragOver}
                onDrop={(e) => onDrop(e, stage.id)}
              >
                <div className="flex justify-between items-center px-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-black uppercase tracking-tight">{stage.name}</h3>
                    <span className="bg-black/10 text-black/60 text-[10px] px-2 py-0.5 rounded-full font-bold">
                        {leads.filter(l => l.stage_id === stage.id).length}
                    </span>
                  </div>
                  <button 
                    onClick={() => { setFormName(''); setFormCompany(''); setFormEmail(''); setShowLeadModal(stage.id); }}
                    className="text-black/40 hover:text-black hover:bg-black/5 w-6 h-6 flex items-center justify-center rounded-md transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-3 px-1 custom-scrollbar pb-10">
                  {leads
                    .filter(l => l.stage_id === stage.id)
                    .sort((a, b) => a.sort_order - b.sort_order)
                    .map(lead => (
                      <motion.div
                        key={lead.id}
                        layoutId={lead.id}
                        draggable
                        onDragStart={(e: any) => onDragStart(e, lead.id)}
                        className="bg-white p-4 rounded-xl border border-black/5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-grab active:cursor-grabbing hover:border-black/20 transition-colors"
                      >
                        <p className="font-bold text-black text-[15px] mb-1">{lead.full_name}</p>
                        {lead.company && <p className="text-[11px] font-bold tracking-wide uppercase text-brand-tertiary mb-2">{lead.company}</p>}
                        {lead.email && <p className="text-xs font-medium text-black/50 truncate -mt-1">{lead.email}</p>}
                      </motion.div>
                  ))}
                  
                  {leads.filter(l => l.stage_id === stage.id).length === 0 && (
                    <div className="h-20 rounded-xl border-2 border-dashed border-black/10 flex items-center justify-center opacity-50 bg-transparent mb-2">
                       <p className="text-[11px] font-bold tracking-widest uppercase text-black/40">Drop Lead Here</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )
        )}
      </div>

      {/* Custom Styles */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.1); border-radius: 4px; }
      `}} />

      {/* --- MODALS --- */}
      <AnimatePresence>
        {/* Pipeline Modal */}
        {showPipelineModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                    <h2 className="text-xl font-bold mb-4">Create New Pipeline</h2>
                    <form onSubmit={createPipeline} className="flex flex-col gap-4">
                        <input autoFocus required type="text" placeholder="Pipeline Name (e.g. Sales, Recruiting)" value={formName} onChange={e => setFormName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-brand-tertiary" />
                        <div className="flex gap-2 justify-end mt-2">
                            <button type="button" onClick={() => setShowPipelineModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-black/60 hover:bg-black/5">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-black text-white hover:bg-brand-tertiary transition-colors">{isSubmitting ? 'Saving...' : 'Create'}</button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}

        {/* Stage Modal */}
        {showStageModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                    <h2 className="text-xl font-bold mb-4">Add Pipeline Stage</h2>
                    <form onSubmit={createStage} className="flex flex-col gap-4">
                        <input autoFocus required type="text" placeholder="Stage Name (e.g. In Progress, Won)" value={formName} onChange={e => setFormName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-brand-tertiary" />
                        <div className="flex gap-2 justify-end mt-2">
                            <button type="button" onClick={() => setShowStageModal(false)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-black/60 hover:bg-black/5">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-black text-white hover:bg-brand-tertiary transition-colors">{isSubmitting ? 'Saving...' : 'Create'}</button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}

        {/* Lead Modal */}
        {showLeadModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
                <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl">
                    <h2 className="text-xl font-bold mb-4">Add Manual Lead</h2>
                    <form onSubmit={createLead} className="flex flex-col gap-3">
                        <input autoFocus required type="text" placeholder="Full Name" value={formName} onChange={e => setFormName(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-brand-tertiary text-sm font-medium" />
                        <input type="email" placeholder="Email Address (Optional)" value={formEmail} onChange={e => setFormEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-brand-tertiary text-sm" />
                        <input type="tel" placeholder="Phone Number (Optional)" value={formPhone} onChange={e => setFormPhone(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-brand-tertiary text-sm" />
                        <input type="text" placeholder="Company Name (Optional)" value={formCompany} onChange={e => setFormCompany(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-black/10 focus:outline-none focus:border-brand-tertiary text-sm" />
                        <div className="flex gap-2 justify-end mt-4">
                            <button type="button" onClick={() => setShowLeadModal(null)} className="px-5 py-2.5 rounded-xl font-bold text-sm text-black/60 hover:bg-black/5">Cancel</button>
                            <button type="submit" disabled={isSubmitting} className="px-5 py-2.5 rounded-xl font-bold text-sm bg-black text-white hover:bg-brand-tertiary transition-colors">{isSubmitting ? 'Saving...' : 'Add Lead'}</button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )}
      </AnimatePresence>
    </div>
  );
}
