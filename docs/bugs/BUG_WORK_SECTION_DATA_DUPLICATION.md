# Bug: Work section duplicates project data from constants

## Title
Work section defines its own project list instead of using cli-data

## Description
`components/organisms/work-section.tsx` defines a local `baseProjects` array that duplicates the data from `constants/cli-data.ts` (`PROJECTS`). The CLI, virtual FS, and other parts of the app use `PROJECTS` from `cli-data`. If `PROJECTS` is updated and `work-section.tsx` is not, the Work section will show outdated or different projects than the CLI and the rest of the app, making it easy to get out of sync. The same pattern exists in `app/portfolio/page.tsx`, which uses its own `projects` array. Centralizing on `constants/cli-data.ts` (or a single source of truth) would reduce drift.

**Affected files:** `components/organisms/work-section.tsx`, `constants/cli-data.ts`; related: `app/portfolio/page.tsx`

## Type
Maintainability / Data

## Severity / Priority
Medium

## User Context
