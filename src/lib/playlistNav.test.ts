import test from 'node:test';
import assert from 'node:assert/strict';
import { nextId, prevId } from './playlistNav.ts';

test('nextId and prevId wrap correctly and handle missing current', () => {
  const ids = ['a', 'b', 'c'];
  assert.equal(nextId(ids, null), 'a');
  assert.equal(prevId(ids, null), 'a');
  assert.equal(nextId(ids, 'a'), 'b');
  assert.equal(prevId(ids, 'a'), 'c');
  assert.equal(nextId(ids, 'c'), 'a');
  assert.equal(prevId(ids, 'c'), 'b');
  assert.equal(nextId(ids, 'missing'), 'a');
  assert.equal(prevId(ids, 'missing'), 'a');
});

