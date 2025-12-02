import { assertEquals } from "@std/assert";
import { execute } from "../execute.ts";
import type { Result } from "../types.ts";

Deno.test("day1 execute - R movement within same hundred", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(50, result, {
		direction: "R",
		steps: 5,
	});
	assertEquals(current, 55);
	assertEquals(newResult.passedZero, 0);
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - R movement crossing one boundary", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(55, result, {
		direction: "R",
		steps: 49,
	});
	assertEquals(current, 4);
	assertEquals(newResult.passedZero, 1);
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - R movement landing on 0", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(47, result, {
		direction: "R",
		steps: 53,
	});
	assertEquals(current, 0);
	assertEquals(
		newResult.passedZero,
		1,
		"Should count landing on 0 (Math.floor(100/100)=1)",
	);
	assertEquals(newResult.atZero, 1, "Should count landing on 0");
});

Deno.test("day1 execute - R1000 from position 50", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(50, result, {
		direction: "R",
		steps: 1000,
	});
	assertEquals(current, 50);
	assertEquals(newResult.passedZero, 10, "Should pass through 0 ten times");
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - L movement within same hundred", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(52, result, {
		direction: "L",
		steps: 19,
	});
	assertEquals(current, 33);
	assertEquals(newResult.passedZero, 0);
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - L movement crossing one boundary", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(8, result, {
		direction: "L",
		steps: 36,
	});
	assertEquals(current, 72);
	assertEquals(newResult.passedZero, 1);
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - L movement landing on 0 from within same hundred", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(22, result, {
		direction: "L",
		steps: 22,
	});
	assertEquals(current, 0);
	assertEquals(
		newResult.passedZero,
		1,
		"Should count landing on 0 via else if",
	);
	assertEquals(newResult.atZero, 1);
});

Deno.test("day1 execute - movement starting from 0 going right without crossing", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(0, result, {
		direction: "R",
		steps: 84,
	});
	assertEquals(current, 84);
	assertEquals(newResult.passedZero, 0, "Should not count starting at 0");
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - movement starting from 0 going left - special case", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(0, result, {
		direction: "L",
		steps: 85,
	});
	assertEquals(current, 15);
	// Math.ceil(85/100) = 1, minus 1 for starting at 0 = 0
	assertEquals(
		newResult.passedZero,
		0,
		"Should subtract 1 for starting at 0",
	);
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - L68 from 50 to position 82", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(50, result, {
		direction: "L",
		steps: 68,
	});
	assertEquals(current, 82);
	assertEquals(newResult.passedZero, 1, "Should pass through 0 once");
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - L movement from 0 crossing multiple boundaries", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(0, result, {
		direction: "L",
		steps: 286,
	});
	assertEquals(current, 14);
	// Math.ceil(286/100) = 3, minus 1 for starting at 0 = 2
	assertEquals(newResult.passedZero, 2, "Should pass -100 and -200");
	assertEquals(newResult.atZero, 0);
});

Deno.test("day1 execute - sequence from example", () => {
	let current = 50;
	let result = { atZero: 0, passedZero: 0 };

	// L68 to 82 (passes 0 once)
	({ current, result } = execute(current, result, {
		direction: "L",
		steps: 68,
	}));
	assertEquals(current, 82);
	assertEquals(result.passedZero, 1);
	assertEquals(result.atZero, 0);

	// L30 to 52
	({ current, result } = execute(current, result, {
		direction: "L",
		steps: 30,
	}));
	assertEquals(current, 52);
	assertEquals(result.passedZero, 1);
	assertEquals(result.atZero, 0);

	// R48 to 0 (lands on 0)
	({ current, result } = execute(current, result, {
		direction: "R",
		steps: 48,
	}));
	assertEquals(current, 0);
	assertEquals(result.passedZero, 2, "Should add 1 for landing on 0");
	assertEquals(result.atZero, 1);

	// L5 to 95
	({ current, result } = execute(current, result, {
		direction: "L",
		steps: 5,
	}));
	assertEquals(current, 95);
	// nextState = -5, Math.ceil(5/100) = 1, minus 1 for starting at 0 = 0
	assertEquals(result.passedZero, 2, "No change");
	assertEquals(result.atZero, 1);

	// R60 to 55 (passes 0 once)
	({ current, result } = execute(current, result, {
		direction: "R",
		steps: 60,
	}));
	assertEquals(current, 55);
	assertEquals(result.passedZero, 3, "Should add 1 for crossing 0");
	assertEquals(result.atZero, 1);

	// L55 to 0 (lands on 0)
	({ current, result } = execute(current, result, {
		direction: "L",
		steps: 55,
	}));
	assertEquals(current, 0);
	assertEquals(result.passedZero, 4, "Should add 1 via else if");
	assertEquals(result.atZero, 2);
});

Deno.test("day1 execute - R movement landing exactly on 0 with large step", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(50, result, {
		direction: "R",
		steps: 50,
	});
	assertEquals(current, 0);
	// nextState = 100, Math.floor(100/100) = 1
	assertEquals(newResult.passedZero, 1, "Should count landing on 0 once");
	assertEquals(newResult.atZero, 1);
});

Deno.test("day1 execute - R movement landing exactly on 0 with multiple wraps", () => {
	const result: Result = { atZero: 0, passedZero: 0 };
	const { current, result: newResult } = execute(50, result, {
		direction: "R",
		steps: 150,
	});
	assertEquals(current, 0);
	// nextState = 200, Math.floor(200/100) = 2
	assertEquals(newResult.passedZero, 2, "Should count 2 crossings");
	assertEquals(newResult.atZero, 1);
});
