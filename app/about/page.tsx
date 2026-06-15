'use client';

import SocialLinks from '@/components/SocialLinks';
import SafeImage from '@/components/SafeImage';

export default function About() {
  return (
    <div className="min-h-screen" style={{ background: '#000', color: '#fff', paddingTop: '100px' }}>
      <div style={{ maxWidth: '1200px', padding: '0 60px' }}>
        <p style={{ fontSize: '10px', letterSpacing: '0.3em', textTransform: 'uppercase', color: '#555', marginBottom: '12px' }}>
          About
        </p>
        <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, lineHeight: 1, marginBottom: '60px' }}>
          ASBEEL / D4nn9
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}>
          {/* 左侧：文字内容 */}
          <div>
            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '10px', color: '#e64a19', letterSpacing: '0.1em', marginBottom: '8px' }}>LOCATION</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                LONDON, UK<br />SHENZHEN, CN
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '10px', color: '#e64a19', letterSpacing: '0.1em', marginBottom: '8px' }}>CORE FOCUS</div>
              <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', fontFamily: 'monospace' }}>
                AI GENERATIVE ART<br />CREATIVE CODING<br />EXPERIMENTAL AUDIO
              </div>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '10px', color: '#e64a19', letterSpacing: '0.1em', marginBottom: '12px' }}>BIOGRAPHY</div>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8, marginBottom: '16px' }}>
                跨媒介数字艺术家、实验音乐制作人。创作风格融合超现实3D视觉、环境音乐与前卫声音设计，构建全新沉浸式体验。
              </p>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.8 }}>
                Electronic music producer, beatmaker, DJ, digital artist based in London/Shenzhen. Specializing in Bass/Leftfield/Trap/Drill music. Exploring AIGC with art right now.
              </p>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <div style={{ fontSize: '10px', color: '#e64a19', letterSpacing: '0.1em', marginBottom: '8px' }}>EXPERTISE</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 2 }}>
                实验短片与视听艺术 / Experimental Short Films & AV Art<br />
                实验性电子音乐制作 / Experimental Electronic Music<br />
                AI艺术与新媒体创作 / AI Art & New Media<br />
                现场视听表演 / AV Live Performance<br />
                生成式视觉与创意编程 / Generative Art & Creative Coding
              </div>
            </div>

            <div>
              <div style={{ fontSize: '10px', color: '#e64a19', letterSpacing: '0.1em', marginBottom: '8px' }}>RECOGNITION</div>
              <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)', lineHeight: 2 }}>
                TapNow 签约艺术家<br />
                TapNow x SXSW 2026 获奖创作者<br />
                Goldsmiths Electronic Music Computing And Technology 优秀毕业生
              </div>
            </div>

            <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '32px' }}>
              <a href="https://www.instagram.com/asbeel24/" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.2s' }}>
                Instagram
              </a>
              <a href="https://app.tapnow.ai/creator/profile/50d8bba5-b3f5-4a18-80c9-d931e07ec6c2" target="_blank" rel="noopener noreferrer" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase', transition: 'color 0.2s' }}>
                TapNow
              </a>
            </div>
          </div>

          {/* 右侧：图片 */}
          <div>
            <div style={{ aspectRatio: '3/4', overflow: 'hidden', position: 'relative' }}>
              <img
                src="/media/images/微信图片_20250905014503_8_161.jpg"
                alt="ASBEEL/D4nn9"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}