# VANHSYA WebGL Landing Page Architecture

## Project Overview
A visually stunning, WebGL-powered landing page featuring:
- Advanced particle systems sampled from the VANHSYA logo
- Interactive 3D elements responding to mouse and scroll
- Custom GLSL shader programs for visual effects
- Responsive canvas animations with cross-browser support
- Smooth scroll-triggered WebGL effects

---

## Architecture Components

### 1. WebGL Engine Layer (`src/lib/webgl/`)
- **WebGLContext.ts** - Context management and initialization
- **ShaderProgram.ts** - Shader compilation and linking utilities
- **BufferManager.ts** - Vertex buffer management
- **RenderLoop.ts** - Optimized requestAnimationFrame handling

### 2. Visual Effects Layer (`src/components/webgl/`)
- **ParticleSystem.ts** - GPU-accelerated particle rendering
- **LogoParticles.ts** - Logo-based particle sampling
- **FlowField.ts** - Background flow field animation
- **GlowEffect.ts** - Post-processing glow effects

### 3. Interaction Layer
- **MouseTracker.ts** - Real-time mouse position tracking
- **ScrollInterpolator.ts** - Smooth scroll value interpolation
- **TouchHandler.ts** - Mobile touch event support

### 4. Landing Page Components
- **WebGLHero.tsx** - Main hero with particle effects
- **BackgroundCanvas.tsx** - Full-screen WebGL background
- **InteractiveSection.tsx** - Scroll-triggered animation sections

---

## Technical Specifications

### WebGL Context Configuration
```javascript
{
  alpha: true,
  antialias: true,
  premultipliedAlpha: false,
  preserveDrawingBuffer: false,
  powerPreference: 'high-performance',
  depth: false,
  stencil: false
}
```

### Shader Programs

#### Vertex Shader Features
- Perspective projection for 3D depth
- Mouse attraction/repulsion forces
- Scroll-triggered transformations
- Time-based wobble and rotation
- Size pulsing based on position

#### Fragment Shader Features
- Multi-color gradient mapping (gold, violet, cyan)
- Core/halo glow effect
- Flickering and noise overlay
- Distance-based color blending
- Smooth alpha falloff

### Performance Optimizations
- Max 3200 particles (adaptive based on device)
- DPR capping at 2x
- Delta-time based animations
- Efficient buffer updates
- RAF-based render loop
- Automatic quality reduction on low-end devices

### Responsive Behavior
- Canvas resize on window resize
- Touch event support for mobile
- Reduced particle count on mobile
- Lower DPR on high-density displays

### Fallback Strategy
1. Check WebGL support on mount
2. Check for reduced motion preference
3. Check for context loss
4. Display static logo with CSS animations

---

## Component Hierarchy

```
LandingPage (page.tsx)
├── NavigationPremium
├── WebGLHero (new)
│   ├── WebGLBackground (canvas)
│   ├── HeroContent
│   │   ├── Badge
│   │   ├── Headline
│   │   ├── Description
│   │   ├── CTAButtons
│   │   └── Stats
│   └── FallbackDisplay
├── MigrationTrendsVideoSection
├── WhyChooseVanhsya
├── RealStoriesResults
├── AIToolsShowcase
├── VanhsyaPromise
├── ReferralProgramSection
├── EmployerConnectSection
├── VanhsyaDifference
└── Footer
```

---

## Implementation Checklist

- [x] WebGL context management with fallback
- [x] Shader program compilation utilities
- [x] Logo particle sampling algorithm
- [x] Mouse interaction system
- [x] Scroll-based animation triggers
- [x] Responsive canvas resizing
- [x] Touch support for mobile
- [x] Reduced motion accessibility
- [x] Context loss recovery
- [x] Performance optimization
- [x] Cross-browser compatibility

---

## Dependencies
- React 18+ (hooks)
- TypeScript 5+
- WebGL 1.0 (maximum compatibility)
- requestAnimationFrame API

---

## File Structure
```
src/
├── app/
│   └── page.tsx (updated with WebGL hero)
├── components/
│   ├── WebGLHero.tsx (enhanced)
│   ├── WebGLBackground.tsx (new)
│   └── ...
└── lib/
    └── webgl/
        ├── ShaderProgram.ts
        ├── BufferManager.ts
        └── RenderLoop.ts

