'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';

const videos = [
  { id: 1, title: 'JereimahsParty', type: 'mv', src: '/media/videos/JereimahsParty.mp4' },
  { id: 2, title: '0253Shanghai Freestyle', type: 'mv', src: '/media/videos/0253Shanghai Freestyle.mp4' },
  { id: 3, title: 'Fuckers in London', type: 'audio-visual', src: '/media/videos/8789_raw (1).mp4' },
  { id: 4, title: '808Day', type: 'audio-visual', src: '/media/videos/untitled (1).mov' },
  { id: 5, title: 'Binance Visualization', type: 'audio-visual', src: '/media/videos/Binance Visualization.mp4' },
  { id: 6, title: 'Interlinked', type: 'audio-visual', src: '/media/videos/4d9fdb1f75daa02546b0b0a3bbac0c5c.mp4' },
];

const archiveImages = [
  'D1.jpg', 'D2.jpg', 'D3.jpg', 'D4.jpg',
  'E1.jpg', 'E2.jpg', 'E3.jpg', 'E4.jpg',
  'F1.jpg', 'F2.jpg', 'F3.jpg', 'F4.jpg',
  'G1.jpg', 'G2.jpg', 'G3.jpg',
];

function VisualImage({ src, alt, priority = false }: { src: string; alt: string; priority?: boolean }) {
  return (
    <div className="visual-image">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 50vw, 33vw"
        style={{ objectFit: 'cover', filter: 'grayscale(15%) contrast(1.1)' }}
      />
    </div>
  );
}

export default function Visual() {
  const [activeVideo, setActiveVideo] = useState<number | null>(null);
  const [hoveredVideo, setHoveredVideo] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const mvs = videos.filter(v => v.type === 'mv');
  const audioVisuals = videos.filter(v => v.type === 'audio-visual');

  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', padding: '0 60px' }} className="visual-padding">
        <p className="motion-rise" style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
          Visual
        </p>
        <h1 className="motion-rise motion-delay-1" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1, marginBottom: '12px' }}>
          PORTFOLIO
        </h1>

        <div className="visual-index motion-rise motion-delay-2">
          <div>
            <span>01</span>
            <strong>AIGC visual works</strong>
          </div>
          <div>
            <span>02</span>
            <strong>Music video</strong>
          </div>
          <div>
            <span>03</span>
            <strong>Visual archive</strong>
          </div>
          <div>
            <span>04</span>
            <strong>Audio visual</strong>
          </div>
        </div>

        {/* 01 // SELECTED AIGC-VISUAL WORKS */}
        <div style={{ marginTop: '60px', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '32px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            01 // SELECTED AIGC-VISUAL WORKS
          </h2>

          {/* 分解 DISSOLVE */}
          <div style={{ marginBottom: '60px' }}>
            <div className="project-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>分解 DISSOLVE</h3>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>AUDIO-VISUAL / AI ART</div>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', borderLeft: '1px solid #e64a19', paddingLeft: '16px' }}>
                通过生成式视觉与实验声音设计的结合，探讨物质与意识的解构过程。画面呈现出高度的秩序感与随机性的碰撞。
              </p>
            </div>
            <div className="project-grid">
              {['A1.jpg', 'A2.jpg', 'A3.jpg', 'A4.jpg', 'A5.jpg', 'A6.jpg'].map((img, i) => (
                <VisualImage key={img} src={`/DATA/${img}`} alt={`Dissolve visual frame ${i + 1}`} priority={i < 3} />
              ))}
            </div>
          </div>

          {/* 恶之花：咒 THE CURSE */}
          <div style={{ marginBottom: '60px' }}>
            <div className="project-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>恶之花：咒 THE CURSE</h3>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>EXPERIMENTAL SHORT</div>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', borderLeft: '1px solid #e64a19', paddingLeft: '16px' }}>
                暗黑美学与超现实叙事的影像实验。利用数字媒介重塑感官体验，营造出深邃且具有压迫感的电影级氛围。
              </p>
            </div>
            <div className="project-grid">
              {['B1.jpg', 'B2.jpg', 'B3.jpg', 'B4.jpg', 'B5.jpg', 'B6.jpg'].map((img, i) => (
                <VisualImage key={img} src={`/DATA/${img}`} alt={`The Curse visual frame ${i + 1}`} />
              ))}
            </div>
          </div>

          {/* 遨游 IMMERSIVE JOURNEY */}
          <div style={{ marginBottom: '60px' }}>
            <div className="project-header">
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '4px', color: '#fff' }}>遨游 IMMERSIVE JOURNEY</h3>
                <div style={{ fontSize: '10px', color: '#555', letterSpacing: '0.1em' }}>3D VISUAL / IMMERSIVE</div>
              </div>
              <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', borderLeft: '1px solid #e64a19', paddingLeft: '16px' }}>
                构建于虚拟空间中的视觉漫游。通过细腻的光影渲染与环境构建，打破现实物理边界，呈现数字艺术的广袤感。
              </p>
            </div>
            <div className="project-grid">
              {['C1.jpg', 'C2.jpg', 'C3.jpg', 'C4.jpg', 'C5.jpg', 'C6.jpg'].map((img, i) => (
                <VisualImage key={img} src={`/DATA/${img}`} alt={`Immersive Journey visual frame ${i + 1}`} />
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

          <div className="video-grid">
            {mvs.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                className="video-item"
              >
                {hoveredVideo === video.id && activeVideo !== video.id && (
                  <video
                    src={video.src}
                    muted
                    loop
                    playsInline
                    className="video-preview"
                  />
                )}
                {activeVideo !== video.id && (
                  <>
                    <div className="play-btn">▶</div>
                    <span className="video-title">{video.title}</span>
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

          <div className="archive-grid">
            {archiveImages.map((img, i) => (
              <VisualImage key={img} src={`/DATA/${img}`} alt={`Visual archive frame ${i + 1}`} />
            ))}
          </div>
        </div>

        {/* 04 // AUDIO VISUAL */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', marginBottom: '24px', paddingBottom: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            04 // AUDIO VISUAL
          </h2>

          <div className="av-grid">
            {audioVisuals.map((video) => (
              <div
                key={video.id}
                onClick={() => setActiveVideo(video.id)}
                onMouseEnter={() => setHoveredVideo(video.id)}
                onMouseLeave={() => setHoveredVideo(null)}
                className="video-item"
              >
                {hoveredVideo === video.id && activeVideo !== video.id && (
                  <video
                    src={video.src}
                    muted
                    loop
                    playsInline
                    className="video-preview"
                  />
                )}
                {activeVideo !== video.id && (
                  <>
                    <div className="play-btn-small">▶</div>
                    <span className="video-title-small">{video.title}</span>
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

      <style>{`
        @media (max-width: 768px) {
          .visual-padding {
            padding: 0 20px !important;
          }
          .project-header {
            display: flex !important;
            flex-direction: column !important;
            gap: 12px !important;
          }
          .project-header p {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid #e64a19 !important;
            padding-top: 12px !important;
          }
          .project-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 4px !important;
          }
          .video-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .archive-grid {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 4px !important;
          }
          .av-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
          .visual-index {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        .project-header {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 20px;
          align-items: end;
        }
        .project-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 6px;
        }
        .visual-index {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px;
          margin-top: 32px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.08);
        }
        .visual-index div {
          display: grid;
          gap: 10px;
          padding: 16px;
          background: #000;
        }
        .visual-index span {
          font-size: 10px;
          color: #e64a19;
          font-variant-numeric: tabular-nums;
        }
        .visual-index strong {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.68);
          line-height: 1.4;
        }
        .visual-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: rgba(255,255,255,0.03);
        }
        .video-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        .archive-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }
        .av-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 12px;
        }
        .video-item {
          aspect-ratio: 16/9;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 8px;
          overflow: hidden;
          position: relative;
          transition: all 0.3s;
        }
        .video-preview {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0.6;
        }
        .play-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 14px;
          position: relative;
          z-index: 1;
        }
        .play-btn-small {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-size: 12px;
          position: relative;
          z-index: 1;
        }
        .video-title {
          font-size: 10px;
          color: rgba(255,255,255,0.8);
          position: relative;
          z-index: 1;
        }
        .video-title-small {
          font-size: 9px;
          color: rgba(255,255,255,0.8);
          position: relative;
          z-index: 1;
        }
      `}</style>
    </div>
  );
}
