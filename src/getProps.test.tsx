import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { get } from "./get";
import { getProps } from "./getProps";
import type { ParamsType, QueryType } from "./types";

vi.mock("./get");
const mockedGet = vi.mocked(get);

const element = <div />;

const queryParam: QueryType<"span"> = {
	component: "span",
};

const params: ParamsType<"span"> = {
	getChildren: vi.fn(),
};

beforeEach(() => {
	mockedGet.mockReturnValue(<div />);
});

afterEach(() => {
	vi.resetAllMocks();
});

test("should call `get` with correct arguments", () => {
	getProps(element, queryParam, params);

	expect(mockedGet).toHaveBeenCalledTimes(1);
	expect(mockedGet).toHaveBeenCalledWith(element, queryParam, params);
});

test("should return the props of the result of `get`", () => {
	const result = (
		<main className="foo" title="bar">
			baz
		</main>
	);
	mockedGet.mockReturnValue(result);

	expect(getProps(element, queryParam)).toEqual({
		children: "baz",
		className: "foo",
		title: "bar",
	});
});
