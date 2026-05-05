import { notFound } from 'next/navigation';

async function getCollege(id: string) {
  const res = await fetch(`http://localhost:3000/api/colleges/${id}`, { cache: 'no-store' });
  if (!res.ok) {
    return null;
  }
  return res.json();
}

export default async function CollegeDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const college = await getCollege(resolvedParams.id);

  if (!college) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Overview Hero Section */}
      <section className="glass rounded-xl overflow-hidden relative border border-[var(--color-glass-border)]">
        <div className="h-64 md:h-80 w-full relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10" />
          <img 
            src={college.image_url} 
            alt={college.name} 
            className="object-cover w-full h-full opacity-60"
          />
        </div>
        <div className="relative z-20 p-8 -mt-24 md:-mt-32">
          <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white drop-shadow-md neon-text">{college.name}</h1>
          <p className="text-lg text-gray-300 mb-4">{college.location}</p>
          <div className="flex flex-wrap gap-4">
            <div className="glass px-4 py-2 rounded-lg border border-[var(--color-neon-blue-dim)]">
              <span className="block text-xs text-gray-400">Rating</span>
              <span className="text-xl font-bold text-[var(--color-neon-blue)]">★ {college.rating}</span>
            </div>
            <div className="glass px-4 py-2 rounded-lg border border-[var(--color-neon-blue-dim)]">
              <span className="block text-xs text-gray-400">Average Fees</span>
              <span className="text-xl font-bold text-white font-mono">₹{(college.fees / 100000).toFixed(1)}L</span>
            </div>
          </div>
          <p className="mt-6 text-gray-300 max-w-3xl leading-relaxed">{college.description}</p>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Programs Offered */}
        <section className="lg:col-span-1 glass p-6 rounded-xl h-fit">
          <h2 className="text-2xl font-bold mb-4 neon-text">Programs Offered</h2>
          <ul className="space-y-4">
            {college.courses && college.courses.map((course: any, idx: number) => (
              <li key={idx} className="bg-black/30 p-3 rounded border border-[var(--color-glass-border)]">
                <h4 className="font-medium text-white">{course.name}</h4>
                <p className="text-sm text-gray-400 font-mono mt-1">{course.duration}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Placement Statistics */}
        <section className="lg:col-span-2 glass p-6 rounded-xl">
          <h2 className="text-2xl font-bold mb-6 neon-text">Placement Statistics</h2>
          <div className="space-y-6">
            {college.placements && college.placements.map((placement: any, idx: number) => (
              <div key={idx} className="bg-black/30 p-4 rounded border border-[var(--color-glass-border)]">
                <h4 className="font-bold text-lg mb-4 text-white">Year {placement.year}</h4>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Highest Package</span>
                      <span className="font-mono text-green-400">₹{placement.highestPackage}L</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-[var(--color-neon-blue)] h-2 rounded-full neon-glow" 
                        style={{ width: `${Math.min((placement.highestPackage / 200) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Average Package</span>
                      <span className="font-mono text-white">₹{placement.averagePackage}L</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-[var(--color-neon-purple)] h-2 rounded-full" 
                        style={{ width: `${Math.min((placement.averagePackage / 50) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Student Reviews */}
      <section className="glass p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-6 neon-text">Student Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {college.reviews && college.reviews.map((review: any, idx: number) => (
            <div key={idx} className="bg-black/30 p-4 rounded border border-[var(--color-glass-border)] relative">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-white">{review.userName}</h4>
                <span className="text-[var(--color-neon-blue)] font-bold">★ {review.rating}</span>
              </div>
              <p className="text-gray-300 italic">"{review.text}"</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
