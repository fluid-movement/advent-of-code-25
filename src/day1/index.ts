import { readLines } from "../utils/file.js";

type Command = {
	direction: "R" | "L";
	steps: number;
};

type Result = {
	atZero: number;
	passedZero: number;
};

const parsedInput: Command[] = readLines("day1/input.txt").map((line) => {
	return {
		direction: line.slice(0, 1) as "R" | "L",
		steps: parseInt(line.slice(1), 10),
	};
});

function execute(
	current: number,
	result: Result,
	command: Command,
): { current: number; result: Result } {
	let nextState: number;

	console.log("---------------------");
	console.log("at: ", current);
	console.log(command);

	if (command.direction === "R") {
		nextState = current + command.steps;

		if (nextState >= 100) {
			console.log("add: ", Math.floor(nextState / 100));
			result.passedZero += Math.floor(nextState / 100);
		}
	} else {
		nextState = current - command.steps;

		if (nextState < 0) {
			console.log("add: ", Math.ceil(Math.abs(nextState) / 100));
			result.passedZero += Math.ceil(Math.abs(nextState) / 100);

			// make sure starting from 0 isn't counted twice
			if (current === 0) {
				console.log("remove 1");
				result.passedZero--;
			}

			nextState = 100 - Math.abs(nextState % 100);
		} else if (nextState === 0) {
			console.log("increment");
			result.passedZero++;
		}
	}

	nextState = nextState % 100;

	if (nextState === 0) result.atZero++;

	console.log(result.passedZero);
	console.log("next: ", nextState);

	return { current: nextState, result };
}

let current: number = 50;
let result: Result = { atZero: 0, passedZero: 0 };

parsedInput.forEach((command) => {
	({ current, result } = execute(current, result, command));
});

console.log("------ results ------");
console.log("step 1", result.atZero);
console.log("step 2", result.passedZero);
