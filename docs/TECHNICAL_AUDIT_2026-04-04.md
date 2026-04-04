# VANHSYA Website — Comprehensive Technical Audit (2026-04-04)

## Executive Summary

This audit documents the current state of the VANHSYA website (Next.js app) including technical architecture, build and deployment, routing and navigation structure, content inventory, SEO posture, accessibility, security, code quality, APIs, and third‑party integrations. It also provides a prioritized remediation plan.

Key highlights:
- Modern Next.js App Router architecture with mostly static pages, plus a small set of dynamic API routes.
- Netlify deployment configuration with strong baseline security headers.
- A newly introduced “Expose” platform for migration fraud victim support (submissions, tracking, case publishing, and video gallery).
- Two moderate npm audit findings (AI SDK dependency chain) requiring a planned upgrade.

## 1) Technical Architecture Overview

### Runtime & Rendering Model
- Framework: Next.js App Router (React Server Components default) with client components for interactive sections.
- Rendering strategy:
  - Static prerendered routes for most pages (marketing and content).
  - Dynamic server-rendered routes for parameterized pages (`/blog/[id]`, `/expose/*/[param]`) and certain API endpoints.
  - API endpoints implemented via Route Handlers under `src/app/api/*`.

### Core App Structure
- App root: [layout.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/layout.tsx)
- Global styling: [globals.css](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/globals.css)
- Routes live under `src/app/**/page.tsx` and `src/app/**/route.ts`.

### Major Feature Areas (High-Level)
- Migration services + country guides (static marketing content).
- AI tools (client-side interactive pages and UI sections).
- Expose platform (victim stories submission + tracking + public content).
- Concierge chat API (`/api/chat`) that streams responses from OpenAI (server-side).

## 2) Development Stack Documentation

### Languages & Tooling
- TypeScript (strict, noEmit): [tsconfig.json](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/tsconfig.json)
- ESLint v9 + `eslint-config-next`: [package.json](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/package.json)
- Tailwind CSS: [tailwind.config.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/tailwind.config.ts)

### Primary Dependencies (App Runtime)
- `next`, `react`, `react-dom`: [package.json](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/package.json)
- Motion/UI: `framer-motion`, `lucide-react`, `react-icons`
- 3D/WebGL: `three`, `@react-three/fiber`, `@react-three/drei`
- AI: `ai` + `@ai-sdk/openai`

### Fonts
- Inter and Space Grotesk loaded via `next/font/google`: [layout.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/layout.tsx#L1-L60)

## 3) Build Process, Configuration, and Dependencies

### Scripts
- `npm run dev` → `next dev --webpack`
- `npm run build` → `next build --webpack`
- `npm run start` → `next start`
- `npm run lint` → ESLint on `src`
Source: [package.json](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/package.json#L5-L15)

### Next.js Configuration
- Image optimization: WebP/AVIF, tuned deviceSizes/imageSizes, remote host allowlist.
- Bundle optimization: `optimizePackageImports` for heavy icon/motion libraries.
- Webpack fallbacks for browser bundles.
Source: [next.config.js](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/next.config.js)

### CI & Quality Gates
- GitHub Actions CI:
  - install (`npm ci`)
  - lint
  - `npx tsc --noEmit`
  - spell-check
  - build
Source: [ci.yml](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/.github/workflows/ci.yml)

## 4) Hosting & Deployment Configuration

### Netlify
- Build: `npm run build`
- Publish: `.next`
- Plugin: `@netlify/plugin-nextjs`
- Security headers:
  - HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy
  - Long-lived caching for `_next/static` and image assets
Source: [netlify.toml](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/netlify.toml)

### Netlify Deployment Workflow (CI)
- Deploys from GitHub Actions with `NETLIFY_SITE_ID` and `NETLIFY_AUTH_TOKEN`.
Source: [deploy-netlify.yml](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/.github/workflows/deploy-netlify.yml)

## 5) Navigation Structure Mapping

An updated navigation map is maintained in:
- [NAVIGATION_STRUCTURE.md](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/docs/NAVIGATION_STRUCTURE.md)

Notable nav components:
- Premium header/navigation: [NavigationPremium.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/NavigationPremium.tsx)
- Footer navigation: [Footer.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/Footer.tsx)

## 6) Route Inventory (Pages & Subdirectories)

Routes are implemented under `src/app`. High-level groups:
- Core: `/`, `/about`, `/contact`, `/services/*`, `/countries/*`, `/faq`, `/privacy`, `/terms`
- AI Tools: `/ai-tools/*`, `/tools/*`, `/ai-innovations`, `/next-era`
- Content: `/blog`, `/blog/[id]`
- Expose platform:
  - `/expose`
  - `/expose/victim-stories`
  - `/expose/interviews`
  - `/expose/industry-watch`
  - `/expose/scammers`
  - `/expose/scammers/[slug]`
  - `/expose/cases/[slug]`
  - `/expose/track/[id]`

SEO-generated routes:
- `robots.txt` via [robots.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/robots.ts)
- `sitemap.xml` via [sitemap.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/sitemap.ts)

## 7) Content Inventory (Page Elements Overview)

The site is primarily a marketing + product platform. Key content element types:
- Hero sections with gradient typography and CTAs.
- Service and country modules with step-by-step guidance.
- AI tools pages with form-like UX and interactive flows.
- Expose platform pages combining:
  - victim submission form
  - case cards with cover imagery
  - video gallery (thumbnail → modal playback)
  - industry watch “signals” and checklists

Expose components:
- Landing: [ExposeLanding.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/expose/ExposeLanding.tsx)
- Victim stories: [VictimStories.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/expose/VictimStories.tsx)
- Interviews: [ExposeInterviews.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/expose/ExposeInterviews.tsx)
- Case detail: [ExposeCase.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/expose/ExposeCase.tsx)
- Video modal: [VideoModal.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/expose/VideoModal.tsx)

## 8) Performance Metrics & Observations

Automated metrics available in-repo:
- `next build` completes successfully (static generation for the majority of pages).

High-impact performance factors:
- `three`/R3F (heavy bundles) likely increase initial JS cost on pages using 3D.
- Icon libraries (`react-icons`, `lucide-react`) can inflate bundle size if not optimized. The project uses `optimizePackageImports` to mitigate this: [next.config.js](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/next.config.js#L41-L44)
- Next Image optimization is enabled and remote hosts are allowlisted: [next.config.js](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/next.config.js#L4-L39)

Recommendations (performance):
- Route-level dynamic import for 3D-heavy components (load only on pages that need them).
- Consider removing `dev` rewrite to `/@vite/client` if not required in production (it triggers requests during dev and can confuse tooling).

## 9) SEO Audit Findings

Strengths:
- `sitemap.xml` exists and includes major route families: [sitemap.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/sitemap.ts)
- `robots.txt` configured and points to sitemap: [robots.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/robots.ts)
- Global metadata and OpenGraph/Twitter cards exist: [layout.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/layout.tsx)
- Structured data helpers exist: [SEO.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/SEO.tsx), [seo.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/utils/seo.ts)

Gaps / risks:
- `layout.tsx` includes a placeholder Google verification value: [layout.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/layout.tsx#L41-L46)
- `sitemap.ts` uses `lastModified: new Date()` for all URLs on every build, which can reduce crawl efficiency.
- Some programmatic routes (Expose subpages) are not explicitly listed in the sitemap; they may still be discovered through internal linking, but explicit inclusion is better.

## 10) Accessibility Compliance Assessment

Strengths:
- Many interactive elements include `aria-label` and accessible naming (e.g., video modal close controls).
- Focus-visible styling is present for header micro-interactions in CSS: [globals.css](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/globals.css)

Gaps / risks:
- Dropdown menus open on mouse hover; keyboard-only users may have trouble discovering or using dropdowns. See `onMouseEnter/onMouseLeave` usage in [NavigationPremium.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/NavigationPremium.tsx).
- Ensure all “button-like” UI elements are actual `<button>` elements (most are) and that focus order is logical.

Recommendations (accessibility):
- Add keyboard and focus-based triggers for dropdown menus and implement ARIA menu patterns (or convert to a disclosure-based menu).
- Add `prefers-reduced-motion` support for ticker and animated micro-interactions.

## 11) Security Vulnerability Scan Results

### npm audit
Result: 2 moderate vulnerabilities in the dependency graph:
- `ai` (direct) vulnerable below `<5.0.52` (filetype whitelist bypass in upload handling)
- `jsondiffpatch` (transitive) XSS vulnerability below `<0.7.2`

The current `npm audit` output indicates the suggested fix is a major upgrade to `ai@6.x` which requires compatibility testing.

### Application-level security observations
- File upload route exists (`/api/expose/submit`) with basic limits (max 5 files, 10MB each) and filename sanitization: [submit route](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/expose/submit/route.ts)
- Storage layer writes to local filesystem (`var/expose/...`): [exposeStorage.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/lib/exposeStorage.ts)

Risks:
- Local filesystem persistence is not suitable for serverless runtimes (Netlify/Vercel). Evidence upload persistence will be unreliable unless backed by durable storage.
- Evidence metadata currently stores absolute server paths. Even if not exposed publicly, it’s safer to store relative paths or opaque IDs only.
- No CSP is configured; consider adding CSP headers to reduce XSS risk in case of future injection vulnerabilities.

## 12) Code Quality Review

Strengths:
- Strict TypeScript and CI typechecking.
- ESLint enforced with `--max-warnings 0`.
- Modular component structure, repeated UI patterns (GlassCard, navigation, etc.).

Gaps / risks:
- Significant use of client components for large pages can increase bundle size.
- Some legacy files remain (e.g., backups under `src/app/page.tsx.backup*`) which can confuse maintenance and should be archived outside the app tree.

## 13) Database Schema Documentation

No database/ORM is present in the repository at this time.

Current persistence model:
- Expose submissions are stored as JSON on disk: `var/expose/submissions.json` via [exposeStorage.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/lib/exposeStorage.ts)

Recommendation:
- For production durability, replace local JSON storage with a managed DB (e.g., Postgres) and object storage for evidence files.

## 14) API Endpoints Catalog

App Route Handlers under `src/app/api`:
- `POST /api/chat` — OpenAI streaming concierge: [route.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/chat/route.ts)
- `GET /api/health` — health status checks: [route.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/health/route.ts)
- `POST /api/expose/submit` — victim submission + file upload: [route.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/expose/submit/route.ts)
- `GET /api/expose/status/:id` — case tracking status: [route.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/expose/status/%5Bid%5D/route.ts)
- `GET /api/expose/videos` — cached video catalog + YouTube thumbs: [route.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/expose/videos/route.ts)
- `GET /api/vite-client` — placeholder endpoint used by a rewrite: [route.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/vite-client/route.ts)
- `GET /api/video/ideo` — project-specific video/pointer route: [route.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/api/video/ideo/route.ts)

## 15) Third‑Party Integrations Inventory

- OpenAI (via Vercel AI SDK): `ai`, `@ai-sdk/openai` — used by `/api/chat`
- YouTube embeds + thumbnails (i.ytimg.com + youtube.com)
- Netlify deployment plugin: `@netlify/plugin-nextjs` and CLI deployment in GitHub Actions
- WhatsApp deeplink (support): [company.ts](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/lib/company.ts)
- Framer Motion (animations)
- Three.js / React Three Fiber (3D)

## 16) Prioritized Issues & Remediation Plan

### P0 (Must Fix)
- Durable storage for Expose submissions and evidence uploads in production (Netlify serverless filesystem is not durable).
  - Move evidence to object storage and store metadata in DB.
  - Remove absolute file paths from stored submission records.

### P1 (High Priority)
- Address `npm audit` findings:
  - Plan and test upgrade path from `ai@4` to patched versions (may require breaking changes).
- Improve keyboard accessibility for dropdown navigation (ARIA patterns / focus interactions).

### P2 (Medium Priority)
- SEO:
  - Replace placeholder Google verification code.
  - Improve sitemap `lastModified` values and include Expose subpages if intended to be indexed.
- Performance:
  - Ensure 3D components are dynamically imported and not loaded on routes that don’t require them.

### P3 (Low Priority)
- Cleanup legacy backup files under `src/app` to avoid maintenance confusion.
- Add CSP headers (Netlify) for stronger browser-layer security posture.







