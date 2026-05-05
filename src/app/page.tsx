import Link from 'next/link';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-24">
      {/* Hero */}
      <div className="mb-24">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-8"
          style={{ background: 'var(--color-accent-dim)', color: 'var(--color-accent)' }}>
          2026 JoSAA & NEET Cutoffs Updated
        </div>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight mb-6"
          style={{ color: 'var(--color-foreground)' }}>
          Find the right college
          <br />
          <span style={{ color: 'var(--color-muted)' }}>without the noise.</span>
        </h1>
        <p className="text-lg max-w-xl mb-10" style={{ color: 'var(--color-muted)' }}>
          UniCompare aggregates real cutoff data from JoSAA and NEET counselling to help you shortlist, compare, and predict your admission chances.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/colleges"
            className="btn-primary inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium"
            style={{ background: 'var(--color-accent)', color: '#fff' }}>
            Browse Colleges
          </Link>
          <Link href="/predictor"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium"
            style={{ border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
            Rank Predictor →
          </Link>
        </div>
      </div>

      <hr style={{ borderColor: 'var(--color-border)' }} className="mb-24" />

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {[
          {
            label: 'Cutoff Data',
            title: 'Official Rank Data',
            desc: 'Opening and closing ranks from JoSAA rounds and NEET counselling for all 23 IITs, 31 NITs, and AIIMS institutions.',
          },
          {
            label: 'Predictor',
            title: 'Rank-Based Matching',
            desc: 'Enter your JEE Advanced or NEET rank. We match it against historical closing ranks to surface realistic options.',
          },
          {
            label: 'Compare',
            title: 'Side-by-Side Review',
            desc: 'Compare fees, placement packages, and cutoffs across up to three institutions simultaneously.',
          },
        ].map((f) => (
          <div key={f.title} className="card p-6">
            <span className="badge tag-jee mb-4 block w-fit text-xs font-mono">{f.label}</span>
            <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--color-foreground)' }}>{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-muted)' }}>{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { value: '29+', label: 'Institutions' },
          { value: '23', label: 'IITs' },
          { value: '2026', label: 'Data Year' },
          { value: 'JEE & NEET', label: 'Exams Covered' },
        ].map((s) => (
          <div key={s.label} className="text-center py-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <div className="text-2xl font-bold mb-1" style={{ color: 'var(--color-foreground)' }}>{s.value}</div>
            <div className="text-xs" style={{ color: 'var(--color-muted)' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
