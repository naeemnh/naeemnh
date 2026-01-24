# Bug: Resume URL suffix 0/1 logic can produce invalid URLs

## Title
Resume URL "0" / "1" suffix logic is fragile and can create invalid URLs

## Description
In `resume.ts` and `open.ts`, and in `components/pages/cli.tsx`, the code appends or replaces the last character with `"0"` (view in browser) or `"1"` (direct download) when `RESUME_URL` does not already end in `"0"` or `"1"`. This appears to be a workaround for a specific hosting pattern (e.g. some Google Drive–style URLs). For many normal URLs (e.g. `https://example.com/resume.pdf`), appending `"0"` or `"1"` produces invalid URLs like `https://example.com/resume.pdf0` or `https://example.com/resume.pdf1`, which can break open/resume download. The logic is undocumented and easy to break when `RESUME_URL` format changes.

**Affected files:** `components/features/cli/commands/resume.ts`, `components/features/cli/commands/open.ts`, `components/pages/cli.tsx`

## Type
Logic / Fragility

## Severity / Priority
Low
