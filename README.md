# react-shallow-search

[![NPM](https://img.shields.io/npm/v/react-shallow-search.svg)](https://www.npmjs.com/package/react-shallow-search)
![dependencies status](https://img.shields.io/librariesio/release/npm/react-shallow-search)

Test utils for searching elements in the react tree

[Api reference](https://vtaits.github.io/react-shallow-search/)

```tsx
import assert from 'node:assert';
import { createRenderer } from 'react-test-renderer/shallow';
import { get } from 'react-shallow-search';

function MyComponent() {
  return (
    <main>
      <div>
        <span className="target">
          Test
        </span>
      </div>
    </main>
  );
}

const renderer = createRenderer();
renderer.render(<MyComponent />);
const result = renderer.getRenderOutput();

const targetSpan = get(result, {
  className: 'target',
});

assert.strictEqual(targetSpan.type, 'span');
assert.strictEqual(targetSpan.props.children, 'Test');
```

## Installation

```
yarn add react-shallow-search react-is --dev
```

## Examples

### Search by type of react element

```tsx
import { get } from 'react-shallow-search';

get(
  <MyComponent>
    Test
  </MyComponent>,
  {
    component: MyComponent,
  },
);
```

### Search by className

```tsx
import { get } from 'react-shallow-search';

get(
  <MyComponent className="foo bar baz">
    Test
  </MyComponent>,
  {
    className: 'bar',
  },
);
```

### Search by props

```tsx
import { get } from 'react-shallow-search';

get(
  <MyComponent
    foo="bar"
    baz={123}
  >
    Test
  </MyComponent>,
  {
    props: {
      foo: 'bar',
      baz: 123,
    },
  },
);
```

### Custom attribute with children

```tsx
import { defaultGetChildren, get } from 'react-shallow-search';

get(
  <ExoticComponent
    block={(
      <span className="target">
        Test
      </span>
    )}
  />,
  {
    className: 'target',
  },
  {
    getChildren: (element) => {
      if (element.type === ExoticComponent) {
        return [element.block];
      }

      return defaultGetChildren(element);
    },
  },
);
```

### Custom matching function

```tsx
import { defaultMatch, get } from 'react-shallow-search';

get(
  <ExoticComponent
    customClassName="target"
  />,
  {
    className: 'target',
  },
  {
    match: (element, query) => {
      if (element.type === ExoticComponent) {
        return element.props.customClassName.split(' ').includes(query.className);
      }

      return defaultMatch(element, query);
    },
  },
);
```

### Search for multiple elements

```tsx
import { getAll } from 'react-shallow-search';

getAll(
  <div>
    <div className="foo">Bar</div>
    <div className="foo">Bar</div>
    <div className="foo">Bar</div>
  </div>,
  {
    className: 'foo',
  },
);
```
