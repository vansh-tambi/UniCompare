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

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (location) queryParams.append('location', location);
      if (maxFees) queryParams.append('maxFees', maxFees);

      const res = await fetch(`/api/colleges?${queryParams.toString()}`);
      if (res.ok) {
        const data = await res.json();
        setColleges(data);
      }
    } catch (error) {
      console.error("Failed to fetch colleges", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchColleges();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 shrink-0">
        <form onSubmit={handleSearch} className="glass p-6 rounded-xl sticky top-24">
          <h2 className="text-xl font-bold mb-6 neon-text">Filters</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Name</label>
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search college..."
                className="w-full bg-black/50 border border-[var(--color-glass-border)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--color-neon-blue)]"
              />
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Location</label>
              <select 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-black/50 border border-[var(--color-glass-border)] rounded px-3 py-2 text-white focus:outline-none focus:border-[var(--color-neon-blue)]"
              >
                <option value="">Any Location</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Telangana">Telangana</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm text-gray-400 mb-1">Max Fees (₹{(Number(maxFees)/100000).toFixed(0)}L)</label>
              <input 
                type="range" 
                min="100000" 
                max="5000000" 
                step="100000"
                value={maxFees}
                onChange={(e) => setMaxFees(e.target.value)}
                className="w-full accent-[var(--color-neon-blue)]"
              />
            </div>
            
            <button 
              type="submit" 
              className="w-full mt-4 bg-[var(--color-neon-blue-dim)] text-[var(--color-neon-blue)] border border-[var(--color-neon-blue)] py-2 rounded font-bold hover:bg-[var(--color-neon-blue)] hover:text-black transition-colors"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </aside>

      {/* Grid */}
      <section className="flex-grow">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-neon-blue)]"></div>
          </div>
        ) : colleges.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college: any, i) => (
              <CollegeCard key={college._id} college={college} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState message="Try adjusting your filters to find more results." />
        )}
      </section>
    </div>
  );
}
