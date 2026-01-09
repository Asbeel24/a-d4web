'use client';

import VideoPlayer from '@/components/VideoPlayer';
import AudioPlayer from '@/components/AudioPlayer';
import SpotifyEmbed from '@/components/SpotifyEmbed';
import ImageGallery from '@/components/ImageGallery';

export default function Work() {
  // Singles 数据
  const singles = [
    { title: '惡之花', artist: 'Asbeel', src: '/media/audio/惡之花-1-1 (1).mp3', duration: '03:24', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'PSPT2(ASBEEL Remix)', artist: 'ASBEEL', src: '/media/audio/PSPT2+104+D# (1).mp3', duration: '03:05', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'Asbeel,PHONO RECORDS - Gr7', artist: 'Artist Name', src: '/media/audio/Asbeel,PHONO RECORDS - Gr7 (1).mp3', duration: '04:25', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
  ];

  const hiphopBeats = [
    { title: 'Future Beat', artist: 'D4NN9', src: '/media/audio/Nxsty(1) (1).mp3', duration: '03:12', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'Assignment Beat', artist: 'D4nn9', src: '/media/audio/Assignment1 Composition (1).wav', duration: '02:40', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: '小动物接管时间', artist: 'D4NN9', src: '/media/audio/小动物接管时间MMM.mp3', duration: '02:16', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'Fuckers in London', artist: 'D4nn9', src: '/media/audio/superverMMM1(1) (1).mp3', duration: '03:33', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: '猪猪侠Drill (feat. Young Navi)', artist: 'Vercent,羊那维 , D4nn9', src: '/media/audio/Vercent,羊那维 - 猪猪侠Drill (feat. Young Navi) (1).mp3', duration: '02:41', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'Fm boombap 90', artist: 'D4NN9', src: '/media/audio/Fm PG boombap 90.mp3', duration: '03:33', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: '80 Em PG trap', artist: 'D4NN9', src: '/media/audio/80 Em PG trap.mp3', duration: '03:03', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'G#m 94 drake', artist: 'D4nn9', src: '/media/audio/G#m 94 drake.mp3', duration: '02:47', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'Bm trap 150', artist: 'D4NN9', src: '/media/audio/Bm+trap+150 (1).mp3', duration: '02:53', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'Dm 143 Drill V2', artist: 'D4NN9', src: '/media/audio/Dm 143 Drill V2.mp3', duration: '02:41', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'Dm 90 Boombap', artist: 'D4NN9', src: '/media/audio/Dm+90+Boombap+Toxic (1).mp3', duration: '03:55', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
    { title: 'G#m trap 90', artist: 'D4NN9', src: '/media/audio/G#m+trap+90 (1).mp3', duration: '03:01', thumbnail: '/media/images/3958a04633ccf592b9432ff6d46a110.png' },
  ];


  // 图片画廊数据
  const galleryImages = [
    '/media/images/9d13a4d92081cba7c7a191d4ca53de3.jpg',
    '/media/images/f828c3a57ae0349f1d097625dff305a.jpg',
    '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=988107185680072775&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg',
    '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=1415363875248513545&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg',
    '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=2162562965602022034&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg',
    '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=2509707839106292979&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg',
    '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=2571810274683716859&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg',
  ];

  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 space-y-20 md:space-y-24">
        {/* WORKS 部分 */}
        <section className="relative">
          <div className="mb-12">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-4 tracking-tight">
              WORKS
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl md:text-2xl font-light">
              Electronic music, Beats, Audio Visual, Performance, and Visual
            </p>
          </div>

          {/* Singles 和 EP */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-16">
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Singles</h2>
              <div className="space-y-3">
                {singles.map((single, index) => (
                  <AudioPlayer
                    key={index}
                    src={single.src}
                    title={single.title}
                    artist={single.artist}
                    thumbnail={single.thumbnail}
                  />
                ))}
              </div>
            </div>
            <div className="relative">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">EP</h2>
            </div>
          </div>

          {/* Spotify 嵌入 */}
          <div className="mb-16">
            <SpotifyEmbed />
          </div>
        </section>

        {/* HIPHOP/BEATS/MIXING/MASTERING WORK SELECTED */}
        <section className="relative">
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
                thumbnail={beat.thumbnail}
              />
            ))}
          </div>
        </section>

        {/* Audio visual */}
        <section className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Audio visual</h2>
          <div className="space-y-8 mb-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Fuckers in London(Feat Vercent)</h3>
              <div className="cursor-pointer group">
                <VideoPlayer
                  src="/media/videos/8789_raw (1).mp4"
                  className="w-full h-64 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
                  autoPlay={false}
                  loop
                  muted
                  showMuteButton
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">808Day</h3>
              <div className="cursor-pointer group">
                <VideoPlayer
                  src="/media/videos/untitled (1).mov"
                  className="w-full h-64 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
                  autoPlay={false}
                  loop
                  muted
                  showMuteButton
                />
              </div>
            </div>
          </div>
        </section>

        {/* Interlinked */}
        <section className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Interlinked</h2>
          <div className="cursor-pointer group">
            <VideoPlayer
              src="/media/videos/4d9fdb1f75daa02546b0b0a3bbac0c5c.mp4"
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">
            DJ and Live Performace
          </h2>
          <ImageGallery images={galleryImages} className="mb-8" />
          <div className="cursor-pointer group">
            <VideoPlayer
              src="/media/videos/466438138 (1).mp4"
              className="w-full h-96 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
              autoPlay={false}
              loop
              muted
              showMuteButton
            />
          </div>
        </section>

        {/* Visual */}
        <section className="relative">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight">Visual</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Dissolve</h3>
              <div className="cursor-pointer group">
                <VideoPlayer
                  src="/media/videos/Dissolve.mp4"
                  className="w-full h-96 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
                  autoPlay={false}
                  loop
                  muted={false}
                  showMuteButton
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Jereimah's Party</h3>
              <div className="cursor-pointer group">
                <VideoPlayer
                  src="/media/videos/JereimahsParty.mp4"
                  className="w-full h-96 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
                  autoPlay={false}
                  loop
                  muted={false}
                  showMuteButton
                />
              </div>
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-white mb-4">2:53Shanghai Freestyle</h3>
              <div className="cursor-pointer group">
                <VideoPlayer
                  src="/media/videos/0253Shanghai Freestyle.mp4"
                  className="w-full h-96 rounded border border-gray-800/50 group-hover:border-gray-700 transition-colors"
                  autoPlay={false}
                  loop
                  muted={false}
                  showMuteButton
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
