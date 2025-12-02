import * as v from "@valibot/valibot";
import { parseLines } from "../utils/file.ts";
import type { Command } from "./types.ts";

// Valibot schema for parsing command strings like "R50" or "L123"
const commandSchema = v.pipe(
	v.string(),
	v.transform((line): Command => ({
		direction: line.slice(0, 1) as "R" | "L",
		steps: parseInt(line.slice(1), 10),
	})),
	v.check(
		(cmd) => (cmd.direction === "R" || cmd.direction === "L") && !Number.isNaN(cmd.steps),
		"Invalid command format",
	),
);

export function parseCommand(line: string): Command {
	return v.parse(commandSchema, line);
}

export function parseCommands(lines: string[]): Command[] {
	return lines.map(parseCommand);
}

export function parseCommandsFromFile(filename: string): Command[] {
	return parseLines(filename, commandSchema);
}
