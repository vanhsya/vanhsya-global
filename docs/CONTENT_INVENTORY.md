# Content Inventory & Media Assets

This document lists the primary content and media assets across the website.

## Global Media Assets

- **Logos**:
  - `public/images/logo.png`: Primary brand logo.
  - `public/images/originallogo.png`: Legacy/High-res version used in hero.
- **Icons**:
  - `public/apple-touch-icon.png`: Favicon for iOS devices.
  - `public/favicon.ico`: Standard browser favicon.
- **Social Media**:
  - `public/images/og-default.jpg`: Default image for social media sharing.

## Page-Specific Content

### Home (`/`)
- **Text**: Marketing copy focused on "Zero Risk" and "AI-Powered" migration.
- **Images**: High-quality Unsplash backgrounds for the Trends section.
- **Videos**: 
  - `public/videos/ideo`: (Pointer) Dynamic background video for the hero section.
  - External: Abstract shapes from Mixkit used in WebGL Hero fallback.

### Success Stories (`/success-stories`)
- **Text**: 1,200+ case summaries and specific client testimonials.
- **Images**: Profile photos for Sarah Chen, Michael Rodriguez, etc. (sourced from Unsplash).

### Country Guides (`/countries/*`)
- **Text**: Detailed descriptions of immigration pathways, living costs, and job markets.
- **Data Source**: `src/data/countryData.ts`.

### Blog (`/blog`)
- **Text**: Weekly educational articles on Express Entry, Job seeker visas, and PR comparisons.
- **Images**: Featured images for every blog post (sourced from Unsplash).

## Media Management Requirements

- All images must use the `OptimizedImage` component for WebP/AVIF delivery.
- Background videos must be muted and loop automatically.
- All SVG icons should be sourced from `react-icons` or `lucide-react` for consistency.
