export function SkeletonCard() {
  return (
    <div className="masonry-item mb-5 animate-pulse overflow-hidden rounded-xl bg-white shadow-soft">
      <div className="h-96 bg-ink/10" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-2/3 rounded bg-ink/10" />
        <div className="h-4 w-1/3 rounded bg-ink/10" />
        <div className="flex gap-2">
          <div className="h-7 w-16 rounded-full bg-ink/10" />
          <div className="h-7 w-20 rounded-full bg-ink/10" />
        </div>
      </div>
    </div>
  );
}
