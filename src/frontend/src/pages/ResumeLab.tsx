import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  FileText,
  Sparkles,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";

const ATS_FEATURES = [
  {
    icon: "📄",
    title: "AI Resume Builder",
    desc: "Structured form → professional PDF in minutes",
  },
  {
    icon: "🔍",
    title: "ATS Scan & Analysis",
    desc: "Upload and get keyword alignment + formatting validation",
  },
  {
    icon: "🎯",
    title: "Role Fit Analysis",
    desc: "Match your resume to any specific job listing",
  },
  {
    icon: "⚡",
    title: "Bullet Enhancer",
    desc: "AI rewrites weak bullets with impact-first language",
  },
  {
    icon: "📊",
    title: "Keyword Report",
    desc: "Identify missing critical keywords for target roles",
  },
  {
    icon: "💾",
    title: "Version Control",
    desc: "Manage multiple resume variants for different roles",
  },
];

const ANALYSIS_PREVIEW = [
  {
    label: "ATS Compatibility",
    score: 78,
    color: "from-amber-400 to-amber-500",
  },
  { label: "Keyword Match", score: 62, color: "from-cyan to-cyan" },
  {
    label: "Format Score",
    score: 91,
    color: "from-emerald-400 to-emerald-500",
  },
  { label: "Impact Level", score: 55, color: "from-violet to-violet" },
];

export function ResumeLab() {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 py-8 pb-24 md:pb-10 space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="resume_lab.section"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
              <FileText className="h-5 w-5 text-gold" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Resume Lab
              </h1>
              <p className="text-muted-foreground text-xs">
                Enterprise-grade ATS optimization & resume intelligence
              </p>
            </div>
          </div>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="glass-card rounded-2xl p-8 relative overflow-hidden border border-gold/15"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-amber-500/5 pointer-events-none" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

          <div className="relative flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold/10 border border-gold/20 mb-5">
                <Sparkles className="h-3.5 w-3.5 text-gold" />
                <span className="text-gold text-xs font-mono font-medium tracking-wider">
                  PHASE 4 · COMING SOON
                </span>
              </div>

              <h2 className="font-display font-bold text-2xl text-foreground mb-3">
                Resume Intelligence Lab
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                No flashy score gimmicks. Professional diagnostic panels that
                tell you exactly what's missing and how to fix it — like a
                senior engineer reviewing your resume.
              </p>

              {/* Upload zone preview */}
              <div
                className="border-2 border-dashed border-gold/25 rounded-xl p-5 text-center bg-gold/5 mb-4"
                data-ocid="resume_lab.dropzone"
              >
                <Upload className="h-7 w-7 text-gold/50 mx-auto mb-2" />
                <p className="text-sm font-medium text-muted-foreground">
                  Drop your resume here
                </p>
                <p className="text-xs text-muted-foreground/60 mt-0.5">
                  PDF, DOCX · Max 5MB
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  className="mt-3 border-gold/30 text-gold/70 cursor-not-allowed opacity-60"
                  disabled
                  data-ocid="resume_lab.upload_button"
                >
                  Upload Resume
                </Button>
              </div>

              <div className="flex items-center gap-3">
                <Link to="/" data-ocid="resume_lab.back.link">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border/60 text-muted-foreground"
                  >
                    Back to Dashboard
                  </Button>
                </Link>
                <Link to="/discover" data-ocid="resume_lab.explore_jobs.button">
                  <Button
                    size="sm"
                    className="bg-gold/15 text-gold border border-gold/25 hover:bg-gold/25 gap-1.5"
                  >
                    Explore Jobs <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Analysis Preview Panel */}
            <div className="md:w-56 space-y-3">
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Analysis Preview
              </p>
              {ANALYSIS_PREVIEW.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + i * 0.07 }}
                  className="space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-foreground/60">
                      {item.score}%
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.score}%` }}
                      transition={{
                        duration: 0.7,
                        delay: 0.4 + i * 0.07,
                        ease: "easeOut",
                      }}
                      className={`h-full rounded-full bg-gradient-to-r ${item.color} opacity-60`}
                    />
                  </div>
                </motion.div>
              ))}
              <div className="pt-2 space-y-1.5">
                {[
                  { id: "1", text: "Missing: Leadership keywords" },
                  { id: "2", text: "Add quantified achievements" },
                  { id: "3", text: "Section order needs fix" },
                ].map((tip) => (
                  <div key={tip.id} className="flex items-start gap-1.5">
                    <CheckCircle2 className="h-3 w-3 text-gold/50 mt-0.5 shrink-0" />
                    <span className="text-[10px] text-muted-foreground">
                      {tip.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ATS_FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.04 }}
              className="glass-card rounded-xl p-4 space-y-1.5 opacity-70"
            >
              <span className="text-xl">{feature.icon}</span>
              <h3 className="font-display font-semibold text-[12px] text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-[10px] leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
