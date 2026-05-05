"use client";
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import EmptyState from '@/components/EmptyState';

export default function PredictorPage() {
  const [exam, setExam] = useState('JEE Main');
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
        body: JSON.stringify({ exam, rank })
      });
      
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col items-center">
      <div className="text-center mb-10 max-w-2xl">
        <h1 className="text-4xl font-bold neon-text mb-4">AI College Predictor</h1>
        <p className="text-gray-300">Enter your exam details and let our rule-based AI engine predict the best fitting colleges for your profile.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-8 rounded-2xl w-full max-w-md border border-[var(--color-glass-border)] relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon-blue-dim)] to-transparent opacity-20 pointer-events-none" />
        
        <form onSubmit={handlePredict} className="relative z-10 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Target Exam</label>
            <select 
              value={exam}
              onChange={(e) => setExam(e.target.value)}
              className="w-full bg-black/60 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all"
            >
              <option value="JEE Main">JEE Main</option>
              <option value="JEE Advanced">JEE Advanced</option>
              <option value="BITSAT">BITSAT</option>
              <option value="VITEEE">VITEEE</option>
              <option value="MHT CET">MHT CET</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Estimated Rank</label>
            <input 
              type="number" 
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              placeholder="e.g. 5000"
              required
              className="w-full bg-black/60 border border-[var(--color-glass-border)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--color-neon-blue)] focus:ring-1 focus:ring-[var(--color-neon-blue)] transition-all"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-transparent border-2 border-[var(--color-neon-blue)] text-[var(--color-neon-blue)] font-bold rounded-lg hover:bg-[var(--color-neon-blue)] hover:text-black hover:neon-glow transition-all duration-300 disabled:opacity-50 flex justify-center items-center gap-2"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current"></div>
                Analyzing...
              </>
            ) : 'Predict Colleges'}
          </button>
        </form>
      </motion.div>

      {hasPredicted && !loading && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-12 w-full max-w-4xl"
        >
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Your Best Matches</h2>
          
          {results.length > 0 ? (
            <div className="space-y-6">
              {results.map((college, idx) => (
                <div key={college._id} className="glass p-6 rounded-xl flex flex-col md:flex-row gap-6 border border-[var(--color-glass-border)] hover:border-[var(--color-neon-blue-dim)] transition-colors">
                  <div className="w-full md:w-48 h-32 shrink-0 rounded-lg overflow-hidden relative">
                    <img src={college.image_url} alt={college.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{college.name}</h3>
                        <span className="text-[var(--color-neon-blue)] font-bold">★ {college.rating}</span>
                      </div>
                      <p className="text-sm text-[var(--color-neon-purple)] font-medium mb-3">
                        AI Rationale: {college.rationale}
                      </p>
                    </div>
                    <Link 
                      href={`/colleges/${college._id}`}
                      className="inline-block mt-4 text-sm font-bold text-[var(--color-neon-blue)] hover:underline"
                    >
                      View Details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState message="No matching colleges found for this rank profile. Try adjusting your rank." />
          )}
        </motion.div>
      )}
    </div>
  );
}
