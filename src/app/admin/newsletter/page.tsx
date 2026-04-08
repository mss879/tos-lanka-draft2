"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

type Subscription = {
  id: string;
  email: string;
  topic_interest: string | null;
  source: string | null;
  subscribed_at: string;
};

export default function NewsletterSubsPage() {
  const supabase = createClient();
  const [subs, setSubs] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSubs();
  }, []);

  const fetchSubs = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('email_subscriptions')
      .select('*')
      .order('subscribed_at', { ascending: false });
      
    if (data) setSubs(data);
    setLoading(false);
  };

  const copyEmails = () => {
    const csv = subs.map(s => s.email).join(', ');
    navigator.clipboard.writeText(csv);
    alert('Emails copied to clipboard!');
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-[calc(100vh-4rem)]">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Newsletter Subscriptions</h1>
          <p className="text-black/60">A directory of visitors opting-in for ongoing communications.</p>
        </div>
        <button 
           onClick={copyEmails}
           className="bg-black hover:bg-brand-tertiary text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
        >
           Copy All Emails
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden mt-4">
        {loading ? (
          <div className="p-8 text-black/50 text-center font-medium">Loading subscriptions...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8fafc] border-b border-black/5 uppercase text-xs font-bold text-black/50 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Email Address</th>
                  <th className="px-6 py-4">Topic Interest</th>
                  <th className="px-6 py-4">Origination Source</th>
                  <th className="px-6 py-4 text-right">Date Subscribed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {subs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-black/40">Nobody has subscribed yet.</td>
                  </tr>
                ) : (
                  subs.map(sub => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={sub.id} 
                      className="hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-black">{sub.email}</td>
                      <td className="px-6 py-4 text-brand-tertiary font-medium">
                        {sub.topic_interest || 'General'}
                      </td>
                      <td className="px-6 py-4 text-black/60">
                        {sub.source ? <span className="bg-black/5 px-2 py-1 rounded text-xs">{sub.source}</span> : '-'}
                      </td>
                      <td className="px-6 py-4 text-right text-black/50">
                        {new Date(sub.subscribed_at).toLocaleDateString()}
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
