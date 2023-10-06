import type { ComponentProps, ComponentType, ReactElement } from "react";

import { queryAll } from "./queryAll";
import type { ParamsWithLimitType, QueryType } from "./types";

/**
 * Search for matching elements for the query in the rendered react tree
 * @param element Target react element
 * @param query Query for search (type of react element, props, className)
 * @param params Params for search inside elements of exotic components
 * @returns List of matched react elements
 * @throws If there is no matching elements
 */
export const getAll = <
	// biome-ignore lint/suspicious/noExplicitAny: supports any component
	Component extends keyof JSX.IntrinsicElements | ComponentType<any>,
>(
	element: ReactElement,
	queryParam: QueryType<Component>,
	params?: ParamsWithLimitType<Component>,
): ReactElement<ComponentProps<Component>, Component>[] => {
	const results = queryAll(element, queryParam, params);

	if (results.length === 0) {
		throw new Error("[react-shallow-search] there are no matching elements");
	}

	return results;
};
