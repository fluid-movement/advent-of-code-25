import * as v from "@valibot/valibot";

export function readInput(filename: string): string {
	const filepath = new URL(`../${filename}`, import.meta.url).pathname;
	return Deno.readTextFileSync(filepath);
}

export function readLines(filename: string, delimiter: string = "\n"): string[] {
	return readInput(filename).trim().split(delimiter);
}

/**
 * Parse file lines with Valibot schema validation
 *
 * @param filename - Path to the file relative to the src directory
 * @param schema - Valibot schema to validate and transform each line
 * @param options - Optional configuration
 * @param options.delimiter - Line delimiter (default: "\n")
 * @param options.lineDelimiter - Delimiter to split each line before passing to schema (optional)
 *
 * @returns Array of validated and typed objects
 *
 * @example
 * ```ts
 * // Simple string to object transformation
 * const schema = v.pipe(
 *   v.string(),
 *   v.transform((line) => line.split("-")),
 *   v.tuple([v.string(), v.string()]),
 *   v.transform(([min, max]) => ({ min: parseInt(min, 10), max: parseInt(max, 10) }))
 * );
 * const data = parseLines("day2/input.txt", schema);
 *
 * // With line delimiter
 * const rangeSchema = v.pipe(
 *   v.tuple([v.string(), v.string()]),
 *   v.transform(([min, max]) => ({ min: parseInt(min, 10), max: parseInt(max, 10) }))
 * );
 * const data = parseLines("day2/input.txt", rangeSchema, { lineDelimiter: "-" });
 * ```
 */
export function parseLines<TSchema extends v.BaseSchema<unknown, unknown, v.BaseIssue<unknown>>>(
	filename: string,
	schema: TSchema,
	options: { delimiter?: string; lineDelimiter?: string } = {},
): v.InferOutput<TSchema>[] {
	const { delimiter = "\n", lineDelimiter } = options;
	const lines = readLines(filename, delimiter);

	return lines.map((line) => {
		const input = lineDelimiter ? line.split(lineDelimiter) : line;
		return v.parse(schema, input);
	});
}
