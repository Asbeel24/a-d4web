'use client';

import { useState, useRef } from 'react';
import musicTracks from '@/data/music-tracks.json';

type Track = {
  id: number;
  title: string;
  artist: string;
  src: string;
  category?: string;
};

const djMedia = [
  { id: 1, title: 'Live Performance', type: 'video', src: '/media/videos/466438138 (1).mp4' },
  { id: 2, title: 'DJ Photo 1', type: 'image', src: '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=1415363875248513545&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg' },
  { id: 3, title: 'DJ Photo 2', type: 'image', src: '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=2162562965602022034&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg' },
  { id: 4, title: 'DJ Photo 3', type: 'image', src: '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=2509707839106292979&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg' },
  { id: 5, title: 'DJ Photo 4', type: 'image', src: '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=2571810274683716859&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg' },
  { id: 6, title: 'DJ Photo 5', type: 'image', src: '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=5199323152508525620&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg' },
  { id: 7, title: 'DJ Photo 6', type: 'image', src: '/media/images/_cgi-bin_mmwebwx-bin_webwxgetmsgimg__&MsgID=988107185680072775&skey=_crypt_3dc6b6cf_0059bc9f94524c48c574c5908037b052&mmweb_appid=wx_webfilehelper.jpg' },
  { id: 8, title: 'Club Event', type: 'image', src: '/media/images/f828c3a57ae0349f1d097625dff305a.jpg' },
];

export default function Sound() {
  const tracks = musicTracks as Track[];
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const playTrack = (track: Track) => {
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audioRef.current?.pause();
        setIsPlaying(false);
      } else {
        audioRef.current?.play();
        setIsPlaying(true);
      }
    } else {
      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) setDuration(audioRef.current.duration);
  };

  const handleEnded = () => setIsPlaying(false);

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    return `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, '0')}`;
  };

  const singles = tracks.filter(t => t.category === 'singles');
  const beats = tracks.filter(t => t.category === 'beats');

  const hoverEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = '#fff';
  };

  const hoverLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
  };

  const btnHoverEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.color = '#fff';
  };

  const btnHoverLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    const trackId = Number(e.currentTarget.textContent);
    e.currentTarget.style.color = currentTrack?.id === trackId ? '#fff' : 'rgba(255,255,255,0.5)';
  };

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', padding: '0 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
              Sound
            </p>
            <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1, marginBottom: '12px' }}>
              MUSIC
            </h1>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
              {tracks.length} tracks
            </p>
          </div>

          <div>
            {currentTrack ? (
              <div>
                <audio ref={audioRef} src={currentTrack.src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleEnded} autoPlay={isPlaying} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                  <button onClick={() => playTrack(currentTrack)} style={{ width: '48px', height: '48px', borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', transition: 'all 0.2s' }}>
                    {isPlaying ? '▐▐' : '▶'}
                  </button>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '4px' }}>{currentTrack.title}</div>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>{currentTrack.artist}</div>
                  </div>
                </div>
                <div style={{ height: '2px', background: 'rgba(255,255,255,0.1)', marginBottom: '8px' }}>
                  <div style={{ height: '100%', background: 'rgba(255,255,255,0.5)', width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%`, transition: 'width 0.1s linear' }} />
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.3)', textAlign: 'right' }}>
                  {formatTime(currentTime)} / {formatTime(duration)}
                </div>
              </div>
            ) : (
              <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '14px' }}>Select a track to play</div>
            )}
          </div>
        </div>

        <div style={{ marginTop: '60px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '20px' }}>
            EP
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '24px', maxWidth: '600px' }}>
            <div style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>2022-12-25</div>
              <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Philophobia</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>Asbeel</div>
              <a href="https://163cn.tv/85zoP7g" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
                Listen on 163
              </a>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '48px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>
            Singles
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px', marginBottom: '32px' }}>
            {singles.map((track) => (
              <button key={track.id} onClick={() => playTrack(track)} style={{ aspectRatio: '1', color: currentTrack?.id === track.id ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'monospace', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={btnHoverEnter} onMouseLeave={btnHoverLeave}>
                {track.id}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>
            HIPHOP/BEATS/MIXING/MASTERING
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(10, 1fr)', gap: '4px', marginBottom: '32px' }}>
            {beats.map((track) => (
              <button key={track.id} onClick={() => playTrack(track)} style={{ aspectRatio: '1', color: currentTrack?.id === track.id ? '#fff' : 'rgba(255,255,255,0.5)', fontSize: '11px', fontFamily: 'monospace', background: 'transparent', border: 'none', cursor: 'pointer', transition: 'all 0.2s' }} onMouseEnter={btnHoverEnter} onMouseLeave={btnHoverLeave}>
                {track.id}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>
            VIDEO
          </h2>
          {djMedia.filter(item => item.type === 'video').map((item) => (
            <div key={item.id}>
              {activeVideo === item.id ? (
                <div style={{ marginBottom: '16px', aspectRatio: '9/16', maxHeight: '400px', background: '#000' }}>
                  <video
                    ref={videoRef}
                    src={item.src}
                    controls
                    autoPlay
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    onEnded={() => setActiveVideo(null)}
                  />
                </div>
              ) : (
                <button
                  onClick={() => setActiveVideo(item.id)}
                  style={{
                    width: '100%',
                    maxWidth: '200px',
                    aspectRatio: '9/16',
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'column',
                    gap: '8px',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontSize: '14px',
                  }}>
                    ▶
                  </div>
                  <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)' }}>{item.title}</span>
                </button>
              )}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>
            PHOTOS
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {djMedia.filter(item => item.type === 'image').map((item) => (
              <div
                key={item.id}
                style={{
                  aspectRatio: '1',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  overflow: 'hidden',
                }}
              >
                <a
                  href={item.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', width: '100%', height: '100%', textDecoration: 'none' }}
                >
                  <img
                    src={item.src}
                    alt={item.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </a>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '64px', paddingTop: '32px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {[
              { name: 'Spotify', url: 'https://open.spotify.com/artist/4m1kJeC4FApGDstuNTLR1W' },
              { name: 'SoundCloud', url: '#' },
              { name: 'Bandcamp', url: '#' },
            ].map((platform) => (
              <a key={platform.name} href={platform.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}