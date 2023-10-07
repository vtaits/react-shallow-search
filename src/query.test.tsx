import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { query } from "./query";
import { queryAll } from "./queryAll";
import type { ParamsType, QueryType } from "./types";

vi.mock("./queryAll");
const mockedQueryAll = vi.mocked(queryAll);

const element = <div />;

const queryParam: QueryType<"span"> = {
	component: "span",
};

const params: ParamsType<"span"> = {
	getChildren: vi.fn(),
};

beforeEach(() => {
	mockedQueryAll.mockReturnValue([<div />]);
});

afterEach(() => {
	vi.resetAllMocks();
});

test("should call `queryAll` with correct arguments", () => {
	query(element, queryParam, params);

	expect(mockedQueryAll).toHaveBeenCalledTimes(1);
	expect(mockedQueryAll).toHaveBeenCalledWith(element, queryParam, {
		...params,
		limit: 2,
	});
});

test("should return null if the return of `queryAll` is empty", () => {
	mockedQueryAll.mockReturnValue([]);

	expect(query(element, queryParam)).toBe(null);
});

test("should return first item of the return of `queryAll` if the return contains only one item", () => {
	const result = <main />;
	mockedQueryAll.mockReturnValue([result]);

	expect(query(element, queryParam)).toBe(result);
});

test("should throw an error if the return of `queryAll` contains more than one item", () => {
	mockedQueryAll.mockReturnValue([<div />, <span />]);

	expect(() => {
		query(element, queryParam);
	}).toThrow();
});
