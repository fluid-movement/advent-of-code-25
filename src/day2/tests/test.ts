import { assertEquals, assertThrows } from "@std/assert";
import * as f from "../functions.ts";

Deno.test("day2 - results - calculates the correct result", () => {
  assertEquals(f.process("day2/input/input.txt"), {
    part1: 23039913998,
    part2: 35950619148,
  });
});

Deno.test("day2 - part1 - gets correct number of invalid ids for range 11-22", () => {
  assertEquals(f.part1("11-22"), 33);
});

Deno.test("day2 - part1 - gets correct number of invalid ids for range 95-115", () => {
  assertEquals(f.part1("95-115"), 99);
});

Deno.test("day2 - part1 - gets correct number of invalid ids for range 998-1012", () => {
  assertEquals(f.part1("998-1012"), 1010);
});

Deno.test("day2 - check - should verify correct ID: 1212", () => {
  assertEquals(f.check(1212), 1212);
});

Deno.test("day2 - check - should verify correct ID: 1111", () => {
  assertEquals(f.check(1111), 1111);
});

Deno.test("day2 - check - should verify correct ID: 2323", () => {
  assertEquals(f.check(2323), 2323);
});

Deno.test("day2 - check - should reject incorrect ID: 1234", () => {
  assertEquals(f.check(1234), 0);
});

Deno.test("day2 - check - should reject incorrect ID: 123", () => {
  assertEquals(f.check(123), 0);
});

Deno.test("day2 - check - should reject incorrect ID: 12345", () => {
  assertEquals(f.check(12345), 0);
});

Deno.test("day2 - part2 - gets correct number of invalid ids for range 11-22", () => {
  assertEquals(f.part2("11-22"), 33);
});

Deno.test("day2 - part2 - gets correct number of invalid ids for range 95-115", () => {
  assertEquals(f.part2("95-115"), 99 + 111);
});

Deno.test("day2 - part2 - gets correct number of invalid ids for range 998-1012", () => {
  assertEquals(f.part2("998-1012"), 999 + 1010);
});

Deno.test("day2 - checkMore - should verify correct ID: 11", () => {
  assertEquals(f.checkMore(11), 11);
});

Deno.test("day2 - checkMore - should verify correct ID: 111", () => {
  assertEquals(f.checkMore(111), 111);
});

Deno.test("day2 - checkMore - should verify correct ID: 1188511885", () => {
  assertEquals(f.checkMore(1188511885), 1188511885);
});

Deno.test("day2 - checkMore - should verify correct ID: 446446", () => {
  assertEquals(f.checkMore(446446), 446446);
});

Deno.test("day2 - checkMore - should verify correct ID: 2121212121", () => {
  assertEquals(f.checkMore(2121212121), 2121212121);
});

Deno.test("day2 - checkMore - should verify correct ID: 824824824", () => {
  assertEquals(f.checkMore(824824824), 824824824);
});

Deno.test("day2 - checkMore - should reject incorrect ID: 1234", () => {
  assertEquals(f.checkMore(1234), 0);
});

Deno.test("day2 - checkMore - should reject incorrect ID: 123", () => {
  assertEquals(f.checkMore(123), 0);
});

Deno.test("day2 - checkMore - should reject incorrect ID: 12345", () => {
  assertEquals(f.checkMore(12345), 0);
});

Deno.test("day2 - line parser - should parse line range 10-20 correctly", () => {
  const range = f.parseLine("10-20");
  assertEquals(range.min, 10);
  assertEquals(range.max, 20);
});

Deno.test("day2 - line parser - should parse line range 5-15 correctly", () => {
  const range = f.parseLine("5-15");
  assertEquals(range.min, 5);
  assertEquals(range.max, 15);
});

Deno.test("day2 - line parser - should parse line range 100-200 correctly", () => {
  const range = f.parseLine("100-200");
  assertEquals(range.min, 100);
  assertEquals(range.max, 200);
});

Deno.test("day2 - line parser - should throw error on invalid data: 10-abc", () => {
  assertThrows(() => {
    f.parseLine("10-abc");
  });
});

Deno.test("day2 - line parser - should throw error on invalid data: abc-20", () => {
  assertThrows(() => {
    f.parseLine("abc-20");
  });
});

Deno.test("day2 - line parser - should throw error on invalid data: 10", () => {
  assertThrows(() => {
    f.parseLine("10");
  });
});
