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

function TrackButton({
  track,
  isActive,
  isPlaying,
  index,
  onClick,
}: {
  track: Track;
  isActive: boolean;
  isPlaying: boolean;
  index: number;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`Play ${track.title} by ${track.artist}`}
      aria-pressed={isActive}
      className={`track-button${isActive ? ' is-active' : ''}`}
      onClick={onClick}
      style={{ animationDelay: `${index * 35}ms` }}
    >
      <span className="track-index">{track.id.toString().padStart(2, '0')}</span>
      <span className="track-copy">
        <span className="track-title">{track.title}</span>
        <span className="track-artist">{track.artist}</span>
      </span>
      <span className="track-state">{isActive ? (isPlaying ? 'PLAYING' : 'SELECTED') : 'PLAY'}</span>
    </button>
  );
}

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

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', padding: '0 60px' }} className="mobile-padding">
        <p className="motion-rise" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
          Sound
        </p>
        <h1 className="motion-rise motion-delay-1" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1, marginBottom: '60px' }}>
          MUSIC
        </h1>

        {/* Mobile: stacked layout, Desktop: 2 columns */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px', alignItems: 'start' }} className="sound-grid motion-rise motion-delay-2">
          {/* Player - First on mobile, Right on desktop */}
          <div>
            <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '20px' }}>
              Selected Tracks
            </h2>
            {currentTrack ? (
              <div className="player-panel">
                <audio ref={audioRef} src={currentTrack.src} onTimeUpdate={handleTimeUpdate} onLoadedMetadata={handleLoadedMetadata} onEnded={handleEnded} autoPlay={isPlaying} />
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
                  <button
                    type="button"
                    aria-label={isPlaying ? `Pause ${currentTrack.title}` : `Play ${currentTrack.title}`}
                    className="player-toggle"
                    onClick={() => playTrack(currentTrack)}
                  >
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
              <div className="empty-player">
                Select a track
              </div>
            )}
          </div>

          {/* Left: EP + Singles + HIPHOP */}
          <div>
            {/* EP */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '20px' }}>
                EP
              </h2>
              <div style={{ padding: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '8px' }}>2022-12-25</div>
                <div style={{ fontSize: '14px', fontWeight: 600, marginBottom: '4px' }}>Philophobia</div>
                <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', marginBottom: '12px' }}>Asbeel</div>
                <a href="https://163cn.tv/85zoP7g" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
                  Listen on 163
                </a>
              </div>
            </div>

            {/* Singles */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>
                Singles
              </h2>
              <div className="track-list">
                {singles.map((track, index) => (
                  <TrackButton
                    key={track.id}
                    track={track}
                    index={index}
                    isActive={currentTrack?.id === track.id}
                    isPlaying={isPlaying}
                    onClick={() => playTrack(track)}
                  />
                ))}
              </div>
            </div>

            {/* HIPHOP/BEATS */}
            <div style={{ marginBottom: '48px' }}>
              <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '16px' }}>
                HIPHOP/BEATS/MIXING/MASTERING
              </h2>
              <div className="track-list">
                {beats.map((track, index) => (
                  <TrackButton
                    key={track.id}
                    track={track}
                    index={index + singles.length}
                    isActive={currentTrack?.id === track.id}
                    isPlaying={isPlaying}
                    onClick={() => playTrack(track)}
                  />
                ))}
              </div>
            </div>
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
                  className="media-play-card"
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
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }} className="photo-grid">
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
            ].map((platform) => (
              <a key={platform.name} className="platform-link" href={platform.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.2s' }} onMouseEnter={hoverEnter} onMouseLeave={hoverLeave}>
                {platform.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 1024px) {
          .sound-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        .player-panel,
        .empty-player {
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          padding: 24px;
        }
        .empty-player {
          color: rgba(255,255,255,0.32);
          font-size: 14px;
          letter-spacing: 0.08em;
        }
        .player-toggle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.24);
          background: transparent;
          color: #fff;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          transition: transform 180ms ease, border-color 220ms ease, background 220ms ease;
        }
        .player-toggle:hover {
          border-color: rgba(255,255,255,0.6);
          background: rgba(255,255,255,0.06);
        }
        .player-toggle:active {
          transform: scale(0.96);
        }
        .track-list {
          display: grid;
          gap: 6px;
          margin-bottom: 32px;
        }
        .track-button {
          width: 100%;
          min-height: 54px;
          display: grid;
          grid-template-columns: 42px minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
          padding: 10px 0;
          border: 0;
          border-bottom: 1px solid rgba(255,255,255,0.07);
          background: transparent;
          color: rgba(255,255,255,0.48);
          cursor: pointer;
          text-align: left;
          animation: motion-rise 520ms cubic-bezier(0.22, 1, 0.36, 1) both;
          transition: color 220ms ease, border-color 220ms ease, transform 180ms ease, background 220ms ease;
        }
        .track-button:hover,
        .track-button:focus-visible,
        .track-button.is-active {
          color: #fff;
          border-color: rgba(255,255,255,0.24);
          background: linear-gradient(90deg, rgba(255,255,255,0.055), transparent 68%);
        }
        .track-button:active {
          transform: translateY(1px);
        }
        .track-index {
          font-size: 11px;
          letter-spacing: 0.12em;
          color: rgba(255,255,255,0.36);
          font-variant-numeric: tabular-nums;
        }
        .track-copy {
          display: grid;
          gap: 4px;
          min-width: 0;
        }
        .track-title {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 13px;
          color: currentColor;
        }
        .track-artist {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 10px;
          color: rgba(255,255,255,0.36);
        }
        .track-state {
          font-size: 9px;
          letter-spacing: 0.16em;
          color: rgba(255,255,255,0.34);
        }
        .track-button.is-active .track-index,
        .track-button.is-active .track-state {
          color: #fff;
        }
        .media-play-card,
        .platform-link {
          transition: transform 200ms ease, border-color 220ms ease, background 220ms ease, color 220ms ease;
        }
        .media-play-card:hover {
          transform: translateY(-2px);
          border-color: rgba(255,255,255,0.24) !important;
          background: rgba(255,255,255,0.055) !important;
        }
        @media (max-width: 640px) {
          .mobile-padding {
            padding: 0 20px !important;
          }
          .track-button {
            grid-template-columns: 34px minmax(0, 1fr);
            gap: 10px;
          }
          .track-state {
            display: none;
          }
          .photo-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
