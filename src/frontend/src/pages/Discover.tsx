import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Briefcase,
  Filter,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import type { JobFilter } from "../backend.d";
import { JobCard } from "../components/JobCard";
import { JobCardSkeleton } from "../components/JobCardSkeleton";
import {
  JobType,
  useListJobs,
  useSavedJobs,
  useSeedJobs,
} from "../hooks/useQueries";

const CATEGORIES = [
  "All",
  "Software",
  "DevOps",
  "Data Science",
  "UPSC/SSC",
  "Banking",
  "Defence/Research",
];
const STATES = [
  "All India",
  "Karnataka",
  "Maharashtra",
  "Delhi",
  "Telangana",
  "Tamil Nadu",
  "West Bengal",
  "Gujarat",
];
const JOB_TYPES = ["All", "Govt", "Private"];

export function Discover() {
  useSeedJobs();
  const { data: savedJobIds = [] } = useSavedJobs();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedState, setSelectedState] = useState("All India");
  const [selectedType, setSelectedType] = useState("All");
  const [showFilters, setShowFilters] = useState(false);

  const filter: JobFilter = {
    onlyFeatured: false,
    sortByDeadlineAsc: true,
    ...(selectedType === "Govt"
      ? { jobType: JobType.govt }
      : selectedType === "Private"
        ? { jobType: JobType.priv }
        : {}),
    ...(selectedCategory !== "All" ? { category: selectedCategory } : {}),
    ...(selectedState !== "All India" ? { state: selectedState } : {}),
  };

  const { data: jobs, isLoading } = useListJobs(filter);

  const filteredJobs = (jobs ?? []).filter(
    (job) =>
      !search ||
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.organization.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((s) => s.toLowerCase().includes(search.toLowerCase())),
  );

  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin">
      <div className="max-w-4xl mx-auto px-4 py-6 pb-24 md:pb-8 space-y-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          data-ocid="discover.section"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center">
              <Search className="h-5 w-5 text-cyan" />
            </div>
            <div>
              <h1 className="font-bold text-2xl text-foreground">Discover</h1>
              <p className="text-muted-foreground text-xs">
                India's most intelligent job discovery engine
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search jobs, orgs, skills..."
                className="pl-9 bg-card border-border focus:border-cyan/50 h-10"
                data-ocid="discover.search.input"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setShowFilters((v) => !v)}
              className={cn(
                "h-10 w-10 border-border",
                showFilters && "border-cyan/50 text-cyan bg-cyan/10",
              )}
              data-ocid="discover.filters.toggle"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="glass-card rounded-xl p-4 space-y-3"
          >
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Filter className="h-3 w-3" /> Job Type
              </p>
              <div className="flex flex-wrap gap-1.5">
                {JOB_TYPES.map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setSelectedType(t)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                      selectedType === t
                        ? "bg-cyan/15 text-cyan border-cyan/30"
                        : "border-border text-muted-foreground hover:border-border/80",
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2">
                Category
              </p>
              <div className="flex flex-wrap gap-1.5">
                {CATEGORIES.map((c) => (
                  <button
                    type="button"
                    key={c}
                    onClick={() => setSelectedCategory(c)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                      selectedCategory === c
                        ? "bg-violet/15 text-violet border-violet/30"
                        : "border-border text-muted-foreground hover:border-border/80",
                    )}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <MapPin className="h-3 w-3" /> State
              </p>
              <div className="flex flex-wrap gap-1.5">
                {STATES.map((s) => (
                  <button
                    type="button"
                    key={s}
                    onClick={() => setSelectedState(s)}
                    className={cn(
                      "px-3 py-1 rounded-full text-xs font-medium border transition-all",
                      selectedState === s
                        ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                        : "border-border text-muted-foreground hover:border-border/80",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Active Filters */}
        {(selectedType !== "All" ||
          selectedCategory !== "All" ||
          selectedState !== "All India" ||
          search) && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-muted-foreground">Active:</span>
            {search && (
              <Badge
                variant="outline"
                className="text-xs border-cyan/30 text-cyan gap-1"
              >
                {search}{" "}
                <button type="button" onClick={() => setSearch("")}>
                  x
                </button>
              </Badge>
            )}
            {selectedType !== "All" && (
              <Badge
                variant="outline"
                className="text-xs border-border text-muted-foreground gap-1"
              >
                {selectedType}{" "}
                <button type="button" onClick={() => setSelectedType("All")}>
                  x
                </button>
              </Badge>
            )}
            {selectedCategory !== "All" && (
              <Badge
                variant="outline"
                className="text-xs border-border text-muted-foreground gap-1"
              >
                {selectedCategory}{" "}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("All")}
                >
                  x
                </button>
              </Badge>
            )}
            {selectedState !== "All India" && (
              <Badge
                variant="outline"
                className="text-xs border-border text-muted-foreground gap-1"
              >
                {selectedState}{" "}
                <button
                  type="button"
                  onClick={() => setSelectedState("All India")}
                >
                  x
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            {isLoading
              ? "Loading..."
              : `${filteredJobs.length} opportunit${filteredJobs.length !== 1 ? "ies" : "y"} found`}
          </p>
        </div>

        {/* Job List */}
        {isLoading ? (
          <div className="space-y-3">
            {[0, 1, 2, 3].map((i) => (
              <JobCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="space-y-3" data-ocid="discover.jobs.list">
            {filteredJobs.map((job, i) => (
              <JobCard
                key={String(job.id)}
                job={job}
                savedIds={savedJobIds}
                index={i}
              />
            ))}
          </div>
        ) : (
          <div
            className="glass-card rounded-xl p-10 text-center"
            data-ocid="discover.empty_state"
          >
            <Briefcase className="h-10 w-10 text-muted-foreground mx-auto mb-3 opacity-40" />
            <p className="text-muted-foreground text-sm font-medium">
              No jobs match your filters
            </p>
            <p className="text-muted-foreground text-xs mt-1">
              Try adjusting your search or clearing filters
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-4 text-xs"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
                setSelectedType("All");
                setSelectedState("All India");
              }}
            >
              Clear All Filters
            </Button>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2">
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
    </div>
  );
}
