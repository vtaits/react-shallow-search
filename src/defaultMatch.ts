import type {
  ReactElement,
} from 'react';

import type {
  QueryType,
} from './types';

/**
 * Default function that checks if the target element is matching for search, e.g.
 * @param element Target react element
 * @param query Current query
 * @returns Is element matching for current query
 */
export const defaultMatch = (
  element: ReactElement,
  query: QueryType,
) => {
  const {
    className,
    component,
    props,
  } = query;

  if (component && component !== element.type) {
    return false;
  }

  const elementProps = element.props as Record<string, unknown>;

  if (className) {
    const {
      className: classNameProp,
    } = elementProps;

    if (!classNameProp || typeof classNameProp !== 'string') {
      return false;
    }

    if (!classNameProp.split(' ').includes(className)) {
      return false;
    }
  }

  if (
    props
    && Object.entries(props).some(([key, value]) => elementProps[key] !== value)
  ) {
    return false;
  }

  return true;
};
