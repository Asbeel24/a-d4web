'use client';

import Link from 'next/link';
import SocialLinks from '@/components/SocialLinks';

export default function EDAProject() {
  // 生成 001-039 的编号列表，分成三行
  const row1 = Array.from({ length: 13 }, (_, i) => (i + 1).toString().padStart(3, '0')); // 001-013
  const row2 = Array.from({ length: 13 }, (_, i) => (i + 14).toString().padStart(3, '0')); // 014-026
  const row3 = Array.from({ length: 13 }, (_, i) => (i + 27).toString().padStart(3, '0')); // 027-039

  const getProjectUrl = (num: string) => {
    return `/eda-project/${num}`;
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* 三行数字布局 */}
      <div className="flex flex-col gap-8 md:gap-12 items-center">
        {/* 第一行：001-013 */}
        <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
          {row1.map((num) => (
            <Link
              key={num}
              href={getProjectUrl(num)}
              className="text-white text-lg md:text-xl font-light hover:text-gray-300 transition-colors duration-200"
            >
              {num}
            </Link>
          ))}
        </div>

        {/* 第二行：014-026 */}
        <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
          {row2.map((num) => (
            <Link
              key={num}
              href={getProjectUrl(num)}
              className="text-white text-lg md:text-xl font-light hover:text-gray-300 transition-colors duration-200"
            >
              {num}
            </Link>
          ))}
        </div>

        {/* 第三行：027-039 */}
        <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
          {row3.map((num) => (
            <Link
              key={num}
              href={getProjectUrl(num)}
              className="text-white text-lg md:text-xl font-light hover:text-gray-300 transition-colors duration-200"
            >
              {num}
            </Link>
          ))}
        </div>
      </div>

      {/* 右下角社交链接 - 垂直堆叠 */}
      <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8">
        <SocialLinks vertical={true} />
      </div>
    </div>
  );
}

