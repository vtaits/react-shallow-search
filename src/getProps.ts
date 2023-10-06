import type { ComponentProps, ComponentType, ReactElement } from "react";

import { get } from "./get";
import type { ParamsType, QueryType } from "./types";

/**
 * Get props of the single matching element for the query in the rendered react tree
 * @param element Target react element
 * @param query Query for search (type of react element, props, className)
 * @param params Params for search inside elements of exotic components
 * @returns Props of the matching element
 * @throws If there is more than one matching element or if there are no matching elements
 */
export const getProps = <
	// biome-ignore lint/suspicious/noExplicitAny: supports any component
	Component extends keyof JSX.IntrinsicElements | ComponentType<any>,
>(
	element: ReactElement,
	queryParam: QueryType<Component>,
	params?: ParamsType<Component>,
): ComponentProps<Component> => {
	const matchedElement = get(element, queryParam, params);

	return matchedElement.props;
};
