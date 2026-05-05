import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 glass border-b border-[var(--color-glass-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="font-mono text-2xl font-bold tracking-tighter neon-text">
              UniCompare
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <Link href="/colleges" className="hover:text-[var(--color-neon-blue)] transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Discover
              </Link>
              <Link href="/compare" className="hover:text-[var(--color-neon-blue)] transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Compare
              </Link>
              <Link href="/predictor" className="hover:text-[var(--color-neon-blue)] transition-colors px-3 py-2 rounded-md text-sm font-medium">
                Predictor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
