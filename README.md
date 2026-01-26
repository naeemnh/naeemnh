# Naeem Hussain — Personal Portfolio

A modern portfolio site with **two interfaces**: a graphical single-page UI and a **CLI/terminal mode**. Built with Next.js, TypeScript, and Tailwind CSS. The home page switches between GUI and CLI via `?mode=cli`; both share the same data and contact/blog/resume flows.

---

## Features

### Dual interface (GUI + CLI)

- **GUI mode (default)**  
  Single-page layout with fixed header, bottom dock, and scrollable sections. Access CLI via the terminal icon in the header when `CLI_ENABLED` is set.

- **CLI mode** (`/?mode=cli`)  
  Terminal-style UI with a virtual filesystem, command history, and 25+ commands. Use `exit` or the monitor icon to return to GUI. CLI mode is shareable via the `mode=cli` URL.

### GUI features

| Feature | Description |
|--------|-------------|
| **Header** | Site name (scroll to home), CLI toggle when `CLI_ENABLED` is true |
| **Dock** | Fixed bottom bar: Home, Work, Blog (if enabled), About, Contact, divider, Settings. Section icons scroll to the corresponding section. |
| **Settings panel** | Theme (Light / Dark / System), Background animation on/off. Persists animation preference in `localStorage`. |
| **Canvas animation** | Optional starfield background (light/dark aware). Toggle in Settings. |
| **Hero** | Tagline, CTAs (View My Work, Get In Touch), “Open to opportunities” status |
| **Work** | Project cards (from `constants/cli-data` or local overrides) |
| **Blog** | Blog cards linking to `/blog/[slug]`. Shown only when `BLOGS_ENABLED` is true. |
| **About** | Bio, skills, experience timeline |
| **Contact** | Form (Resend), LinkedIn/GitHub links, resume download, availability |

### CLI features

| Feature | Description |
|--------|-------------|
| **Virtual filesystem** | Directories: `/home`, `/about`, `/work/projects`, `/work/experience`, `/blog`, `/contact`. `form.exe` under `/contact` runs the interactive contact form. |
| **Command parsing** | Quoted args, `./executable` → `run` command |
| **Output** | Capped at 1000 lines for performance. `clear` / `cls` to clear. |
| **Form in CLI** | `form` or `run form.exe` / `./contact/form.exe` for an interactive contact flow (name → email → subject → message → submit via `/api/contact`). `cancel` exits the form. |

#### CLI commands

| Command | Aliases | Description |
|---------|---------|-------------|
| `help` | `?` | List commands or `help <cmd>` for usage |
| `clear` | `cls` | Clear terminal output |
| `exit` | `quit`, `q` | Leave CLI, back to GUI |
| `echo` | — | Print arguments |
| `date` | `time` | Current date/time |
| `ls` | `list`, `dir` | List VFS paths |
| `cd` | `navigate` | Change directory (`~`, `..`, `../x`) |
| `pwd` | — | Print current directory |
| `cat` | `view`, `read`, `show` | Show file content |
| `run` | — | Run VFS executables (e.g. `run form.exe`, `./contact/form.exe`) |
| `form` | — | Interactive contact form in CLI |
| `whoami` | — | Name and tagline |
| `skills` | `tech` | Skills/technologies |
| `experience` | `exp`, `work` | Work history; `experience <company>` for one |
| `projects` | `portfolio` | Projects; `projects <name>` for one |
| `contact` | — | Contact info |
| `resume` | `cv` | Resume info; `resume download` opens download URL |
| `github` | `gh` | Open GitHub |
| `linkedin` | `li` | Open LinkedIn |
| `links` | `social` | List social links |
| `open` | — | `open <url>` or `open resume` etc. Open in new tab |
| `history` | — | Command history |
| `blog` | — | List posts (when `BLOGS_ENABLED`); `blog <slug>` hint |
| `read` | — | `read <slug>` for a post (when `BLOGS_ENABLED`) |

### Pages and routes

| Route | Description |
|-------|-------------|
| `/` | Home: GUI or CLI based on `?mode=cli` |
| `/blog` | Blog list in an app window |
| `/blog/[slug]` | Blog post (react-markdown, remark-gfm) |
| `/portfolio` | Standalone portfolio (app window, own project data) |

### API

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/contact` | POST | Contact form. Validates `name`, `email`, `subject`, `message`; sends via Resend. HTML template, reply-to set to sender. XSS/header sanitization. |
| `/api/og` | GET | `?url=` — server-side Open Graph fetch (title, description, image, url, siteName). Used by `lib/og-server` / `lib/og-utils`. |

### SEO and meta

- Root metadata (title, description, keywords, authors, openGraph, twitter) from `constants/metadata`
- `app/robots.ts`: allow `/`, disallow `/api/`, sitemap `https://naeemnh.com/sitemap.xml`
- `app/sitemap.ts`: base URL

### Theming and accessibility

- **next-themes**: light / dark / system
- **Animation**: starfield on/off in Settings; preference in `localStorage`

---

## Tech stack

| Category | Choice |
|----------|--------|
| Framework | Next.js 16 |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP, `@gsap/react` |
| Theme | next-themes |
| Markdown | react-markdown, remark-gfm |
| Email | Resend |
| Other | clsx, tailwind-merge, date-fns, gray-matter, reading-time, react-intersection-observer, open-graph-scraper, lucide-react |

---

## Getting started

### Prerequisites

- Node.js 18+
- npm or yarn

### Install

```bash
git clone <your-repo-url>
cd naeemnh
npm install
```

### Environment variables

Create `.env.local` and set:

| Variable | Required | Description |
|----------|----------|-------------|
| `RESEND_API_KEY` | For contact | Resend API key |
| `CONTACT_FORM_RECIPIENT_EMAIL` | For contact | Where form submissions are sent |
| `RESEND_FROM_EMAIL` | For contact | Sender (e.g. `onboarding@resend.dev` for testing) |
| `RESUME_URL` or `NEXT_PUBLIC_RESUME_URL` | Optional | Resume PDF URL (direct download). `resume download` and GUI use it. |
| `CLI_ENABLED` or `NEXT_PUBLIC_CLI_ENABLED` | Optional | `"true"` to show CLI toggle and enable CLI mode |
| `BLOGS_ENABLED` or `NEXT_PUBLIC_BLOGS_ENABLED` | Optional | `"true"` to show Blog in GUI dock/section and `blog`/`read` in CLI |

### Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). For CLI: [http://localhost:3000?mode=cli](http://localhost:3000?mode=cli).

---

## Email (contact form)

Contact (GUI and CLI `form`) uses **Resend**.

1. Sign up at [resend.com](https://resend.com).
2. Create an API key and set `RESEND_API_KEY`.
3. Set `CONTACT_FORM_RECIPIENT_EMAIL` and `RESEND_FROM_EMAIL` (use `onboarding@resend.dev` for testing; verify your domain for production).

Reply-to is the submitter’s email so you can reply from your client.

---

## Customization

### Core data (GUI + CLI)

Edit **`constants/cli-data.ts`**:

- `PERSONAL_INFO` — name, tagline, subtitle, availability
- `SKILLS` — skills list
- `EXPERIENCE` — work history
- `PROJECTS` — projects (Work section and CLI)
- `SOCIAL_LINKS` — GitHub, LinkedIn
- `ABOUT_TEXT` — about text used in CLI and About section

### Blog

- **GUI `BlogsSection`**: `components/organisms/blogs-section.tsx` — edit the `blogPosts` array or hook up to CMS/markdown.
- **`/blog` and `/blog/[slug]`**: `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` — replace placeholder data or wire to `content/blog` + gray-matter.

### Portfolio page

`app/portfolio/page.tsx` uses its own `projects` array. Update there or refactor to use `constants/cli-data`.

### Metadata and SEO

- **`constants/metadata.ts`** — site-wide metadata.
- **`app/sitemap.ts`** — add `/blog`, `/portfolio`, and dynamic blog slugs as needed.
- **`app/robots.ts`** — adjust rules if you add more routes.

### Resume

- Set `RESUME_URL` (or `NEXT_PUBLIC_RESUME_URL`) to the PDF URL.  
- `resume download` in CLI and the Contact section “Download PDF” use it. The implementation may append `1` for a direct-download variant; see `components/pages/cli.tsx` and `Env.RESUME_URL`.

### Wallpaper / assets

- Add images under `public/` (e.g. `wallpaper.jpg`, `placeholder-project.jpg`) and reference them in components.

---

## Project structure

```
├── app/
│   ├── api/
│   │   ├── contact/route.ts    # Contact form (Resend)
│   │   └── og/route.ts        # Open Graph proxy
│   ├── blog/
│   │   ├── [slug]/page.tsx
│   │   └── page.tsx
│   ├── portfolio/page.tsx
│   ├── layout.tsx
│   ├── page.tsx               # Home: CLI or GUI
│   ├── not-found.tsx
│   ├── globals.css
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── atoms/                 # Section, ContentCard, AppIcon
│   ├── molecules/             # AppWindow, BlogCard, WorkCard, Clock, InterfaceModeButton
│   ├── organisms/             # Header, Dock, SettingsPanel, CanvasAnimation,
│   │                           # HeroSection, WorkSection, BlogsSection, AboutSection, ContactSection
│   ├── features/cli/          # TerminalWindow, TerminalInput, TerminalOutput, commands, VFS, etc.
│   ├── icons/
│   └── pages/                 # CLI, GUI
├── config/env.ts              # Env flags (RESUME_URL, CLI_ENABLED, BLOGS_ENABLED, Resend)
├── constants/
│   ├── cli-data.ts            # PERSONAL_INFO, SKILLS, EXPERIENCE, PROJECTS, SOCIAL_LINKS, ABOUT_TEXT
│   ├── metadata.ts
│   └── index.ts
├── hooks/                     # useMediaQuery, useIsDesktop, useIsMobile, useWindowSize, useOpenGraph
├── lib/                       # utils, og-server, og-utils
├── providers/                 # ThemeProvider, InterfaceModeProvider, AnimationPreferencesProvider
├── types/
└── docs/                      # Feature notes, CLI commands, etc.
```

---

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

---

## Deployment (e.g. Vercel)

1. Push to GitHub and import in Vercel.
2. Add the env vars above in the Vercel project.
3. Deploy. Set your domain (e.g. `naeemnh.com`) in Vercel.

---

## Future ideas

- Cmd+K search
- RSS for the blog
- Project tags/filtering
- Career timeline view
- Markdown-based blog in `content/blog` with gray-matter + `reading-time`
- More sitemap entries for `/blog`, `/portfolio`, `/blog/[slug]`

---

## License

MIT

## Author

Naeem Hussain — [naeemnh.com](https://naeemnh.com)
