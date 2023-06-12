import type {
  ComponentProps,
  ComponentType,
  ReactElement,
} from 'react';

import { defaultMatch } from './defaultMatch';
import { defaultGetChildren } from './defaultGetChildren';

import type {
  ParamsWithLimitType,
  QueryType,
} from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const collectResults = <Component extends keyof JSX.IntrinsicElements | ComponentType<any>>(
  res: ReactElement<ComponentProps<Component>, Component>[],
  element: ReactElement,
  queryParam: QueryType<Component>,
  params?: ParamsWithLimitType<Component>,
): void => {
  const limit = params?.limit;
  const match = params?.match || defaultMatch;
  const getChildren = params?.getChildren || defaultGetChildren;

  if (match(element, queryParam)) {
    res.push(element as ReactElement<ComponentProps<Component>, Component>);

    if (res.length === limit) {
      return;
    }
  }

  const children = getChildren(element);

  children.forEach((child) => {
    if (res.length === limit) {
      return;
    }

    collectResults(res, child, queryParam, params);
  });
};

/**
 * Search for matching elements for the query in the rendered react tree
 * @param element Target react element
 * @param query Query for search (type of react element, props, className)
 * @param params Params for search inside elements of exotic components
 * @returns List of matched react elements
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const queryAll = <Component extends keyof JSX.IntrinsicElements | ComponentType<any>>(
  element: ReactElement,
  queryParam: QueryType<Component>,
  params?: ParamsWithLimitType<Component>,
): ReactElement<ComponentProps<Component>, Component>[] => {
  const res: ReactElement<ComponentProps<Component>, Component>[] = [];

  collectResults(res, element, queryParam, params);

  return res;
};
