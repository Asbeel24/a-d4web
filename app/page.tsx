'use client';

import VideoPlayer from '@/components/VideoPlayer';
import SocialLinks from '@/components/SocialLinks';
import SafeImage from '@/components/SafeImage';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 全屏视频背景 */}
      <div className="absolute inset-0 z-0">
        <VideoPlayer
          src="/media/videos/8789_raw.mp4"
          className="w-full h-full"
          autoPlay
          loop
          muted
          showMuteButton
        />
        {/* 视频遮罩层，增强文字可读性 */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* 内容层 */}
      <div className="relative z-10 text-center px-4 py-20 md:py-32">
        {/* 标题 */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-8 md:mb-12 drop-shadow-2xl tracking-tight">
          ASBEEL/D4nn9
        </h1>

        {/* 社交链接 - 右上角 */}
        <div className="absolute top-6 right-6 md:top-8 md:right-8">
          <SocialLinks />
        </div>

        {/* Note 链接 */}
        <div className="mb-6 md:mb-8">
          <Link
            href="http://163cn.tv/3jSBg4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block transition-transform hover:scale-105"
          >
            <SafeImage
              src="/media/images/note.png"
              alt="Note"
              className="h-10 sm:h-12 md:h-14 w-auto mx-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>

        {/* 描述文字 */}
        <p className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 drop-shadow-lg font-light tracking-wide">
          Digital Artist, Music producer, DJ, based in London
        </p>
      </div>
    </div>
  );
}
