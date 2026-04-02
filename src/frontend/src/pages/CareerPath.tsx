import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  Map as MapIcon,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

const PREVIEW_PATHS = [
  {
    role: "Software Engineer",
    skills: ["React", "Node.js", "System Design"],
    months: 6,
    demand: "Very High",
    demandColor: "text-cyan",
  },
  {
    role: "DevOps Engineer",
    skills: ["Docker", "Kubernetes", "AWS"],
    months: 8,
    demand: "High",
    demandColor: "text-emerald-400",
  },
  {
    role: "Civil Services (UPSC)",
    skills: ["GS Paper 1-4", "Essay", "Optional"],
    months: 18,
    demand: "Competitive",
    demandColor: "text-gold",
  },
];

const CAREER_FEATURES = [
  "AI-generated career roadmaps tailored to your profile",
  "3 personalized career paths with timeline estimates",
  "Skill gap analysis vs. real job requirements",
  "Suggested certifications and learning order",
  "Market demand index per career track",
];

export function CareerPath() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-10 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="career_path.section"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-violet/10 border border-violet/20 flex items-center justify-center">
              <MapIcon className="h-5 w-5 text-violet" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-foreground">
                Career Path
              </h1>
              <p className="text-muted-foreground text-xs">
                AI-powered career clarity engine
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 relative overflow-hidden border border-violet/15"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-violet/5 via-transparent to-cyan/5 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-violet/40 to-transparent" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet/10 border border-violet/20 mb-6">
              <Sparkles className="h-3.5 w-3.5 text-violet" />
              <span className="text-violet text-xs font-mono font-medium tracking-wider">
                AI CAREER ENGINE
              </span>
            </div>
            <h2 className="font-bold text-3xl text-foreground mb-3">
              Your Personalised Career OS
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg leading-relaxed mb-8">
              Tell us your degree, year, and target role. We generate 3
              structured career paths with skill gaps, roadmaps, timelines, and
              demand insights.
            </p>
            <ul className="space-y-2.5 mb-8">
              {CAREER_FEATURES.map((feature, i) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="flex items-start gap-2.5"
                >
                  <CheckCircle2 className="h-4 w-4 text-violet shrink-0 mt-0.5" />
                  <span className="text-sm text-muted-foreground">
                    {feature}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="grid md:grid-cols-3 gap-3 mb-8">
              {PREVIEW_PATHS.map((path, i) => (
                <motion.div
                  key={path.role}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="rounded-xl p-4 bg-muted/20 border border-border/40 space-y-2"
                >
                  <h3 className="font-semibold text-sm text-foreground">
                    {path.role}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {path.skills.map((s) => (
                      <span
                        key={s}
                        className="text-[10px] font-mono px-1.5 py-0.5 bg-muted/50 rounded border border-border/40 text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {path.months}mo prep
                    </span>
                    <Badge
                      variant="outline"
                      className={`text-[10px] border-current/30 ${path.demandColor}`}
                    >
                      {path.demand}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link to="/" data-ocid="career_path.back.link">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-border/60 text-muted-foreground"
                >
                  Back to Dashboard
                </Button>
              </Link>
              <Link
                to="/learning"
                data-ocid="career_path.explore_learning.button"
              >
                <Button
                  size="sm"
                  className="bg-violet/20 text-violet border border-violet/30 hover:bg-violet/30 gap-1.5"
                >
                  Explore Learning <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
