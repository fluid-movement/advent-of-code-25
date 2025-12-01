import assert from "node:assert";
import { describe, it } from "node:test";
import { parseCommand, parseCommands } from "./parser.js";

describe("day1 parser", () => {
	describe("parseCommand", () => {
		it("should parse right movement command", () => {
			const command = parseCommand("R50");
			assert.strictEqual(command.direction, "R");
			assert.strictEqual(command.steps, 50);
		});

		it("should parse left movement command", () => {
			const command = parseCommand("L123");
			assert.strictEqual(command.direction, "L");
			assert.strictEqual(command.steps, 123);
		});

		it("should parse single digit steps", () => {
			const command = parseCommand("R5");
			assert.strictEqual(command.direction, "R");
			assert.strictEqual(command.steps, 5);
		});

		it("should parse large step values", () => {
			const command = parseCommand("L9999");
			assert.strictEqual(command.direction, "L");
			assert.strictEqual(command.steps, 9999);
		});
	});

	describe("parseCommands", () => {
		it("should parse multiple commands", () => {
			const lines = ["R50", "L30", "R100"];
			const commands = parseCommands(lines);

			assert.strictEqual(commands.length, 3);

			assert.ok(commands[0]);
			assert.strictEqual(commands[0].direction, "R");
			assert.strictEqual(commands[0].steps, 50);

			assert.ok(commands[1]);
			assert.strictEqual(commands[1].direction, "L");
			assert.strictEqual(commands[1].steps, 30);

			assert.ok(commands[2]);
			assert.strictEqual(commands[2].direction, "R");
			assert.strictEqual(commands[2].steps, 100);
		});

		it("should handle empty array", () => {
			const commands = parseCommands([]);
			assert.strictEqual(commands.length, 0);
		});

		it("should handle single command", () => {
			const commands = parseCommands(["R42"]);
			assert.strictEqual(commands.length, 1);
			assert.ok(commands[0]);
			assert.strictEqual(commands[0].direction, "R");
			assert.strictEqual(commands[0].steps, 42);
		});
	});
});
