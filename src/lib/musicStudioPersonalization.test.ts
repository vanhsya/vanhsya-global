import test from 'node:test';
import assert from 'node:assert/strict';
import {
  deriveDefaultStudioSettings,
  derivePlaylistOrder,
  deriveStudioTheme,
  mergeStudioSettings,
  safeParseStudioSettings
} from './musicStudioPersonalization.ts';

test('deriveStudioTheme is stable per user and differentiates across users', () => {
  const a1 = deriveStudioTheme('user-a');
  const a2 = deriveStudioTheme('user-a');
  const b1 = deriveStudioTheme('user-b');
  assert.equal(a1.signatureName, a2.signatureName);
  assert.equal(a1.gradientCss, a2.gradientCss);
  assert.notEqual(a1.signatureName, b1.signatureName);
});

test('deriveDefaultStudioSettings returns clamped values and differs across users', () => {
  const a = deriveDefaultStudioSettings('user-a');
  const b = deriveDefaultStudioSettings('user-b');
  assert.ok(a.volume >= 0 && a.volume <= 1);
  assert.ok(a.crossfadeMs >= 0 && a.crossfadeMs <= 2500);
  assert.ok(a.eqLowDb >= -12 && a.eqLowDb <= 12);
  assert.ok(a.eqMidDb >= -12 && a.eqMidDb <= 12);
  assert.ok(a.eqHighDb >= -12 && a.eqHighDb <= 12);
  assert.ok(a.space >= 0 && a.space <= 1);
  assert.ok(a.visualIntensity >= 0.1 && a.visualIntensity <= 1);
  assert.notEqual(a.volume, b.volume);
});

test('derivePlaylistOrder returns a stable permutation per user', () => {
  const ids = ['a', 'b', 'c', 'd', 'e'];
  const o1 = derivePlaylistOrder(ids, 'user-a');
  const o2 = derivePlaylistOrder(ids, 'user-a');
  const o3 = derivePlaylistOrder(ids, 'user-b');
  assert.deepEqual(o1, o2);
  assert.equal(new Set(o1).size, ids.length);
  assert.equal(o1.length, ids.length);
  assert.notDeepEqual(o1, o3);
});

test('mergeStudioSettings merges persisted settings safely', () => {
  const defaults = deriveDefaultStudioSettings('user-a');
  const stored = safeParseStudioSettings(
    JSON.stringify({ volume: 2, crossfadeMs: 99999, eqLowDb: 99, eqMidDb: -99, eqHighDb: 0, space: -1, muted: 'yes' })
  );
  const merged = mergeStudioSettings(defaults, stored);
  assert.ok(merged.volume >= 0 && merged.volume <= 1);
  assert.ok(merged.crossfadeMs >= 0 && merged.crossfadeMs <= 2500);
  assert.ok(merged.eqLowDb >= -12 && merged.eqLowDb <= 12);
  assert.ok(merged.eqMidDb >= -12 && merged.eqMidDb <= 12);
  assert.ok(merged.space >= 0 && merged.space <= 1);
  assert.equal(typeof merged.muted, 'boolean');
});
