'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const links = [
    { href: '/colleges', label: 'Discover' },
    { href: '/compare', label: 'Compare' },
    { href: '/predictor', label: 'Predictor' },
  ];

  return (
    <header style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-background)' }}
      className="sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="text-sm font-semibold tracking-tight" style={{ color: 'var(--color-foreground)' }}>
          UniCompare
        </Link>
        <nav className="flex items-center gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-3 py-1.5 rounded-md text-sm transition-colors"
              style={{
                color: pathname === link.href ? 'var(--color-foreground)' : 'var(--color-muted)',
                background: pathname === link.href ? 'var(--color-surface-2)' : 'transparent',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
