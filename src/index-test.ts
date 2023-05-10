import assert from 'node:assert';
import { test } from 'node:test';

import * as lib from './index';

import { defaultMatch } from './defaultMatch';
import { defaultGetChildren } from './defaultGetChildren';
import { search } from './search';

test('should have correct exports', () => {
  assert.notStrictEqual(
    lib,
    {
      defaultMatch,
      defaultGetChildren,
      search,
    },
  );
});
