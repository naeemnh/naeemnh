# Single-Page Sections Feature - Implementation Notes

## Architecture Changes

### Before
- Multiple pages: `/portfolio`, `/blog`, `/about`, `/contact`
- Each page wrapped in `AppWindow` component
- Navigation via Next.js routing

### After
- Single page with sections
- Sections: Portfolio, Blog, About, Contact
- Navigation via scroll to section IDs
- No `AppWindow` wrapper needed

## Implementation Approach

### 1. Section Structure
```tsx
<section id="portfolio" className="min-h-screen">
  {/* Portfolio content */}
</section>
<section id="blog" className="min-h-screen">
  {/* Blog content */}
</section>
<section id="about" className="min-h-screen">
  {/* About content */}
</section>
<section id="contact" className="min-h-screen">
  {/* Contact content */}
</section>
```

### 2. Scroll Behavior Options

#### Option A: CSS Scroll Snap (Recommended for simple cases)
- Use `scroll-snap-type: y mandatory` on container
- Use `scroll-snap-align: start` on sections
- Pros: Native browser support, smooth
- Cons: May conflict with internal section scrolling

#### Option B: JavaScript Scroll Management
- Use `scrollIntoView({ behavior: 'smooth', block: 'start' })`
- Track scroll position with Intersection Observer
- Handle scroll events to detect section boundaries
- Pros: Full control, handles complex cases
- Cons: More complex implementation

#### Option C: Hybrid Approach (Recommended)
- Use CSS scroll snap for section-to-section navigation
- Use JavaScript for internal section scrolling detection
- Combine both for best UX

### 3. Scroll Detection Strategy

```typescript
// Pseudo-code for scroll detection
const handleScroll = () => {
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  
  sections.forEach((section, index) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.scrollHeight;
    const sectionBottom = sectionTop + sectionHeight;
    
    // Check if section is in view
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      // Section is active
      // If section is taller than viewport and user is at bottom
      if (sectionHeight > viewportHeight && 
          scrollPosition + viewportHeight >= sectionBottom) {
        // Auto-scroll to next section
      }
    }
  });
};
```

### 4. Navigation Updates

#### Dock Button Click Handler
```typescript
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  element?.scrollIntoView({ 
    behavior: 'smooth', 
    block: 'start' 
  });
};
```

### 5. Hash Routing (Optional but Recommended)

For browser back/forward and direct links:
- Use hash URLs: `/#portfolio`, `/#blog`, etc.
- Listen to hash changes and scroll to section
- Update hash when section comes into view

```typescript
// Update hash on scroll
useEffect(() => {
  const handleScroll = () => {
    // Detect current section and update hash
    const currentSection = getCurrentSection();
    if (currentSection) {
      window.history.replaceState(null, '', `#${currentSection}`);
    }
  };
  
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// Handle hash on load
useEffect(() => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    scrollToSection(hash);
  }
}, []);
```

## Files to Modify

1. **app/page.tsx**
   - Convert to single-page with all sections
   - Add scroll navigation logic
   - Remove routing, add section IDs

2. **components/app-icon.tsx**
   - Update to scroll to sections instead of routing
   - Change `href` to `onClick` handler

3. **Remove/Update**:
   - `app/portfolio/page.tsx` → Move content to section in `app/page.tsx`
   - `app/blog/page.tsx` → Move content to section
   - `app/about/page.tsx` → Move content to section
   - `app/contact/page.tsx` → Move content to section
   - `components/app-window.tsx` → No longer needed (or keep for future use)

4. **Create**:
   - `hooks/use-scroll-to-section.ts` - Custom hook for section navigation
   - `hooks/use-section-scroll.ts` - Custom hook for scroll detection

## Testing Checklist

- [ ] Dock buttons scroll to correct sections
- [ ] Sections snap to top when navigated to
- [ ] Short sections maintain 100vh minimum height
- [ ] Long sections are scrollable
- [ ] Scrolling at end of section transitions to next
- [ ] Browser back/forward works (if hash routing implemented)
- [ ] Direct hash links work (e.g., `/#portfolio`)
- [ ] Mobile touch scrolling works
- [ ] Keyboard navigation works
- [ ] Viewport resize handles correctly
- [ ] Smooth animations throughout

## Performance Considerations

- Throttle scroll event handlers (use `requestAnimationFrame`)
- Use Intersection Observer for section visibility
- Debounce hash updates
- Consider virtual scrolling for very long sections (future optimization)

## Accessibility

- Ensure sections have proper ARIA labels
- Support keyboard navigation (Arrow keys, Page Up/Down)
- Maintain focus management during scroll
- Announce section changes to screen readers

