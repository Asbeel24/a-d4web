'use client';

import Link from 'next/link';

export default function Creative() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: '480px', padding: '0 32px' }}>
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '32px',
          }}
        >
          Creative Computing
        </p>

        <h1
          style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '16px',
            lineHeight: 1.1,
          }}
        >
          EDA Projects
        </h1>

        <p
          style={{
            fontSize: '13px',
            lineHeight: 1.7,
            color: 'rgba(255,255,255,0.5)',
            marginBottom: '48px',
            maxWidth: '320px',
            margin: '0 auto 48px',
          }}
        >
          Exploratory Data Art & Code-based Works
        </p>

        <Link
          href="/eda-project"
          style={{
            display: 'inline-block',
            padding: '14px 40px',
            border: '1px solid rgba(255,255,255,0.25)',
            color: '#fff',
            fontSize: '11px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            background: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)';
          }}
        >
          Enter
        </Link>

        <div
          style={{
            marginTop: '80px',
            paddingTop: '32px',
            borderTop: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <h2
            style={{
              fontSize: '1.2rem',
              fontWeight: 600,
              color: '#fff',
              marginBottom: '8px',
            }}
          >
            Experiments
          </h2>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>
            Code-based explorations
          </p>
        </div>
      </div>
    </div>
  );
}