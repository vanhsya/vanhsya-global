# VANHSYA Project Overview

## 1. Project Vision
VANHSYA is a premium, AI-powered global migration platform designed to provide transparent, secure, and guaranteed migration services. By eliminating traditional "agents" and replacing them with intelligent tools, the platform ensures 100% transparency and a high success rate for clients worldwide.

## 2. Technical Specifications
- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 12.2
- **State Management**: React Hooks (useState, useEffect, useMemo)
- **SEO**: Dynamic metadata and JSON-LD structured data via custom `SEO.tsx` component.
- **Deployment**: Optimized for Vercel/Node.js environments.

## 3. Core Architecture
The project follows a component-based architecture with a centralized data management system:
- **Pages**: Server-side rendered by default, using client components for interactivity.
- **Data**: Static site content is centralized in `src/data/` and `src/lib/` for easy management.
- **AI Tools**: Modular implementation under `/ai-tools`, allowing for independent scaling of assessment logic.

## 4. User Experience Requirements
- **Mobile-First**: Every feature must be fully functional on mobile devices.
- **Accessibility**: Compliance with WCAG 2.1 standards (ARIA labels, keyboard navigation).
- **Immersive Design**: High-end visuals including WebGL effects, glassmorphism, and smooth transitions.
- **Instant Value**: AI tools must provide immediate feedback to users without registration where possible.

## 5. Quality Assurance Criteria
- **Zero Errors**: 100% TypeScript type safety and lint-error-free code.
- **Performance**: Lighthouse score > 90 for Performance, Accessibility, and SEO.
- **Security**: No known vulnerabilities in dependencies (monitored via `npm audit`).
- **Accuracy**: Migration data in `countryData.ts` must be regularly reviewed against official government sources.

---
*Documentation Package Version: 1.0.0 (March 2026)*
