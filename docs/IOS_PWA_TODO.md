# VANHSYA iOS / PWA To-Do List

This checklist tracks the fastest path to give `VANHSYA` an iOS presence.

## Current Status

- [x] Project is a `Next.js` web application
- [x] Deployment exists for `Vercel`
- [x] iOS web icons are present
- [ ] `manifest.webmanifest` exists
- [ ] Service worker exists
- [ ] Native `iOS` project exists
- [ ] `Capacitor` is configured
- [ ] `TestFlight` pipeline is configured
- [ ] `App Store` submission assets are prepared

## Recommended Path

Use the following order:

1. Add `PWA` support to the existing web app.
2. Verify the experience on `iPhone Safari`.
3. Decide whether `PWA only` is enough.
4. If not, wrap the app with `Capacitor` for iOS delivery.
5. Prepare `TestFlight` and `App Store` submission.

## Phase 1: PWA Foundation

- [ ] Create `public/manifest.webmanifest`
- [ ] Define app `name`, `short_name`, `theme_color`, `background_color`, and `display`
- [ ] Add `192x192` and `512x512` icons for installability
- [ ] Link the web manifest from the app metadata
- [ ] Add a service worker strategy for offline or degraded usage
- [ ] Add an offline fallback page if key routes should remain usable
- [ ] Verify installability with Lighthouse
- [ ] Test `Add to Home Screen` on iPhone Safari

## Phase 2: iPhone Web QA

- [ ] Test layout on small-screen iPhones
- [ ] Test Safari navigation, forms, and modal behavior
- [ ] Test audio, video, and autoplay restrictions
- [ ] Test login or session persistence flows
- [ ] Test payments and external redirects on iOS
- [ ] Test file upload and camera/photo picker behavior
- [ ] Verify fonts, viewport spacing, and safe-area handling

## Phase 3: Capacitor Wrapper

- [ ] Add `@capacitor/core`
- [ ] Add `@capacitor/cli`
- [ ] Add `@capacitor/ios`
- [ ] Create `capacitor.config.*`
- [ ] Generate the `ios` project
- [ ] Set `appId`, `appName`, and production web origin
- [ ] Decide whether the iOS app will bundle static assets or load the live site
- [ ] Open and verify the project in `Xcode`

## Phase 4: Apple Setup

- [ ] Confirm an active Apple Developer account
- [ ] Create the app record in `App Store Connect`
- [ ] Choose bundle identifier
- [ ] Configure signing and provisioning
- [ ] Prepare privacy policy URL and support URL
- [ ] Prepare screenshots for required iPhone sizes
- [ ] Prepare app description, keywords, and age rating
- [ ] Review tracking, cookies, analytics, and data collection disclosures

## Phase 5: Release Readiness

- [ ] Run a full smoke test on real iPhones
- [ ] Validate startup performance on mobile networks
- [ ] Confirm API endpoints work correctly on mobile Safari
- [ ] Confirm no protected deployment blocks app access in production
- [ ] Upload the first build to `TestFlight`
- [ ] Complete internal testing
- [ ] Submit the production build to the `App Store`

## Repo-Specific Notes

- Current deployment automation targets `Vercel`, not iOS packaging.
- The repo already includes Apple touch icons, but that is not the same as a full `PWA` or native iOS app.
- Existing project docs already note that `PWA` support is still pending.

## Exit Criteria

Mark this effort complete only when all of the following are true:

- [ ] Users can install the web app from a supported mobile browser, or a native iOS wrapper is shipped
- [ ] Core flows work on iPhone without layout or browser-specific regressions
- [ ] Production hosting is stable and reachable from the mobile app path
- [ ] `TestFlight` or `App Store` distribution is functional if native delivery is required
