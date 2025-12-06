import { assertEquals } from "@std/assert";
import * as f from "./functions.ts";

Deno.test("day6 - calculator - can calculate", () => {
  assertEquals(f.calculate({ numbers: [123, 45, 6], operator: "*" }), 33210);
});

Deno.test("day6 - step1 - parses input correctly", () => {
  assertEquals(f.step1("day6/input/example.txt"), [
    { numbers: [123, 45, 6], operator: "*" },
    { numbers: [328, 64, 98], operator: "+" },
    { numbers: [51, 387, 215], operator: "*" },
    { numbers: [64, 23, 314], operator: "+" },
  ]);
});

Deno.test("day6 - step1 - calculates example correctly", () => {
  assertEquals(f.sum(f.step1("day6/input/example.txt")), 4277556);
});

Deno.test("day6 - step2 - parses input correctly", () => {
  assertEquals(f.step2("day6/input/example.txt"), [
    { numbers: [1,24,356], operator: "*" },
    { numbers: [369,248,8], operator: "+" },
    { numbers: [32,581,175], operator: "*" },
    { numbers: [623,431,4], operator: "+" },
  ]);
});

Deno.test("day6 - step2 - calculates example correctly", () => {
  assertEquals(f.sum(f.step2("day6/input/example.txt")), 3263827);
});

Deno.test("day6 - result - calculates both steps correctly", () => {
  assertEquals(f.process("day6/input/input.txt"), {step1: 6299564383938, step2: 11950004808442});
});