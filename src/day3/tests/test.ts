import { assertEquals } from "@std/assert";
import * as u from "../../utils/file.ts";
import * as f from "../functions.ts";

const BATTERIES = [
  { label: "987654321111111", joltage: 98 },
  { label: "811111111111119", joltage: 89 },
  { label: "234234234234278", joltage: 78 },
  { label: "818181911112111", joltage: 92 },
];

BATTERIES.forEach((battery) => {
  Deno.test(`day3 - part1 - gets correct joltage for battery ${battery.label}`, () => {
    assertEquals(f.getJoltage(battery.label, 2), battery.joltage);
  });
});

const BIG_BATTERIES = [
  { label: "987654321111111", joltage: 987654321111 },
  { label: "811111111111119", joltage: 811111111119 },
  { label: "234234234234278", joltage: 434234234278 },
  { label: "818181911112111", joltage: 888911112111 },
];

BIG_BATTERIES.forEach((battery) => {
  Deno.test(`day3 - part2 - gets correct big joltage for battery ${battery.label}`, () => {
    assertEquals(f.getJoltage(battery.label, 12), battery.joltage);
  });
});

Deno.test("day3 - part1 - calculates correct result for test", () => {
  const INPUT = u.readLines("day3/input/step1.txt");
  assertEquals(f.part1(INPUT), 357);
});

Deno.test("day3 - part2 - calculates correct result for test", () => {
  const INPUT = u.readLines("day3/input/step2.txt");
  assertEquals(f.part2(INPUT), 3121910778619);
});

Deno.test("day3 - result - calculates correct result", () => {
  assertEquals(f.process("day3/input/input.txt"), {
    part1: 17359,
    part2: 172787336861064,
  } as f.Result);
});
