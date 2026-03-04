import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Filter, Search, Sparkles } from "lucide-react";
import { motion } from "motion/react";

const PREVIEW_FILTERS = [
  "Software Engineering",
  "UPSC / IAS",
  "Banking / IBPS",
  "SSC / CGL",
  "DevOps & Cloud",
  "Data Science",
  "Govt - Karnataka",
  "Private - Maharashtra",
];

const PREVIEW_FEATURES = [
  {
    icon: "🔍",
    title: "Smart Search",
    desc: "Natural language search across all opportunities",
  },
  {
    icon: "🎯",
    title: "Match Score",
    desc: "AI-powered job-profile fit scoring out of 100",
  },
  {
    icon: "⚡",
    title: "Instant Filters",
    desc: "Filter by state, category, job type, deadline, salary",
  },
  {
    icon: "🔔",
    title: "Deadline Alerts",
    desc: "Never miss an application deadline again",
  },
];

export function Discover() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="discover.section"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
              <Search className="h-5 w-5 text-cyan" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Discover
              </h1>
              <p className="text-muted-foreground text-xs">
                India's most intelligent job discovery engine
              </p>
            </div>
          </div>
        </motion.div>

        {/* Coming Soon Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 text-center relative overflow-hidden border border-cyan/15"
        >
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 via-transparent to-violet/5 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan/10 border border-cyan/20 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-cyan" />
              <span className="text-cyan text-xs font-mono font-medium tracking-wider">
                PHASE 2 · COMING SOON
              </span>
            </div>

            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-3">
              Intelligent Job Discovery
            </h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto leading-relaxed mb-8">
              Advanced search with AI-powered matching, real-time filters, skill
              gap analysis, and deadline tracking — all in one place.
            </p>

            {/* Filter preview chips */}
            <div className="flex flex-wrap gap-2 justify-center mb-8">
              {PREVIEW_FILTERS.map((f, i) => (
                <motion.div
                  key={f}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.04 }}
                >
                  <Badge
                    variant="outline"
                    className="text-[11px] border-border/60 text-muted-foreground bg-muted/30 cursor-default opacity-60"
                  >
                    {f}
                  </Badge>
                </motion.div>
              ))}
            </div>

            {/* Feature grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-left">
              {PREVIEW_FEATURES.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="rounded-xl p-3 bg-muted/20 border border-border/40"
                >
                  <span className="text-lg">{feature.icon}</span>
                  <h3 className="font-display font-semibold text-xs text-foreground mt-1.5 mb-0.5">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-[10px] leading-relaxed">
                    {feature.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-center justify-center gap-3">
              <Link to="/" data-ocid="discover.back.link">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/60 text-muted-foreground"
                >
                  Back to Dashboard
                </Button>
              </Link>
              <Link to="/career-path" data-ocid="discover.setup_career.button">
                <Button
                  size="sm"
                  className="bg-cyan/20 text-cyan border border-cyan/30 hover:bg-cyan/30 gap-1.5"
                >
                  Set Career Path <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
