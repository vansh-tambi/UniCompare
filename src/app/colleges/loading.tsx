export default function Loading() {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-[var(--color-neon-blue-dim)] border-solid rounded-full animate-spin border-t-[var(--color-neon-blue)]"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-solid rounded-full animate-ping border-t-[var(--color-neon-purple)]"></div>
      </div>
    </div>
  );
}
