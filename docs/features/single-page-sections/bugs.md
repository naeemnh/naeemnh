# Single-Page Sections Feature - Bug Tracking

## Known Issues

### None Currently

## Testing Checklist

- [ ] Dock buttons scroll to correct sections
- [ ] Sections snap to top when navigated to
- [ ] Short sections maintain 100vh minimum height
- [ ] Long sections are scrollable within their bounds
- [ ] Scrolling at end of long section transitions to next section smoothly
- [ ] Browser back/forward works with hash URLs
- [ ] Direct hash links work (e.g., `/#portfolio`)
- [ ] Mobile touch scrolling works correctly
- [ ] Keyboard navigation works (Arrow keys, Page Up/Down)
- [ ] Viewport resize handles correctly
- [ ] Smooth animations throughout
- [ ] Fixed dock and top bar don't overlap content
- [ ] Sections don't jump unexpectedly during scroll

## Resolved Issues

### Issue: Sections not snapping to top
**Status**: Resolved  
**Solution**: Added CSS scroll-snap with `scroll-snap-align: start` and JavaScript scroll detection

### Issue: Dock navigation not working
**Status**: Resolved  
**Solution**: Updated AppIcon component to support `sectionId` prop and scroll behavior

## Future Improvements

- [ ] Add visual indicator for active section in dock
- [ ] Improve scroll detection for better accuracy
- [ ] Add keyboard shortcuts for section navigation
- [ ] Optimize scroll performance for very long sections
- [ ] Add smooth fade-in animations for section content

