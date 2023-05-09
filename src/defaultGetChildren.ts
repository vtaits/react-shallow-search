import type {
  ReactElement,
  ReactNode,
} from 'react';
import {
  isElement,
} from 'react-is';

/**
 * Default getter of children from the react element
 * @param element Target react element
 * @returns List of child nodes
 */
export const defaultGetChildren = (
  element: ReactElement,
): ReactElement[] => {
  const {
    children,
  } = element.props as {
    children: ReactNode | ReactNode[];
  };

  if (!children) {
    return [];
  }

  if (isElement(children)) {
    return [children];
  }

  if (Array.isArray(children)) {
    return children.filter((child) => isElement(child)) as ReactElement[];
  }

  return [];
};
