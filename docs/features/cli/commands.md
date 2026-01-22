# CLI Commands Reference

## Core Navigation Commands

### `help` / `?`
- **Description**: Display available commands and usage
- **Usage**: `help [command]`
- **Example**: `help`, `help cd`

### `clear` / `cls`
- **Description**: Clear the terminal screen
- **Usage**: `clear`
- **Example**: `clear`

### `exit` / `quit` / `q`
- **Description**: Exit CLI mode and return to GUI
- **Usage**: `exit`
- **Example**: `exit`

## File System Style Commands

### `ls` / `list` / `dir`
- **Description**: List available sections/content
- **Usage**: `ls [path]`
- **Examples**: 
  - `ls` - List main sections
  - `ls projects/` - List projects
  - `ls blog/` - List blog posts

### `cd` / `navigate`
- **Description**: Navigate to a section
- **Usage**: `cd <section>`
- **Examples**:
  - `cd work` - Navigate to work section
  - `cd about` - Navigate to about section
  - `cd ..` - Go back to root
  - `cd ~` - Go to home

### `pwd`
- **Description**: Show current directory/section
- **Usage**: `pwd`
- **Example**: `pwd`

### `cat` / `view` / `read` / `show`
- **Description**: Display content of a file/section
- **Usage**: `cat <file>` or `cat <section>`
- **Examples**:
  - `cat about` - Show about section content
  - `cat projects/propwise` - Show specific project
  - `cat blog/my-post` - Show blog post

## Information Commands

### `whoami`
- **Description**: Display personal information
- **Usage**: `whoami`
- **Example**: `whoami`

### `skills` / `tech`
- **Description**: List skills and technologies
- **Usage**: `skills`
- **Example**: `skills`

### `experience` / `exp` / `work`
- **Description**: Display work experience
- **Usage**: `experience [company]`
- **Examples**:
  - `experience` - Show all experience
  - `experience propwise` - Show specific company

### `projects` / `portfolio`
- **Description**: List or view projects
- **Usage**: `projects [name]`
- **Examples**:
  - `projects` - List all projects
  - `projects propwise` - Show specific project details

### `contact`
- **Description**: Display contact information or open contact form
- **Usage**: `contact`
- **Example**: `contact`

### `resume` / `cv`
- **Description**: View or download resume
- **Usage**: `resume [download]`
- **Examples**:
  - `resume` - Display resume
  - `resume download` - Download resume PDF

## Social & Links Commands

### `github` / `gh`
- **Description**: Open GitHub profile
- **Usage**: `github`
- **Example**: `github`

### `linkedin` / `li`
- **Description**: Open LinkedIn profile
- **Usage**: `linkedin`
- **Example**: `linkedin`

### `links` / `social`
- **Description**: List all social links
- **Usage**: `links`
- **Example**: `links`

## Blog Commands

### `blog`
- **Description**: List blog posts or navigate to blog section
- **Usage**: `blog [slug]`
- **Examples**:
  - `blog` - List all posts
  - `blog my-post` - Read specific post

### `read`
- **Description**: Read a blog post
- **Usage**: `read <slug>`
- **Example**: `read getting-started-with-nextjs`

## Utility Commands

### `open`
- **Description**: Open a URL in new tab
- **Usage**: `open <url>`
- **Examples**:
  - `open https://github.com/username`
  - `open projects/propwise` - Open project URL

### `history`
- **Description**: Show command history
- **Usage**: `history`
- **Example**: `history`

### `echo`
- **Description**: Display text
- **Usage**: `echo <text>`
- **Example**: `echo Hello World`

### `date` / `time`
- **Description**: Show current date/time
- **Usage**: `date`
- **Example**: `date`

## Fun/Easter Egg Commands

### `neofetch` / `info`
- **Description**: Display system info in ASCII art style
- **Usage**: `neofetch`
- **Example**: `neofetch`

### `cowsay`
- **Description**: Display text in ASCII art cow
- **Usage**: `cowsay <text>`
- **Example**: `cowsay Hello!`

### `fortune`
- **Description**: Display a random quote or fact
- **Usage**: `fortune`
- **Example**: `fortune`

### `matrix`
- **Description**: Matrix-style animation (optional)
- **Usage**: `matrix`
- **Example**: `matrix`

## Command Aliases

- `?` → `help`
- `q` → `exit`
- `cls` → `clear`
- `dir` → `ls`
- `exp` → `experience`
- `cv` → `resume`
- `gh` → `github`
- `li` → `linkedin`
