'use client';

import SocialLinks from '@/components/SocialLinks';
import SafeImage from '@/components/SafeImage';

export default function About() {

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        {/* About 部分 */}
        <section className="mb-20 md:mb-24">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
            {/* 左侧：文字内容 */}
            <div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight">
                About
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                ASBEEL/D4nn9
              </h2>
              <p className="text-gray-300 text-lg md:text-xl mb-8 leading-relaxed">
                Electronic music producer, Beatmaker, DJ digital artist based in London/Shenzhen. I do Bass/Leftfield/Trap/Drill music. Exploring AIGC with art right now.
              </p>
              
              {/* 社交链接 */}
              <div className="flex gap-4">
                <SocialLinks />
              </div>
            </div>

            {/* 右侧：图片 */}
            <div className="relative">
              <div className="bg-gray-900/50 backdrop-blur-sm h-96 md:h-[500px] rounded border border-gray-800/50 relative overflow-hidden">
                <SafeImage
                  src="/media/images/微信图片_20250905014503_8_161.jpg"
                  alt="ASBEEL/D4nn9"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
