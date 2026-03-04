import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Job, JobFilter, UserProfile } from "../backend.d";
import { JobType, Preference } from "../backend.d";
import { useActor } from "./useActor";

// ─── Query Keys ──────────────────────────────────────────────────────────────
export const queryKeys = {
  jobs: (filter?: JobFilter | null) => ["jobs", filter] as const,
  featuredJobs: () =>
    ["jobs", { onlyFeatured: true, sortByDeadlineAsc: false }] as const,
  userProfile: () => ["userProfile"] as const,
  savedJobs: () => ["savedJobs"] as const,
  careerPaths: () => ["careerPaths"] as const,
  learningHubs: () => ["learningHubs"] as const,
};

// ─── Seed Data ────────────────────────────────────────────────────────────────
const SEED_JOBS: Omit<Job, "id">[] = [
  {
    title: "Junior Software Engineer",
    organization: "Infosys",
    jobType: JobType.priv,
    state: "Karnataka",
    skills: ["React", "Node.js", "MongoDB"],
    deadline: BigInt(Date.now() + 15 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    summary:
      "Build scalable web applications for enterprise clients across diverse industries.",
    category: "Software",
    salaryRange: "4-8 LPA",
    qualification: "B.Tech/BE in CS or IT",
    isFeatured: true,
    officialUrl: "https://infosys.com/careers",
  },
  {
    title: "SSC CGL 2025 - Combined Graduate Level",
    organization: "Staff Selection Commission",
    jobType: JobType.govt,
    state: "All India",
    skills: ["Quantitative Aptitude", "English", "General Awareness"],
    deadline: BigInt(Date.now() + 30 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    summary:
      "National level examination for Group B and C posts in Central Government departments.",
    category: "UPSC/SSC",
    salaryRange: "25,000-60,000/month",
    qualification: "Any Graduate",
    isFeatured: true,
    officialUrl: "https://ssc.nic.in",
  },
  {
    title: "DevOps Engineer",
    organization: "TCS",
    jobType: JobType.priv,
    state: "Maharashtra",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
    deadline: BigInt(Date.now() + 20 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    summary:
      "Manage and automate cloud infrastructure for large-scale deployments at scale.",
    category: "DevOps",
    salaryRange: "8-15 LPA",
    qualification: "B.Tech/BE",
    isFeatured: false,
    officialUrl: "https://tcs.com/careers",
  },
  {
    title: "UPSC Civil Services 2025",
    organization: "Union Public Service Commission",
    jobType: JobType.govt,
    state: "All India",
    skills: ["General Studies", "Essay", "Optional Subject"],
    deadline: BigInt(Date.now() + 45 * 24 * 60 * 60 * 1000) * BigInt(1_000_000),
    summary:
      "India's premier civil services examination for IAS, IPS, IFS and other Group A services.",
    category: "UPSC/SSC",
    salaryRange: "56,100-2,50,000/month",
    qualification: "Any Graduate",
    isFeatured: true,
    officialUrl: "https://upsc.gov.in",
  },
];

// ─── Seeding Hook ─────────────────────────────────────────────────────────────
export function useSeedJobs() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["seedJobs"],
    queryFn: async () => {
      if (!actor) return false;
      const existing = await actor.listJobs(null);
      if (existing.length === 0) {
        await Promise.all(
          SEED_JOBS.map((job) => actor.addJob({ ...job, id: BigInt(0) })),
        );
        await queryClient.invalidateQueries({ queryKey: ["jobs"] });
      }
      return true;
    },
    enabled: !!actor && !isFetching,
    staleTime: Number.POSITIVE_INFINITY,
    retry: 2,
  });
}

// ─── Jobs Hooks ───────────────────────────────────────────────────────────────
export function useListJobs(filter?: JobFilter | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Job[]>({
    queryKey: queryKeys.jobs(filter),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs(filter ?? null);
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useFeaturedJobs() {
  const { actor, isFetching } = useActor();
  return useQuery<Job[]>({
    queryKey: queryKeys.featuredJobs(),
    queryFn: async () => {
      if (!actor) return [];
      return actor.listJobs({ onlyFeatured: true, sortByDeadlineAsc: false });
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

// ─── User Profile Hooks ───────────────────────────────────────────────────────
export function useUserProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: queryKeys.userProfile(),
    queryFn: async () => {
      if (!actor) return null;
      return actor.getUserProfile();
    },
    enabled: !!actor && !isFetching,
    staleTime: 300_000,
  });
}

export function useUpdateUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("No actor");
      await actor.updateUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.userProfile() });
    },
  });
}

// ─── Saved Jobs Hooks ─────────────────────────────────────────────────────────
export function useSavedJobs() {
  const { actor, isFetching } = useActor();
  return useQuery<bigint[]>({
    queryKey: queryKeys.savedJobs(),
    queryFn: async () => {
      if (!actor) return [];
      const result = await actor.getUserSavedJobs();
      return result ?? [];
    },
    enabled: !!actor && !isFetching,
    staleTime: 60_000,
  });
}

export function useSaveJob() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ jobId, save }: { jobId: bigint; save: boolean }) => {
      if (!actor) throw new Error("No actor");
      if (save) {
        await actor.saveJob(jobId);
      } else {
        await actor.unsaveJob(jobId);
      }
    },
    onMutate: async ({ jobId, save }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.savedJobs() });
      const prev =
        queryClient.getQueryData<bigint[]>(queryKeys.savedJobs()) ?? [];
      const updated = save
        ? [...prev, jobId]
        : prev.filter((id) => id !== jobId);
      queryClient.setQueryData(queryKeys.savedJobs(), updated);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) {
        queryClient.setQueryData(queryKeys.savedJobs(), ctx.prev);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.savedJobs() });
    },
  });
}

// ─── Career Paths ─────────────────────────────────────────────────────────────
export function useCareerPaths() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: queryKeys.careerPaths(),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCareerPaths();
    },
    enabled: !!actor && !isFetching,
    staleTime: 300_000,
  });
}

// ─── Learning Hubs ────────────────────────────────────────────────────────────
export function useLearningHubs() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: queryKeys.learningHubs(),
    queryFn: async () => {
      if (!actor) return [];
      return actor.getLearningHubs();
    },
    enabled: !!actor && !isFetching,
    staleTime: 300_000,
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
export function getDeadlineDaysLeft(deadlineNs: bigint): number {
  const deadlineMs = Number(deadlineNs) / 1_000_000;
  const now = Date.now();
  return Math.ceil((deadlineMs - now) / (24 * 60 * 60 * 1000));
}

export function getDeadlineStatus(
  daysLeft: number,
): "urgent" | "warning" | "safe" {
  if (daysLeft <= 7) return "urgent";
  if (daysLeft <= 14) return "warning";
  return "safe";
}

export { JobType, Preference };
