import assert from 'node:assert';
import {
  describe,
  mock,
  test,
} from 'node:test';

import { search } from './search';

import type {
  QueryType,
} from './types';

describe('root node', () => {
  describe('default match', () => {
    test('match', () => {
      assert.strictEqual(
        search(
          <div />,
          {},
        ).length,
        1,
      );
    });

    test('not match', () => {
      assert.strictEqual(
        search(
          <div />,
          {
            component: 'span',
          },
        ).length,
        0,
      );
    });
  });

  describe('custom match', () => {
    test('match', () => {
      const match = mock.fn(() => true);

      const element = (
        <div />
      );

      const query: QueryType = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        search(
          element,
          query,
          {
            match,
          },
        ).length,
        1,
      );

      assert.notStrictEqual(
        match.mock.calls[0],
        [
          element,
          query,
        ],
      );
    });

    test('not match', () => {
      const match = mock.fn(() => false);

      const element = (
        <div />
      );

      const query: QueryType = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        search(
          element,
          query,
          {
            match,
          },
        ).length,
        0,
      );

      assert.notStrictEqual(
        match.mock.calls[0],
        [
          element,
          query,
        ],
      );
    });
  });
});

describe('child node', () => {
  describe('default match', () => {
    test('match', () => {
      assert.strictEqual(
        search(
          <main>
            <div />
          </main>,
          {
            component: 'div',
          },
        ).length,
        1,
      );
    });

    test('not match', () => {
      assert.strictEqual(
        search(
          <main>
            <div />
          </main>,
          {
            component: 'span',
          },
        ).length,
        0,
      );
    });
  });

  describe('custom match', () => {
    test('match', () => {
      const match = mock.fn(() => false);

      match.mock.mockImplementationOnce(() => true);

      const element = (
        <div />
      );

      const query: QueryType = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        search(
          (
            <main>
              {element}
            </main>
          ),
          query,
          {
            match,
          },
        ).length,
        1,
        'only nested node matches',
      );

      assert.strictEqual(
        match.mock.calls.length,
        2,
        'called for parent node and nested node',
      );

      assert.notStrictEqual(
        match.mock.calls[1],
        [
          element,
          query,
        ],
        'called with correct arguments',
      );
    });

    test('not match', () => {
      const match = mock.fn(() => false);

      const element = (
        <div />
      );

      const query: QueryType = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        search(
          (
            <main>
              {element}
            </main>
          ),
          query,
          {
            match,
          },
        ).length,
        0,
        'no node matches',
      );

      assert.strictEqual(
        match.mock.calls.length,
        2,
        'called for parent node and nested node',
      );

      assert.notStrictEqual(
        match.mock.calls[1],
        [
          element,
          query,
        ],
        'called with correct arguments',
      );
    });
  });
});

test('multiple results', () => {
  const res1 = (
    <div
      className="foo bar"
    />
  );

  const res2 = (
    <span
      className="bar baz"
    />
  );

  assert.notStrictEqual(
    search(
      (
        <main>
          foo

          <div>
            {res1}
          </div>

          bar

          {res2}
        </main>
      ),
      {
        className: 'bar',
      },
    ),
    [
      res1,
      res2,
    ],
  );
});
