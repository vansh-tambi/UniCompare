import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "UniCompare — College Admission Data",
  description: "Discover, compare, and predict college admissions across IITs, NITs, IIITs, and AIIMS using real JoSAA and NEET cutoff data.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}
        style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <footer style={{ borderTop: '1px solid var(--color-border)' }} className="py-6 mt-12">
          <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>© 2026 UniCompare</span>
            <span className="text-xs" style={{ color: 'var(--color-muted)' }}>Data sourced from JoSAA & MCC</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
