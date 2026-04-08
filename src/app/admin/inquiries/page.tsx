"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

type Inquiry = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  message: string | null;
  source: string | null;
  created_at: string;
};

export default function InquiriesPage() {
  const supabase = createClient();
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  
  const [mainPipelineId, setMainPipelineId] = useState<string | null>(null);
  const [newLeadsStageId, setNewLeadsStageId] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg('');
    try {
        // 1. Get unconverted inquiries
        const { data: inqData } = await supabase
            .from('contact_inquiries')
            .select('*')
            .eq('converted_to_lead', false)
            .order('created_at', { ascending: false });
            
        if (inqData) setInquiries(inqData);

        // 2. Identify Main Pipeline
        const { data: pData } = await supabase
            .from('pipelines')
            .select('id')
            .eq('is_default', true)
            .single();

        if (pData) {
            setMainPipelineId(pData.id);
            // 3. Get first stage ('New Leads') of the main pipeline
            const { data: sData } = await supabase
                .from('stages')
                .select('id')
                .eq('pipeline_id', pData.id)
                .order('sort_order', { ascending: true })
                .limit(1)
                .single();
                
            if (sData) setNewLeadsStageId(sData.id);
        }
    } catch (err) {
        console.error(err);
    }
    setLoading(false);
  };

  const promoteToCRM = async (inquiryId: string) => {
      if (!mainPipelineId || !newLeadsStageId) {
          setErrorMsg('Missing Main Pipeline configuration. Ensure you have run migration 0006.');
          return;
      }

      setInquiries(prev => prev.filter(i => i.id !== inquiryId));

      const { error } = await supabase.rpc('promote_inquiry_to_lead', {
          p_inquiry_id: inquiryId,
          p_pipeline_id: mainPipelineId,
          p_stage_id: newLeadsStageId
      });

      if (error) {
          console.error(error);
          setErrorMsg('Failed to promote inquiry. ' + error.message);
          fetchData(); // Reset optimistic update
      }
  };

  const dismissInquiry = async (inquiryId: string) => {
      if (!window.confirm("Are you sure you want to permanently dismiss this inquiry? It will not be sent to the CRM.")) return;
      
      setInquiries(prev => prev.filter(i => i.id !== inquiryId));
      
      const { error } = await supabase.from('contact_inquiries').update({ converted_to_lead: true }).eq('id', inquiryId);
      
      if (error) {
          setErrorMsg('Failed to dismiss.');
          fetchData();
      }
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Form Inquiries</h1>
        <p className="text-black/60">Triage incoming website leads before they enter your sales pipeline.</p>
      </div>

      {errorMsg && (
          <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl border border-red-100 text-sm font-semibold">
              {errorMsg}
          </div>
      )}

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden mt-4">
        {loading ? (
          <div className="p-8 text-black/50 text-center font-medium">Loading inquiries...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8fafc] border-b border-black/5 uppercase text-xs font-bold text-black/50 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Lead Information</th>
                  <th className="px-6 py-4">Message / Notes</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {inquiries.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-black/40">
                        <p className="font-semibold text-lg mb-1">Inbox Zero</p>
                        <p className="text-sm">There are no pending form submissions.</p>
                    </td>
                  </tr>
                ) : (
                  inquiries.map(inq => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={inq.id} 
                      className="hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="px-6 py-5 align-top">
                          <p className="font-bold text-black text-base">{inq.full_name}</p>
                          {inq.company && <p className="text-brand-tertiary font-bold text-xs uppercase tracking-wider mt-1">{inq.company}</p>}
                          <div className="flex flex-col gap-0.5 mt-2 text-black/60 text-xs">
                              {inq.email && <span>{inq.email}</span>}
                              {inq.phone && <span>{inq.phone}</span>}
                          </div>
                      </td>
                      <td className="px-6 py-5 align-top max-w-[400px]">
                        <p className="text-black/80 line-clamp-3">{inq.message || <span className="italic opacity-50">No message provided</span>}</p>
                        {inq.source && <span className="inline-block mt-3 bg-black/5 text-black/50 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">{inq.source}</span>}
                      </td>
                      <td className="px-6 py-5 align-top whitespace-nowrap text-black/50">
                        {new Date(inq.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 align-top text-right">
                          <div className="flex flex-col gap-2 items-end">
                              <button 
                                onClick={() => promoteToCRM(inq.id)}
                                className="bg-black text-white hover:bg-brand-tertiary px-4 py-2 rounded-lg font-semibold text-xs transition-colors whitespace-nowrap"
                              >
                                  Move to CRM
                              </button>
                              <button 
                                onClick={() => dismissInquiry(inq.id)}
                                className="text-black/40 hover:text-red-500 hover:bg-red-50 px-4 py-2 rounded-lg font-semibold text-xs transition-colors"
                              >
                                  Dismiss
                              </button>
                          </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
