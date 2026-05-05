export default function EmptyState({ message = "No results found." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="w-10 h-10 mb-4 flex items-center justify-center rounded-full"
        style={{ background: 'var(--color-surface-2)', border: '1px solid var(--color-border)' }}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"
          style={{ color: 'var(--color-muted)' }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <p className="text-sm font-medium mb-1" style={{ color: 'var(--color-foreground)' }}>No results</p>
      <p className="text-sm" style={{ color: 'var(--color-muted)' }}>{message}</p>
    </div>
  );
}
