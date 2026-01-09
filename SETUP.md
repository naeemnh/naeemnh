# Setup Checklist

## ✅ Completed

- [x] Project structure created
- [x] Theme provider (dark/light mode)
- [x] Home page with device interface
- [x] Portfolio page
- [x] About page
- [x] Blog pages (list and individual)
- [x] Contact page with form
- [x] SEO setup (sitemap, robots.txt)
- [x] Window/modal components
- [x] Clock component
- [x] Connect modal

## 📋 Next Steps

### 1. Install Dependencies

Run this command to install all required packages:

```bash
npm install
```

This will install:
- next-themes (theme management)
- framer-motion (animations)
- react-markdown (blog markdown support)
- remark-gfm (GitHub-flavored markdown)
- gray-matter (markdown frontmatter parsing)
- reading-time (blog reading time)
- date-fns (date formatting)
- lucide-react (icons)

### 2. Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Then add your email configuration (see README.md for options).

### 3. Customize Content

#### Portfolio Projects
- Edit `app/portfolio/page.tsx`
- Replace placeholder projects with your actual projects
- Add project images to `public/` folder

#### About Section
- Edit `app/about/page.tsx`
- Update skills array
- Update experience timeline

#### Blog Posts
- Create `content/blog/` directory
- Add markdown files with frontmatter
- Update `app/blog/[slug]/page.tsx` to read from files

#### Social Links
- Edit `app/contact/page.tsx`
- Update LinkedIn and GitHub URLs

#### Wallpaper
- Add your wallpaper image to `public/wallpaper.jpg`
- Update `app/page.tsx` to use your image

#### Resume
- Add your resume PDF to `public/resume.pdf`
- The download link will work automatically

### 4. Email Integration

Choose one email service and implement it in `app/api/contact/route.ts`:

**Option 1: Resend (Recommended)**
```bash
npm install resend
```

**Option 2: Zoho SMTP**
```bash
npm install nodemailer
```

**Option 3: SendGrid**
```bash
npm install @sendgrid/mail
```

See README.md for detailed setup instructions.

### 5. Test the Site

```bash
npm run dev
```

Visit http://localhost:3000 and test:
- [ ] Home page loads correctly
- [ ] Theme toggle works
- [ ] Clock displays correctly
- [ ] App icons navigate to pages
- [ ] Portfolio page displays projects
- [ ] About page shows skills and experience
- [ ] Blog page lists posts
- [ ] Contact form submits (after email setup)
- [ ] Dark mode works
- [ ] Mobile responsive design

### 6. Deploy

1. Push to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

## 🎨 Design Customization

### Colors
- Edit `app/globals.css` for color scheme
- Update Tailwind classes in components

### Fonts
- Currently using Inter (from Google Fonts)
- Can be changed in `app/layout.tsx`

### Icons
- Using lucide-react icons
- Can be replaced with custom icons

## 📝 Notes

- All placeholder content needs to be replaced
- Email integration needs to be implemented
- Blog markdown reading needs to be implemented
- Google Analytics can be added later (see WRD.md)

## 🐛 Known Issues

- Linter warning about `bg-gradient-to-br` (false positive, can be ignored)
- Image fallback in portfolio needs actual placeholder image

