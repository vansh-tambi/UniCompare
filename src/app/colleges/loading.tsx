export default function Loading() {
  return (
    <div className="flex justify-center items-center h-48">
      <div className="w-5 h-5 border-2 rounded-full animate-spin"
        style={{ borderColor: 'var(--color-border)', borderTopColor: 'var(--color-accent)' }} />
    </div>
  );
}
