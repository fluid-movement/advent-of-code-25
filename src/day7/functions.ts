import { readLines } from "../utils/file.ts";
import type { Result, Tuple } from "../types.ts";

export type { Tuple };

type SplitResult = [Tuple, Tuple] | Tuple;

export function parseToMatrix(file: string): string[][] {
  return readLines(file).map((line) => line.split(""));
}

export function process(file: string): Result {
  const matrix = parseToMatrix(file);
  return {
    step1: step1(matrix),
    step2: step2(matrix),
  };
}

export function step1(input: string[][]): number {
  const start = findStart(input);
  return countUniqueSplitters(input, start);
}

export function step2(input: string[][]): number {
  const start = findStart(input);
  return countDistinctPaths(input, start);
}

export function findStart(input: string[][]): Tuple {
  const colIndex = input[0].findIndex((cell) => cell === "S");
  if (colIndex === -1) {
    throw new Error("No starting point 'S' found in the first row.");
  }
  return [0, colIndex];
}

export function valueAt(
  input: string[][],
  [row, col]: Tuple,
): string | undefined {
  return input[row]?.[col];
}

export function createPositionKey([row, col]: Tuple): string {
  return `${row},${col}`;
}

export function isSplit(result: SplitResult): result is [Tuple, Tuple] {
  return Array.isArray(result[0]);
}

export function calculateSplitPosition([left, right]: [Tuple, Tuple]): Tuple {
  const row = left[0];
  const col = (left[1] + right[1]) / 2;
  return [row, col];
}

export function split([row, col]: Tuple): [Tuple, Tuple] {
  return [
    [row, col - 1],
    [row, col + 1],
  ];
}

export function findSplit(input: string[][], position: Tuple): SplitResult {
  let [row, col] = position;

  while (true) {
    row = row + 1;
    const cell = valueAt(input, [row, col]);

    if (cell === undefined) {
      return [row - 1, col] as Tuple;
    }

    if (cell === "^") {
      return split([row, col]);
    }
  }
}

function countUniqueSplitters(
  input: string[][],
  position: Tuple,
  visited = new Set<string>(),
): number {
  const result = findSplit(input, position);

  if (!isSplit(result)) {
    return 0;
  }

  const [left, right] = result;
  const splitPos = calculateSplitPosition([left, right]);
  const key = createPositionKey(splitPos);

  if (visited.has(key)) {
    return 0;
  }

  visited.add(key);

  const leftCount = countUniqueSplitters(input, left, visited);
  const rightCount = countUniqueSplitters(input, right, visited);

  return 1 + leftCount + rightCount;
}

function countDistinctPaths(
  input: string[][],
  position: Tuple,
  memo = new Map<string, number>(),
): number {
  const key = createPositionKey(position);

  if (memo.has(key)) {
    return memo.get(key)!;
  }

  const result = findSplit(input, position);

  const pathCount = isSplit(result)
    ? countPathsFromSplit(input, result, memo)
    : 1;

  memo.set(key, pathCount);
  return pathCount;
}

function countPathsFromSplit(
  input: string[][],
  [left, right]: [Tuple, Tuple],
  memo: Map<string, number>,
): number {
  const leftPaths = countDistinctPaths(input, left, memo);
  const rightPaths = countDistinctPaths(input, right, memo);
  return leftPaths + rightPaths;
}
