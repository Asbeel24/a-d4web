'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/creative', label: 'CREATIVE' },
  { href: '/sound', label: 'SOUND' },
  { href: '/visual', label: 'VISUAL' },
  { href: '/studio', label: 'STUDIO' },
  { href: '/about', label: 'ABOUT' },
];

export default function Navigation() {
  const pathname = usePathname();
  const isEdaDetailPage = /^\/eda-project\/[^/]+/.test(pathname);

  if (isEdaDetailPage) {
    return null;
  }

  return (
    <>
      <nav className="site-nav" aria-label="主导航">
        <Link href="/" className="site-brand">
          ASBEEL.D4nn9
        </Link>
        <ul className="site-nav-list">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={`site-nav-link${isActive ? ' is-active' : ''}`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <style>{`
        .site-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.5rem 5rem;
          background: rgba(3,3,3,0.9);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          display: flex;
          justify-content: space-between;
          align-items: center;
          pointer-events: none;
        }
        .site-brand,
        .site-nav-link {
          pointer-events: auto;
          text-decoration: none;
        }
        .site-brand {
          font-size: 0.9rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          color: #fff;
        }
        .site-nav-list {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }
        .site-nav-link {
          position: relative;
          color: #aaa;
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          transition: color 260ms ease;
        }
        .site-nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -0.45rem;
          height: 1px;
          background: rgba(255,255,255,0.85);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 260ms ease, opacity 260ms ease;
          opacity: 0;
        }
        .site-nav-link:hover,
        .site-nav-link:focus-visible,
        .site-nav-link.is-active {
          color: #fff;
        }
        .site-nav-link:hover::after,
        .site-nav-link:focus-visible::after,
        .site-nav-link.is-active::after {
          transform: scaleX(1);
          opacity: 1;
        }
        @media (max-width: 768px) {
          .site-nav {
            padding: 1rem 1.25rem !important;
            flex-direction: column;
            align-items: flex-start;
            gap: 0.8rem;
          }
          .site-nav-list {
            gap: 1rem !important;
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
          }
          .site-nav-link {
            font-size: 0.6rem !important;
            display: inline-flex;
            align-items: center;
            min-height: 32px;
            letter-spacing: 0.08em !important;
          }
        }
        @media (max-width: 480px) {
          .site-nav-list {
            gap: 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
}
