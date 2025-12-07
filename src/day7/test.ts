import { assertEquals } from "@std/assert";
import * as f from "./functions.ts";
import type { Tuple } from "../types.ts";

Deno.test("day7 - parser - parses input into matrix", () => {
  assertEquals(f.parseToMatrix("day7/input/parser.txt"), [
    [".", ".", "S", ".", "."],
    [".", ".", ".", ".", "."],
    [".", ".", "^", ".", "."],
  ]);
});

Deno.test("day7 - findStart - finds starting position", () => {
  const input = f.parseToMatrix("day7/input/parser.txt");
  assertEquals(f.findStart(input), [0, 2]);
});

Deno.test("day7 - split - splits tuple", () => {
  assertEquals(f.split([2, 2]), [[2, 1], [2, 3]]);
});

Deno.test("day7 - findSplit - finds split position", () => {
  const input = f.parseToMatrix("day7/input/parser.txt");

  assertEquals(f.findSplit(input, [0, 2]), [
    [2, 1],
    [2, 3],
  ]);
});

Deno.test("day7 - valueAt - returns correct cell value", () => {
  const input = f.parseToMatrix("day7/input/parser.txt");
  assertEquals(f.valueAt(input, [0, 2]), "S");
  assertEquals(f.valueAt(input, [2, 2]), "^");
  assertEquals(f.valueAt(input, [0, 0]), ".");
});

Deno.test("day7 - valueAt - returns undefined for out of bounds", () => {
  const input = f.parseToMatrix("day7/input/parser.txt");
  assertEquals(f.valueAt(input, [-1, 0]), undefined);
  assertEquals(f.valueAt(input, [0, 10]), undefined);
  assertEquals(f.valueAt(input, [10, 0]), undefined);
});

Deno.test("day7 - createPositionKey - creates unique keys", () => {
  assertEquals(f.createPositionKey([0, 2]), "0,2");
  assertEquals(f.createPositionKey([10, 25]), "10,25");
});

Deno.test("day7 - isSplit - identifies split results", () => {
  const splitResult: [Tuple, Tuple] = [[2, 1], [2, 3]];
  const endpointResult: Tuple = [5, 2];

  assertEquals(f.isSplit(splitResult), true);
  assertEquals(f.isSplit(endpointResult), false);
});

Deno.test("day7 - calculateSplitPosition - calculates splitter location", () => {
  assertEquals(f.calculateSplitPosition([[2, 1], [2, 3]]), [2, 2]);
  assertEquals(f.calculateSplitPosition([[4, 5], [4, 7]]), [4, 6]);
});

Deno.test("day7 - step1 - calculates correct value", () => {
  assertEquals(f.step1(f.parseToMatrix("day7/input/step1.txt")), 21);
});

Deno.test("day7 - step2 - simple case with parser input", () => {
  const input = f.parseToMatrix("day7/input/parser.txt");
  assertEquals(f.step2(input), 2);
});

Deno.test("day7 - step2 - calculates correct number of timelines", () => {
  assertEquals(f.step2(f.parseToMatrix("day7/input/step1.txt")), 40);
});
