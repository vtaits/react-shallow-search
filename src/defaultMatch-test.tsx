import {
  type ReactElement,
} from 'react';

import assert from 'node:assert';
import {
  describe,
  test,
} from 'node:test';

import { defaultMatch } from './defaultMatch';

describe('component', () => {
  describe('string', () => {
    test('match', () => {
      assert.strictEqual(
        defaultMatch(
          <main />,
          {
            component: 'main',
          },
        ),
        true,
      );
    });

    test('not match', () => {
      assert.strictEqual(
        defaultMatch(
          <div />,
          {
            component: 'button',
          },
        ),
        false,
      );
    });
  });

  describe('custom component', () => {
    function Foo(): ReactElement {
      return <div />;
    }

    function Bar(): ReactElement {
      return <div />;
    }

    test('match', () => {
      assert.strictEqual(
        defaultMatch(
          <Foo />,
          {
            component: Foo,
          },
        ),
        true,
      );
    });

    test('not match', () => {
      assert.strictEqual(
        defaultMatch(
          <Foo />,
          {
            component: Bar,
          },
        ),
        false,
      );
    });
  });
});

describe('className', () => {
  test('not defined', () => {
    assert.strictEqual(
      defaultMatch(
        <div />,
        {
          className: 'foo',
        },
      ),
      false,
    );
  });

  test('not a string', () => {
    function Foo({
      className,
    }: {
      className: number;
    }): ReactElement {
      return (
        <div
          data-class-name={String(className)}
        />
      );
    }

    assert.strictEqual(
      defaultMatch(
        <Foo
          className={123}
        />,
        {
          className: 'foo',
        },
      ),
      false,
    );
  });

  test('match', () => {
    assert.strictEqual(
      defaultMatch(
        (
          <div
            className="bar foo baz"
          />
        ),
        {
          className: 'foo',
        },
      ),
      true,
    );
  });

  test('not match', () => {
    assert.strictEqual(
      defaultMatch(
        (
          <div
            className="bar baz"
          />
        ),
        {
          className: 'foo',
        },
      ),
      false,
    );
  });
});

describe('props', () => {
  test('match', () => {
    assert.strictEqual(
      defaultMatch(
        (
          <div
            title="Title"
            placeholder="Placeholder"
            data-about="About"
          />
        ),
        {
          props: {
            title: 'Title',
            placeholder: 'Placeholder',
          },
        },
      ),
      true,
    );
  });

  test('not match', () => {
    assert.strictEqual(
      defaultMatch(
        (
          <div
            title="Title"
            placeholder="Placeholder"
            data-about="About"
          />
        ),
        {
          props: {
            title: 'Title 2',
            placeholder: 'Placeholder',
          },
        },
      ),
      false,
    );
  });
});

describe('multiple conditions', () => {
  test('match', () => {
    assert.strictEqual(
      defaultMatch(
        (
          <div
            className="foo bar baz"
            title="Title"
            placeholder="Placeholder"
            data-about="About"
          />
        ),
        {
          component: 'div',

          className: 'bar',

          props: {
            title: 'Title',
            placeholder: 'Placeholder',
          },
        },
      ),
      true,
    );
  });
});
