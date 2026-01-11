# Personal Portfolio Website

A modern, device-inspired portfolio website built with Next.js, TypeScript, and Tailwind CSS. The site features a unique desktop/mobile interface design where each page functions as a separate "app" within the device interface.

## Features

- 🖥️ **Device Interface**: Desktop and mobile device-like interfaces
- 📱 **Responsive Design**: Optimized for all screen sizes
- 📝 **Blog**: Markdown-based blog with reading time estimates
- 💼 **Portfolio**: Showcase your projects with cards
- 📧 **Contact Form**: Integrated contact form with email support
- ⚡ **Performance**: Optimized for 90+ Lighthouse scores
- 🔍 **SEO**: Complete SEO setup with sitemap and robots.txt

## Tech Stack

- **Framework**: Next.js 16
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animations**: GSAP
- **Theme**: next-themes
- **Markdown**: react-markdown with remark-gfm

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone <your-repo-url>
cd personal-website
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your email configuration (see Email Setup below).

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Email Setup

The contact form uses Resend for email notifications. Follow these steps:

### Resend Setup

1. Sign up at [resend.com](https://resend.com) (free tier: 3,000 emails/month)
2. Get your API key from the Resend dashboard
3. Add to `.env.local`:

```bash
RESEND_API_KEY=re_your_api_key_here
CONTACT_FORM_RECIPIENT_EMAIL=your-email@zoho.com
RESEND_FROM_EMAIL=onboarding@resend.dev
```

**Note:**

- `RESEND_FROM_EMAIL` can use `onboarding@resend.dev` for testing, but for production you should verify your domain in Resend
- `CONTACT_FORM_RECIPIENT_EMAIL` is where you'll receive contact form submissions (your Zoho email)
- The form automatically sets the reply-to header to the user's email, so you can reply directly

### Option 2: Zoho SMTP

1. Create an app password in your Zoho account
2. Add to `.env.local`:

```
ZOHO_EMAIL=your-email@zoho.com
ZOHO_PASSWORD=your_app_password
ZOHO_HOST=smtp.zoho.com
ZOHO_PORT=587
```

3. Install nodemailer: `npm install nodemailer`
4. Update `app/api/contact/route.ts` to use nodemailer.

### Option 3: SendGrid

1. Sign up at [sendgrid.com](https://sendgrid.com)
2. Get your API key
3. Add to `.env.local`:

```
SENDGRID_API_KEY=your_api_key_here
```

## Customization

### Adding Portfolio Projects

Edit `app/portfolio/page.tsx` and update the `projects` array with your actual projects.

### Adding Blog Posts

1. Create markdown files in `content/blog/` (create this directory)
2. Update `app/blog/[slug]/page.tsx` to read from markdown files
3. Use `gray-matter` to parse frontmatter

### Updating About Section

Edit `app/about/page.tsx` and update the `skills` and `experience` arrays.

### Adding Your Wallpaper

1. Add your wallpaper image to `public/wallpaper.jpg`
2. Update the wallpaper div in `app/page.tsx` to use your image

### Updating Social Links

Edit `app/contact/page.tsx` and update the LinkedIn and GitHub URLs.

### Adding Resume

1. Add your resume PDF to `public/resume.pdf`
2. The download link in the contact page will automatically work

## Project Structure

```
├── app/
│   ├── about/          # About page
│   ├── blog/           # Blog pages
│   ├── contact/        # Contact page
│   ├── portfolio/      # Portfolio page
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── globals.css     # Global styles
│   ├── sitemap.ts      # SEO sitemap
│   └── robots.ts       # SEO robots.txt
├── components/         # React components
├── public/             # Static assets
└── docs/               # Documentation
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

The site will be available at `https://naeemnh.com` (configure your domain in Vercel).

## Performance

- Target Lighthouse Score: 90+
- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Optimized fonts and CSS

## SEO

- Meta tags for all pages
- Open Graph tags
- Structured data (JSON-LD)
- Sitemap.xml
- robots.txt

## Future Enhancements

- [ ] Cmd+K search functionality
- [ ] CLI/terminal UI version
- [ ] RSS feed for blog
- [ ] Project filtering/tagging
- [ ] Career timeline visualization
- [ ] Keyboard navigation (post-launch priority)

## License

MIT

## Author

Naeem - [naeemnh.com](https://naeemnh.com)
