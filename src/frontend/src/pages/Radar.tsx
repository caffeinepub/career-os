import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

const DEMAND_INDEX = [
  {
    sector: "Software / IT",
    growth: 94,
    trend: "+22%",
    color: "from-cyan to-cyan/60",
  },
  {
    sector: "Banking / Finance",
    growth: 72,
    trend: "+8%",
    color: "from-gold to-gold/60",
  },
  {
    sector: "UPSC / Govt",
    growth: 88,
    trend: "+5%",
    color: "from-violet to-violet/60",
  },
  {
    sector: "Data Science / AI",
    growth: 97,
    trend: "+35%",
    color: "from-emerald-400 to-emerald-400/60",
  },
  {
    sector: "DevOps / Cloud",
    growth: 91,
    trend: "+28%",
    color: "from-cyan/80 to-violet/60",
  },
  {
    sector: "SSC / Railways",
    growth: 65,
    trend: "+3%",
    color: "from-amber-400 to-amber-400/60",
  },
];

const RADAR_PREDICTIONS = [
  {
    org: "ISRO",
    role: "Scientist/Engineer",
    probability: 78,
    timeframe: "Q2 2026",
    confidence: "High",
    color: "text-cyan",
  },
  {
    org: "Indian Army",
    role: "Technical Entry",
    probability: 85,
    timeframe: "Q1 2026",
    confidence: "Very High",
    color: "text-emerald-400",
  },
  {
    org: "RBI",
    role: "Grade B Officers",
    probability: 91,
    timeframe: "March 2026",
    confidence: "Very High",
    color: "text-gold",
  },
  {
    org: "TCS / Infosys",
    role: "Campus Hiring Wave",
    probability: 88,
    timeframe: "Feb-Apr 2026",
    confidence: "High",
    color: "text-violet",
  },
];

export function Radar() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="radar.section"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-cyan" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-foreground">
                Demand Radar
              </h1>
              <p className="text-muted-foreground text-xs">
                Opportunity forecasting & market intelligence
              </p>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_280px] gap-5">
          {/* Monthly Demand Index */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="glass-card rounded-2xl p-6 relative overflow-hidden border border-cyan/15"
            data-ocid="radar.demand_index.card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan/5 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-lg text-foreground">
                    Monthly Demand Index
                  </h2>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    Updated:{" "}
                    {new Date().toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/20">
                  <Sparkles className="h-3 w-3 text-cyan" />
                  <span className="text-cyan text-[10px] font-mono">
                    LIVE DATA
                  </span>
                </div>
              </div>
              <div className="space-y-4">
                {DEMAND_INDEX.map((item, i) => (
                  <motion.div
                    key={item.sector}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                    className="space-y-1.5"
                    data-ocid={`radar.sector.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-medium text-foreground">
                        {item.sector}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-emerald-400">
                          {item.trend}
                        </span>
                        <span className="text-[11px] font-mono text-muted-foreground">
                          {item.growth}%
                        </span>
                      </div>
                    </div>
                    <div className="h-2 rounded-full bg-muted/30 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.growth}%` }}
                        transition={{
                          duration: 0.8,
                          delay: 0.3 + i * 0.07,
                          ease: "easeOut",
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Opportunity Radar */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="glass-card rounded-2xl p-5 relative overflow-hidden border border-violet/15"
            data-ocid="radar.opportunity_forecast.card"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-violet/5 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="font-bold text-base text-foreground mb-1">
                Opportunity Radar
              </h2>
              <p className="text-muted-foreground text-[11px] mb-4">
                AI-predicted upcoming hirings
              </p>
              <div className="space-y-3">
                {RADAR_PREDICTIONS.map((pred, i) => (
                  <motion.div
                    key={pred.org}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 + i * 0.07 }}
                    className="p-3 rounded-xl bg-muted/20 border border-border/40 space-y-1.5"
                    data-ocid={`radar.prediction.item.${i + 1}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-foreground">
                        {pred.org}
                      </span>
                      <Badge
                        variant="outline"
                        className={`text-[9px] px-1.5 border-current/25 ${pred.color}`}
                      >
                        {pred.confidence}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground">
                      {pred.role}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-[10px] font-mono text-muted-foreground">
                          {pred.timeframe}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-mono font-bold ${pred.color}`}
                      >
                        {pred.probability}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-border/40">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet/10 border border-violet/20">
                  <Sparkles className="h-3 w-3 text-violet" />
                  <span className="text-violet text-[10px] font-mono">
                    AI PREDICTIONS ENGINE
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <Link to="/" data-ocid="radar.back.link">
            <Button
              variant="outline"
              size="sm"
              className="border-border/60 text-muted-foreground"
            >
              Back to Dashboard
            </Button>
          </Link>
          <Link to="/discover" data-ocid="radar.explore_jobs.button">
            <Button
              size="sm"
              className="bg-cyan/15 text-cyan border border-cyan/25 hover:bg-cyan/25 gap-1.5"
            >
              Discover Jobs <ArrowRight className="h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
