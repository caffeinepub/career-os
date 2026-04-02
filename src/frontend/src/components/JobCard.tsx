import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookmarkCheck,
  Clock,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { motion } from "motion/react";
import type { Job } from "../backend.d";
import { JobType } from "../backend.d";
import {
  getDeadlineDaysLeft,
  getDeadlineStatus,
  useSaveJob,
} from "../hooks/useQueries";

interface JobCardProps {
  job: Job;
  savedIds: bigint[];
  index?: number;
  compact?: boolean;
}

export function JobCard({
  job,
  savedIds,
  index = 0,
  compact = false,
}: JobCardProps) {
  const saveJobMutation = useSaveJob();
  const isSaved = savedIds.includes(job.id);
  const daysLeft = getDeadlineDaysLeft(job.deadline);
  const deadlineStatus = getDeadlineStatus(daysLeft);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    saveJobMutation.mutate({ jobId: job.id, save: !isSaved });
  };

  const deadlineColor = {
    urgent: "text-red-400",
    warning: "text-amber-400",
    safe: "text-emerald-400",
  }[deadlineStatus];

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className={cn(
        "glass-card glass-card-hover rounded-xl p-4 flex flex-col gap-3 cursor-pointer group relative overflow-hidden",
        compact ? "min-w-[280px] max-w-[320px]" : "w-full",
      )}
      data-ocid={`job.item.${index + 1}`}
    >
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-cyan/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className={cn(
                "text-[10px] font-semibold tracking-wider uppercase px-2 py-0 border",
                job.jobType === JobType.govt
                  ? "text-amber-400 border-amber-400/30 bg-amber-400/10"
                  : "text-cyan border-cyan/30 bg-cyan/10",
              )}
            >
              {job.jobType === JobType.govt ? "Govt" : "Private"}
            </Badge>
            {job.isFeatured && (
              <Badge
                variant="outline"
                className="text-[10px] font-semibold tracking-wider uppercase px-2 py-0 text-violet border-violet/30 bg-violet/10"
              >
                Featured
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-foreground text-sm leading-tight truncate group-hover:text-cyan transition-colors">
            {job.title}
          </h3>
          <p className="text-muted-foreground text-xs mt-0.5 truncate">
            {job.organization}
          </p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className={cn(
            "h-7 w-7 shrink-0 rounded-lg transition-all",
            isSaved
              ? "text-cyan bg-cyan/10 hover:bg-cyan/20"
              : "text-muted-foreground hover:text-cyan hover:bg-cyan/10",
          )}
          onClick={handleSave}
          data-ocid={`job.save_button.${index + 1}`}
        >
          {isSaved ? (
            <BookmarkCheck className="h-3.5 w-3.5" />
          ) : (
            <Bookmark className="h-3.5 w-3.5" />
          )}
        </Button>
      </div>
      {!compact && (
        <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">
          {job.summary}
        </p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {job.skills.slice(0, 3).map((skill) => (
          <span
            key={skill}
            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/50 text-muted-foreground border border-border"
          >
            {skill}
          </span>
        ))}
        {job.skills.length > 3 && (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-muted/50 text-muted-foreground border border-border">
            +{job.skills.length - 3}
          </span>
        )}
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-border/50">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Clock className={cn("h-3 w-3", deadlineColor)} />
            <span
              className={cn("text-[11px] font-mono font-medium", deadlineColor)}
            >
              {daysLeft > 0 ? `${daysLeft}d left` : "Expired"}
            </span>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            <span className="text-[11px] truncate max-w-[80px]">
              {job.state}
            </span>
          </div>
        </div>
        <a
          href={job.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-1 text-[11px] text-muted-foreground hover:text-cyan transition-colors"
          data-ocid={`job.link.${index + 1}`}
        >
          Apply <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </motion.div>
  );
}
