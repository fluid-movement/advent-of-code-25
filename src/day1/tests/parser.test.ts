import { assert, assertEquals, assertThrows } from "@std/assert";
import { parseCommand, parseCommands, parseCommandsFromFile } from "../parser.ts";

Deno.test("day1 parser - parseCommand - right movement command", () => {
	const command = parseCommand("R50");
	assertEquals(command.direction, "R");
	assertEquals(command.steps, 50);
});

Deno.test("day1 parser - parseCommand - left movement command", () => {
	const command = parseCommand("L123");
	assertEquals(command.direction, "L");
	assertEquals(command.steps, 123);
});

Deno.test("day1 parser - parseCommand - single digit steps", () => {
	const command = parseCommand("R5");
	assertEquals(command.direction, "R");
	assertEquals(command.steps, 5);
});

Deno.test("day1 parser - parseCommand - large step values", () => {
	const command = parseCommand("L9999");
	assertEquals(command.direction, "L");
	assertEquals(command.steps, 9999);
});

Deno.test("day1 parser - parseCommands - multiple commands", () => {
	const lines = ["R50", "L30", "R100"];
	const commands = parseCommands(lines);

	assertEquals(commands.length, 3);

	assert(commands[0]);
	assertEquals(commands[0].direction, "R");
	assertEquals(commands[0].steps, 50);

	assert(commands[1]);
	assertEquals(commands[1].direction, "L");
	assertEquals(commands[1].steps, 30);

	assert(commands[2]);
	assertEquals(commands[2].direction, "R");
	assertEquals(commands[2].steps, 100);
});

Deno.test("day1 parser - parseCommands - empty array", () => {
	const commands = parseCommands([]);
	assertEquals(commands.length, 0);
});

Deno.test("day1 parser - parseCommands - single command", () => {
	const commands = parseCommands(["R42"]);
	assertEquals(commands.length, 1);
	assert(commands[0]);
	assertEquals(commands[0].direction, "R");
	assertEquals(commands[0].steps, 42);
});

Deno.test("day1 parser - parseCommandsFromFile - reads and parses file", () => {
	const commands = parseCommandsFromFile("day1/input/test.txt");

	assertEquals(commands.length, 11);

	assert(commands[0]);
	assertEquals(commands[0].direction, "L");
	assertEquals(commands[0].steps, 68);

	assert(commands[1]);
	assertEquals(commands[1].direction, "L");
	assertEquals(commands[1].steps, 30);

	assert(commands[10]);
	assertEquals(commands[10].direction, "R");
	assertEquals(commands[10].steps, 1000);
});

Deno.test("day1 parser - parseCommand - validates direction", () => {
	assertThrows(() => {
		parseCommand("X50");
	}, "Invalid command format");
});

Deno.test("day1 parser - parseCommand - validates number parsing", () => {
	assertThrows(() => {
		parseCommand("RABC");
	}, "Invalid command format");
});
