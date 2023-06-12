import type {
  ComponentProps,
  ComponentType,
  ReactElement,
} from 'react';

import { query } from './query';
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
 * @throws If there is more than one matching element or if there are no matching elements
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const get = <Component extends keyof JSX.IntrinsicElements | ComponentType<any>>(
  element: ReactElement,
  queryParam: QueryType<Component>,
  params?: ParamsType<Component>,
): ReactElement<ComponentProps<Component>, Component> => {
  const result = query(element, queryParam, params);

  if (!result) {
    throw new Error('[react-shallow-search] there are no matching elements');
  }

  return result;
};
