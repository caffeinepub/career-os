# Career OS

## Current State
The workspace has a `.old/` directory with a complete previous build. All 6 pages (Dashboard, Discover, CareerPath, Learning, ResumeLab, Radar) exist with full UI, components, and hooks. Backend Motoko is fully defined. The project failed to deploy in previous attempts due to build errors.

## Requested Changes (Diff)

### Add
- Restore the full app from the `.old/` directory with all 6 pages working
- Complete, deployable version of Career OS

### Modify
- Nothing — restore from existing working code

### Remove
- Nothing

## Implementation Plan
1. Write backend `main.mo` from old code (job/profile/learning/career management)
2. Generate frontend with all 6 pages: Dashboard, Discover, CareerPath, Learning, ResumeLab, Radar
3. Restore all components: JobCard, StatsCard, JobCardSkeleton
4. Restore hooks: useQueries, useActor
5. Restore styles: index.css, tailwind.config.js
6. Restore App.tsx with routing and sidebar/mobile nav
7. Validate and deploy
