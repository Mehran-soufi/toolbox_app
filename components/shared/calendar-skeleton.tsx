
export function CalendarSkeleton() {
  return (
    <div className="w-full p-4 bg-white/50 dark:bg-zinc-900/50 rounded-2xl animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center mb-6">
        <div className="h-8 w-32 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        <div className="flex gap-2">
          <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
          <div className="h-8 w-8 bg-zinc-200 dark:bg-zinc-800 rounded-md" />
        </div>
      </div>
      
      {/* Days of week Skeleton */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="h-6 w-full bg-zinc-100 dark:bg-zinc-800/50 rounded" />
        ))}
      </div>

      {/* Calendar Grid Skeleton */}
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: 35 }).map((_, i) => (
          <div key={i} className="h-10 w-full bg-zinc-50 dark:bg-zinc-800/30 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
