"use client";
import { motion } from "framer-motion";

export default function EmptyState({ message = "No records found in the database." }: { message?: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-12 text-center rounded-xl flex flex-col items-center justify-center min-h-[300px] border border-[var(--color-glass-border)] w-full relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-neon-blue-dim)] to-transparent opacity-10 pointer-events-none" />
      <div className="text-[var(--color-neon-blue)] opacity-50 mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-3 neon-text tracking-widest uppercase">Null Output</h3>
      <p className="text-gray-400 font-mono text-sm max-w-md">{message}</p>
    </motion.div>
  );
}
