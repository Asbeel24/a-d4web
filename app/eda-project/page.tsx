'use client';

import Link from 'next/link';
import edaProjects from '@/data/eda-projects.json';

type EdaProject = {
  序号: number;
};

export default function EDAProjectList() {
  const projects = edaProjects as EdaProject[];

  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-3 sm:gap-4 md:gap-5">
          {projects.map((project) => (
            <Link
              key={project.序号}
              href={`/eda-project/${project.序号}`}
              className="flex items-center justify-center text-sm sm:text-base md:text-lg font-mono text-white hover:text-gray-300 transition-colors duration-200 active:scale-95"
            >
              {project.序号}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}