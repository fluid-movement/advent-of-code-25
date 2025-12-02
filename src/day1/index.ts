import { readLines } from "../utils/file.ts";
import { execute } from "./execute.ts";
import { parseCommands } from "./parser.ts";
import type { Result } from "./types.ts";

const lines = readLines("day1/input/input.txt");
const commands = parseCommands(lines);

let current = 50;
let result: Result = { atZero: 0, passedZero: 0 };

commands.forEach((command) => {
	({ current, result } = execute(current, result, command));
});

console.log("------ results ------");
console.log("step 1", result.atZero);
console.log("step 2", result.passedZero);
