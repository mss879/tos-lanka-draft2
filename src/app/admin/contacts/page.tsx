"use client";

import React, { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { motion } from 'framer-motion';

type ArchivedLead = {
  id: string;
  full_name: string;
  email: string | null;
  company: string | null;
  status: string;
  created_at: string;
};

export default function ContactsArchivePage() {
  const supabase = createClient();
  const [contacts, setContacts] = useState<ArchivedLead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('contacts_archive')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (data) setContacts(data);
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-6 w-full min-h-[calc(100vh-4rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Contacts Archive</h1>
        <p className="text-black/60">A permanent, read-only history of all leads gracefully synced from the CRM.</p>
      </div>

      <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden mt-4">
        {loading ? (
          <div className="p-8 text-black/50 text-center font-medium">Loading archive...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#f8fafc] border-b border-black/5 uppercase text-xs font-bold text-black/50 tracking-wider">
                <tr>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Company</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Date Started</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {contacts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-black/40">No archived contacts found.</td>
                  </tr>
                ) : (
                  contacts.map(contact => (
                    <motion.tr 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      key={contact.id} 
                      className="hover:bg-black/[0.02] transition-colors"
                    >
                      <td className="px-6 py-4 font-semibold text-black">{contact.full_name}</td>
                      <td className="px-6 py-4 text-black/70">{contact.email || '-'}</td>
                      <td className="px-6 py-4 text-black/70">{contact.company || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${contact.status === 'active' ? 'bg-green-50 text-green-700 border-green-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                          {contact.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-black/50">
                        {new Date(contact.created_at).toLocaleDateString()}
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
