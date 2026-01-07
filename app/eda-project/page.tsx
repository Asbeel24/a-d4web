'use client';

import Link from 'next/link';

export default function EDAProject() {
  // 生成 001-039 的编号列表
  const projectNumbers = Array.from({ length: 39 }, (_, i) => {
    const num = i + 1;
    return num.toString().padStart(3, '0');
  });

  // 根据原网站的 URL 结构，这些链接指向 /001, /002 等
  // 但实际 URL 可能是 /eda-project/001 或 /001
  // 这里使用相对路径，可以根据实际情况调整
  const getProjectUrl = (num: string) => {
    // 根据原网站，这些链接可能指向不同的页面
    // 暂时使用占位符路径
    return `/eda-project/${num}`;
  };

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-12 md:mb-16 text-center tracking-tight">
          EDA PROJECT
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4">
          {projectNumbers.map((num) => (
            <Link
              key={num}
              href={getProjectUrl(num)}
              className="bg-gray-900/50 hover:bg-gray-900/70 backdrop-blur-sm text-white text-center py-4 px-6 rounded border border-gray-800/50 hover:border-gray-700 transition-all duration-200 hover:scale-105 active:scale-95 text-sm sm:text-base font-medium"
            >
              {num}
            </Link>
          ))}
        </div>

        {/* 说明文字 */}
        <div className="mt-16 text-center text-gray-400">
          <p className="text-sm">
            点击编号查看对应的 EDA PROJECT 作品
          </p>
        </div>
      </div>
    </div>
  );
}

