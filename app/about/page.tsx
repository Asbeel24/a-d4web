import VideoPlayer from '@/components/VideoPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import ImageGallery from '@/components/ImageGallery';

export default function About() {
  // 音乐作品数据（与 WORK 页面类似）
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
    <div className="container mx-auto px-4 py-8 space-y-16">
      {/* WORKS 部分 */}
      <section>
        <div className="mb-8">
          <VideoPlayer
            src="/media/videos/nanoparticles.mp4"
            className="w-full h-96 mb-8"
            autoPlay
            loop
            muted
            showMuteButton
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">WORKS</h1>
          <p className="text-gray-300 text-lg">
            Electronic music, Beats, Audio visual And Performance
          </p>
        </div>

        {/* 音乐作品列表 */}
        <div className="space-y-4 mb-12">
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
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Singles</h2>
            <div className="bg-gray-900 h-64 flex items-center justify-center">
              <p className="text-gray-400">Singles 图片占位符</p>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">EP</h2>
            <div className="bg-gray-900 h-64 flex items-center justify-center">
              <p className="text-gray-400">EP 图片占位符</p>
            </div>
          </div>
        </div>

        {/* Spotify 嵌入 */}
        <div className="mb-12">
          <SpotifyEmbed />
        </div>

        {/* 其他曲目 */}
        <div className="space-y-4">
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
      <section>
        <VideoPlayer
          src="/media/videos/untitled.mov"
          className="w-full h-96 mb-8"
          autoPlay
          loop
          muted
          showMuteButton
        />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          HIPHOP/BEATS/MIXING/MASTERING WORK SELECTED
        </h2>
        <div className="space-y-4">
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
      <section>
        <VideoPlayer
          src="/media/videos/white-scratch.mp4"
          className="w-full h-96 mb-8"
          autoPlay
          loop
          muted
          showMuteButton
        />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Audio visual</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div className="cursor-pointer">
            <VideoPlayer
              src="/media/videos/8789_raw.mp4"
              className="w-full h-64"
              autoPlay={false}
              loop
              muted
              showMuteButton
            />
          </div>
          <div className="cursor-pointer">
            <VideoPlayer
              src="/media/videos/untitled.mov"
              className="w-full h-64"
              autoPlay={false}
              loop
              muted
              showMuteButton
            />
          </div>
        </div>
        <div className="space-y-4 mb-8">
          <h3 className="text-2xl font-bold text-white">Fuckers in London(Feat Vercent)</h3>
          <h3 className="text-2xl font-bold text-white">808Day</h3>
        </div>
      </section>

      {/* Interlinked */}
      <section>
        <VideoPlayer
          src="/media/videos/white-scratch.mp4"
          className="w-full h-96 mb-8"
          autoPlay
          loop
          muted
          showMuteButton
        />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Interlinked</h2>
        <div className="cursor-pointer">
          <VideoPlayer
            src="/media/videos/interlinked.mp4"
            className="w-full h-96"
            autoPlay={false}
            loop
            muted
            showMuteButton
          />
        </div>
      </section>

      {/* DJ and Live Performance */}
      <section>
        <VideoPlayer
          src="/media/videos/white-scratch.mp4"
          className="w-full h-96 mb-8"
          autoPlay
          loop
          muted
          showMuteButton
        />
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
          DJ and Live Performace
        </h2>
        <ImageGallery images={galleryImages} className="mb-8" />
        <div className="cursor-pointer">
          <VideoPlayer
            src="/media/videos/performance.mp4"
            className="w-full h-96"
            autoPlay={false}
            loop
            muted
            showMuteButton
          />
        </div>
      </section>
    </div>
  );
}


