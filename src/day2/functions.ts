import * as v from "@valibot/valibot";
import { parseLines } from "../utils/file.ts";

export type Result = {
	part1: number;
	part2: number;
};

const lineSchema = v.pipe(
	v.tuple([v.string(), v.string()]),
	v.transform((input: [string, string]) => ({
		min: Number(input[0]),
		max: Number(input[1]),
	})),
	v.check(
		(obj: { min: number; max: number }) =>
			!Number.isNaN(obj.min) && !Number.isNaN(obj.max),
		"Both values must be valid numbers",
	),
);

export type LineRange = v.InferOutput<typeof lineSchema>;

export function process(file: string): Result {
	const ranges = parseLines(file, lineSchema, {
		delimiter: ",",
		lineDelimiter: "-",
	});

	const result: Result = { part1: 0, part2: 0 };

	ranges.forEach((range) => {
		result.part1 += part1Range(range);
		result.part2 += part2Range(range);
	});

	return result;
}

export function parseLine(line: string): LineRange {
	return v.parse(lineSchema, line.split("-"));
}

export function part1(line: string): number {
	const range = parseLine(line);
	return part1Range(range);
}

function part1Range(range: LineRange): number {
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
	return part2Range(range);
}

function part2Range(range: LineRange): number {
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
