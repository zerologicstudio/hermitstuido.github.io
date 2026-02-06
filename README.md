# Hermit Studio - Premium VFX & Event Coverage Website

A premium, fully-operable website for a VFX, Ad Production, and Event Coverage studio targeting elite clients.

## Features

### Premium Design
- **Dark Premium Theme**: Sophisticated dark color scheme with gold accents
- **Typography**: Premium font pairing (Playfair Display, Inter, Space Mono)
- **Animations**: Smooth scroll, fade-in effects, and micro-interactions
- **Responsive**: Fully responsive design for all devices

### Pages
1. **Home** (`index.html`) - Hero section, services preview, featured work, stats, testimonials
2. **Portfolio** (`portfolio.html`) - Filterable portfolio grid with lightbox
3. **Services** (`services.html`) - Detailed services with process workflow
4. **About** (`about.html`) - Company story, values, team, clients
5. **Contact** (`contact.html`) - Contact form, FAQ accordion, contact info

### Functional Elements
- **Portfolio Filter**: Filter projects by category (VFX, Commercial, Events, Motion Graphics)
- **Lightbox Viewer**: Full-screen video/image viewer
- **Contact Form**: Functional form with validation
- **FAQ Accordion**: Expandable FAQ items
- **Animated Stats**: Counter animation on scroll
- **Mobile Navigation**: Hamburger menu with smooth transitions

## Making the Contact Form Work

### Option 1: Formspree (Recommended - Free & Easy)
1. Go to [formspree.io](https://formspree.io) and sign up (free)
2. Create a new form and get your Form ID
3. Open [`contact.html`](contact.html) and find line 118:
```html
<form ... action="https://formspree.io/f/YOUR_FORMSPREE_ID" method="POST">
```
4. Replace `YOUR_FORMSPREE_ID` with your actual Formspree form ID
5. Now submissions will be sent directly to your email!

### Option 2: Netlify Forms (If deploying to Netlify)
Add this attribute to the form tag in [`contact.html`](contact.html):
```html
<form class="contact-form" id="contact-form" name="contact" method="POST" netlify>
```

### Option 3: EmailJS (Client-side JavaScript)
1. Sign up at [emailjs.com](https://emailjs.com)
2. Update [`js/main.js`](js/main.js) with your EmailJS credentials

---

## Getting Started

### Local Development
1. Open `index.html` in a web browser
2. Or use a local server:
   ```bash
   npx serve
   # or
   python -m http.server
   ```

### Customization

#### Colors
Edit CSS variables in `css/main.css`:
```css
:root {
  --color-accent: #d4af37;  /* Gold accent */
  --color-bg-primary: #0a0a0a;  /* Dark background */
}
```

#### Fonts
Fonts are loaded from Google Fonts. Edit the `<link>` tag in each HTML file's `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourFont:wght@400;700&display=swap" rel="stylesheet">
```

#### Content
Replace placeholder images and text with actual content:
- Portfolio images: `https://images.unsplash.com/...` → Your portfolio images
- Client logos: Replace with actual client logos
- Team photos: Add real team member photos
- Contact info: Update with real contact details

### Adding Your Own Videos

#### Hero Background Video
Replace the video in `index.html`:
```html
<video autoplay muted loop playsinline poster="assets/images/hero-poster.jpg">
  <source src="assets/videos/your-hero-video.mp4" type="video/mp4">
</video>
```

#### Portfolio Videos
Add video URLs to portfolio items in `portfolio.html`:
```html
<article class="portfolio-item" data-category="vfx" data-video="assets/videos/your-video.mp4">
```

### Deploying to GitHub Pages (Free)

1. **Create a GitHub repository**
   - Go to [github.com](https://github.com)
   - Click "+" → "New repository"
   - Name it "hermit-studio" (or your preferred name)
   - Make it Public

2. **Push your files**
```bash
cd /mnt/mydrive/Hermit\ Studio/Website\ -\ Prototype/1
git init
git add .
git commit -m "Initial commit - Hermit Studio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/hermit-studio.git
git push -u origin main
```

3. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages" (left sidebar)
   - Under "Source", select "main" branch
   - Click "Save"
   - Wait 1-2 minutes for deployment

4. **Your site will be live at:**
   ```
   https://YOUR_USERNAME.github.io/hermit-studio/
   ```

## Deploying to Netlify (Alternative - Also Free)

1. Push to GitHub (steps above)
2. Go to [netlify.com](https://netlify.com) and sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Select your GitHub repository
5. Click "Deploy"

Your site will be live at: `https://YOUR_SITE.netlify.app`

---

## Getting Started

## File Structure
```
hermit-studio/
├── index.html
├── portfolio.html
├── services.html
├── about.html
├── contact.html
├── css/
│   └── main.css
├── js/
│   └── main.js
├── assets/
│   ├── images/
│   └── videos/
└── README.md
```

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance
- Lazy loading for images
- Optimized animations
- Minified CSS/JS ready for production
- WebP image format support

## Credits
- **Fonts**: Google Fonts (Playfair Display, Inter, Space Mono)
- **Icons**: Font Awesome 6.4
- **Images**: Unsplash (placeholder images)

## License
© 2024 Hermit Studio. All rights reserved.

---

For questions or support, contact: hello@hermitstudio.com
