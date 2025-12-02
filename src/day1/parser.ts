import type { Command } from "./types.ts";

export function parseCommand(line: string): Command {
	return {
		direction: line.slice(0, 1) as "R" | "L",
		steps: parseInt(line.slice(1), 10),
	};
}

export function parseCommands(lines: string[]): Command[] {
	return lines.map(parseCommand);
}
