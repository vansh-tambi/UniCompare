"use client";
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CollegeCard({ college, index }: { college: any, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      className="glass rounded-xl overflow-hidden flex flex-col h-full hover:neon-glow transition-all duration-300"
    >
      <div className="h-48 w-full relative bg-gray-800">
        <img 
          src={college.image_url} 
          alt={college.name} 
          className="object-cover w-full h-full opacity-80"
        />
        <div className="absolute top-2 right-2 glass px-2 py-1 rounded text-xs font-bold neon-text">
          ★ {college.rating}
        </div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold mb-2 line-clamp-2">{college.name}</h3>
        <p className="text-sm text-gray-400 mb-4">{college.location}</p>
        <div className="mt-auto space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Avg Fees:</span>
            <span className="font-mono text-white">₹{(college.fees / 100000).toFixed(1)}L</span>
          </div>
          {college.placements && college.placements.length > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Highest Pkg:</span>
              <span className="font-mono text-green-400">₹{college.placements[college.placements.length - 1].highestPackage}L</span>
            </div>
          )}
        </div>
        <Link 
          href={`/colleges/${college._id}`}
          className="mt-4 w-full block text-center glass py-2 rounded font-medium hover:bg-[var(--color-neon-blue-dim)] hover:text-[var(--color-neon-blue)] transition-colors"
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
}
