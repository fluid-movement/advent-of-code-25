import { assertEquals, assertThrows } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import * as f from "../functions.ts";

describe("day 2", () => {
	describe("results", () => {
		it("calculates the correct result", () => {
			assertEquals(f.parseFile("day2/input/input.txt"), {
				part1: 23039913998,
				part2: 35950619148,
			});
		});
	});
	describe("step1", () => {
		const testCases = [
			{ range: "11-22", expected: 33 },
			{ range: "95-115", expected: 99 },
			{ range: "998-1012", expected: 1010 },
		];

		testCases.forEach(({ range, expected }) => {
			it(`gets correct number of invalid ids for range ${range}`, () => {
				assertEquals(f.part1(range), expected);
			});
		});
	});
	describe("check", () => {
		const validIds = [
			{ input: 1212, expected: 1212 },
			{ input: 1111, expected: 1111 },
			{ input: 2323, expected: 2323 },
		];
		const invalidIds = [1234, 123, 12345];

		validIds.forEach(({ input, expected }) => {
			it(`should verify correct ID: ${input}`, () => {
				assertEquals(f.check(input), expected);
			});
		});

		invalidIds.forEach((input) => {
			it(`should reject incorrect ID: ${input}`, () => {
				assertEquals(f.check(input), 0);
			});
		});
	});
	describe("step2", () => {
		const testCases = [
			{ range: "11-22", expected: 33 },
			{ range: "95-115", expected: 99 + 111 },
			{ range: "998-1012", expected: 999 + 1010 },
		];

		testCases.forEach(({ range, expected }) => {
			it(`gets correct number of invalid ids for range ${range}`, () => {
				assertEquals(f.part2(range), expected);
			});
		});
	});
	describe("check", () => {
		const validIds = [11, 111, 1188511885, 446446, 2121212121, 824824824];
		const invalidIds = [1234, 123, 12345];

		validIds.forEach((input) => {
			it(`should verify correct ID: ${input}`, () => {
				assertEquals(f.checkMore(input), input);
			});
		});

		invalidIds.forEach((input) => {
			it(`should reject incorrect ID: ${input}`, () => {
				assertEquals(f.checkMore(input), 0);
			});
		});
	});

	describe("line parser", () => {
		const validRanges = [
			{ input: "10-20", expectedMin: 10, expectedMax: 20 },
			{ input: "5-15", expectedMin: 5, expectedMax: 15 },
			{ input: "100-200", expectedMin: 100, expectedMax: 200 },
		];

		validRanges.forEach(({ input, expectedMin, expectedMax }) => {
			it(`should parse line range ${input} correctly`, () => {
				const range = f.parseLine(input);
				assertEquals(range.min, expectedMin);
				assertEquals(range.max, expectedMax);
			});
		});

		const invalidInputs = ["10-abc", "abc-20", "10"];

		invalidInputs.forEach((input) => {
			it(`should throw error on invalid data: ${input}`, () => {
				assertThrows(() => {
					f.parseLine(input);
				});
			});
		});
	});
});
