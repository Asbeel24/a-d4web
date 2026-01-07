'use client';

import VideoPlayer from '@/components/VideoPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import ImageGallery from '@/components/ImageGallery';

export default function Work() {
  // 音乐作品数据
  const works = [
    { title: '惡之花', artist: 'Asbeel', src: '/media/audio/works1.mp3', duration: '03:24' },
    { title: 'PSPT2(ASBEEL Remix)', artist: 'ASBEEL', src: '/media/audio/works2.mp3', duration: '03:05' },
  ];

  const hiphopBeats = [
    { title: 'Future Beat', artist: 'D4NN9', src: '/media/audio/hiphop1.mp3', duration: '03:12' },
    { title: 'Assignment Beat', artist: 'D4nn9', src: '/media/audio/hiphop2.mp3', duration: '02:40' },
    { title: '小动物接管时间', artist: 'D4NN9', src: '/media/audio/hiphop3.mp3', duration: '02:16' },
    { title: 'Fuckers in London', artist: 'D4nn9', src: '/media/audio/hiphop4.mp3', duration: '03:33' },
    { title: '猪猪侠Drill (feat. Young Navi)', artist: 'Vercent,羊那维 , D4nn9', src: '/media/audio/hiphop5.mp3', duration: '02:41' },
    { title: 'Fm boombap 90', artist: 'D4NN9', src: '/media/audio/hiphop6.mp3', duration: '03:33' },
    { title: '80 Em PG trap', artist: 'D4NN9', src: '/media/audio/hiphop7.mp3', duration: '03:03' },
    { title: 'G#m 94 drake', artist: 'D4nn9', src: '/media/audio/hiphop8.mp3', duration: '02:47' },
    { title: 'Bm trap 150', artist: 'D4NN9', src: '/media/audio/hiphop9.mp3', duration: '02:53' },
    { title: 'Dm 143 Drill V2', artist: 'D4NN9', src: '/media/audio/hiphop10.mp3', duration: '02:41' },
    { title: 'Dm 90 Boombap', artist: 'D4NN9', src: '/media/audio/hiphop11.mp3', duration: '03:55' },
    { title: 'G#m trap 90', artist: 'D4NN9', src: '/media/audio/hiphop12.mp3', duration: '03:01' },
  ];

  const otherTracks = [
    { title: 'Asbeel,PHONO RECORDS - Gr7', artist: 'Artist Name', src: '/media/audio/other1.mp3', duration: '04:25' },
  ];

  // 图片画廊数据（占位符）
  const galleryImages = [
    '/media/images/gallery1.jpg',
    '/media/images/gallery2.jpg',
    '/media/images/gallery3.jpg',
    '/media/images/gallery4.jpg',
    '/media/images/gallery5.jpg',
    '/media/images/gallery6.jpg',
    '/media/images/gallery7.jpg',
  ];

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 space-y-20 md:space-y-24">
        {/* WORKS 部分 */}
        <section className="relative">
          <div className="mb-12">
            <VideoPlayer
              src="/media/videos/nanoparticles.mp4"
              className="w-full h-96 mb-10"
              autoPlay
              loop
              muted
              showMuteButton
            />
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              WORKS
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light">
              Electronic music, Beats, Audio visual And Performance
            </p>
          </div>

          {/* 音乐作品列表 */}
          <div className="space-y-3 mb-16">
            {works.map((work, index) => (
              <AudioPlayer
                key={index}
                src={work.src}
                title={work.title}
                artist={work.artist}
              />
            ))}
          </div>

          {/* Singles 和 EP */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Singles</h2>
              <div className="bg-gray-900/50 backdrop-blur-sm h-80 rounded border border-gray-800/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 left-4 w-32 h-32 border border-white/20 transform rotate-45" />
                  <div className="absolute bottom-4 right-4 w-24 h-24 border border-white/10 transform -rotate-45" />
                </div>
                <p className="text-gray-400 text-sm">Singles 图片占位符</p>
              </div>
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">EP</h2>
              <div className="bg-gray-900/50 backdrop-blur-sm h-80 rounded border border-gray-800/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-4 right-4 w-32 h-32 border border-white/20 transform -rotate-45" />
                  <div className="absolute bottom-4 left-4 w-24 h-24 border border-white/10 transform rotate-45" />
                </div>
                <p className="text-gray-400 text-sm">EP 图片占位符</p>
              </div>
            </div>
          </div>

          {/* Spotify 嵌入 */}
          <div className="mb-16">
            <SpotifyEmbed />
          </div>

          {/* 其他曲目 */}
          <div className="space-y-3">
            {otherTracks.map((track, index) => (
              <AudioPlayer
                key={index}
                src={track.src}
                title={track.title}
                artist={track.artist}
              />
            ))}
          </div>
        </section>

        {/* HIPHOP/BEATS/MIXING/MASTERING WORK SELECTED */}
        <section className="relative">
          <VideoPlayer
            src="/media/videos/untitled.mov"
            className="w-full h-96 mb-10"
            autoPlay
            loop
            muted
            showMuteButton
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            HIPHOP/BEATS/MIXING/MASTERING WORK SELECTED
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {hiphopBeats.map((beat, index) => (
              <AudioPlayer
                key={index}
                src={beat.src}
                title={beat.title}
                artist={beat.artist}
              />
            ))}
          </div>
        </section>

        {/* Audio visual */}
        <section className="relative">
          <VideoPlayer
            src="/media/videos/white-scratch.mp4"
            className="w-full h-96 mb-10"
            autoPlay
            loop
            muted
            showMuteButton
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Audio visual</h2>
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-8">
            <div className="cursor-pointer group">
              <VideoPlayer
                src="/media/videos/8789_raw.mp4"
                className="w-full h-64 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
                autoPlay={false}
                loop
                muted
                showMuteButton
              />
            </div>
            <div className="cursor-pointer group">
              <VideoPlayer
                src="/media/videos/untitled.mov"
                className="w-full h-64 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
                autoPlay={false}
                loop
                muted
                showMuteButton
              />
            </div>
          </div>
          <div className="space-y-3 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-white">Fuckers in London(Feat Vercent)</h3>
            <h3 className="text-xl md:text-2xl font-bold text-white">808Day</h3>
          </div>
        </section>

        {/* Interlinked */}
        <section className="relative">
          <VideoPlayer
            src="/media/videos/white-scratch.mp4"
            className="w-full h-96 mb-10"
            autoPlay
            loop
            muted
            showMuteButton
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Interlinked</h2>
          <div className="cursor-pointer group">
            <VideoPlayer
              src="/media/videos/interlinked.mp4"
              className="w-full h-96 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
              autoPlay={false}
              loop
              muted
              showMuteButton
            />
          </div>
        </section>

        {/* DJ and Live Performance */}
        <section className="relative">
          <VideoPlayer
            src="/media/videos/white-scratch.mp4"
            className="w-full h-96 mb-10"
            autoPlay
            loop
            muted
            showMuteButton
          />
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            DJ and Live Performace
          </h2>
          <ImageGallery images={galleryImages} className="mb-8" />
          <div className="cursor-pointer group">
            <VideoPlayer
              src="/media/videos/performance.mp4"
              className="w-full h-96 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
              autoPlay={false}
              loop
              muted
              showMuteButton
            />
          </div>
        </section>
      </div>
    </div>
  );
}
