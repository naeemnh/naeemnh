# Bug: Terminal input — global click steals focus

## Title
Any document click focuses the CLI input and can interrupt interaction

## Description
In `components/features/cli/terminal-input.tsx`, a `document`-level `click` listener calls `inputRef.current?.focus()`, so every click anywhere in the document focuses the command input. Clicking a link in the output, the scrollbar, or any other element inside or outside the terminal steals focus back to the input. This can be surprising or disruptive when the user is trying to select/copy output or interact with other parts of the page.

**Affected file:** `components/features/cli/terminal-input.tsx`

## Type
UX

## Severity / Priority
Low

## User Context
