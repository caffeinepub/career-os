import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Play, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const LEARNING_HUBS = [
  {
    field: "Computer Science",
    icon: "💻",
    count: 12,
    color: "text-cyan",
    badge: "Most Popular",
  },
  {
    field: "UPSC / Civil Services",
    icon: "🏗️",
    count: 8,
    color: "text-gold",
    badge: "High Demand",
  },
  {
    field: "Banking / IBPS",
    icon: "🏦",
    count: 6,
    color: "text-emerald-400",
    badge: "",
  },
  {
    field: "MBA / Management",
    icon: "📊",
    count: 5,
    color: "text-violet",
    badge: "",
  },
  {
    field: "SSC / CGL",
    icon: "📝",
    count: 7,
    color: "text-amber-400",
    badge: "",
  },
  {
    field: "DevOps & Cloud",
    icon: "☁️",
    count: 9,
    color: "text-cyan",
    badge: "Trending",
  },
  {
    field: "Data Science / ML",
    icon: "🧠",
    count: 10,
    color: "text-violet",
    badge: "",
  },
  {
    field: "Civil Engineering",
    icon: "🏗️",
    count: 4,
    color: "text-amber-400",
    badge: "",
  },
  {
    field: "Mechanical",
    icon: "⚙️",
    count: 4,
    color: "text-muted-foreground",
    badge: "",
  },
  {
    field: "State PSC",
    icon: "🗺️",
    count: 5,
    color: "text-emerald-400",
    badge: "",
  },
  {
    field: "ITI / Diploma",
    icon: "🔧",
    count: 3,
    color: "text-muted-foreground",
    badge: "",
  },
  {
    field: "BCom / Finance",
    icon: "💰",
    count: 4,
    color: "text-gold",
    badge: "",
  },
];

const PLAYLIST_PREVIEW = [
  {
    title: "React.js Full Roadmap",
    videos: 24,
    duration: "18hrs",
    level: "Beginner",
  },
  {
    title: "UPSC GS Paper 1 Complete",
    videos: 48,
    duration: "36hrs",
    level: "All Levels",
  },
  {
    title: "Docker + Kubernetes",
    videos: 18,
    duration: "12hrs",
    level: "Intermediate",
  },
];

export function Learning() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="learning.section"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <BookOpen className="h-5 w-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-foreground">
                Learning Hubs
              </h1>
              <p className="text-muted-foreground text-xs">
                Structured playlists, roadmaps & free resources
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-6 relative overflow-hidden border border-emerald-500/15"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan/5 pointer-events-none" />
          <div className="relative flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-4">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400 text-xs font-mono font-medium tracking-wider">
                  12 FIELD HUBS
                </span>
              </div>
              <h2 className="font-bold text-2xl text-foreground mb-2">
                12 Field-Based Learning Hubs
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Curated playlists, free resources, mock tests, and structured
                roadmaps — all in one place. No more random YouTube rabbit
                holes.
              </p>
            </div>
            <div className="md:w-64 space-y-2">
              {PLAYLIST_PREVIEW.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="flex items-center gap-2.5 p-2.5 rounded-lg bg-muted/20 border border-border/40"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center shrink-0">
                    <Play className="h-3 w-3 text-emerald-400 ml-0.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-foreground truncate">
                      {p.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground font-mono">
                      {p.videos} videos · {p.duration}
                    </p>
                  </div>
                  <Badge
                    variant="outline"
                    className="text-[9px] border-border/50 text-muted-foreground shrink-0 ml-auto"
                  >
                    {p.level}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <section>
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-widest mb-3">
            Available Hubs
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {LEARNING_HUBS.map((hub, i) => (
              <motion.div
                key={hub.field}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.03 }}
                className="glass-card rounded-xl p-3.5 flex flex-col gap-1.5 cursor-default hover:border-border/70 transition-colors"
                data-ocid={`learning.hub.item.${i + 1}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-lg">{hub.icon}</span>
                  {hub.badge && (
                    <Badge
                      variant="outline"
                      className={`text-[9px] border-current/25 ${hub.color} px-1.5 py-0`}
                    >
                      {hub.badge}
                    </Badge>
                  )}
                </div>
                <p className="font-semibold text-[12px] text-foreground leading-tight">
                  {hub.field}
                </p>
                <p className="text-muted-foreground text-[10px] font-mono">
                  {hub.count} playlists
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <div className="flex items-center gap-3">
          <Link to="/" data-ocid="learning.back.link">
            <Button
              variant="outline"
              size="sm"
              className="border-border/60 text-muted-foreground"
            >
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/career-path" data-ocid="learning.career_path.button">
            <Button
              size="sm"
              className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/25 hover:bg-emerald-500/25 gap-1.5"
            >
              Set Career Path <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
