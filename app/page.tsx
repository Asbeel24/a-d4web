'use client';

import DigitalSignalCanvas from '@/components/DigitalSignalCanvas';
import SocialLinks from '@/components/SocialLinks';

export default function Home() {
  return (
    <div className="home-shell relative min-h-screen overflow-hidden" style={{ background: '#030303', color: '#fff' }}>
      <DigitalSignalCanvas />
      <div className="home-art-mask" aria-hidden="true" />
      <div className="home-scanline" aria-hidden="true" />

      {/* Hero Section */}
      <section className="home-hero" style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        padding: '0 5rem',
        gap: '4rem',
      }}>
        {/* Left - Title */}
        <div className="motion-rise">
          <h1 style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(4rem, 14vw, 14rem)',
            lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}>
            <span style={{ display: 'block', color: '#fff' }}>ASBEEL</span>
            <span style={{ display: 'inline-block', opacity: 0.2, margin: '0 0.1em' }}>/</span>
            <span style={{ display: 'block', opacity: 0.3 }}>D4nn9</span>
          </h1>
        </div>

        {/* Right - Content */}
        <div className="motion-rise motion-delay-1" style={{ position: 'relative', paddingLeft: '4rem' }}>
          {/* Vertical accent line */}
          <div style={{
            position: 'absolute',
            left: 0,
            top: 0,
            width: '1px',
            height: '100px',
            background: 'linear-gradient(to bottom, #fff, transparent)',
          }} />

          <div style={{
            fontSize: '0.65rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '1.5rem',
          }}>
            Digital Artist & Music Producer
          </div>

          <p style={{
            fontSize: '0.9rem',
            lineHeight: 1.8,
            color: 'rgba(255,255,255,0.7)',
            maxWidth: '360px',
          }}>
            Based in London and Shenzhen. Crafting sonic and visual experiences that transcend the boundaries between electronic, ambient, and experimental genres.
          </p>

          {/* Social links */}
          <div style={{ marginTop: '2rem' }}>
            <SocialLinks />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="motion-rise motion-delay-2" style={{
          position: 'absolute',
          bottom: '4rem',
          left: '5rem',
          right: '5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div style={{
            fontSize: '0.6rem',
            letterSpacing: '0.25em',
            color: '#555',
            textTransform: 'uppercase',
          }}>
            London / Shenzhen
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '40px', height: '1px', background: '#555' }}></div>
            <span style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              color: '#555',
              textTransform: 'uppercase',
            }}>
              Scroll to explore
            </span>
          </div>
        </div>
      </section>

      {/* Mobile Responsive Styles */}
      <style>{`
        .home-shell::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(circle at 22% 48%, rgba(0,0,0,0.18), rgba(0,0,0,0.58) 62%),
            linear-gradient(90deg, rgba(3,3,3,0.82) 0%, rgba(3,3,3,0.14) 48%, rgba(3,3,3,0.34) 100%);
          z-index: 1;
        }
        .home-hero {
          position: relative;
          z-index: 2;
        }
        .home-art-mask {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          background:
            linear-gradient(to bottom, rgba(3,3,3,0.68) 0%, rgba(3,3,3,0.02) 24%, rgba(3,3,3,0.34) 100%),
            radial-gradient(circle at 78% 55%, transparent 0, rgba(3,3,3,0.48) 68%);
        }
        .home-scanline {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
          opacity: 0.11;
          mix-blend-mode: screen;
          background-image: repeating-linear-gradient(
            to bottom,
            rgba(255,255,255,0.08) 0,
            rgba(255,255,255,0.08) 1px,
            transparent 1px,
            transparent 8px
          );
        }
        @media (max-width: 768px) {
          .home-hero {
            grid-template-columns: 1fr !important;
            padding: 8rem 2rem 6rem !important;
            gap: 3rem !important;
            min-height: auto !important;
          }
          .home-hero > div:nth-child(2) {
            padding-left: 0 !important;
          }
          .home-hero > div:nth-child(2) > div:first-child {
            display: none !important;
          }
          .home-hero > div:last-of-type {
            position: relative !important;
            bottom: auto !important;
            left: auto !important;
            right: auto !important;
            margin-top: 3rem !important;
            padding-top: 2rem !important;
            border-top: 1px solid rgba(255,255,255,0.1) !important;
          }
          .home-shell::before {
            background:
              linear-gradient(to bottom, rgba(3,3,3,0.82), rgba(3,3,3,0.32) 44%, rgba(3,3,3,0.72)),
              radial-gradient(circle at 58% 32%, transparent 0, rgba(3,3,3,0.76) 66%);
          }
        }
      `}</style>
    </div>
  );
}
