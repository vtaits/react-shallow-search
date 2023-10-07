import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { createAccessors } from "./createAccessors";
import { get } from "./get";
import { getAll } from "./getAll";
import { getProps } from "./getProps";
import { query } from "./query";
import { queryAll } from "./queryAll";
import type { ParamsType, QueryType } from "./types";

vi.mock("./get");
const mockedGet = vi.mocked(get);
vi.mock("./getAll");
const mockedGetAll = vi.mocked(getAll);
vi.mock("./getProps");
const mockedGetProps = vi.mocked(getProps);
vi.mock("./query");
const mockedQuery = vi.mocked(query);
vi.mock("./queryAll");
const mockedQueryAll = vi.mocked(queryAll);

const element = <div />;

const queryParam: QueryType<"span"> = {
	component: "span",
};

const params: ParamsType<"span"> = {
	getChildren: vi.fn(),
};

const accessors = createAccessors(element, queryParam, params);

beforeEach(() => {});

afterEach(() => {
	vi.resetAllMocks();
});

test("should call `get`", () => {
	const result = <main />;

	mockedGet.mockReturnValue(result);

	const accessorResult = accessors.get();

	expect(accessorResult).toBe(result);

	expect(mockedGet).toHaveBeenCalledTimes(1);
	expect(mockedGet).toHaveBeenCalledWith(element, queryParam, params);

	expect(mockedGetAll).toHaveBeenCalledTimes(0);
	expect(mockedGetProps).toHaveBeenCalledTimes(0);
	expect(mockedQuery).toHaveBeenCalledTimes(0);
	expect(mockedQueryAll).toHaveBeenCalledTimes(0);
});

test("should call `getAll`", () => {
	const result = [<main />];

	mockedGetAll.mockReturnValue(result);

	const accessorResult = accessors.getAll();

	expect(accessorResult).toBe(result);

	expect(mockedGetAll).toHaveBeenCalledTimes(1);
	expect(mockedGetAll).toHaveBeenCalledWith(element, queryParam, params);

	expect(mockedGet).toHaveBeenCalledTimes(0);
	expect(mockedGetProps).toHaveBeenCalledTimes(0);
	expect(mockedQuery).toHaveBeenCalledTimes(0);
	expect(mockedQueryAll).toHaveBeenCalledTimes(0);
});

test("should call `getProps`", () => {
	const result = {
		foo: "bar",
	};

	mockedGetProps.mockReturnValue(result);

	const accessorResult = accessors.getProps();

	expect(accessorResult).toBe(result);

	expect(mockedGetProps).toHaveBeenCalledTimes(1);
	expect(mockedGetProps).toHaveBeenCalledWith(element, queryParam, params);

	expect(mockedGet).toHaveBeenCalledTimes(0);
	expect(mockedGetAll).toHaveBeenCalledTimes(0);
	expect(mockedQuery).toHaveBeenCalledTimes(0);
	expect(mockedQueryAll).toHaveBeenCalledTimes(0);
});

test("should call `query`", () => {
	const result = <main />;

	mockedQuery.mockReturnValue(result);

	const accessorResult = accessors.query();

	expect(accessorResult).toBe(result);

	expect(mockedQuery).toHaveBeenCalledTimes(1);
	expect(mockedQuery).toHaveBeenCalledWith(element, queryParam, params);

	expect(mockedGet).toHaveBeenCalledTimes(0);
	expect(mockedGetAll).toHaveBeenCalledTimes(0);
	expect(mockedGetProps).toHaveBeenCalledTimes(0);
	expect(mockedQueryAll).toHaveBeenCalledTimes(0);
});

test("should call `queryAll`", () => {
	const result = [<main />];

	mockedQueryAll.mockReturnValue(result);

	const accessorResult = accessors.queryAll();

	expect(accessorResult).toBe(result);

	expect(mockedQueryAll).toHaveBeenCalledTimes(1);
	expect(mockedQueryAll).toHaveBeenCalledWith(element, queryParam, params);

	expect(mockedGet).toHaveBeenCalledTimes(0);
	expect(mockedGetAll).toHaveBeenCalledTimes(0);
	expect(mockedGetProps).toHaveBeenCalledTimes(0);
	expect(mockedQuery).toHaveBeenCalledTimes(0);
});
