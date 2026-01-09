# Single-Page Sections Feature

## Overview

This feature converts the multi-page application into a single-page application where all navigation occurs through scrolling to different sections on the same page.

## Documentation Structure

- **requirements.md** - Detailed requirements and specifications
- **use-cases.md** - User stories and use cases
- **implementation-notes.md** - Technical implementation details
- **bugs.md** - Bug tracking and testing checklist
- **README.md** - This file, overview and quick reference

## Quick Reference

### Sections
- `#portfolio` - Portfolio projects showcase
- `#blog` - Blog posts listing
- `#about` - About me, skills, and experience
- `#contact` - Contact form and social links

### Key Features
- Sections have minimum height of 100vh
- Sections snap to top when navigated to
- Long sections are scrollable within their bounds
- Smooth transitions between sections
- Hash-based URL routing for browser navigation

### Implementation Files
- `app/page.tsx` - Main single-page layout
- `hooks/use-scroll-to-section.ts` - Scroll navigation hook
- `hooks/use-section-scroll.ts` - Section tracking hook
- `components/app-icon.tsx` - Updated for section navigation
- `app/globals.css` - Scroll snap CSS

## Testing

See `bugs.md` for complete testing checklist.

## Future Enhancements

- Active section highlighting in dock
- Keyboard shortcuts
- Scroll progress indicator
- Section transition animations

