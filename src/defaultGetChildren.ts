import type {
  ReactElement,
  ReactNode,
} from 'react';
import {
  isElement,
} from 'react-is';

const collectChildrenFromArrayItem = (res: ReactElement[], child: ReactNode) => {
  if (isElement(child)) {
    res.push(child);
    return;
  }

  if (Array.isArray(child)) {
    (child as ReactNode[]).forEach((subChild) => {
      collectChildrenFromArrayItem(res, subChild);
    });
  }
};

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
    const res: ReactElement[] = [];

    children.forEach((child) => {
      collectChildrenFromArrayItem(res, child);
    });

    return res;
  }

  return [];
};
