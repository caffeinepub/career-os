import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface CareerPathEntry {
    title: string;
    demandLevel: bigint;
    certifications: Array<string>;
    preparationMonths: bigint;
    skills: Array<string>;
}
export interface Job {
    id: bigint;
    title: string;
    officialUrl: string;
    jobType: JobType;
    deadline: Time;
    summary: string;
    state: State;
    isFeatured: boolean;
    category: string;
    organization: string;
    salaryRange: string;
    skills: Array<string>;
    qualification: string;
}
export type Time = bigint;
export interface JobFilter {
    jobType?: JobType;
    sortByDeadlineAsc: boolean;
    state?: State;
    onlyFeatured: boolean;
    category?: string;
}
export interface CareerPath {
    field: string;
    paths: Array<CareerPathEntry>;
}
export interface LearningHubSection {
    title: string;
    resources: Array<string>;
}
export interface LearningHub {
    field: string;
    sections: Array<LearningHubSection>;
}
export type State = string;
export interface UserProfile {
    preferredState: State;
    year: bigint;
    degree: string;
    preference: Preference;
    targetRole: string;
}
export enum JobType {
    govt = "govt",
    priv = "priv"
}
export enum Preference {
    both = "both",
    govt = "govt",
    priv = "priv"
}
export interface backendInterface {
    addJob(job: Job): Promise<bigint>;
    getCareerPaths(): Promise<Array<CareerPath>>;
    getLearningHubs(): Promise<Array<LearningHub>>;
    getUserProfile(): Promise<UserProfile | null>;
    getUserSavedJobs(): Promise<Array<bigint> | null>;
    listJobs(filter: JobFilter | null): Promise<Array<Job>>;
    saveJob(jobId: bigint): Promise<void>;
    unsaveJob(jobId: bigint): Promise<void>;
    updateUserProfile(profile: UserProfile): Promise<void>;
}
