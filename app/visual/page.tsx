'use client';

import { useState, useRef } from 'react';

const videos = [
  { id: 1, title: 'JereimahsParty', type: 'mv', src: '/media/videos/JereimahsParty.mp4' },
  { id: 2, title: '0253Shanghai Freestyle', type: 'mv', src: '/media/videos/0253Shanghai Freestyle.mp4' },
  { id: 3, title: 'Interlinked', type: 'audio-visual', src: '/media/videos/8789_raw (1).mp4' },
  { id: 4, title: 'Fuckers in London', type: 'audio-visual', src: '/media/videos/untitled (1).mov' },
  { id: 5, title: 'Binance Visualization', type: 'audio-visual', src: '/media/videos/Binance Visualization.mp4' },
  { id: 6, title: '808Day', type: 'audio-visual', src: '/media/videos/4d9fdb1f75daa02546b0b0a3bbac0c5c.mp4' },
];

const archiveImages = [
  'D1.jpg', 'D2.jpg', 'D3.jpg', 'D4.jpg',
  'E1.jpg', 'E2.jpg', 'E3.jpg', 'E4.jpg',
  'F1.jpg', 'F2.jpg', 'F3.jpg', 'F4.jpg',
  'G1.jpg', 'G2.jpg', 'G3.jpg',
];

export default function Visual() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mvs = videos.filter(v => v.type === 'mv');
  const audioVisuals = videos.filter(v => v.type === 'audio-visual');

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', padding: '0 60px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
          Visual
        </p>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1, marginBottom: '12px' }}>
          PORTFOLIO
        </h1>

        {/* 01 // SELECTED AIGC-VISUAL WORKS */}
        <div style={{ marginTop: '60px', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '32px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            01 // SELECTED AIGC-VISUAL WORKS
          </h2>

          {/* 分解 DISSOLVE */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '20px', alignItems: 'end' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>分解 DISSOLVE</h3>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>AUDIO-VISUAL / AI ART</div>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', borderLeft: '1px solid #e64a19', paddingLeft: '16px' }}>
                通过生成式视觉与实验声音设计的结合，探讨物质与意识的解构过程。画面呈现出高度的秩序感与随机性的碰撞。
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {['A1.jpg', 'A2.jpg', 'A3.jpg', 'A4.jpg', 'A5.jpg', 'A6.jpg'].map((img, i) => (
                <img key={i} src={`/DATA/${img}`} alt={img} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', filter: 'grayscale(15%) contrast(1.1)' }} />
              ))}
            </div>
          </div>

          {/* 恶之花：咒 THE CURSE */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '20px', alignItems: 'end' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>恶之花：咒 THE CURSE</h3>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>EXPERIMENTAL SHORT</div>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', borderLeft: '1px solid #e64a19', paddingLeft: '16px' }}>
                暗黑美学与超现实叙事的影像实验。利用数字媒介重塑感官体验，营造出深邃且具有压迫感的电影级氛围。
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {['B1.jpg', 'B2.jpg', 'B3.jpg', 'B4.jpg', 'B5.jpg', 'B6.jpg'].map((img, i) => (
                <img key={i} src={`/DATA/${img}`} alt={img} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', filter: 'grayscale(15%) contrast(1.1)' }} />
              ))}
            </div>
          </div>

          {/* 遨游 IMMERSIVE JOURNEY */}
          <div style={{ marginBottom: '60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', marginBottom: '20px', alignItems: 'end' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>遨游 IMMERSIVE JOURNEY</h3>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>3D VISUAL / IMMERSIVE</div>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', borderLeft: '1px solid #e64a19', paddingLeft: '16px' }}>
                构建于虚拟空间中的视觉漫游。通过细腻的光影渲染与环境构建，打破现实物理边界，呈现数字艺术的广袤感。
              </p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {['C1.jpg', 'C2.jpg', 'C3.jpg', 'C4.jpg', 'C5.jpg', 'C6.jpg'].map((img, i) => (
                <img key={i} src={`/DATA/${img}`} alt={img} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', filter: 'grayscale(15%) contrast(1.1)' }} />
              ))}
            </div>
          </div>
        </div>

        {/* 02 // MUSIC VIDEO */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            02 // MUSIC VIDEO
          </h2>

          {activeVideo && mvs.find(v => v.id === activeVideo) && (
            <div style={{ marginBottom: '16px', aspectRatio: '16/9', maxHeight: '500px', background: '#000', position: 'relative' }}>
              <video
                ref={videoRef}
                src={mvs.find(v => v.id === activeVideo)?.src}
                controls
                autoPlay
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                onEnded={() => setActiveVideo(null)}
              />
            </div>
          )}

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {mvs.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                style={{
                  aspectRatio: '16/9',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '8px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                {hoveredVideo === video.id && activeVideo !== video.id && (
                  <video
                    src={video.src}
                    muted
                    loop
                    playsInline
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                  />
                )}
                {activeVideo !== video.id && (
                  <>
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
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      ▶
                    </div>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>{video.title}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 03 // VISUAL ARCHIVE */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            03 // VISUAL ARCHIVE
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '6px' }}>
            {archiveImages.map((img, i) => (
              <img key={i} src={`/DATA/${img}`} alt={img} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', filter: 'grayscale(20%)' }} />
            ))}
          </div>
        </div>

        {/* 04 // AUDIO VISUAL */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            04 // AUDIO VISUAL
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {audioVisuals.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                style={{
                  aspectRatio: '16/9',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  gap: '6px',
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'all 0.3s',
                }}
              >
                {hoveredVideo === video.id && activeVideo !== video.id && (
                  <video
                    src={video.src}
                    muted
                    loop
                    playsInline
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                  />
                )}
                {activeVideo !== video.id && (
                  <>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: '12px',
                      position: 'relative',
                      zIndex: 1,
                    }}>
                      ▶
                    </div>
                    <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', position: 'relative', zIndex: 1 }}>{video.title}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '32px' }}>
          <a href="https://www.instagram.com/asbeel24/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.2s' }}>
            Instagram
          </a>
          <a href="https://app.tapnow.ai/creator/profile/50d8bba5-b3f5-4a18-80c9-d931e07ec6c2" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.2s' }}>
            TapNow
          </a>
        </div>
      </div>
    </div>
  );
}