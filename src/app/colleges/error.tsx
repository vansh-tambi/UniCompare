"use client";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="glass p-12 text-center rounded-xl flex flex-col items-center justify-center h-[50vh] max-w-2xl mx-auto mt-12 border border-red-500/30">
      <div className="text-red-500 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold mb-2 text-white">System Malfunction</h3>
      <p className="text-gray-400 mb-6">We encountered a critical error while fetching the data.</p>
      <button
        onClick={() => reset()}
        className="bg-transparent border border-red-500 text-red-500 px-6 py-2 rounded font-mono hover:bg-red-500 hover:text-black transition-colors"
      >
        REBOOT_SEQUENCE
      </button>
    </div>
  );
}
