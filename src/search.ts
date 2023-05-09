import type {
  ReactElement,
} from 'react';

import { defaultMatch } from './defaultMatch';
import { defaultGetChildren } from './defaultGetChildren';

import type {
  ParamsType,
  QueryType,
} from './types';

export const collectResults = (
  res: ReactElement[],
  element: ReactElement,
  query: QueryType,
  params?: ParamsType,
): void => {
  const match = params?.match || defaultMatch;
  const getChildren = params?.getChildren || defaultGetChildren;

  if (match(element, query)) {
    res.push(element);
  }

  const children = getChildren(element);

  children.forEach((child) => {
    collectResults(res, child, query, params);
  });
};

/**
 * Search for matching elements for the query in the rendered react tree
 * @param element Target react element
 * @param query Query for search (type of react element, props, className)
 * @param params Params for search inside elements of exotic components
 * @returns List of matched react elements
 */
export const search = (
  element: ReactElement,
  query: QueryType,
  params?: ParamsType,
): ReactElement[] => {
  const res: ReactElement[] = [];

  collectResults(res, element, query, params);

  return res;
};
