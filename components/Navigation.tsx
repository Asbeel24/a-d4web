'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/creative', label: 'CREATIVE' },
  { href: '/sound', label: 'SOUND' },
  { href: '/visual', label: 'VISUAL' },
  { href: '/about', label: 'ABOUT' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: '3rem 5rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Link href="/" style={{
          fontSize: '0.9rem',
          fontWeight: 700,
          letterSpacing: '0.1em',
          color: '#fff',
          textDecoration: 'none',
        }}>
          ASBEEL.D4nn9
        </Link>
        <ul style={{ display: 'flex', gap: '4rem', listStyle: 'none' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  style={{
                    color: isActive ? '#fff' : '#555',
                    textDecoration: 'none',
                    fontSize: '0.65rem',
                    letterSpacing: '0.15em',
                    transition: 'color 0.3s',
                  }}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <style>{`
        @media (max-width: 768px) {
          nav {
            padding: 1.5rem 1.5rem !important;
          }
          nav ul {
            gap: 1.2rem !important;
            flex-wrap: wrap;
            justify-content: flex-end;
          }
          nav ul li a {
            font-size: 0.55rem !important;
            letter-spacing: 0.08em !important;
          }
        }
        @media (max-width: 480px) {
          nav ul {
            gap: 0.8rem !important;
          }
        }
      `}</style>
    </>
  );
}