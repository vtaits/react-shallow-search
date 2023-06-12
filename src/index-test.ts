import assert from 'node:assert';
import { test } from 'node:test';

import * as lib from './index';

import { defaultMatch } from './defaultMatch';
import { defaultGetChildren } from './defaultGetChildren';
import { get } from './get';
import { getAll } from './getAll';
import { query } from './query';
import { queryAll } from './queryAll';

test('should have correct exports', () => {
  assert.notStrictEqual(
    lib,
    {
      defaultMatch,
      defaultGetChildren,
      get,
      getAll,
      query,
      queryAll,
    },
  );
});
