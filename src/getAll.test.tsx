import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { getAll } from "./getAll";
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
	getAll(element, queryParam, params);

	expect(mockedQueryAll).toHaveBeenCalledTimes(1);
	expect(mockedQueryAll).toHaveBeenCalledWith(element, queryParam, params);
});

test("should return result of `queryAll`", () => {
	const result = [<main />];
	mockedQueryAll.mockReturnValue(result);

	expect(getAll(element, queryParam)).toBe(result);
});

test("should throw an error if the return of `queryAll` is empty", () => {
	mockedQueryAll.mockReturnValue([]);

	expect(() => {
		getAll(element, queryParam);
	}).toThrow();
});
