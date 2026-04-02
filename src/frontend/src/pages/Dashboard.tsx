import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Bookmark,
  Briefcase,
  FileText,
  Flame,
  Map as MapIcon,
  Search,
  Target,
  TrendingUp,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { JobCard } from "../components/JobCard";
import { JobCardSkeleton } from "../components/JobCardSkeleton";
import { StatsCard } from "../components/StatsCard";
import {
  useFeaturedJobs,
  useListJobs,
  useSavedJobs,
  useSeedJobs,
  useUserProfile,
} from "../hooks/useQueries";

const TRENDING_SKILLS = [
  { name: "React.js", demand: 98, trend: "+12%" },
  { name: "Python", demand: 95, trend: "+8%" },
  { name: "DevOps/AWS", demand: 88, trend: "+22%" },
  { name: "UPSC Prep", demand: 85, trend: "+5%" },
  { name: "Data Science", demand: 82, trend: "+18%" },
  { name: "Banking (IBPS)", demand: 79, trend: "+3%" },
  { name: "SSC CGL", demand: 76, trend: "+7%" },
  { name: "Kubernetes", demand: 71, trend: "+35%" },
];

const QUICK_ACTIONS = [
  {
    to: "/discover",
    icon: Search,
    label: "Discover Jobs",
    color: "bg-cyan/10 text-cyan border-cyan/20 hover:bg-cyan/20",
    ocid: "dashboard.discover.button",
  },
  {
    to: "/career-path",
    icon: MapIcon,
    label: "My Career Path",
    color: "bg-violet/10 text-violet border-violet/20 hover:bg-violet/20",
    ocid: "dashboard.career_path.button",
  },
  {
    to: "/resume-lab",
    icon: FileText,
    label: "Resume Lab",
    color: "bg-gold/10 text-gold border-gold/20 hover:bg-gold/20",
    ocid: "dashboard.resume_lab.button",
  },
  {
    to: "/learning",
    icon: BookOpen,
    label: "Learning Hubs",
    color:
      "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20",
    ocid: "dashboard.learning.button",
  },
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function formatDate() {
  return new Intl.DateTimeFormat("en-IN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date());
}

export function Dashboard() {
  useSeedJobs();

  const { data: featuredJobs, isLoading: featuredLoading } = useFeaturedJobs();
  const { data: allJobs, isLoading: allJobsLoading } = useListJobs(null);
  const { data: userProfile, isLoading: profileLoading } = useUserProfile();
  const { data: savedJobIds = [] } = useSavedJobs();

  const dailyPicks = allJobs?.slice(0, 3) ?? [];
  const todayCount = allJobs?.length ?? 0;
  const savedCount = savedJobIds.length;
  const isLoading = featuredLoading || allJobsLoading || profileLoading;

  return (
    <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin">
      <div className="max-w-5xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-8">
        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
          data-ocid="dashboard.section"
        >
          <div className="dot-grid-bg absolute inset-0 rounded-2xl opacity-30 pointer-events-none" />
          <div className="relative rounded-2xl border border-border/50 glass-card p-6 overflow-hidden">
            <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-cyan/8 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-violet/8 blur-3xl pointer-events-none" />
            <div className="relative">
              <p className="text-muted-foreground text-xs font-mono tracking-widest uppercase mb-1">
                {formatDate()}
              </p>
              <h1 className="font-bold text-2xl md:text-3xl text-foreground leading-tight">
                {getGreeting()},{" "}
                <span className="text-gradient-cyan">Career OS</span> 👋
              </h1>
              <p className="text-muted-foreground text-sm mt-1.5 max-w-xl">
                Your career intelligence platform is tracking{" "}
                <span className="text-foreground font-medium">
                  {todayCount} opportunities
                </span>{" "}
                right now. Stay ahead of the curve.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Onboarding Prompt */}
        {!isLoading && !userProfile && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.1 }}
            className="rounded-xl border border-violet/25 bg-violet/8 p-4 flex items-center justify-between gap-4"
            data-ocid="dashboard.onboarding.card"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-violet/15 border border-violet/25 flex items-center justify-center shrink-0">
                <Target className="h-4 w-4 text-violet" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Set up your Career Path
                </p>
                <p className="text-xs text-muted-foreground">
                  Get personalized job matches, skill gap analysis, and learning
                  roadmap
                </p>
              </div>
            </div>
            <Link to="/career-path" data-ocid="dashboard.setup_career.button">
              <Button
                variant="outline"
                size="sm"
                className="border-violet/30 text-violet hover:bg-violet/15 shrink-0 gap-1.5"
              >
                Get Started <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </motion.div>
        )}

        {/* Stats Row */}
        <section data-ocid="dashboard.stats.section">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <StatsCard
              label="Today's Jobs"
              value={isLoading ? "—" : todayCount}
              icon={Briefcase}
              color="cyan"
              description="Active listings"
              index={0}
            />
            <StatsCard
              label="Saved Jobs"
              value={isLoading ? "—" : savedCount}
              icon={Bookmark}
              color="violet"
              description="In your watchlist"
              index={1}
            />
            <StatsCard
              label="Learning Streak"
              value="7 days"
              icon={Flame}
              color="gold"
              description="Keep it going!"
              index={2}
            />
            <StatsCard
              label="Skills Gap"
              value="3 skills"
              icon={Target}
              color="green"
              description="To target role"
              index={3}
            />
          </div>
        </section>

        {/* Quick Actions */}
        <section data-ocid="dashboard.quick_actions.section">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
            <Zap className="h-3.5 w-3.5 text-cyan" /> Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5">
            {QUICK_ACTIONS.map((action, i) => (
              <motion.div
                key={action.to}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25, delay: i * 0.04 }}
              >
                <Link to={action.to} data-ocid={action.ocid}>
                  <div
                    className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-3 cursor-pointer transition-all duration-150 ${action.color}`}
                  >
                    <action.icon className="h-4 w-4 shrink-0" />
                    <span className="font-medium text-[13px] leading-tight">
                      {action.label}
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Featured Jobs Strip */}
        <section data-ocid="dashboard.featured_jobs.section">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-widest flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-cyan" /> Featured
              Opportunities
            </h2>
            <Link to="/discover" data-ocid="dashboard.view_all_jobs.link">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs text-muted-foreground hover:text-cyan gap-1 h-7 px-2"
              >
                View all <ArrowRight className="h-3 w-3" />
              </Button>
            </Link>
          </div>
          {featuredLoading ? (
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
              {[0, 1, 2].map((i) => (
                <div key={i} className="shrink-0">
                  <JobCardSkeleton compact />
                </div>
              ))}
            </div>
          ) : featuredJobs && featuredJobs.length > 0 ? (
            <ScrollArea className="w-full">
              <div className="flex gap-3 pb-3">
                {featuredJobs.map((job, i) => (
                  <div key={String(job.id)} className="shrink-0">
                    <JobCard
                      job={job}
                      savedIds={savedJobIds}
                      index={i}
                      compact
                    />
                  </div>
                ))}
              </div>
            </ScrollArea>
          ) : (
            <div
              className="glass-card rounded-xl p-8 text-center"
              data-ocid="featured_jobs.empty_state"
            >
              <Briefcase className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-40" />
              <p className="text-muted-foreground text-sm">
                No featured jobs right now.
              </p>
            </div>
          )}
        </section>

        {/* Daily Picks + Trending Skills */}
        <div className="grid md:grid-cols-[1fr_280px] gap-6">
          <section data-ocid="dashboard.daily_picks.section">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <Flame className="h-3.5 w-3.5 text-gold" /> Today's Picks
            </h2>
            {allJobsLoading ? (
              <div className="space-y-3">
                {[0, 1, 2].map((i) => (
                  <JobCardSkeleton key={i} />
                ))}
              </div>
            ) : dailyPicks.length > 0 ? (
              <div className="space-y-3" data-ocid="daily_picks.list">
                {dailyPicks.map((job, i) => (
                  <JobCard
                    key={String(job.id)}
                    job={job}
                    savedIds={savedJobIds}
                    index={i}
                  />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-xl p-8 text-center">
                <Briefcase className="h-8 w-8 text-muted-foreground mx-auto mb-2 opacity-40" />
                <p className="text-muted-foreground text-sm">
                  Loading your picks...
                </p>
              </div>
            )}
          </section>

          <section data-ocid="dashboard.trending_skills.section">
            <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-widest mb-3 flex items-center gap-2">
              <TrendingUp className="h-3.5 w-3.5 text-violet" /> Trending Skills
            </h2>
            <div className="glass-card rounded-xl p-4 space-y-3">
              {TRENDING_SKILLS.map((skill, i) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                  className="flex flex-col gap-1.5"
                  data-ocid={`trending_skills.item.${i + 1}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[12px] font-medium text-foreground">
                      {skill.name}
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400">
                      {skill.trend}
                    </span>
                  </div>
                  <div className="h-1 rounded-full bg-muted/50 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.demand}%` }}
                      transition={{
                        duration: 0.6,
                        delay: 0.2 + i * 0.05,
                        ease: "easeOut",
                      }}
                      className="h-full rounded-full"
                      style={{
                        background:
                          i % 2 === 0
                            ? "oklch(var(--cyan))"
                            : "oklch(var(--violet))",
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        </div>

        <footer className="text-center pt-4 border-t border-border/30">
          <p className="text-muted-foreground text-xs">
            © {new Date().getFullYear()}. Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
