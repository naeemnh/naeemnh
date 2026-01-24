# Bug: Contact API accepts non-string fields and whitespace-only message

## Title
Contact form API validation has edge cases for types and whitespace

## Description
In `app/api/contact/route.ts`, validation uses `!name`, `!email`, `!subject`, `!message`. This accepts:
- **Non-string values:** e.g. `name: 123` or `name: []` — both are truthy, so the check passes. `escapeHtml(String(...))` mitigates some risk, but the API does not enforce `typeof` for strings.
- **Whitespace-only content:** e.g. `message: "   "` is truthy and is accepted. The email would be sent with an effectively empty message.

Tightening validation (e.g. `typeof name === "string"` and `name.trim().length > 0`, and similar for other fields) would make behavior clearer and avoid misleading submissions.

**Affected file:** `app/api/contact/route.ts`

## Type
Validation / Robustness

## Severity / Priority
Low
