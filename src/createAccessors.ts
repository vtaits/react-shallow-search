import type { ComponentType, ReactElement } from "react";
import { get } from "./get";
import { getAll } from "./getAll";
import { getProps } from "./getProps";
import { query } from "./query";
import { queryAll } from "./queryAll";
import type { AccessorsType, ParamsType, QueryType } from "./types";

/**
 * Create an object of bound query functions
 * @param element Target react element
 * @param query Query for search (type of react element, props, className)
 * @param params Params for search inside elements of exotic components
 * @returns an object of bound functions that similar to helper functions of the library
 */
export const createAccessors = <
	// biome-ignore lint/suspicious/noExplicitAny: supports any component
	Component extends keyof JSX.IntrinsicElements | ComponentType<any>,
>(
	element: ReactElement,
	queryParam: QueryType<Component>,
	params?: ParamsType<Component>,
): AccessorsType<Component> => ({
	/**
	 * @returns result of `get` function of the library
	 */
	get: () => get(element, queryParam, params),
	/**
	 * @returns result of `getAll` function of the library
	 */
	getAll: () => getAll(element, queryParam, params),
	/**
	 * @returns result of `getProps` function of the library
	 */
	getProps: () => getProps(element, queryParam, params),
	/**
	 * @returns result of `query` function of the library
	 */
	query: () => query(element, queryParam, params),
	/**
	 * @returns result of `queryAll` function of the library
	 */
	queryAll: () => queryAll(element, queryParam, params),
});
