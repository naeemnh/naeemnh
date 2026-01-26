# Bug: Dock section scroll can place content under fixed header

## Title
Scrolling to a section via the dock can hide the top of the section under the fixed header

## Description
In `components/atoms/app-icon.tsx`, when `sectionId` is used, the handler does `window.scrollTo({ top: element.offsetTop, behavior: "smooth" })`. The fixed header at the top of the page overlays the viewport, so the first portion of the section (roughly the header height) can end up underneath it. The user may not see the section heading or the first lines. Using `scroll-margin-top` on sections or offsetting the scroll target by the header height (e.g. `elementTop - headerHeight`) would avoid the overlap.

**Affected files:** `components/atoms/app-icon.tsx`; potentially `components/atoms/section.tsx` or section styles for `scroll-margin-top`

## Type
UX

## Severity / Priority
Medium

## User Context
