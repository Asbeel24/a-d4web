'use client';

import Link from 'next/link';
import edaProjects from '@/data/eda-projects.json';

type EdaProject = {
  序号: number;
};

export default function EDAProjectList() {
  const projects = edaProjects as EdaProject[];

  return (
    <div
      className="min-h-screen"
      style={{
        background: '#000',
        color: '#fff',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: '100px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          padding: '0 60px',
        }}
      >
        <p
          style={{
            fontSize: '10px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#555',
            marginBottom: '12px',
            textAlign: 'left',
          }}
        >
          Creative Computing
        </p>

        <h1
          style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: '32px',
            textAlign: 'left',
          }}
        >
          EDA Projects
        </h1>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(10, 1fr)',
            gap: '4px',
          }}
        >
          {projects.map((project) => (
            <Link
              key={project.序号}
              href={`/eda-project/${project.序号}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '1',
                color: 'rgba(255,255,255,0.5)',
                fontSize: '12px',
                fontFamily: 'monospace',
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
              }}
            >
              {project.序号}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}