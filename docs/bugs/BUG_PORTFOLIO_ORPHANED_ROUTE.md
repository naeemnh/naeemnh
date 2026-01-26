# Bug: Portfolio route has no link in main navigation

## Title
/portfolio page is not linked from the main GUI or dock

## Description
The route `/portfolio` exists and renders a standalone portfolio (app window) with project cards, but there is no link to it from the main single-page GUI. The dock provides section-based navigation (home, work, blog, about, contact) and does not include portfolio. The Work section shows projects on the homepage, but the dedicated `/portfolio` page is only reachable by manually entering the URL. Users may not discover it.

**Affected area:** Navigation / routing; `components/organisms/dock.tsx`, `app/portfolio/page.tsx`

## Type
UX / Navigation

## Severity / Priority
Low

## User Context
