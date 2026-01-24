# Bug: CLI form uses module-level global state

## Title
Form command stores state in a module-level variable; can leak across instances

## Description
In `components/features/cli/commands/form.ts`, `formState` is a module-level `let` (`let formState: FormState | null = null`). The form handler and helpers (`isFormInProgress`, `getFormPrompt`, `resetFormState`) read and write this shared variable. If the CLI were ever mounted more than once (e.g. in tests, or in a hypothetical multi-tab or re-mount scenario), or if the module is evaluated in different contexts, this global state could leak or collide between instances. The comment in the file acknowledges this: *"In a real implementation, this would be in CLI state."* Moving form state into the CLI React state (or a ref/context provided to the form command) would avoid this.

**Affected file:** `components/features/cli/commands/form.ts`

## Type
Architecture / State

## Severity / Priority
Medium
