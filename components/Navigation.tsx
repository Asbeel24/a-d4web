'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/work', label: 'WORK' },
  { href: '/about', label: 'ABOUT' },
  { href: '/eda-project', label: 'EDA PROJECT' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-6 py-6">
        <ul className="flex gap-6 md:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-white text-sm md:text-base font-medium transition-all duration-200 hover:text-gray-300 uppercase tracking-wider ${
                    isActive ? 'text-white' : ''
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

