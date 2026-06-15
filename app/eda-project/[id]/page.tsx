'use client';

import { use } from 'react';
import Link from 'next/link';
import edaProjects from '@/data/eda-projects.json';

type EdaProject = {
  序号: number;
};

export default function EDAProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const projectNumber = parseInt(id, 10);
  const project = (edaProjects as EdaProject[]).find((p) => p.序号 === projectNumber);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#000', color: '#fff' }}>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">Project {id} does not exist</p>
          <Link href="/eda-project" className="px-6 py-3 border border-white/20 text-xs tracking-widest uppercase hover:bg-white/10">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative" style={{ background: '#000' }}>
      {/* Minimal Header */}
      <div className="fixed top-0 left-0 right-0 z-50 px-8 py-6 flex items-center justify-between" style={{ background: '#000' }}>
        <Link
          href="/eda-project"
          className="text-xs tracking-widest uppercase hover:text-white transition-colors"
          style={{ color: '#555' }}
        >
          ← EDA Projects
        </Link>
        <span className="text-xs tracking-widest" style={{ color: '#555' }}>
          {projectNumber}
        </span>
      </div>

      {/* Full-screen iframe */}
      <iframe
        src={`/api/eda-projects/${id}`}
        style={{
          position: 'fixed',
          top: '60px',
          left: 0,
          width: '100vw',
          height: 'calc(100vh - 60px)',
          border: 'none',
        }}
        title={`EDA Project ${id}`}
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
      />
    </div>
  );
}