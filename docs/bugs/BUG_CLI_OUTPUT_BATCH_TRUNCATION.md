# Bug: CLI output — start of very long command output is dropped

## Title
Single-command output over 1000 lines loses the beginning

## Description
The CLI limits total output to 1000 lines (in `cliReducer` for `ADD_OUTPUT` and in `TerminalOutput`). When a single command produces more than 1000 lines, `slice(-1000)` keeps only the last 1000. The first portion of that command’s output is discarded, so the user never sees the start. There is no indication that truncation occurred. This can be surprising for commands that produce long listings or large blocks of text.

**Affected files:** `components/pages/cli.tsx` (reducer), `components/features/cli/terminal-output.tsx`

## Type
Logic / UX

## Severity / Priority
Low
