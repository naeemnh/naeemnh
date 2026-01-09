# Website Requirement Document

## 1. Overview & Purpose

The main purpose of my website is to showcase my work/portfolio.
This will be my public portfolio that not only shows my work, but also allows users to reach out to me, be it a fellow developer or an organization looking to hire me.

**Key Points:**

- Portfolio showcase (projects, code samples, case studies)
- Contact mechanism for developers and hiring organizations
- Public-facing professional presence

## 2. Goals & Objectives

I need my website to have the behavior of a desktop and mobile depending on the screen being used by the user.
Pages are different applications used by the user such as my work, about me, contact me, etc.

**Responsive Behavior:**

- Desktop: Full desktop computer interface experience
- Mobile: Full mobile device interface experience
- Pages function as separate "apps" within the device interface

**Measurable Goals:**

- Showcase 2-3 portfolio projects initially
- Enable contact form submissions and resume downloads
- Achieve 90+ Lighthouse performance scores

## 3. Target Audience

My target audience is fellow developers to admire my website, and corporations looking to hire me.

**Audience Details:**

- Fellow developers (all levels: junior, mid-level, senior, tech leads)
- Corporations (startups, agencies, enterprise - all industries)
- Technical background: Accessible to both technical and non-technical audiences (recruiters)

## 4. Core Features & Functionality

### User Features

- Browse through different applications/pages
- View portfolio projects/work
- Read blog posts
- Contact the owner
- Download resume

### Portfolio/Work Section

- **Display:** Card-based layout
- **Project Details:** Title, description, tech stack, optional image (with placeholder fallback), and link
- **Initial Projects:** 2-3 projects
- **Media:** Single image per project (screenshots)

### Blog Section

- **Format:** Markdown-based posts
- **Features:**
  - Optional featured images
  - Reading time estimates
  - Individual blog post pages
- **Future:** RSS feed, search functionality (Cmd+K)

### Contact Section

- **Form Fields:** Name, email, message, subject
- **Email Integration:** Zoho email (free tier) - requires email library recommendation
- **Social Links:** LinkedIn and GitHub

### Home Page

- **Desktop/Mobile Interface:**
  - App icons for Blog and Contact
  - Custom wallpaper (user-provided)
  - Ticking clock (e.g., 13:25 with blinking ":")
  - "Connect With Me" button → Modal with email input and dropdown for reason to contact
  - Welcome message: TBD

### About Section

- **Content:**
  - Skills/technologies (yes)
  - Experience timeline (yes)
  - Personal bio (future)
  - Education (no)
  - Photo/avatar (no)

### Resume

- **Hosting:** Vercel public folder
- **Format:** PDF
- **Version Control:** Git with GitHub
- **Optimization:** Basic strategy needed (not priority initially)

## 5. Design & Visual Identity

The look and feel must be MacBook/iPhone-like interface.
Sleek rounded corners, but not too extra.

**Design Specifications:**

- **Color Scheme:**
  - Light mode (default) and dark mode toggle
  - Apple-inspired palette (white/gray/blue)
  - Accent colors: TBD
- **Typography:**
  - System fonts (SF Pro preferred, fallback to system fonts)
  - Font hierarchy: TBD
- **UI Elements:**
  - Rounded corners (moderate, not excessive)
  - Subtle shadows (macOS/iOS style)
  - Smooth, spring-like animations
  - Generous spacing (Apple design language)
- **Icons:**
  - SF Symbols-like style preferred
  - Custom icons where needed

## 6. User Experience (UX)

Users on desktop should be able to interact with the website as if it's a computer.
Users on mobile should be able to interact with the website as if it's a mobile.

**Desktop Interactions:**

- Window management (minimize, maximize, close buttons)
- Draggable windows
- App switching via app icons
- Dock/taskbar with app icons
- Menu bar (TBD)
- Multi-window support or single window (TBD)

**Mobile Interactions:**

- App icon grid on home screen
- Swipe gestures for navigation
- Bottom navigation bar or tab bar
- App switching via app switcher view

**Navigation:**

- Each app has its own route
- Modal views for content (not separate pages)
- Smooth transitions between apps
- Keyboard shortcuts (future: Cmd+K for search)

**Animations:**

- Smooth page transitions
- Loading states
- Micro-interactions (button presses, hover effects)

## 7. Content Requirements

### Home Page

- Desktop/mobile screen interface
- App icons (Blog, Contact)
- Custom wallpaper
- Ticking clock with blinking colon
- "Connect With Me" modal (email + reason dropdown)
- Welcome message: TBD

### Portfolio App

- Card-based project display
- 2-3 initial projects
- Each project: Title, description, tech stack, optional image (with placeholder), link

### Blog App

- Blog list page
- Individual blog post pages (`/blog/[slug]`)
- Markdown format
- Optional featured images
- Reading time estimates

### Contact App

- Contact form (Name, email, message, subject)
- Social links (LinkedIn, GitHub)
- Email integration via Zoho

### About App

- Skills/technologies section
- Experience timeline
- Future: Personal bio

### Resume Download

- PDF format
- Accessible from multiple locations
- Hosted on Vercel

## 8. Technical Requirements

### Framework/Stack

- **Framework:** Next.js (confirmed)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Hosting:** Vercel
- **Domain:** naeemnh.com

### SEO

- Meta tags (title, description, OG tags)
- Structured data (JSON-LD)
- Sitemap
- robots.txt
- Open Graph images

### Performance

- **Target Lighthouse Score:** 90+
- **Image Optimization:** Next.js Image component
- **Code Splitting:** Basic implementation
- **Lazy Loading:** Yes

### Browser Support

- **Desktop:** Chrome, Safari, Firefox, Edge (all recent versions)
- **Mobile:** iOS Safari, Chrome Mobile (all recent versions)
- **Minimum Versions:** TBD (modern browsers)

### Accessibility

- **WCAG Compliance:** Level A
- **Keyboard Navigation:** Major feature (post-launch priority)
- **Screen Reader Support:** Yes

### Analytics

- **Platform:** Google Analytics (GA4)
- **Setup:** Will be provided in due time
- **Privacy:** No GDPR/cookie consent initially

### Form Handling

- **Method:** API routes within Next.js
- **Email Service:** Zoho (free tier) - requires library recommendation
- **Environment Variables:** Yes (for email configuration, API keys)

### Third-Party Integrations

- To be determined based on analysis

## 9. Pages & Site Structure

### Complete Page List

1. **Home** (`/`) - Desktop/mobile interface
2. **Portfolio** (`/portfolio`) - Portfolio app
3. **About** (`/about`) - About app
4. **Blog** (`/blog`) - Blog list
5. **Blog Post** (`/blog/[slug]`) - Individual blog posts
6. **Contact** (`/contact`) - Contact app
7. **404** - Custom 404 design

### URL Structure

```
/                    → Home (desktop/mobile interface)
/portfolio           → Portfolio app
/about               → About app
/blog                → Blog list
/blog/[slug]         → Individual blog posts
/contact             → Contact app
```

### Navigation Pattern

- Modal views for content (not separate pages)
- Each app accessible via app icons on home screen
- Smooth transitions between apps

## 10. Branding & Messaging

### Tone & Voice

- **Balance:** Professional and friendly (balanced)
- **Technical Depth:** Accessible (avoid heavy jargon)
- **Personality:** Analytical and collaborative
- **Writing Style:** First person ("I"), casual, concise

### Key Messages

- **Value Proposition:** "I am a person who constantly learns at an unmatched pace" (softened by 70%)
- **Remember Me For:** Open to collaboration and learning and a strong candidate for hire
- **Call-to-Actions:**
  - Hire me
  - Collaborate
  - Learn more (via email)

### Visual Branding

- **Logo/Personal Mark:** `<N/>` (Like an HTML Element)
- **Favicon:** To be created
- **Color Usage:** Consistent, developer-friendly palette

## 11. Success Metrics

### Analytics Platform

- Google Analytics (GA4)

### Key Metrics to Track

- Page views and unique visitors
- Time on site
- Bounce rate
- Contact form submissions
- Resume downloads
- Blog post engagement (read time)
- Portfolio project views/clicks

### Conversion Goals

- **Primary Conversions:** Contact form submissions and resume downloads
- **Target Conversion Rate:** TBD (baseline to be established)

### Traffic Sources

- Organic search: Yes
- Social media: Not needed
- Direct traffic: Yes
- Referrals: Yes

### User Behavior Analysis

- Most visited pages
- User flow analysis
- Device breakdown (Desktop vs. mobile usage)

### Review Timeline

- **Frequency:** Monthly
- **Baseline:** No expectations yet - future performance will shape it

## 12. Future Considerations

### Search Functionality (Post-Launch)

- **Searchable Content:** Blog posts and portfolio projects
- **UI/UX:** Command palette style with Cmd+K
- **Display:** Live search results below query (no separate results page)

### CLI/Terminal UI Version (Future)

- **Purpose:** Entire website in terminal/browser UI
- **Target:** Desktop users
- **Style:** Fun, terminal-inspired UI in browser
- **Not:** A library, but a different UI version

### Additional Features

- **Dark/Light Mode Toggle:** Yes (default: light)
- **Multi-language Support:** No (English only)
- **RSS Feed:** Yes (for blog)
- **Newsletter Signup:** Not now
- **Guestbook/Testimonials:** No
- **Project Filtering/Tagging:** Yes (future)
- **Interactive Demos/Code Playgrounds:** No
- **Timeline/Career Journey Visualization:** Yes

## Notes & Recommendations

### Email Integration for Zoho

Since you're using Zoho's free tier, here are recommended libraries/approaches:

- **Resend** (recommended): Modern email API, free tier available, easy Next.js integration
- **SendGrid**: Free tier, good documentation
- **Nodemailer with SMTP**: Direct SMTP connection to Zoho
- **Next.js API Routes + Zoho SMTP**: Custom implementation using nodemailer

**Recommendation:** Use Resend or implement Nodemailer with Zoho SMTP credentials for direct integration.

### Resume Optimization Strategy

- Compress PDF using tools like `pdf-lib` or online compressors
- Target file size: < 500KB ideally
- Use Next.js Image optimization patterns for any embedded images
- Consider lazy loading the resume download

### Keyboard Navigation Priority

Since keyboard navigation is a post-launch priority, ensure:

- All interactive elements are keyboard accessible
- Focus states are clearly visible
- Tab order is logical
- Skip links for main content
