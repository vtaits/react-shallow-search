import type { ComponentProps, ComponentType, ReactElement } from "react";

/**
 * Parameters for searching for elements
 */
export type QueryType<
	// biome-ignore lint/suspicious/noExplicitAny: supports any component
	Component extends keyof JSX.IntrinsicElements | ComponentType<any>,
> = {
	/**
	 * Type of jsx node. E.g.
	 *
	 * ```
	 * search(<button>Test</button>, {
	 *   component: 'button',
	 * })
	 *
	 * search(<MyComponent>Test</MyComponent>, {
	 *   component: MyComponent,
	 * })
	 * ```
	 */
	component?: Component;
	/**
	 * Props that the target elements should have
	 *
	 * ```
	 * search(
	 *   <button type="button">
	 *     Test
	 *   </button>,
	 *   {
	 *     type: 'button',
	 *   },
	 * )
	 * ```
	 */
	props?: Record<string, unknown>;
	/**
	 * Classname that the target elements should have
	 *
	 * ```
	 * search(
	 *   <button
	 *     className="foo bar baz"
	 *   >
	 *     Test
	 *   </button>,
	 *   {
	 *     className: 'bar',
	 *   },
	 * )
	 * ```
	 */
	className?: string;
};

/**
 * Additional parameters for searching inside exotic elements
 */
export type ParamsType<
	// biome-ignore lint/suspicious/noExplicitAny: supports any component
	Component extends keyof JSX.IntrinsicElements | ComponentType<any>,
> = {
	/**
	 * Get children from the element of the exotic component,
	 * e.g. other prop for rendering children or render props
	 *
	 * ```
	 * search(
	 *   <ExoticComponent>
	 *     {() => (
	 *       <button>
	 *         Test
	 *       </button>
	 *     )}
	 *   </ExoticComponent>,
	 *   {
	 *     component: 'button',
	 *   },
	 *   {
	 *     getChildren: (
	 *       element,
	 *     ) => {
	 *       if (element.type === ExoticComponent) {
	 *         return [element.props.children()];
	 *       }
	 *
	 *       return defaultGetChildren(element);
	 *     },
	 *   },
	 * )
	 * ```
	 *
	 * @param element Target react element
	 * @returns List of child nodes
	 */
	getChildren?: (element: ReactElement) => ReactElement[];

	/**
	 * Check if the target element is matching for search, e.g.
	 *
	 * ```
	 * search(
	 *   <ComponentWithCustomClassNameProp
	 *     customClassName="foo bar baz"
	 *   />,
	 *   {
	 *     className: 'bar',
	 *   },
	 *   {
	 *     match: (
	 *       element,
	 *       query,
	 *     ) => {
	 *       if (element.type === ComponentWithCustomClassNameProp) {
	 *         return element.props.customClassName.split(' ').includes(query.className);
	 *       }
	 *
	 *       return defaultMatch(element, query);
	 *     },
	 *   },
	 * )
	 * ```
	 * @param element Target react element
	 * @param query Current query
	 * @returns Is element matching for current query
	 */
	match?: (element: ReactElement, query: QueryType<Component>) => boolean;
};

/**
 * Additional parameters for searching multiple elements inside exotic elements
 */
export type ParamsWithLimitType<
	// biome-ignore lint/suspicious/noExplicitAny: supports any component
	Component extends keyof JSX.IntrinsicElements | ComponentType<any>,
> = ParamsType<Component> & {
	/**
	 * Max number of elements in result
	 */
	limit?: number | null;
};

export type AccessorsType<
	// biome-ignore lint/suspicious/noExplicitAny: supports any component
	Component extends keyof JSX.IntrinsicElements | ComponentType<any>,
> = {
	get: () => ReactElement<ComponentProps<Component>, Component>;
	getProps: () => ComponentProps<Component>;
	getAll: () => ReactElement<ComponentProps<Component>, Component>[];
	query: () => ReactElement<ComponentProps<Component>, Component> | null;
	queryAll: () => ReactElement<ComponentProps<Component>, Component>[];
};
