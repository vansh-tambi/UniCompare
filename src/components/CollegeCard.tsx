import Link from 'next/link';

export default function CollegeCard({ college }: { college: any; index?: number }) {
  const latestPlacement = college.placements?.[college.placements.length - 1];

  return (
    <div className="card flex flex-col h-full rounded-lg overflow-hidden"
      style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
      <div className="h-40 w-full overflow-hidden bg-neutral-900 relative shrink-0">
        <img
          src={college.image_url}
          alt={college.name}
          className="w-full h-full object-cover opacity-70"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f';
          }}
        />
        <span
          className="absolute top-2 left-2 badge text-xs"
          style={{ background: college.examType === 'NEET' ? 'rgba(62,207,142,0.15)' : 'rgba(79,142,247,0.15)', color: college.examType === 'NEET' ? 'var(--color-success)' : 'var(--color-accent)' }}>
          {college.examType === 'JEE_ADVANCED' ? 'JEE Advanced' : college.examType === 'JEE_MAIN' ? 'JEE Main' : college.examType}
        </span>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-sm mb-0.5 leading-snug line-clamp-2"
          style={{ color: 'var(--color-foreground)' }}>
          {college.name}
        </h3>
        <p className="text-xs mb-4" style={{ color: 'var(--color-muted)' }}>{college.location}</p>

        <div className="mt-auto space-y-1.5 text-xs">
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-muted)' }}>Fees</span>
            <span className="font-medium" style={{ color: 'var(--color-foreground)' }}>
              ₹{(college.fees / 100000).toFixed(1)}L
            </span>
          </div>
          {latestPlacement && (
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-muted)' }}>Highest Pkg</span>
              <span className="font-medium" style={{ color: 'var(--color-success)' }}>
                ₹{latestPlacement.highestPackage}L
              </span>
            </div>
          )}
          {college.cutoffRank && (
            <div className="flex justify-between">
              <span style={{ color: 'var(--color-muted)' }}>CSE Cutoff</span>
              <span className="font-medium font-mono" style={{ color: 'var(--color-foreground)' }}>
                {college.cutoffRank.toLocaleString()}
              </span>
            </div>
          )}
        </div>

        <Link
          href={`/colleges/${college._id}`}
          className="mt-4 block text-center text-xs py-2 rounded-md font-medium transition-colors"
          style={{ background: 'var(--color-surface-2)', color: 'var(--color-foreground)', border: '1px solid var(--color-border)' }}>
          View Details
        </Link>
      </div>
    </div>
  );
}
