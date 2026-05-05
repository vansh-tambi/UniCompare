"use client";
import { useEffect, useState } from 'react';

export default function ComparePage() {
  const [allColleges, setAllColleges] = useState([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [compareData, setCompareData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch all colleges for the dropdown
    fetch('/api/colleges')
      .then(res => res.json())
      .then(data => setAllColleges(data))
      .catch(err => console.error(err));
  }, []);

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const id = e.target.value;
    if (!id) return;
    if (selectedIds.includes(id)) return;
    if (selectedIds.length >= 3) {
      alert("You can compare up to 3 colleges at a time.");
      return;
    }
    setSelectedIds([...selectedIds, id]);
  };

  const handleRemove = (idToRemove: string) => {
    setSelectedIds(selectedIds.filter(id => id !== idToRemove));
    setCompareData(compareData.filter(c => c._id !== idToRemove));
  };

  const fetchComparison = async () => {
    if (selectedIds.length === 0) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/colleges/compare?ids=${selectedIds.join(',')}`);
      if (res.ok) {
        const data = await res.json();
        setCompareData(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Helper to find the optimal value
  const getOptimalValue = (metric: string) => {
    if (compareData.length < 2) return null;
    let values = [];
    if (metric === 'fees') {
      values = compareData.map(c => c.fees);
      return Math.min(...values); // lower is better
    }
    if (metric === 'highestPackage') {
      values = compareData.map(c => c.placements?.[c.placements.length - 1]?.highestPackage || 0);
      return Math.max(...values);
    }
    if (metric === 'averagePackage') {
      values = compareData.map(c => c.placements?.[c.placements.length - 1]?.averagePackage || 0);
      return Math.max(...values);
    }
    if (metric === 'rating') {
      values = compareData.map(c => c.rating);
      return Math.max(...values);
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--color-foreground)' }}>Compare Institutions</h1>
        <p className="text-sm max-w-xl mx-auto" style={{ color: 'var(--color-muted)' }}>
          Select up to 3 institutions to view a detailed side-by-side comparison of fees, placements, and ratings.
        </p>
      </div>

      <div className="card p-8 mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
        <select 
          onChange={handleSelect}
          className="input-field max-w-md"
          value=""
        >
          <option value="" disabled>Select an institution...</option>
          {allColleges.map((c: any) => (
            <option key={c._id} value={c._id} disabled={selectedIds.includes(c._id)}>
              {c.name}
            </option>
          ))}
        </select>
        <button 
          onClick={fetchComparison}
          disabled={selectedIds.length === 0 || loading}
          className="btn-primary px-8"
        >
          {loading ? 'Comparing...' : 'Compare Selected'}
        </button>
      </div>
      
      {selectedIds.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {selectedIds.map(id => {
            const college: any = allColleges.find((c: any) => c._id === id);
            return college ? (
              <div key={id} className="badge tag-jee py-1.5 px-4 rounded-full flex items-center gap-2 border border-transparent">
                <span className="truncate max-w-[200px]">{college.name}</span>
                <button onClick={() => handleRemove(id)} className="text-current opacity-60 hover:opacity-100 font-bold ml-1">×</button>
              </div>
            ) : null;
          })}
        </div>
      )}

      {compareData.length > 0 && (
        <div className="card overflow-x-auto">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr style={{ background: 'var(--color-surface-2)' }}>
                <th className="p-5 border-b border-[var(--color-border)] text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--color-muted)' }}>Metric</th>
                {compareData.map(c => (
                  <th key={c._id} className="p-5 border-b border-[var(--color-border)]">
                    <h3 className="font-bold text-sm" style={{ color: 'var(--color-foreground)' }}>{c.name}</h3>
                    <p className="text-xs font-normal" style={{ color: 'var(--color-muted)' }}>{c.location}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* Fees */}
              <tr>
                <td className="p-5 border-b border-[var(--color-border)] font-medium" style={{ color: 'var(--color-muted)' }}>Annual Fees</td>
                {compareData.map(c => {
                  const isOptimal = getOptimalValue('fees') === c.fees;
                  return (
                    <td key={c._id} className="p-5 border-b border-[var(--color-border)]">
                      <span className={`px-2 py-1 rounded font-mono ${isOptimal ? 'tag-neet' : ''}`} style={{ color: isOptimal ? 'var(--color-success)' : 'var(--color-foreground)' }}>
                        ₹{(c.fees / 100000).toFixed(1)}L
                      </span>
                    </td>
                  );
                })}
              </tr>
              {/* Rating */}
              <tr>
                <td className="p-5 border-b border-[var(--color-border)] font-medium" style={{ color: 'var(--color-muted)' }}>Rating</td>
                {compareData.map(c => {
                  const isOptimal = getOptimalValue('rating') === c.rating;
                  return (
                    <td key={c._id} className="p-5 border-b border-[var(--color-border)]">
                      <span className={`px-2 py-1 rounded ${isOptimal ? 'tag-jee' : ''}`} style={{ color: isOptimal ? 'var(--color-accent)' : 'var(--color-foreground)' }}>
                        ★ {c.rating}
                      </span>
                    </td>
                  );
                })}
              </tr>
              {/* Highest Package */}
              <tr>
                <td className="p-5 border-b border-[var(--color-border)] font-medium" style={{ color: 'var(--color-muted)' }}>Latest Highest Package</td>
                {compareData.map(c => {
                  const val = c.placements?.[c.placements.length - 1]?.highestPackage || 0;
                  const isOptimal = getOptimalValue('highestPackage') === val;
                  return (
                    <td key={c._id} className="p-5 border-b border-[var(--color-border)]">
                      <span className={`px-2 py-1 rounded font-mono ${isOptimal ? 'tag-neet' : ''}`} style={{ color: isOptimal ? 'var(--color-success)' : 'var(--color-foreground)' }}>
                        {val ? `₹${val}L` : 'N/A'}
                      </span>
                    </td>
                  );
                })}
              </tr>
              {/* Average Package */}
              <tr>
                <td className="p-5 font-medium" style={{ color: 'var(--color-muted)' }}>Latest Average Package</td>
                {compareData.map(c => {
                  const val = c.placements?.[c.placements.length - 1]?.averagePackage || 0;
                  const isOptimal = getOptimalValue('averagePackage') === val;
                  return (
                    <td key={c._id} className="p-5">
                      <span className={`px-2 py-1 rounded font-mono ${isOptimal ? 'tag-neet' : ''}`} style={{ color: isOptimal ? 'var(--color-success)' : 'var(--color-foreground)' }}>
                        {val ? `₹${val}L` : 'N/A'}
                      </span>
                    </td>
                  );
                })}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
