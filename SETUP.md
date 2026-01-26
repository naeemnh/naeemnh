# Setup Checklist

## ✅ Completed

- [x] Project structure
- [x] Theme provider (light / dark / system, next-themes)
- [x] Interface mode provider (GUI ⇄ CLI via `?mode=cli` and state)
- [x] Home: GUI (single-page) or CLI (terminal) based on URL/state
- [x] CLI: virtual filesystem, 25+ commands, `form`, `run`, history, output cap
- [x] GUI: Header, Dock, Settings panel, Canvas animation (toggleable)
- [x] Sections: Hero, Work, Blog (optional), About, Contact
- [x] Contact form (GUI + CLI `form`), Resend API, `/api/contact`
- [x] Blog: `/blog`, `/blog/[slug]`, BlogsSection; react-markdown, remark-gfm
- [x] Portfolio: `/portfolio` (standalone app window)
- [x] SEO: metadata, `sitemap.ts`, `robots.ts`
- [x] Open Graph: `/api/og`, `lib/og-server`, `lib/og-utils`
- [x] 404 page
- [x] Resume: `RESUME_URL` for download in Contact and CLI `resume download`

---

## 📋 Setup Steps

### 1. Install Dependencies

```bash
npm install
```

Installs: Next.js 16, React 19, TypeScript, Tailwind v4, next-themes, GSAP, react-markdown, remark-gfm, gray-matter, reading-time, date-fns, Resend, clsx, tailwind-merge, lucide-react, react-intersection-observer, open-graph-scraper, and dev tools (ESLint, etc.).

---

### 2. Environment Variables

Create `.env.local` in the project root:

```bash
# Required for contact form
RESEND_API_KEY=re_xxxx
CONTACT_FORM_RECIPIENT_EMAIL=you@example.com
RESEND_FROM_EMAIL=onboarding@resend.dev

# Optional
RESUME_URL=https://...   # or NEXT_PUBLIC_RESUME_URL — for resume download (GUI + CLI)
CLI_ENABLED=true        # or NEXT_PUBLIC_CLI_ENABLED — show CLI toggle and enable ?mode=cli
BLOGS_ENABLED=true      # or NEXT_PUBLIC_BLOGS_ENABLED — show Blog in dock/section and blog/read in CLI
```

See **README.md** for Resend setup and `RESUME_URL` behavior.

---

### 3. Customize Content

| What | Where |
|------|-------|
| **Core data (GUI + CLI)** | `constants/cli-data.ts` — `PERSONAL_INFO`, `SKILLS`, `EXPERIENCE`, `PROJECTS`, `SOCIAL_LINKS`, `ABOUT_TEXT` |
| **Site metadata** | `constants/metadata.ts` |
| **Hero / About / Work (inline overrides)** | `components/organisms/home-section.tsx`, `about-section.tsx`, `work-section.tsx` |
| **Blog (main page)** | `components/organisms/blogs-section.tsx` — `blogPosts` array |
| **Blog routes** | `app/blog/page.tsx`, `app/blog/[slug]/page.tsx` — replace placeholders or wire to `content/blog` + gray-matter |
| **Portfolio page** | `app/portfolio/page.tsx` — own `projects` array |
| **Contact social links** | `components/organisms/contact-section.tsx` (and `constants/cli-data.ts` for CLI) |
| **Resume** | Set `RESUME_URL`; Contact “Download PDF” and CLI `resume download` use it |

---

### 4. Email (Contact Form)

Contact form (GUI and CLI `form`) uses **Resend**.

1. Sign up at [resend.com](https://resend.com).
2. Get an API key and set `RESEND_API_KEY`.
3. Set `CONTACT_FORM_RECIPIENT_EMAIL` and `RESEND_FROM_EMAIL` (e.g. `onboarding@resend.dev` for testing).

No extra packages: Resend is already in `package.json`. For other providers (e.g. nodemailer, SendGrid), change `app/api/contact/route.ts` and add the right deps.

---

### 5. Test the Site

```bash
npm run dev
```

Visit `http://localhost:3000` and check:

**GUI**

- [ ] Home loads; scroll through Hero, Work, Blog (if enabled), About, Contact
- [ ] Theme toggle in Settings (light / dark / system)
- [ ] Background animation toggle in Settings
- [ ] Dock icons scroll to the correct sections
- [ ] Contact form submits (with Resend configured)
- [ ] Resume download works when `RESUME_URL` is set
- [ ] If `CLI_ENABLED`: header shows terminal icon; click switches to CLI

**CLI** (`http://localhost:3000?mode=cli` or via header when `CLI_ENABLED`)

- [ ] Welcome message; `help` lists commands
- [ ] `ls`, `cd`, `pwd`, `cat` on the virtual FS
- [ ] `form` (or `run form.exe`, `./contact/form.exe`): full flow and submit
- [ ] `whoami`, `skills`, `experience`, `projects`, `contact`, `resume`, `resume download`
- [ ] `github`, `linkedin`, `links`, `open <url>`
- [ ] `exit` or monitor icon returns to GUI
- [ ] `clear` clears output

**Other**

- [ ] `/blog` and `/blog/[slug]` render
- [ ] `/portfolio` renders
- [ ] `/unknown` shows 404 and “Return Home”
- [ ] Dark mode and mobile layout

---

### 6. Deploy

1. Push to GitHub.
2. Connect the repo to Vercel (or similar).
3. Add the same env vars in the project settings.
4. Deploy. Point your domain (e.g. `naeemnh.com`) in the hosting dashboard.

---

## 🎨 Design

- **Colors / theme** — `app/globals.css`, Tailwind classes, next-themes.
- **Fonts** — `app/layout.tsx` (Inter from Google Fonts).
- **Icons** — `lucide-react`; custom in `components/icons/`.
- **Animation** — GSAP (Dock, Settings, etc.); canvas starfield in `components/organisms/canvas-animation.tsx`.

---

## 📁 Project Layout (summary)

```
app/           — page.tsx (home), layout, blog/, portfolio/, api/contact, api/og, robots, sitemap, not-found
components/    — atoms, molecules, organisms, features/cli, icons, pages (CLI, GUI)
config/        — env.ts (Env)
constants/     — cli-data, metadata
hooks/         — useMediaQuery, useIsDesktop, useIsMobile, useWindowSize, useOpenGraph
lib/           — utils, og-server, og-utils
providers/     — Theme, InterfaceMode, AnimationPreferences
types/
docs/          — features (CLI, single-page), WRD, etc.
```

---

## 📝 Notes

- **Blog**: `app/blog` and `BlogsSection` use local/placeholder data. To use markdown: add `content/blog`, use gray-matter + `reading-time`, and replace `getPost` / `blogPosts` (see README).
- **Portfolio**: `app/portfolio/page.tsx` has its own projects list; you can switch it to `constants/cli-data` for one source of truth.
- **OG API**: `/api/og?url=` and `lib/og-server` are used for fetching Open Graph data; `work-section` has commented-out OG usage you can re-enable.

---

## 🐛 Known Issues

- Linter may warn on some Tailwind classes (e.g. `bg-gradient-to-br`, `-z-[1]`); often safe to ignore with Tailwind v4.
- Project and blog placeholders use `/placeholder-project.jpg`; add real assets under `public/` or update paths.
