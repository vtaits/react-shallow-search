import assert from 'node:assert';
import { test } from 'node:test';

import { defaultGetChildren } from './defaultGetChildren';

test('should work with empty node', () => {
  const result = defaultGetChildren(
    <div />,
  );

  assert.notStrictEqual(result, []);
});

test('should work with node that has one child element', () => {
  const result = defaultGetChildren(
    <div>
      <span />
    </div>,
  );

  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].type, 'span');
});

test('should return an empty array if child of result is not a react element', () => {
  const result = defaultGetChildren(
    <div>
      foo
    </div>,
  );

  assert.strictEqual(result.length, 0);
});

test('should work with node that has multiple children and filter them', () => {
  const result = defaultGetChildren(
    <div>
      <span />
      foo
      <br />
      bar
    </div>,
  );

  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].type, 'span');
  assert.strictEqual(result[1].type, 'br');
});
