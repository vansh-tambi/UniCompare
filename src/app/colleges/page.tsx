"use client";
import { useEffect, useState } from 'react';
import CollegeCard from '@/components/CollegeCard';
import EmptyState from '@/components/EmptyState';

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [location, setLocation] = useState('');
  const [maxFees, setMaxFees] = useState('5000000');
  const [examType, setExamType] = useState('');

  useEffect(() => { fetchColleges(); }, []);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const q = new URLSearchParams();
      if (search) q.append('search', search);
      if (location) q.append('location', location);
      if (maxFees) q.append('maxFees', maxFees);
      const res = await fetch(`/api/colleges?${q.toString()}`);
      if (res.ok) setColleges(await res.json());
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); fetchColleges(); };

  const filtered = examType ? (colleges as any[]).filter((c: any) => c.examType === examType) : colleges;

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 flex gap-8">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 hidden md:block">
        <form onSubmit={handleSearch}>
          <div className="sticky top-20 space-y-5">
            <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--color-muted)' }}>Filters</p>

            <div className="space-y-1">
              <label className="text-xs" style={{ color: 'var(--color-muted)' }}>Search</label>
              <input
                type="text" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="e.g. IIT Bombay" className="input-field"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs" style={{ color: 'var(--color-muted)' }}>Exam Type</label>
              <select value={examType} onChange={e => setExamType(e.target.value)}
                className="input-field"
                style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)' }}>
                <option value="">All</option>
                <option value="JEE_MAIN">JEE Main</option>
                <option value="JEE_ADVANCED">JEE Advanced</option>
                <option value="NEET">NEET</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs" style={{ color: 'var(--color-muted)' }}>Max Fees — ₹{(Number(maxFees) / 100000).toFixed(0)}L</label>
              <input type="range" min="100000" max="5000000" step="100000"
                value={maxFees} onChange={e => setMaxFees(e.target.value)}
                className="w-full" style={{ accentColor: 'var(--color-accent)' }} />
            </div>

            <button type="submit"
              className="w-full py-2 rounded-md text-sm font-medium"
              style={{ background: 'var(--color-accent)', color: '#fff' }}>
              Apply
            </button>
          </div>
        </form>
      </aside>

      {/* Grid */}
      <section className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-base font-semibold" style={{ color: 'var(--color-foreground)' }}>
            {loading ? 'Loading...' : `${filtered.length} institutions`}
          </h1>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-5 h-5 border-2 rounded-full animate-spin"
              style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
          </div>
        ) : filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(filtered as any[]).map((college: any) => (
              <CollegeCard key={college._id} college={college} />
            ))}
          </div>
        ) : (
          <EmptyState message="No institutions match your filters." />
        )}
      </section>
    </div>
  );
}
