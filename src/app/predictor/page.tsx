"use client";
import { useState } from 'react';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';

const EXAM_TYPES: Record<string, string> = {
  'JEE Advanced': 'JEE',
  'JEE Main': 'JEE',
  'NEET': 'NEET',
};

export default function PredictorPage() {
  const [exam, setExam] = useState('JEE Advanced');
  const [rank, setRank] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [hasPredicted, setHasPredicted] = useState(false);

  const handlePredict = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rank) return;
    setLoading(true);
    setHasPredicted(true);
    try {
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ exam, rank }),
      });
      if (res.ok) setResults(await res.json());
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="mb-10">
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--color-foreground)' }}>Rank Predictor</h1>
        <p className="text-sm" style={{ color: 'var(--color-muted)' }}>
          Enter your exam and estimated rank. We'll surface institutions where your rank falls within the historical closing rank.
        </p>
      </div>

      {/* Form */}
      <div className="max-w-md rounded-lg p-6 mb-12"
        style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <form onSubmit={handlePredict} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Exam</label>
            <select value={exam} onChange={e => setExam(e.target.value)}
              className="input-field"
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)', borderRadius: '6px', padding: '8px 12px', width: '100%', outline: 'none' }}>
              <option>JEE Advanced</option>
              <option>JEE Main</option>
              <option>NEET</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: 'var(--color-muted)' }}>Your Rank</label>
            <input type="number" value={rank} onChange={e => setRank(e.target.value)}
              placeholder="e.g. 2500" required
              style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)', color: 'var(--color-foreground)', borderRadius: '6px', padding: '8px 12px', width: '100%', outline: 'none' }} />
          </div>
          <button type="submit" disabled={loading}
            className="w-full py-2.5 rounded-md text-sm font-medium disabled:opacity-50"
            style={{ background: 'var(--color-accent)', color: '#fff' }}>
            {loading ? 'Matching...' : 'Find Colleges'}
          </button>
        </form>
      </div>

      {/* Results */}
      {hasPredicted && !loading && (
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: 'var(--color-muted)' }}>
            Results for rank {rank} — {exam}
          </p>

          {results.length > 0 ? (
            <div className="space-y-3">
              {results.map((college, idx) => {
                const tag = idx === 0 ? 'Reach' : idx === 1 ? 'Target' : 'Likely';
                const tagColor = idx === 0 ? '#f59e0b' : idx === 1 ? 'var(--color-accent)' : 'var(--color-success)';
                return (
                  <div key={college._id}
                    className="rounded-lg p-5 flex items-start gap-5"
                    style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div className="w-20 h-14 rounded-md overflow-hidden shrink-0 bg-neutral-800">
                      <img src={college.image_url} alt={college.name} className="w-full h-full object-cover opacity-70" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-sm" style={{ color: 'var(--color-foreground)' }}>{college.name}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium"
                          style={{ background: `${tagColor}18`, color: tagColor }}>{tag}</span>
                      </div>
                      <p className="text-xs mb-2" style={{ color: 'var(--color-muted)' }}>{college.location}</p>
                      <p className="text-xs leading-relaxed" style={{ color: 'var(--color-muted)' }}>{college.rationale}</p>
                    </div>
                    <Link href={`/colleges/${college._id}`}
                      className="text-xs font-medium shrink-0 mt-1"
                      style={{ color: 'var(--color-accent)' }}>
                      Details →
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState message="No institutions matched this rank. Try a higher rank or a different exam." />
          )}
        </div>
      )}
    </div>
  );
}
