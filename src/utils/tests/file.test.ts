import { assertEquals, assertThrows } from "@std/assert";
import * as v from "@valibot/valibot";
import { parseLines } from "../file.ts";

Deno.test("utils - parseLines - simple string transformation", () => {
	const schema = v.pipe(
		v.string(),
		v.transform((line) => ({ value: line })),
	);

	const result = parseLines("utils/tests/fixtures/simple.txt", schema);

	assertEquals(result, [
		{ value: "line1" },
		{ value: "line2" },
		{ value: "line3" },
	]);
});

Deno.test("utils - parseLines - with lineDelimiter splitting", () => {
	const schema = v.pipe(
		v.tuple([v.string(), v.string()]),
		v.transform(([min, max]) => ({
			min: parseInt(min, 10),
			max: parseInt(max, 10),
		})),
		v.check(
			(obj) => !Number.isNaN(obj.min) && !Number.isNaN(obj.max),
			"Both values must be valid numbers",
		),
	);

	const result = parseLines("utils/tests/fixtures/ranges.txt", schema, {
		lineDelimiter: "-",
	});

	assertEquals(result, [
		{ min: 10, max: 20 },
		{ min: 100, max: 200 },
		{ min: 5, max: 15 },
	]);
});

Deno.test("utils - parseLines - with custom delimiter", () => {
	const schema = v.pipe(
		v.tuple([v.string(), v.string()]),
		v.transform(([a, b]) => ({
			a: parseInt(a, 10),
			b: parseInt(b, 10),
		})),
	);

	const result = parseLines("utils/tests/fixtures/comma.txt", schema, {
		delimiter: ",",
		lineDelimiter: ":",
	});

	assertEquals(result, [
		{ a: 1, b: 2 },
		{ a: 3, b: 4 },
		{ a: 5, b: 6 },
	]);
});

Deno.test("utils - parseLines - validation throws on invalid data", () => {
	const schema = v.pipe(
		v.tuple([v.string(), v.string()]),
		v.transform(([min, max]) => ({
			min: parseInt(min, 10),
			max: parseInt(max, 10),
		})),
		v.check(
			(obj) => !Number.isNaN(obj.min) && !Number.isNaN(obj.max),
			"Both values must be valid numbers",
		),
	);

	assertThrows(() => {
		parseLines("utils/tests/fixtures/invalid.txt", schema, {
			lineDelimiter: "-",
		});
	});
});

Deno.test("utils - parseLines - complex transformation", () => {
	const schema = v.pipe(
		v.string(),
		v.transform((line) => line.split(",")),
		v.array(v.string()),
		v.transform((parts) => ({
			id: parseInt(parts[0], 10),
			name: parts[1],
			active: parts[2] === "true",
		})),
	);

	const result = parseLines("utils/tests/fixtures/complex.txt", schema);

	assertEquals(result, [
		{ id: 1, name: "Alice", active: true },
		{ id: 2, name: "Bob", active: false },
		{ id: 3, name: "Charlie", active: true },
	]);
});

Deno.test("utils - parseLines - number array transformation", () => {
	const schema = v.pipe(
		v.string(),
		v.transform((line) => line.split(" ").map((n) => parseInt(n, 10))),
		v.array(v.number()),
	);

	const result = parseLines("utils/tests/fixtures/numbers.txt", schema);

	assertEquals(result, [
		[1, 2, 3, 4, 5],
		[10, 20, 30],
		[100, 200],
	]);
});
