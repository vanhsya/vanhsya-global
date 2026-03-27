# Directory Structure & File Inventory

This document maps the project's folder structure and describes the purpose of key files.

## Root Directory

- `.next/`: Next.js build cache and output.
- `docs/`: Documentation files (including this inventory).
- `public/`: Static assets.
  - `images/`: Brand logos, icons, and OG images.
  - `videos/`: Background videos and promotional content.
  - `cv-templates/`: Previews for the AI CV builder.
- `src/`: Main source code.
  - `app/`: Next.js App Router pages and layouts.
  - `components/`: Reusable UI components.
  - `data/`: Static data objects (e.g., country info).
  - `hooks/`: Custom React hooks (e.g., animations).
  - `lib/`: Core logic, utility functions, and shared constants.
  - `types/`: TypeScript interface and type definitions.
  - `utils/`: Small helper utility scripts.
- `package.json`: Dependency management and scripts.
- `tailwind.config.ts`: Design system configuration (colors, fonts).
- `tsconfig.json`: TypeScript configuration.
- `next.config.js`: Next.js server and build configuration.

## Key Component Descriptions (`src/components/`)

- `NavigationPremium.tsx`: The primary, modern navigation bar with high-end animations.
- `HeroPremium.tsx`: The main landing page hero section with interactive WebGL elements.
- `OptimizedImage.tsx`: Wrapper for `next/image` with automatic blur-up and error handling.
- `AIChatbot.tsx`: The integrated AI assistant for user queries.
- `SEO.tsx`: Centralized metadata and structured data (JSON-LD) management.
- `GlassCard.tsx`: A reusable UI element for consistent "glassmorphism" design.
- `MigrationTrendsVideoSection.tsx`: Interactive section for exploring new visa categories via video.

## Key Data & Logic (`src/lib/` & `src/data/`)

- `company.ts`: Shared constants for company name, contact info, and social links.
- `countryData.ts`: Detailed content for every supported country guide.
- `services.ts`: Data structure for all migration programs.
- `utils.ts`: Standard UI helpers (e.g., `cn` for Tailwind class merging).
