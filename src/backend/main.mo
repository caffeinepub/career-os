import Map "mo:core/Map";
import Set "mo:core/Set";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Time "mo:core/Time";
import Order "mo:core/Order";
import Principal "mo:core/Principal";

actor {
  type Preference = {
    #govt;
    #priv;
    #both;
  };

  type State = Text;

  type UserProfile = {
    degree : Text;
    year : Nat;
    targetRole : Text;
    preference : Preference;
    preferredState : State;
  };

  type Job = {
    id : Nat;
    title : Text;
    organization : Text;
    jobType : JobType;
    state : State;
    skills : [Text];
    deadline : Time.Time;
    qualification : Text;
    salaryRange : Text;
    summary : Text;
    officialUrl : Text;
    category : Text;
    isFeatured : Bool;
  };

  type JobType = {
    #govt;
    #priv;
  };

  type CareerPath = {
    field : Text;
    paths : [CareerPathEntry];
  };

  type CareerPathEntry = {
    title : Text;
    skills : [Text];
    demandLevel : Nat;
    preparationMonths : Nat;
    certifications : [Text];
  };

  type LearningHub = {
    field : Text;
    sections : [LearningHubSection];
  };

  type LearningHubSection = {
    title : Text;
    resources : [Text];
  };

  type JobFilter = {
    onlyFeatured : Bool;
    jobType : ?JobType;
    state : ?State;
    category : ?Text;
    sortByDeadlineAsc : Bool;
  };

  module Job {
    public func compareByDeadlineAsc(a : Job, b : Job) : Order.Order {
      compareByTime(a.deadline, b.deadline);
    };

    public func compareByTime(a : Time.Time, b : Time.Time) : Order.Order {
      if (a < b) { return #less };
      if (a > b) { return #greater };
      #equal;
    };
  };

  // Persistent data
  let profiles = Map.empty<Principal, UserProfile>();
  let jobs = Map.empty<Nat, Job>();
  let careerPaths = Map.empty<Text, CareerPath>();
  let learningHubs = Map.empty<Text, LearningHub>();
  let userSavedJobs = Map.empty<Principal, Set.Set<Nat>>();

  // User profile management
  public shared ({ caller }) func updateUserProfile(profile : UserProfile) : async () {
    profiles.add(caller, profile);
  };

  public query ({ caller }) func getUserProfile() : async ?UserProfile {
    profiles.get(caller);
  };

  public query ({ caller }) func getUserSavedJobs() : async ?[Nat] {
    switch (userSavedJobs.get(caller)) {
      case (null) { null };
      case (?savedJobs) { ?savedJobs.toArray() };
    };
  };

  // Job management
  public shared ({ caller }) func addJob(job : Job) : async Nat {
    let jobId = getExistingOrNextId();
    let newJob = { job with id = jobId };
    jobs.add(jobId, newJob);
    jobId;
  };

  var nextJobId = 1;
  func getExistingOrNextId() : Nat {
    let existingIds : [Nat] = switch (jobs.isEmpty(), jobs.size()) {
      case (true, 0) { [] };
      case (_, _) { jobs.keys().toArray() };
    };
    if (existingIds.size() == 0) { return nextJobId };
    var maxId = 0;
    for (id in existingIds.values()) {
      if (id > maxId) { maxId := id };
    };
    nextJobId := maxId + 1;
    nextJobId;
  };

  public query ({ caller }) func listJobs(filter : ?JobFilter) : async [Job] {
    var jobValues = jobs.values().toArray();
    switch (filter) {
      case (null) { jobValues };
      case (?f) {
        jobValues := jobValues.filter(
          func(job) {
            matchesFilter(job, f);
          }
        );
        if (f.sortByDeadlineAsc and jobValues.size() > 1) {
          jobValues := jobValues.sort(Job.compareByDeadlineAsc);
        };
        jobValues;
      };
    };
  };

  func matchesFilter(job : Job, filter : JobFilter) : Bool {
    if (filter.onlyFeatured and not job.isFeatured) { return false };
    switch (filter.jobType) {
      case (null) {};
      case (?jt) {
        if (job.jobType != jt) { return false };
      };
    };
    switch (filter.state) {
      case (null) {};
      case (?s) {
        if (job.state != s) { return false };
      };
    };
    switch (filter.category) {
      case (null) {};
      case (?c) {
        if (job.category != c) { return false };
      };
    };
    true;
  };

  // Saving/unsaving jobs
  public shared ({ caller }) func saveJob(jobId : Nat) : async () {
    let currentSaved = switch (userSavedJobs.get(caller)) {
      case (null) { Set.empty<Nat>(); };
      case (?saved) { saved };
    };
    currentSaved.add(jobId);
    userSavedJobs.add(caller, currentSaved);
  };

  public shared ({ caller }) func unsaveJob(jobId : Nat) : async () {
    switch (userSavedJobs.get(caller)) {
      case (null) {};
      case (?saved) {
        saved.remove(jobId);
        userSavedJobs.add(caller, saved);
      };
    };
  };

  // Career paths and learning hubs
  public query ({ caller }) func getCareerPaths() : async [CareerPath] {
    careerPaths.values().toArray();
  };

  public query ({ caller }) func getLearningHubs() : async [LearningHub] {
    learningHubs.values().toArray();
  };
};
