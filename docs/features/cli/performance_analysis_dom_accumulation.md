## Performance analysis: DOM accumulation

Yes, this is a real issue. Here’s a concise breakdown:

### The problem

With a fixed input at the bottom and commands/outputs scrolling up, each interaction adds DOM elements:
- 1 command line element
- Multiple output line elements (varies by command)
- Over time: thousands to hundreds of thousands of elements

### Performance impact

1. Rendering: React reconciliation becomes expensive with large trees
2. Memory: ~1–2KB per element → 10,000 elements ≈ 10–20MB
3. Scrolling: Browser must track positions of all elements
4. UX: Laggy input, slow feedback, potential browser freeze

### Thresholds

- < 1,000 elements: Fine
- 1,000–10,000: Noticeable slowdown
- 10,000–100,000: Significant issues
- > 100,000: Browser may freeze/crash

### Solutions (ranked)

#### 1. Output limiting (MVP)
Keep only the last N lines in memory/DOM.

```typescript
const MAX_OUTPUT_LINES = 1000;

const addOutput = (newLines: OutputLine[]) => {
  setOutput(prev => {
    const updated = [...prev, ...newLines];
    // Keep only last N lines
    return updated.length > MAX_OUTPUT_LINES 
      ? updated.slice(-MAX_OUTPUT_LINES)
      : updated;
  });
};
```

Pros: Simple, predictable memory, no extra deps  
Cons: Old output is lost (unless persisted)  
Recommendation: Start with 500–1000 lines, make configurable

#### 2. Virtual scrolling (production)
Render only visible elements using `react-window` or `@tanstack/react-virtual`.

```typescript
import { FixedSizeList } from 'react-window';

<FixedSizeList
  height={600}
  itemCount={output.length}
  itemSize={24} // line height
  width="100%"
>
  {({ index, style }) => (
    <div style={style}>
      <OutputLine line={output[index]} />
    </div>
  )}
</FixedSizeList>
```

Pros: Excellent performance even with millions of lines  
Cons: More complex, requires fixed/estimated heights  
Recommendation: Use for production if you need to keep more history

#### 3. Hybrid (best balance)
Combine output limiting + virtual scrolling:
- Keep last 10,000 lines in memory
- Virtual scrolling renders only visible ones
- Optionally persist older lines to IndexedDB

#### 4. Clear command (always include)
Let users clear output:
- `clear` removes all output
- `clear --keep N` keeps last N lines
- Optional auto-clear after X commands

### Recommended implementation plan

Phase 1 (MVP):
1. Output limiting (500–1000 lines)
2. `clear` command
3. Monitor performance

Phase 2 (if needed):
1. Add virtual scrolling (`react-window`)
2. Increase limit (virtualization handles rendering)
3. Add configuration

### Additional considerations

- Mobile: Lower limits (200–500 lines)
- Variable heights: Use `VariableSizeList` if needed
- Accessibility: Ensure screen readers and keyboard nav work with virtualization
- Monitoring: Track DOM count, output length, memory usage

### Questions

1. Expected usage: How many commands might users run in a session?
2. Output size: Do commands produce many lines (e.g., `ls` with 100+ items)?
3. History: Do users need to scroll back far, or is recent output enough?
4. Mobile: Will this be used heavily on mobile?

I can:
- Create a detailed performance analysis document
- Provide code examples for output limiting or virtual scrolling
- Help implement whichever approach you prefer

Which approach should we start with?