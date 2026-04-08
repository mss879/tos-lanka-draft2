import React from 'react';
import KanbanBoard from '@/components/admin/KanbanBoard';

export const metadata = {
  title: 'CRM Board | Admin',
};

export default function CRMDashboardPage() {
  return (
    <div className="flex flex-col gap-6 w-full h-[calc(100vh-4rem)]">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-black mb-2">Deal Pipeline</h1>
        <p className="text-black/60">Drag and drop leads to progress them through the CRM stages.</p>
      </div>

      <div className="flex-1 mt-4">
        <KanbanBoard />
      </div>
    </div>
  );
}
