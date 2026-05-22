# Immersive 3D Card Page

Route: `/card/immersive`

## What This Page Implements

- WebGL-powered 3D card visuals synced to the DOM card grid
- Physics-style hover and focus tilt (damped interpolation)
- Dynamic lighting + environment reflections (Three.js + @react-three/fiber + drei)
- Viewport-based entrance (IntersectionObserver drives staggered 3D rise/fade)
- Graceful fallback to CSS 3D when WebGL is unavailable

## Where The Code Lives

- Page: [page.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/app/card/immersive/page.tsx)
- Main layout + DOM cards + WebGL scene: [ImmersiveCardsExperience.tsx](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/card/immersive/ImmersiveCardsExperience.tsx)
- Fallback + stage styling: [immersive-cards.module.css](file:///Users/vyshnav/VANHSYA_CLEAN_BACKUP_20250719_175427/src/components/card/immersive/immersive-cards.module.css)

## Animation Parameters

These values are implemented in `ImmersiveCardsExperience.tsx`:

- Hover tilt:
  - RotateX scale: `hoverY * 0.12` (clamped to `±0.22`)
  - RotateY scale: `hoverX * 0.18` (clamped to `±0.30`)
  - RotateZ scale: `hoverX * 0.05` (clamped to `±0.08`)
- Damping:
  - Position/scale smoothing: `~18`
  - Rotation smoothing: `~14`
  - Global parallax group smoothing: `~6`
- Entrance:
  - Duration: `650ms`
  - Stagger per card: `70ms`
  - Easing: `easeOutCubic`

## Performance Guidance

- WebGL is only enabled when `webgl2` or `webgl` context is supported.
- The canvas uses:
  - `orthographic` camera for pixel-aligned mapping
  - `dpr={[1, 1.75]}` and `AdaptiveDpr` to reduce GPU cost on weaker devices
  - `powerPreference: "high-performance"`
- Tier textures are lazy-loaded only when the corresponding card is in the viewport.

## Benchmark Checklist (Manual)

- Desktop (Chrome/Edge):
  - Open DevTools → Performance → record 10 seconds of hover + scroll
  - Confirm minimal long tasks and smooth interaction
- Mobile (mid-range):
  - Confirm responsive layout stays fluid while hovering (or tapping) and scrolling
  - Confirm canvas stays stable (no layout shift)
- Safari:
  - Confirm fallback works if WebGL is disabled or unavailable

## Accessibility Checklist

- Each card is a real DOM link and supports keyboard focus.
- Focus triggers the same depth behavior as hover.
- `prefers-reduced-motion` disables motion-heavy behavior.

