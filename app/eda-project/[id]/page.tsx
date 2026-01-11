'use client';

import { use, useEffect, useState } from 'react';
import edaProjects from '@/data/eda-projects.json';

export default function EDAProjectDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [iframeSrc, setIframeSrc] = useState<string>('');
  
  // 将 "001" 转换为 1
  const projectNumber = parseInt(id, 10);
  
  // 查找对应项目
  const project = edaProjects.find((p: { 序号: number }) => p.序号 === projectNumber);
  
  useEffect(() => {
    if (project) {
      // 创建 Blob URL 代替 srcdoc，避免移动端大小限制
      const blob = new Blob([project.代码], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      setIframeSrc(url);
      
      // 清理函数：撤销 Blob URL 释放内存
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [project]);
  
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
  
  // 如果 Blob URL 还未创建，显示加载状态
  if (!iframeSrc) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <p className="text-xl">加载中...</p>
        </div>
      </div>
    );
  }
  
  return (
    <iframe
      src={iframeSrc}
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
      sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals"
    />
  );
}






