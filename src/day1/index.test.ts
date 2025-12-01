import assert from "node:assert";
import { describe, it } from "node:test";
import { execute } from "./execute.js";
import type { Result } from "./types.js";

describe("day1 execute function", () => {
	it("should handle R movement within same hundred", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(50, result, {
			direction: "R",
			steps: 5,
		});
		assert.strictEqual(current, 55);
		assert.strictEqual(newResult.passedZero, 0);
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle R movement crossing one boundary", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(55, result, {
			direction: "R",
			steps: 49,
		});
		assert.strictEqual(current, 4);
		assert.strictEqual(newResult.passedZero, 1);
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle R movement landing on 0", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(47, result, {
			direction: "R",
			steps: 53,
		});
		assert.strictEqual(current, 0);
		assert.strictEqual(
			newResult.passedZero,
			1,
			"Should count landing on 0 (Math.floor(100/100)=1)",
		);
		assert.strictEqual(newResult.atZero, 1, "Should count landing on 0");
	});

	it("should handle R1000 from position 50", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(50, result, {
			direction: "R",
			steps: 1000,
		});
		assert.strictEqual(current, 50);
		assert.strictEqual(
			newResult.passedZero,
			10,
			"Should pass through 0 ten times",
		);
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle L movement within same hundred", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(52, result, {
			direction: "L",
			steps: 19,
		});
		assert.strictEqual(current, 33);
		assert.strictEqual(newResult.passedZero, 0);
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle L movement crossing one boundary", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(8, result, {
			direction: "L",
			steps: 36,
		});
		assert.strictEqual(current, 72);
		assert.strictEqual(newResult.passedZero, 1);
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle L movement landing on 0 from within same hundred", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(22, result, {
			direction: "L",
			steps: 22,
		});
		assert.strictEqual(current, 0);
		assert.strictEqual(
			newResult.passedZero,
			1,
			"Should count landing on 0 via else if",
		);
		assert.strictEqual(newResult.atZero, 1);
	});

	it("should handle movement starting from 0 going right without crossing", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(0, result, {
			direction: "R",
			steps: 84,
		});
		assert.strictEqual(current, 84);
		assert.strictEqual(
			newResult.passedZero,
			0,
			"Should not count starting at 0",
		);
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle movement starting from 0 going left - special case", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(0, result, {
			direction: "L",
			steps: 85,
		});
		assert.strictEqual(current, 15);
		// Math.ceil(85/100) = 1, minus 1 for starting at 0 = 0
		assert.strictEqual(
			newResult.passedZero,
			0,
			"Should subtract 1 for starting at 0",
		);
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle L68 from 50 to position 82", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(50, result, {
			direction: "L",
			steps: 68,
		});
		assert.strictEqual(current, 82);
		assert.strictEqual(newResult.passedZero, 1, "Should pass through 0 once");
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle L movement from 0 crossing multiple boundaries", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(0, result, {
			direction: "L",
			steps: 286,
		});
		assert.strictEqual(current, 14);
		// Math.ceil(286/100) = 3, minus 1 for starting at 0 = 2
		assert.strictEqual(newResult.passedZero, 2, "Should pass -100 and -200");
		assert.strictEqual(newResult.atZero, 0);
	});

	it("should handle sequence from example", () => {
		let current = 50;
		let result = { atZero: 0, passedZero: 0 };

		// L68 to 82 (passes 0 once)
		({ current, result } = execute(current, result, {
			direction: "L",
			steps: 68,
		}));
		assert.strictEqual(current, 82);
		assert.strictEqual(result.passedZero, 1);
		assert.strictEqual(result.atZero, 0);

		// L30 to 52
		({ current, result } = execute(current, result, {
			direction: "L",
			steps: 30,
		}));
		assert.strictEqual(current, 52);
		assert.strictEqual(result.passedZero, 1);
		assert.strictEqual(result.atZero, 0);

		// R48 to 0 (lands on 0)
		({ current, result } = execute(current, result, {
			direction: "R",
			steps: 48,
		}));
		assert.strictEqual(current, 0);
		assert.strictEqual(result.passedZero, 2, "Should add 1 for landing on 0");
		assert.strictEqual(result.atZero, 1);

		// L5 to 95
		({ current, result } = execute(current, result, {
			direction: "L",
			steps: 5,
		}));
		assert.strictEqual(current, 95);
		// nextState = -5, Math.ceil(5/100) = 1, minus 1 for starting at 0 = 0
		assert.strictEqual(result.passedZero, 2, "No change");
		assert.strictEqual(result.atZero, 1);

		// R60 to 55 (passes 0 once)
		({ current, result } = execute(current, result, {
			direction: "R",
			steps: 60,
		}));
		assert.strictEqual(current, 55);
		assert.strictEqual(result.passedZero, 3, "Should add 1 for crossing 0");
		assert.strictEqual(result.atZero, 1);

		// L55 to 0 (lands on 0)
		({ current, result } = execute(current, result, {
			direction: "L",
			steps: 55,
		}));
		assert.strictEqual(current, 0);
		assert.strictEqual(result.passedZero, 4, "Should add 1 via else if");
		assert.strictEqual(result.atZero, 2);
	});

	it("should handle R movement landing exactly on 0 with large step", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(50, result, {
			direction: "R",
			steps: 50,
		});
		assert.strictEqual(current, 0);
		// nextState = 100, Math.floor(100/100) = 1
		assert.strictEqual(
			newResult.passedZero,
			1,
			"Should count landing on 0 once",
		);
		assert.strictEqual(newResult.atZero, 1);
	});

	it("should handle R movement landing exactly on 0 with multiple wraps", () => {
		const result: Result = { atZero: 0, passedZero: 0 };
		const { current, result: newResult } = execute(50, result, {
			direction: "R",
			steps: 150,
		});
		assert.strictEqual(current, 0);
		// nextState = 200, Math.floor(200/100) = 2
		assert.strictEqual(newResult.passedZero, 2, "Should count 2 crossings");
		assert.strictEqual(newResult.atZero, 1);
	});
});
