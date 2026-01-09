'use client';

import { use } from 'react';
import edaProjects from '@/data/eda-projects.json';

export default function EDAProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  
  // 将 "001" 转换为 1
  const projectNumber = parseInt(id, 10);
  
  // 查找对应项目
  const project = edaProjects.find((p: { 序号: number }) => p.序号 === projectNumber);
  
  if (!project) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">项目未找到</h1>
          <p className="text-gray-400">项目编号 {id} 不存在</p>
          <a 
            href="/eda-project" 
            className="mt-6 inline-block px-6 py-3 bg-white text-black rounded hover:bg-gray-200 transition-colors"
          >
            返回项目列表
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <iframe
      srcDoc={project.代码}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        border: 'none',
        zIndex: 9999,
      }}
      title={`EDA Project ${id}`}
      allow="fullscreen"
    />
  );
}




