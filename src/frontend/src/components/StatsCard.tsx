import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  color?: "cyan" | "violet" | "gold" | "green";
  description?: string;
  index?: number;
}

const colorMap = {
  cyan: {
    iconBg: "bg-cyan/10 border-cyan/20",
    iconText: "text-cyan",
    valueBg: "text-cyan",
  },
  violet: {
    iconBg: "bg-violet/10 border-violet/20",
    iconText: "text-violet",
    valueBg: "text-violet",
  },
  gold: {
    iconBg: "bg-gold/10 border-gold/20",
    iconText: "text-gold",
    valueBg: "text-gold",
  },
  green: {
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    iconText: "text-emerald-400",
    valueBg: "text-emerald-400",
  },
};

export function StatsCard({
  label,
  value,
  icon: Icon,
  color = "cyan",
  description,
  index = 0,
}: StatsCardProps) {
  const colors = colorMap[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      className="glass-card rounded-xl p-4 flex items-start gap-3 relative overflow-hidden group"
      data-ocid={`stats.card.${index + 1}`}
    >
      <div
        className={cn(
          "shrink-0 w-9 h-9 rounded-lg border flex items-center justify-center",
          colors.iconBg,
        )}
      >
        <Icon className={cn("h-4 w-4", colors.iconText)} />
      </div>
      <div className="min-w-0">
        <p className="text-muted-foreground text-xs font-medium truncate">
          {label}
        </p>
        <p className={cn("font-bold text-xl leading-tight", colors.valueBg)}>
          {value}
        </p>
        {description && (
          <p className="text-muted-foreground text-[11px] mt-0.5 truncate">
            {description}
          </p>
        )}
      </div>
      <div
        className={cn(
          "absolute -top-6 -right-6 w-16 h-16 rounded-full blur-2xl opacity-20 transition-opacity group-hover:opacity-40",
          color === "cyan"
            ? "bg-cyan"
            : color === "violet"
              ? "bg-violet"
              : color === "gold"
                ? "bg-gold"
                : "bg-emerald-400",
        )}
      />
    </motion.div>
  );
}
