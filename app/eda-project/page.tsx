'use client';

import Link from 'next/link';
import edaProjects from '@/data/eda-projects.json';

type EdaProject = {
  序号: number;
};

export default function EDAProjectList() {
  const projects = edaProjects as EdaProject[];

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">EDA Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.序号}
              href={`/eda-project/${project.序号}`}
              className="block p-6 border border-white/20 rounded-lg hover:border-white/50 transition-colors"
            >
              <div className="text-xl font-semibold">Project {project.序号}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}