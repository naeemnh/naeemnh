# CLI Implementation Notes

## Architecture Overview

### Component Structure
```
CLI Component
├── TerminalWindow (container)
│   ├── TerminalHeader (optional)
│   ├── TerminalOutput (scrollable output area)
│   │   └── OutputLine (individual output lines)
│   └── TerminalInput (input area)
│       ├── Prompt
│       └── InputField
└── CommandProcessor (logic)
    ├── CommandRegistry
    ├── CommandParser
    └── CommandExecutor
```

## Key Implementation Details

### 1. Command Registry Pattern

```typescript
interface Command {
  name: string;
  aliases?: string[];
  description: string;
  usage?: string;
  handler: (args: string[], context: CLIContext) => CommandResult;
}

type CommandResult = {
  output: string | React.ReactNode;
  error?: string;
  exit?: boolean;
};

class CommandRegistry {
  private commands: Map<string, Command> = new Map();
  
  register(command: Command): void;
  get(name: string): Command | undefined;
  getAll(): Command[];
  findByNameOrAlias(input: string): Command | undefined;
}
```

### 2. Virtual File System

```typescript
interface VirtualFileSystem {
  structure: {
    [path: string]: {
      type: 'directory' | 'file';
      content?: string | (() => Promise<string>);
      children?: VirtualFileSystem;
    };
  };
  
  get(path: string): VirtualFileSystemNode | null;
  list(path: string): string[];
  exists(path: string): boolean;
}
```

### 3. State Management

```typescript
interface CLIState {
  currentDirectory: string;
  history: string[];
  historyIndex: number;
  output: OutputLine[];
  isProcessing: boolean;
}

interface OutputLine {
  type: 'command' | 'output' | 'error';
  content: string | React.ReactNode;
  timestamp?: Date;
}
```

### 4. Command Parsing

- Simple parser: split by spaces, handle quotes
- Support for: `command arg1 "arg with spaces" arg3`
- Future: support for flags (`--help`, `-h`)

### 5. Output Rendering

- Support both plain text and React components
- Format code blocks, lists, tables
- ANSI color codes (optional)
- Markdown rendering for blog posts

## Technical Stack

- **React**: Component framework
- **TypeScript**: Type safety
- **State**: React hooks (useState, useReducer)
- **Styling**: Tailwind CSS (matching existing project)
- **Parsing**: Custom parser or library (if needed)

## File Structure

```
components/
├── pages/
│   └── cli.tsx (main CLI component)
└── cli/
    ├── terminal-window.tsx
    ├── terminal-input.tsx
    ├── terminal-output.tsx
    ├── output-line.tsx
    ├── command-registry.ts
    ├── command-parser.ts
    └── commands/
        ├── index.ts
        ├── help.ts
        ├── ls.ts
        ├── cd.ts
        ├── cat.ts
        ├── whoami.ts
        ├── skills.ts
        ├── experience.ts
        ├── projects.ts
        ├── contact.ts
        ├── blog.ts
        └── ...
```

## Implementation Phases

### Phase 1: Basic Terminal UI
- Terminal window component
- Input field with prompt
- Output area
- Basic styling

### Phase 2: Command System
- Command registry
- Command parser
- Basic commands (help, clear, exit, ls, cd, pwd)

### Phase 3: Content Commands
- whoami, skills, experience, projects
- Content formatting
- Virtual file system

### Phase 4: Advanced Features
- Command history (arrow keys)
- Autocomplete (Tab)
- Blog reading
- Contact form integration

### Phase 5: Polish
- Animations
- Error handling improvements
- Accessibility
- Mobile support

## Styling Considerations

- Monospace font: `font-mono`
- Terminal colors: dark background, green/cyan text
- Cursor: blinking caret
- Scrollbar: minimal or hidden
- Responsive: adapt to screen size

## Performance Considerations

- Virtualize long output lists
- Debounce input handling
- Memoize command handlers
- Lazy load command modules

## Testing Strategy

- Unit tests for command handlers
- Integration tests for command parsing
- E2E tests for user flows
- Visual regression tests
