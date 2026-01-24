# Bug: Open command — case-sensitive checks for github and linkedin

## Title
Open command does not match "GitHub" or "LinkedIn" (case-sensitive)

## Description
In `components/features/cli/commands/open.ts`, the checks `input === "github"` and `input === "linkedin"` (and `"gh"` / `"li"`) are case-sensitive. Inputs like `open GitHub` or `open LinkedIn` do not match and fall through to project matching or the `https://` fallback, producing wrong or invalid URLs. The `resume` branch correctly uses `input.toLowerCase() === "resume"`. The github and linkedin branches should use `input.toLowerCase()` (e.g. `input.toLowerCase() === "github"` or `input.toLowerCase() === "gh"`).

**Affected file:** `components/features/cli/commands/open.ts`

## Type
Logic

## Severity / Priority
Medium
