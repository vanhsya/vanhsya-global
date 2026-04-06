import test from 'node:test';
import assert from 'node:assert/strict';
import { getMaintenanceWindow, getRetryAfterSeconds, isPublicAssetPath, parseIsoDate } from './maintenanceMode.ts';

test('parseIsoDate returns null for invalid input', () => {
  assert.equal(parseIsoDate(undefined), null);
  assert.equal(parseIsoDate('not-a-date'), null);
});

test('parseIsoDate parses ISO timestamps', () => {
  const t = parseIsoDate('2099-01-01T00:00:00.000Z');
  assert.equal(typeof t, 'number');
  assert.ok((t as number) > 0);
});

test('getMaintenanceWindow activates when MAINTENANCE_MODE=1', () => {
  const now = Date.parse('2026-01-01T00:00:00.000Z');
  const env = { MAINTENANCE_MODE: '1' };
  const win = getMaintenanceWindow(env, now);
  assert.equal(win.active, true);
  assert.equal(win.reason, 'always');
});

test('getMaintenanceWindow activates until MAINTENANCE_UNTIL', () => {
  const now = Date.parse('2026-01-01T00:00:00.000Z');
  const env = { MAINTENANCE_UNTIL: '2026-01-02T00:00:00.000Z' };
  const win = getMaintenanceWindow(env, now);
  assert.equal(win.active, true);
  assert.equal(win.reason, 'until');
  assert.equal(win.until, Date.parse('2026-01-02T00:00:00.000Z'));
});

test('getMaintenanceWindow respects MAINTENANCE_START/END window', () => {
  const now = Date.parse('2026-01-01T12:00:00.000Z');
  const env = { MAINTENANCE_START: '2026-01-01T10:00:00.000Z', MAINTENANCE_END: '2026-01-01T13:00:00.000Z' };
  const win = getMaintenanceWindow(env, now);
  assert.equal(win.active, true);
  assert.equal(win.reason, 'window');
  assert.equal(win.until, Date.parse('2026-01-01T13:00:00.000Z'));
});

test('getMaintenanceWindow remains off outside configured windows', () => {
  const now = Date.parse('2026-01-01T12:00:00.000Z');
  const env = { MAINTENANCE_START: '2026-01-01T13:00:00.000Z', MAINTENANCE_END: '2026-01-01T14:00:00.000Z' };
  const win = getMaintenanceWindow(env, now);
  assert.equal(win.active, false);
  assert.equal(win.reason, 'off');
});

test('getRetryAfterSeconds returns null when until is null', () => {
  assert.equal(getRetryAfterSeconds(null, Date.now()), null);
});

test('getRetryAfterSeconds clamps to at least 1', () => {
  const now = 1000;
  assert.equal(getRetryAfterSeconds(1000, now), 1);
  assert.equal(getRetryAfterSeconds(1001, now), 1);
});

test('isPublicAssetPath detects next assets and common public files', () => {
  assert.equal(isPublicAssetPath('/_next/static/chunks/app.js'), true);
  assert.equal(isPublicAssetPath('/favicon.ico'), true);
  assert.equal(isPublicAssetPath('/images/logo.png'), true);
  assert.equal(isPublicAssetPath('/videos/ideo'), true);
  assert.equal(isPublicAssetPath('/some/path/file.svg'), true);
  assert.equal(isPublicAssetPath('/ai-tools'), false);
});
