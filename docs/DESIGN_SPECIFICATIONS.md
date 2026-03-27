# Design Specifications

This document outlines the visual identity and UI/UX standards for the VANHSYA platform.

## Color Scheme (Stellar Slate Design System)

The design follows a "Stellar Slate" theme, using deep indigos and slate tones with vibrant neon accents.

### Primary Palette (Indigo)
- `primary-500`: `#6366f1`
- `primary-600` (Main): `#4f46e5`
- `primary-900`: `#312e81`
- `primary-950` (Background): `#1e1b4b`

### Accent Palette (Amber/Gold)
- `accent-400` (Main): `#fbbf24`
- `accent-500`: `#f59e0b`

### Semantic Colors
- **Success**: `#10b981` (Emerald)
- **Warning**: `#facc15` (Yellow)
- **Error**: `#ef4444` (Red)

## Typography

### Headings (Space Grotesk)
- Used for hero sections, section titles, and high-impact messaging.
- Characterized by its futuristic, geometric feel.

### Body Text (Inter)
- Primary font for all descriptive text and interface elements.
- Optimized for readability across all screen sizes.

## Responsive Layouts

The website uses a "Mobile-First" approach with the following breakpoints:
- **Small (Mobile)**: `< 640px` (Single column layouts, hidden desktop nav).
- **Medium (Tablet)**: `640px - 1024px` (Two column grids, simplified navigation).
- **Large (Desktop)**: `> 1024px` (Full multi-column layouts, premium navigation).

## UI Elements & Style

- **Glassmorphism**: Extensive use of backdrop-blur and semi-transparent borders (e.g., `GlassCard.tsx`).
- **Gradients**: Modern gradients used for text (e.g., `text-transparent bg-clip-text bg-gradient-to-r`).
- **Animations**: Powered by Framer Motion, focusing on smooth entries and hover interactions.
- **Shadows**: Deep, soft shadows used to create depth on dark backgrounds.
