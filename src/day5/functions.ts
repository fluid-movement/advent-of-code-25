import { readLines } from "../utils/file.ts";

export type Result = {
  step1: number;
  step2: number;
};

export type Input = {
  ranges: [number, number][];
  ids: number[];
};

export function parse(file: string): Input {
  const parsed: Input = { ranges: [], ids: [] };

  const [ranges, ids] = readLines(file, "\n\n");

  parsed.ranges = ranges.split("\n").map((line) =>
    line.split("-").map(Number) as [number, number]
  );

  parsed.ids = ids.split("\n").map(Number);

  return parsed;
}

export function process(file: string): Result {
  const result = {
    step1: step1(parse(file)),
    step2: step2(parse(file)),
  };

  return result;
}

export function step1(input: Input): number {
  return input.ids.filter((id) =>
    input.ranges.some(([low, high]) => id >= low && id <= high)
  ).length;
}

export function step2(input: Input): number {
  const sorted = [...input.ranges].sort((a, b) => a[0] - b[0]);
  const merged: [number, number][] = [];
  
  for (const [start, end] of sorted) {
    const last = merged.at(-1);
    
    if (last && start <= last[1] + 1) {
      last[1] = Math.max(last[1], end);
    } else {
      merged.push([start, end]);
    }
  }
  
  return merged.reduce((sum, [start, end]) => sum + (end - start + 1), 0);
}
