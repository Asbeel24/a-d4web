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
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <ul className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8">
          {navItems.map((item) => {
            const isActive = pathname === item.href || 
              (item.href !== '/' && pathname.startsWith(item.href));
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`text-white text-xs sm:text-sm md:text-base font-medium transition-all duration-200 hover:text-gray-300 py-2 ${
                    isActive ? 'text-white border-b-2 border-white pb-2' : 'hover:border-b-2 hover:border-white/50 pb-2'
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

