import { cn } from "@/lib/utils";

interface JobCardSkeletonProps {
  compact?: boolean;
}

export function JobCardSkeleton({ compact = false }: JobCardSkeletonProps) {
  return (
    <div
      className={cn(
        "glass-card rounded-xl p-4 flex flex-col gap-3",
        compact ? "min-w-[280px] max-w-[320px]" : "w-full",
      )}
      data-ocid="job.loading_state"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 space-y-2">
          <div className="flex gap-2">
            <div className="h-4 w-12 rounded shimmer" />
            <div className="h-4 w-16 rounded shimmer" />
          </div>
          <div className="h-4 w-3/4 rounded shimmer" />
          <div className="h-3 w-1/2 rounded shimmer" />
        </div>
        <div className="h-7 w-7 rounded-lg shimmer shrink-0" />
      </div>

      {!compact && (
        <div className="space-y-1.5">
          <div className="h-3 w-full rounded shimmer" />
          <div className="h-3 w-4/5 rounded shimmer" />
        </div>
      )}

      <div className="flex gap-1.5">
        <div className="h-5 w-16 rounded shimmer" />
        <div className="h-5 w-14 rounded shimmer" />
        <div className="h-5 w-18 rounded shimmer" />
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-border/50">
        <div className="flex gap-3">
          <div className="h-3 w-14 rounded shimmer" />
          <div className="h-3 w-16 rounded shimmer" />
        </div>
        <div className="h-3 w-12 rounded shimmer" />
      </div>
    </div>
  );
}
