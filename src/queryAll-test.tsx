import assert from 'node:assert';
import {
  describe,
  mock,
  test,
} from 'node:test';

import { queryAll } from './queryAll';

import type {
  QueryType,
} from './types';

describe('root node', () => {
  describe('default match', () => {
    test('match', () => {
      assert.strictEqual(
        queryAll(
          <div />,
          {},
        ).length,
        1,
      );
    });

    test('not match', () => {
      assert.strictEqual(
        queryAll(
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

      const query: QueryType<'span'> = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        queryAll(
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

      const query: QueryType<'span'> = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        queryAll(
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
        queryAll(
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
        queryAll(
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

      const query: QueryType<'span'> = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        queryAll(
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

      const query: QueryType<'span'> = {
        component: 'span',
        className: 'foo',
      };

      assert.strictEqual(
        queryAll(
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

  test('custom `getChildren`', () => {
    const getChildren = mock.fn(() => []);

    getChildren.mock.mockImplementationOnce(() => [<span />]);

    const element = (
      <div />
    );

    const query: QueryType<'span'> = {
      component: 'span',
    };

    assert.strictEqual(
      queryAll(
        (
          <main>
            {element}
          </main>
        ),
        query,
        {
          getChildren,
        },
      ).length,
      1,
      'only nested node matches',
    );

    assert.strictEqual(
      getChildren.mock.calls.length,
      2,
      'called for parent node and nested node',
    );

    assert.notStrictEqual(
      getChildren.mock.calls[0],
      [
        element,
      ],
      'called with correct arguments',
    );
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
    queryAll(
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

test('slice results with limit param', () => {
  const res1 = (
    <div
      className="foo"
    />
  );

  const res2 = (
    <span
      className="foo"
    />
  );

  const notRes3 = (
    <span
      className="foo"
    />
  );

  assert.notStrictEqual(
    queryAll(
      (
        <main>
          {res1}

          <div>
            {res2}
          </div>

          {notRes3}
        </main>
      ),
      {
        className: 'foo',
      },
      {
        limit: 2,
      },
    ),
    [
      res1,
      res2,
    ],
  );
});
