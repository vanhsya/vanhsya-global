# Immersive Card Page — Benchmark Report Template

Route: `/card/immersive`

This report is a fill-in template intended for validating performance and cross-browser behavior before production release.

## Test Matrix

| Platform | Browser | Device | Result |
|---|---|---|---|
| Desktop | Chrome |  |  |
| Desktop | Edge |  |  |
| Desktop | Firefox |  |  |
| Desktop | Safari |  |  |
| Mobile | Safari iOS |  |  |
| Mobile | Chrome Android |  |  |

## Performance Targets

- Smooth interaction during hover + scroll
- Stable layout (no jank or layout shift)
- Graceful fallback when WebGL is unavailable

## How To Measure (Recommended)

### Chrome/Edge

- DevTools → Performance → Record 10 seconds:
  - hover multiple cards, then scroll through the grid
  - repeat with the tab in the foreground only
- Record:
  - average FPS estimate (from the Performance track)
  - any long tasks
  - memory growth (if present)

### Safari

- Use Develop → Show Web Inspector → Timelines
- Validate WebGL compatibility and rendering stability

### Reduced Motion

- Enable OS “Reduce Motion”
- Verify the experience disables motion-heavy transforms while preserving layout and usability

## Notes / Issues

- 

