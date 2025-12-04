import { assertEquals } from "@std/assert";
import * as f from "../functions.ts";

const fixture = f.parse("day4/tests/fixtures/parse_test.txt");

Deno.test("day4 - parsing - parses file correctly", () => {
  assertEquals(fixture, [
    [0, 0, 1, 1, 0],
    [1, 1, 1, 0, 1],
    [1, 1, 1, 1, 1],
  ]);
});

Deno.test("day4 - sum - can calculate sum of matrix", () => {
  assertEquals(f.sum(f.parse("day4/input/step1.txt")), 71);
});

type Identification = { x: number; y: number; removable: boolean };
const identify: Identification[] = [
  { x: 0, y: 0, removable: true },
  { x: 1, y: 1, removable: false },
];

identify.forEach((input: Identification) => {
  Deno.test(`day4 - step1 - can identify removable at ${input.x}, ${input.y}`, () => {
    assertEquals(f.isRemovable(fixture, input.x, input.y), input.removable);
  });
});

Deno.test("day4 - step1 - processes test input correctly", () => {
  assertEquals(f.step1(f.parse("day4/input/step1.txt")), 13);
});

Deno.test("day4 - step2 - processes test input correctly", () => {
  assertEquals(f.step2(f.parse("day4/input/step2.txt")), 43);
});

Deno.test("day4 - result - is correct", () => 	{
  assertEquals(f.process("day4/input/input.txt"), {step1: 1351, step2: 8345});
});