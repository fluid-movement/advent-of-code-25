import * as v from "@valibot/valibot";
import { readLines } from "../utils/file.ts";
import type { Result } from "./types.ts";

export function parseFile(file: string): Result {
	const lines = readLines(file, ",");

	const result: Result = { part1: 0, part2: 0 };

	lines.forEach((line) => {
		result.part1 += part1(line);
		result.part2 += part2(line);
	});

	return result;
}

const lineSchema = v.pipe(
	v.tuple([v.string(), v.string()]),
	v.transform((input: [string, string]) => ({
		min: parseInt(input[0], 10),
		max: parseInt(input[1], 10),
	})),
	v.check(
		(obj: { min: number; max: number }) => !Number.isNaN(obj.min) && !Number.isNaN(obj.max),
		"Both values must be valid numbers",
	),
);

export type LineRange = v.InferOutput<typeof lineSchema>;

export function parseLine(line: string): LineRange {
	return v.parse(lineSchema, line.split("-"));
}

export function part1(line: string): number {
	const range = parseLine(line);

	let total = 0;
	for (let i = range.min; i <= range.max; i++) {
		total += check(i);
	}

	return total;
}

export function check(input: number): number {
	const inputString = input.toString();
	if (inputString.length % 2 !== 0) {
		return 0;
	}

	const half: number = inputString.length / 2;

	if (inputString.slice(0, half) === inputString.slice(half)) {
		return parseInt(inputString, 10);
	}

	return 0;
}

export function part2(line: string): number {
	const range = parseLine(line);

	let total = 0;
	for (let i = range.min; i <= range.max; i++) {
		total += checkMore(i);
	}

	return total;
}

export function checkMore(input: number): number {
	const inputString = input.toString();

	for (
		let patternLength = 1;
		patternLength <= inputString.length / 2;
		patternLength++
	) {
		// Only check if the pattern divides evenly into the string length
		if (inputString.length % patternLength === 0) {
			const pattern = inputString.slice(0, patternLength);

			if (isRepeatingPattern(inputString, pattern)) {
				return input;
			}
		}
	}

	return 0;
}

function isRepeatingPattern(str: string, pattern: string): boolean {
	for (let i = 0; i < str.length; i += pattern.length) {
		const chunk = str.slice(i, i + pattern.length);
		if (chunk !== pattern) {
			return false;
		}
	}
	return true;
}
