import { assertEquals } from "@std/assert";
import * as f from "../functions.ts";

const part1Parsed: f.Input = {
  ranges: [[3, 5], [10, 14], [16, 20], [12, 18]],
  ids: [1, 5, 8, 11, 17, 32],
};

Deno.test("day5 - parser - parses test data correctly", () => {
  assertEquals(f.parse("day5/input/step1.txt"), part1Parsed);
});

Deno.test("day5 - step1 - calculates correct result", () => {
  assertEquals(f.step1(f.parse("day5/input/step1.txt")), 3);
});

Deno.test("day5 - step2 - calculates correct result", () => {
  assertEquals(f.step2(f.parse("day5/input/step1.txt")), 14);
});

Deno.test("day5 - result - is correct", () => {
  assertEquals(f.process("day5/input/input.txt"), { step1: 782, step2: 353863745078671 });
});