import type {
  ComponentProps,
  ComponentType,
  ReactElement,
} from 'react';

import { queryAll } from './queryAll';
import type {
  ParamsType,
  QueryType,
} from './types';

/**
 * Search for single matching element for the query in the rendered react tree
 * @param element Target react element
 * @param query Query for search (type of react element, props, className)
 * @param params Params for search inside elements of exotic components
 * @returns The element if there is one matching element
 *
 * `null` if there are no matching elements
 *
 * @throws If there is more than one matching element
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const query = <Component extends keyof JSX.IntrinsicElements | ComponentType<any>>(
  element: ReactElement,
  queryParam: QueryType<Component>,
  params?: ParamsType<Component>,
): ReactElement<ComponentProps<Component>, Component> | null => {
  const results = queryAll(element, queryParam, {
    ...params,
    limit: 2,
  });

  switch (results.length) {
    case 0:
      return null;

    case 1:
      return results[0];

    default:
      throw new Error('[react-shallow-search] there is more than one matching element');
  }
};
