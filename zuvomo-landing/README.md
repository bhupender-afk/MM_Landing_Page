# Zuvomo Landing Page

A modern, professional single-page React application built with Next.js for Zuvomo's market making services. This landing page showcases advanced algorithmic trading solutions with smooth scrolling, parallax effects, and scroll-triggered animations.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with TypeScript, TailwindCSS, and shadcn/ui
- **Smooth Scrolling**: Lenis implementation with fallback support
- **Advanced Animations**: Framer Motion with scroll-triggered effects and GSAP parallax
- **Performance Optimized**: Lazy loading, code splitting, and optimized images
- **Responsive Design**: Mobile-first approach with full accessibility support
- **Professional UI**: Minimal and premium design inspired by leading market makers

## 📋 Sections

1. **Hero Section** - Parallax background with call-to-action
2. **Services** - What We Do showcase with animated reveals
3. **Differentiators** - Why Choose Zuvomo with statistics
4. **Partners** - Exchange and project partner logos
5. **Metrics** - Impact numbers with animated counters
6. **Team** - Leadership highlights with social links
7. **Contact** - Contact form and information

## 🛠️ Technology Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS v4 with custom design tokens
- **UI Components**: shadcn/ui with Radix UI primitives
- **Animations**:
  - Framer Motion for scroll-triggered animations
  - GSAP with ScrollTrigger for parallax effects
  - Lenis for smooth momentum scrolling
- **Icons**: Lucide React
- **Fonts**: Ubuntu (Google Fonts)

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zuvomo-landing
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and design tokens
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Main landing page
├── components/
│   ├── ui/                  # shadcn/ui components
│   ├── sections/            # Page sections
│   │   ├── Hero.tsx
│   │   ├── Services.tsx
│   │   ├── Differentiators.tsx
│   │   ├── Partners.tsx
│   │   ├── Metrics.tsx
│   │   ├── Team.tsx
│   │   └── Contact.tsx
│   ├── Navigation.tsx       # Main navigation
│   └── Footer.tsx           # Footer component
├── hooks/
│   ├── use-lenis.ts         # Smooth scrolling hook
│   └── use-parallax.ts      # Parallax effects hook
└── lib/
    └── utils.ts             # Utility functions
```

## 🎨 Design Tokens

The project uses a comprehensive design system with custom color palette:

```css
/* Primary Colors */
--primary-blue: #3B82F6
--light-blue: #60A5FA
--extra-light-blue: #DBEAFE
--ultra-light-blue: #EFF6FF
--dark-blue: #1E40AF
--navy-blue: #1E3A8A

/* Typography */
font-family: Ubuntu, -apple-system, BlinkMacSystemFont, sans-serif
```

## 🎭 Animation System

### Smooth Scrolling with Lenis

The `useLenis` hook provides momentum-based smooth scrolling:

```typescript
// Enable smooth scrolling (default configuration)
useLenis(true)

// Advanced configuration
useLenis(enabled, wrapper, content)
```

**Configuration Options:**
- `enabled`: Boolean to enable/disable smooth scrolling
- `wrapper`: Scroll container element (default: window)
- `content`: Content element being scrolled (default: document.documentElement)

### Parallax Effects with GSAP

The `useParallax` hook creates scroll-based parallax animations:

```typescript
// Basic parallax (moves slower than scroll)
const parallaxRef = useParallax(50)

// Reverse parallax (moves faster than scroll)
const parallaxRef = useParallax(-30)

// Advanced parallax with multiple properties
const parallaxRef = useAdvancedParallax({
  yPercent: -50,
  scale: 1.1,
  rotation: 5,
  opacity: 0.8
})
```

**Amplitude Values:**
- **Positive values**: Element moves slower than scroll (background effect)
- **Negative values**: Element moves faster than scroll (foreground effect)
- **Higher absolute values**: More dramatic parallax effect

### Scroll-Triggered Animations

Uses Framer Motion's `useInView` for scroll-triggered reveals:

```typescript
const ref = useRef(null)
const isInView = useInView(ref, { once: true, amount: 0.2 })

// Staggered children animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
}
```

## 📱 Responsive Design

Mobile-first approach with breakpoints:
- **sm**: 640px and up
- **md**: 768px and up
- **lg**: 1024px and up
- **xl**: 1280px and up

## ♿ Accessibility Features

- **Semantic HTML5**: Proper heading hierarchy and landmarks
- **Keyboard Navigation**: Full keyboard support with focus indicators
- **ARIA Labels**: Screen reader support for interactive elements
- **Color Contrast**: WCAG AA compliant color combinations
- **Reduced Motion**: Respects user's motion preferences

## 🚀 Performance Optimizations

- **Image Optimization**: Next.js Image component with lazy loading
- **Code Splitting**: Dynamic imports for heavy components
- **Font Optimization**: Google Fonts with display=swap
- **Tree Shaking**: Only used utilities included in build
- **Static Generation**: Pre-rendered pages for fast loading

## 🔧 Build Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## 📤 Deployment

### Vercel (Recommended)

1. Connect your repository to Vercel
2. Deploy automatically on every push to main branch
3. Environment variables will be configured automatically

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Deploy the `.next` folder to your hosting provider

## 🎯 Performance Targets

- **Lighthouse Performance**: ≥90 (Desktop)
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For questions or issues:
- Email: contact@zuvomo.com
- Telegram: @zuvomo

---

Built with ❤️ by the Zuvomo team