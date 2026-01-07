import VideoPlayer from '@/components/VideoPlayer';
import SocialLinks from '@/components/SocialLinks';
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
      </div>

      {/* 内容层 */}
      <div className="relative z-10 text-center px-4 py-20 md:py-32">
        {/* 标题 */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-8 md:mb-12 drop-shadow-2xl">
          ASBEEL/D4nn9
        </h1>

        {/* 社交链接 */}
        <div className="flex justify-center mb-6 md:mb-8">
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
            <img
              src="/media/images/note.png"
              alt="Note"
              className="h-10 sm:h-12 md:h-14 w-auto mx-auto opacity-80 hover:opacity-100 transition-opacity"
              onError={(e) => {
                // 如果图片不存在，显示占位符
                e.currentTarget.style.display = 'none';
              }}
            />
          </Link>
        </div>

        {/* 描述文字 */}
        <p className="text-white text-base sm:text-lg md:text-xl lg:text-2xl mb-8 drop-shadow-lg">
          Digital Artist, Music producer, DJ, based in London
        </p>
      </div>
    </div>
  );
}
