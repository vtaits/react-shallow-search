import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { get } from "./get";
import { query } from "./query";
import type { ParamsType, QueryType } from "./types";

vi.mock("./query");
const mockedQuery = vi.mocked(query);

const element = <div />;

const queryParam: QueryType<"span"> = {
	component: "span",
};

const params: ParamsType<"span"> = {
	getChildren: vi.fn(),
};

beforeEach(() => {
	mockedQuery.mockReturnValue(<div />);
});

afterEach(() => {
	vi.resetAllMocks();
});

test("should call `query` with correct arguments", () => {
	get(element, queryParam, params);

	expect(mockedQuery).toHaveBeenCalledTimes(1);
	expect(mockedQuery).toHaveBeenCalledWith(element, queryParam, params);
});

test("should return result of `query`", () => {
	const result = <main />;
	mockedQuery.mockReturnValue(result);

	expect(get(element, queryParam)).toBe(result);
});

test("should throw an error if the return of `query` is falsy", () => {
	mockedQuery.mockReturnValue(null);

	expect(() => {
		get(element, queryParam);
	}).toThrow();
});
