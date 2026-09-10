# Graph Report - isbasvurusitesi  (2026-08-15)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 310 nodes · 430 edges · 31 communities (23 shown, 8 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `bda5af01`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- compilerOptions
- routing.ts
- jobs.ts
- validations.ts
- applications.ts
- devDependencies
- profile.ts
- prisma.ts
- package.json
- (public)/layout.tsx
- jobs/[id]/page.tsx
- temp_add_admins.js
- (public)/page.tsx
- next-auth.d.ts
- migrate.ts
- seed.ts
- JobSlider.tsx
- compress-images.ts
- next.config.ts
- upload/route.ts
- deploy.sh
- eslint.config.mjs
- { GET, POST }

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `DashboardClient()` - 12 edges
3. `prisma` - 9 edges
4. `include` - 7 edges
5. `getJobById()` - 6 edges
6. `JobFormClient()` - 6 edges
7. `getAllJobs()` - 5 edges
8. `getAllApplications()` - 5 edges
9. `getSettings()` - 5 edges
10. `scripts` - 5 edges

## Surprising Connections (you probably didn't know these)
- `EditJobPage()` --calls--> `getJobById()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/(dashboard)/jobs/[id]/edit/page.tsx → src/actions/jobs.ts
- `generateMetadata()` --calls--> `getJobById()`  [EXTRACTED]
  src/app/[locale]/(public)/jobs/[id]/page.tsx → src/actions/jobs.ts
- `AdminJobsPage()` --calls--> `getAllJobs()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/(dashboard)/jobs/page.tsx → src/actions/jobs.ts
- `AdminPage()` --calls--> `getAllJobs()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/(dashboard)/page.tsx → src/actions/jobs.ts
- `AdminApplicationsPage()` --calls--> `getAllApplications()`  [EXTRACTED]
  src/app/[locale]/(admin)/admin/(dashboard)/applications/page.tsx → src/actions/applications.ts

## Import Cycles
- None detected.

## Communities (31 total, 8 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.06
Nodes (33): bcryptjs, dotenv, @libsql/client, next, next-auth, next-intl, dependencies, bcryptjs (+25 more)

### Community 1 - "compilerOptions"
Cohesion: 0.07
Nodes (28): dom, dom.iterable, esnext, **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules (+20 more)

### Community 2 - "routing.ts"
Cohesion: 0.09
Nodes (10): AdminLoginClient(), inter, outfit, LoginForm(), AdminSidebar(), Providers(), { Link, redirect, usePathname, useRouter, getPathname }, Locale (+2 more)

### Community 3 - "jobs.ts"
Cohesion: 0.14
Nodes (14): createJob(), deleteJob(), deleteUploadedImage(), getActiveJobs(), getAllJobs(), updateJob(), getJobImage(), JobFormClient() (+6 more)

### Community 4 - "validations.ts"
Cohesion: 0.11
Nodes (14): registerUser(), RegisterForm(), EducationInput, educationSchema, ExperienceInput, experienceSchema, JobInput, jobSchema (+6 more)

### Community 5 - "applications.ts"
Cohesion: 0.19
Nodes (12): deleteApplication(), getAdminStats(), getAllApplications(), getApplicationById(), updateApplicationStatus(), AdminDashboardClient(), ApplicationsListClient(), ApplicationDetailClient() (+4 more)

### Community 6 - "devDependencies"
Cohesion: 0.11
Nodes (19): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, prisma, ts-node, @types/bcryptjs (+11 more)

### Community 7 - "profile.ts"
Cohesion: 0.27
Nodes (14): getUserApplications(), addEducation(), addExperience(), addLanguage(), addSkill(), deleteEducation(), deleteExperience(), deleteLanguage() (+6 more)

### Community 8 - "prisma.ts"
Cohesion: 0.21
Nodes (7): getSettings(), updateSettings(), ContactClient(), AdminContactPage(), ContactPage(), globalForPrisma, prisma

### Community 9 - "package.json"
Cohesion: 0.14
Nodes (13): allowScripts, better-sqlite3@12.11.1, better-sqlite3@13.0.2, name, prisma, seed, private, scripts (+5 more)

### Community 10 - "(public)/layout.tsx"
Cohesion: 0.26
Nodes (5): incrementDailyVisit(), Footer(), Header(), LanguageSwitcher(), PageTracker()

### Community 11 - "jobs/[id]/page.tsx"
Cohesion: 0.29
Nodes (9): applyToJob(), hasApplied(), getJobById(), EditJobPage(), JobDetailClient(), JobWithCount, generateMetadata(), JobDetailPage() (+1 more)

### Community 12 - "temp_add_admins.js"
Cohesion: 0.25
Nodes (6): adapter, bcrypt, { Pool }, prisma, { PrismaClient }, { PrismaPg }

### Community 13 - "(public)/page.tsx"
Cohesion: 0.43
Nodes (4): getFeaturedJobs(), getJobImage(), HomeClient(), HomePage()

### Community 14 - "next-auth.d.ts"
Cohesion: 0.33
Nodes (5): JWT, next-auth, next-auth/jwt, Session, User

### Community 15 - "migrate.ts"
Cohesion: 0.40
Nodes (3): adapter, pool, prisma

## Knowledge Gaps
- **102 isolated node(s):** `JobWithCount`, `JWT`, `Session`, `User`, `Locale` (+97 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **8 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `prisma` connect `prisma.ts` to `jobs.ts`, `validations.ts`, `applications.ts`, `profile.ts`, `(public)/layout.tsx`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.032) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `devDependencies` to `package.json`?**
  _High betweenness centrality (0.021) - this node is a cross-community bridge._
- **What connects `JobWithCount`, `JWT`, `Session` to the rest of the system?**
  _102 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `routing.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.09259259259259259 - nodes in this community are weakly interconnected._