import { assert, assertEquals } from "jsr:@std/assert";
import { describe, it } from "jsr:@std/testing/bdd";
import { parseCommand, parseCommands } from "../parser.ts";

describe("day1 parser", () => {
	describe("parseCommand", () => {
		it("should parse right movement command", () => {
			const command = parseCommand("R50");
			assertEquals(command.direction, "R");
			assertEquals(command.steps, 50);
		});

		it("should parse left movement command", () => {
			const command = parseCommand("L123");
			assertEquals(command.direction, "L");
			assertEquals(command.steps, 123);
		});

		it("should parse single digit steps", () => {
			const command = parseCommand("R5");
			assertEquals(command.direction, "R");
			assertEquals(command.steps, 5);
		});

		it("should parse large step values", () => {
			const command = parseCommand("L9999");
			assertEquals(command.direction, "L");
			assertEquals(command.steps, 9999);
		});
	});

	describe("parseCommands", () => {
		it("should parse multiple commands", () => {
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

		it("should handle empty array", () => {
			const commands = parseCommands([]);
			assertEquals(commands.length, 0);
		});

		it("should handle single command", () => {
			const commands = parseCommands(["R42"]);
			assertEquals(commands.length, 1);
			assert(commands[0]);
			assertEquals(commands[0].direction, "R");
			assertEquals(commands[0].steps, 42);
		});
	});
});
