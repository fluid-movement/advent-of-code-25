import { readLines } from "../utils/file.js";
import { execute } from "./execute.js";
import { parseCommands } from "./parser.js";
import type { Result } from "./types.js";

const lines = readLines("day1/input.txt");
const commands = parseCommands(lines);

let current = 50;
let result: Result = { atZero: 0, passedZero: 0 };

commands.forEach((command) => {
	({ current, result } = execute(current, result, command));
});

console.log("------ results ------");
console.log("step 1", result.atZero);
console.log("step 2", result.passedZero);
