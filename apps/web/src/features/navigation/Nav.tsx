'use client';

/** Top navigation bar, shared by every page via the root layout. */

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Pixel } from '@/components/icons/Pixel';
import { AuthButton } from './AuthButton';

const NAV_LINKS = [
  { href: '/roadmap', label: 'Classes' },
  { href: '/badges', label: 'Badges' },
];

export function Nav() {
  const pathname = usePathname();

  return (
    <header className="topbar">
      <Link href="/" className="brand">
        <Pixel name="lens" size={20} /> QA Detective Program
      </Link>

      <nav aria-label="Main" className="topbar__nav">
        {NAV_LINKS.map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link key={link.href} href={link.href} className={`nav-link${isActive ? ' nav-link--active' : ''}`}>
              {link.label}
            </Link>
          );
        })}
        <AuthButton />
      </nav>
    </header>
  );
}
