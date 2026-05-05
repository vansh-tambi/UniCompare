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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="glass p-8 rounded-xl text-center mb-8">
        <h1 className="text-3xl font-bold neon-text mb-4">Compare Colleges</h1>
        <p className="text-gray-300 mb-6">Select up to 3 colleges to compare their fees, placements, and ratings side-by-side.</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <select 
            onChange={handleSelect}
            className="w-full md:w-96 bg-black border border-[var(--color-glass-border)] rounded px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)]"
            value=""
          >
            <option value="" disabled>Select a college to add...</option>
            {allColleges.map((c: any) => (
              <option key={c._id} value={c._id} disabled={selectedIds.includes(c._id)}>
                {c.name}
              </option>
            ))}
          </select>
          <button 
            onClick={fetchComparison}
            disabled={selectedIds.length === 0 || loading}
            className="px-6 py-3 bg-[var(--color-neon-blue-dim)] border border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] font-bold rounded hover:bg-[var(--color-neon-blue)] hover:text-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Comparing...' : 'Compare Selected'}
          </button>
        </div>
        
        {selectedIds.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {selectedIds.map(id => {
              const college: any = allColleges.find((c: any) => c._id === id);
              return college ? (
                <div key={id} className="glass px-3 py-1 rounded-full flex items-center gap-2 border border-[var(--color-glass-border)] text-sm">
                  <span className="truncate max-w-[200px]">{college.name}</span>
                  <button onClick={() => handleRemove(id)} className="text-red-400 hover:text-red-300 font-bold ml-1">×</button>
                </div>
              ) : null;
            })}
          </div>
        )}
      </div>

      {compareData.length > 0 && (
        <div className="glass rounded-xl overflow-x-auto border border-[var(--color-glass-border)]">
          <table className="w-full min-w-[800px] text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-[var(--color-glass-border)] bg-black/40 w-1/4">Metric</th>
                {compareData.map(c => (
                  <th key={c._id} className="p-4 border-b border-[var(--color-glass-border)] bg-black/40 w-1/4">
                    <h3 className="font-bold text-lg neon-text">{c.name}</h3>
                    <p className="text-sm text-gray-400 font-normal">{c.location}</p>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Fees */}
              <tr>
                <td className="p-4 border-b border-[var(--color-glass-border)] font-medium text-gray-300">Annual Fees</td>
                {compareData.map(c => {
                  const isOptimal = getOptimalValue('fees') === c.fees;
                  return (
                    <td key={c._id} className={`p-4 border-b border-[var(--color-glass-border)] font-mono ${isOptimal ? 'text-[var(--color-neon-blue)] neon-glow rounded-md bg-[var(--color-neon-blue-dim)]' : 'text-white'}`}>
                      ₹{(c.fees / 100000).toFixed(1)}L
                    </td>
                  );
                })}
              </tr>
              {/* Rating */}
              <tr>
                <td className="p-4 border-b border-[var(--color-glass-border)] font-medium text-gray-300">Rating</td>
                {compareData.map(c => {
                  const isOptimal = getOptimalValue('rating') === c.rating;
                  return (
                    <td key={c._id} className={`p-4 border-b border-[var(--color-glass-border)] font-bold ${isOptimal ? 'text-[var(--color-neon-blue)] neon-glow rounded-md bg-[var(--color-neon-blue-dim)]' : 'text-white'}`}>
                      ★ {c.rating}
                    </td>
                  );
                })}
              </tr>
              {/* Highest Package */}
              <tr>
                <td className="p-4 border-b border-[var(--color-glass-border)] font-medium text-gray-300">Latest Highest Package</td>
                {compareData.map(c => {
                  const val = c.placements?.[c.placements.length - 1]?.highestPackage || 0;
                  const isOptimal = getOptimalValue('highestPackage') === val;
                  return (
                    <td key={c._id} className={`p-4 border-b border-[var(--color-glass-border)] font-mono ${isOptimal ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] bg-green-900/20 rounded-md' : 'text-white'}`}>
                      {val ? `₹${val}L` : 'N/A'}
                    </td>
                  );
                })}
              </tr>
              {/* Average Package */}
              <tr>
                <td className="p-4 font-medium text-gray-300">Latest Average Package</td>
                {compareData.map(c => {
                  const val = c.placements?.[c.placements.length - 1]?.averagePackage || 0;
                  const isOptimal = getOptimalValue('averagePackage') === val;
                  return (
                    <td key={c._id} className={`p-4 font-mono ${isOptimal ? 'text-green-400 drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] bg-green-900/20 rounded-md' : 'text-white'}`}>
                      {val ? `₹${val}L` : 'N/A'}
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
