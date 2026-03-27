# VANHSYA Website - Project Structure Documentation

**Project Name:** VANHSYA Website
**Version:** 0.1.0
**Tech Stack:** Next.js 15.4.1 (App Router), TypeScript, Tailwind CSS, Framer Motion

---

## 1. Directory Structure Overview

The project follows the standard Next.js App Router structure. The root directory contains configuration files and the `src` folder, which holds the application source code.

### Root Directory
| File/Directory | Description |
|---|---|
| `.next/` | Next.js build output (automatically generated). |
| `public/` | Static assets like images, icons, and fonts served directly. |
| `src/` | Main source code (App Router, Components, Libs). |
| `next.config.ts` | Next.js configuration (React Strict Mode, Image domains). |
| `tailwind.config.ts` | Tailwind CSS configuration (Theme, Colors, Fonts). |
| `tsconfig.json` | TypeScript compiler configuration. |
| `package.json` | Project dependencies and scripts. |

---

## 2. `src/` Directory Breakdown

### 2.1 `src/app/` (Routing & Pages)
This directory defines the routing hierarchy using Next.js App Router conventions. Each folder represents a URL path segment.

#### Core Files
- **`layout.tsx`**: The Root Layout. Wraps the entire application with global providers (`CurrencyProvider`), styles (`globals.css`), and metadata.
- **`page.tsx`**: The Homepage. Renders the main landing page using premium components (`HeroPremium`, `NavigationPremium`, etc.).
- **`globals.css`**: Global CSS styles, including Tailwind directives and custom utility classes.
- **`not-found.tsx`**: Custom 404 error page.

#### Route Segments
- **`/about`**: Company information page.
- **`/ai-innovations`**: Showcase page for AI features (CV Builder, Referral System).
- **`/ai-tools`**:
  - `/checklist-assistant`: AI-powered document checklist tool.
  - `/document-wizard`: Automated document generation tool.
  - `/eligibility`: AI eligibility assessment.
  - `/scam-detector`: Tool to verify job offers and agencies.
- **`/blog`**: Migration news and articles.
- **`/consultation`**: Booking page for expert consultations.
- **`/contact`**: Contact form and support information.
- **`/countries`**:
  - Dynamic sub-routes for specific countries: `/australia`, `/canada`, `/germany`, `/new-zealand`, `/singapore`, `/uae`, `/uk`, `/usa`.
  - `page.tsx`: Index page listing all supported countries.
- **`/faq`**: Frequently Asked Questions.
- **`/portal`**: Client Portal (Dashboard).
  - `/dashboard`: Main user dashboard view (Mock implementation).
  - `layout.tsx`: Portal-specific layout (Sidebar, Header).
- **`/privacy`**: Privacy Policy.
- **`/resources`**: Downloadable guides and tools.
- **`/services`**:
  - Service-specific pages: `/business-visa`, `/family-visa`, `/permanent-residence`, `/study-visa`, `/tourist-visa`, `/work-visa`.
  - `page.tsx`: Overview of all migration services.
- **`/success-stories`**: Client testimonials and case studies.
- **`/terms`**: Terms of Service.
- **`/tools`**: General utility tools (Document Checklist, Calculator).

---

### 2.2 `src/components/` (UI Library)
Contains all React components used across the application.

#### Core UI Components
- **`NavigationPremium.tsx`**: The main site navigation bar with dropdowns and responsive mobile menu.
- **`Footer.tsx`**: Site footer with links, newsletter signup, and social icons.
- **`HeroPremium.tsx`**: The primary hero section on the homepage with high-impact visuals.
- **`GlassCard.tsx`**: Reusable card component with a "glassmorphism" effect.
- **`OptimizedImage.tsx`**: Wrapper around `next/image` for performance and fallback handling.

#### Feature Components
- **`AIChatbot.tsx`**: Floating AI assistant widget.
  - *Logic*: Uses predefined responses to simulate AI interaction.
- **`EligibilityCalculator.tsx`**: Interactive form to assess visa eligibility.
  - *Logic*: Client-side point scoring system (Age, Education, Experience).
- **`RealStoriesResults.tsx`**: Carousel of user success stories and testimonials.
- **`CurrencySelector.tsx`**: Context provider and UI for switching site currency.
- **`CountryPageTemplate.tsx`**: Reusable layout for individual country pages to ensure consistency.

#### Section Components
- **`WhyChooseVanhsya.tsx`**: Features grid highlighting USPs.
- **`AIToolsShowcase.tsx`**: Grid displaying available AI tools.
- **`ReferralProgramSection.tsx`**: Information about the referral rewards system.
- **`VanhsyaPromise.tsx`**: Trust-building section (Guarantees, Ethics).

---

### 2.3 `src/data/` (Static Data)
Stores static content to avoid hardcoding text in components.
- **`countryData.ts`**: Comprehensive data for each country (Visa types, Cost of living, Requirements).
  - *Structure*: Object keyed by country ID (e.g., `australia`, `canada`).

### 2.4 `src/lib/` (Utilities & Helpers)
- **`utils.ts`**: General helper functions (e.g., Tailwind class merger `cn`).
- **`countries.ts`**: Helper functions to fetch/filter country data.
- **`services.ts`**: Helper functions to manage service packages.

### 2.5 `src/types/` (TypeScript Definitions)
- **`countries.ts`**: Interfaces for `CountryType`, `VisaRequirement`, `CostOfLiving`.
- **`services.ts`**: Interfaces for `ServiceType`, `FAQ`, `ProcessStep`.
- **`index.ts`**: General shared types.

### 2.6 `src/hooks/` (Custom Hooks)
- **`useMotion.ts`**: Custom hook for Framer Motion animations (likely for scroll-triggered effects).

---

## 3. Key Architectural Patterns

### 3.1 Data Flow (Static Generation)
- **Pattern**: The application currently uses a **Static Data** pattern.
- **Implementation**: Data is defined in `src/data/` or `src/lib/` as TypeScript objects. Pages import this data directly to render content.
- **Benefit**: Extremely fast load times, excellent SEO, zero database latency.
- **Limitation**: Content updates require a code deployment.

### 3.2 Routing & Navigation
- **Next.js App Router**: Uses file-system based routing.
- **Dynamic Segments**: While individual country folders exist (e.g., `countries/canada`), the architecture supports dynamic routing (e.g., `countries/[slug]`) if refactored. Currently, explicit routes are used for key destinations to maximize SEO control.

### 3.3 Styling System ("Stellar Slate")
- **Framework**: Tailwind CSS.
- **Theme**: Defined in `tailwind.config.ts`.
  - **Primary Colors**: Indigo (`#6366f1`), Slate (`#0f172a`).
  - **Typography**: `Inter` (Body) and `Space Grotesk` (Headings) via `next/font/google`.
  - **Design Token**: "Glassmorphism" (translucent backgrounds with blur) is a recurring UI motif.

### 3.4 Mock AI & Interactivity
- **Approach**: "Wizard of Oz" prototyping.
- **Chatbot**: `AIChatbot.tsx` simulates intelligence using keyword matching.
- **Calculator**: `EligibilityCalculator.tsx` runs logic entirely in the browser using React state.

---

## 4. Configuration Files

### `tailwind.config.ts`
- Configures the custom color palette (`primary`, `accent`, `success`, `warning`, `error`).
- Extends font families.
- Defines content paths for tree-shaking unused styles.

### `next.config.ts`
- Basic Next.js configuration.
- Can be extended to support image domains or rewrites.

---

## 5. Summary of Dependencies
- **Core**: `next`, `react`, `react-dom`
- **Styling**: `tailwindcss`, `postcss`, `autoprefixer`
- **Animation**: `framer-motion`, `lottie-react`
- **Icons**: `react-icons`, `lucide-react`
- **Linting**: `eslint`, `eslint-config-next`

---
**Documentation Generated By:** Trae AI
**Date:** 2026-02-12
