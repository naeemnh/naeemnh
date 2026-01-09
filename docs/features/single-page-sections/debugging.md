# Debugging the Vertical Carousel

## Enabling Logs

The carousel includes comprehensive logging to help debug scroll behavior. To enable detailed logs:

1. Open your browser's developer console (F12 or Cmd+Option+I)
2. Run this command:
   ```javascript
   localStorage.setItem('carousel-debug', 'true')
   ```
3. Refresh the page or scroll to see logs

## Disabling Logs

To disable logging:
```javascript
localStorage.removeItem('carousel-debug')
```

## Log Types

### Info Logs (ℹ️)
- Section initialization
- Section boundary updates
- Dock navigation triggers
- Scroll handler activation

### Debug Logs (🔍)
- Detailed scroll position tracking
- Boundary checks
- Internal scrolling detection
- Threshold calculations

### Warning Logs (⚠️)
- Fallback behaviors (e.g., using first section when none found)
- No next section available

### Error Logs (❌)
- **Always logged** (even when debug is disabled)
- Missing section elements
- Invalid scroll positions
- Invalid calculations (NaN, Infinity)
- Unexpected null/undefined values

### Section Change Logs (📍)
- When sections change and why (snap, dock navigation, etc.)

### Threshold Logs (🎯)
- Velocity and distance calculations
- Whether thresholds are met
- Reason for threshold decision

## Example Log Output

```
[Carousel 14:23:45.123] ℹ️ Initializing carousel {sectionIds: Array(4), enabled: true}
[Carousel 14:23:45.234] ℹ️ Found 4 section boundaries ["portfolio", "blog", "about", "contact"]
[Carousel 14:23:45.345] 🔍 Current section: portfolio {scrollY: 0, viewportCenter: 400, ...}
[Carousel 14:23:46.123] 🔍 isAtSectionEnd check: false {scrollY: 150, scrollBottom: 750, ...}
[Carousel 14:23:46.456] 🎯 Threshold Check: velocity=8.5, distance=200, direction=down, meets=true (atEnd+down: velocity=true OR distance>=160)
[Carousel 14:23:46.457] 📍 Section Change: portfolio → blog (snap)
[Carousel 14:23:46.500] ℹ️ Dock navigation triggered {sectionId: "about"}
```

## Common Issues to Look For

1. **"Section element not found"** - Check that all section IDs exist in the DOM
2. **"Invalid scroll position: negative value"** - Browser scroll issue
3. **"No section boundaries found"** - Sections not rendered yet or IDs mismatch
4. **"Threshold not met, bouncing back"** - User didn't scroll hard enough to trigger section change
5. **"No next section available"** - At first/last section, trying to scroll beyond

## Performance Note

Logging has minimal performance impact when disabled. When enabled, it may add slight overhead during rapid scrolling. Disable for production builds if needed.

