import { readLines } from "../utils/file.ts";

export type Result = {
  part1: number;
  part2: number;
};

export function process(file: string): Result {
  const INPUT = readLines(file);

  const RESULT = {
    part1: part1(INPUT),
    part2: part2(INPUT),
  };

  return RESULT;
}

export function part1(line: string[]): number {
  return line.reduce((acc, batteries) => acc + getJoltage(batteries, 2), 0);
}

export function part2(line: string[]): number {
  return line.reduce((acc, batteries) => acc + getJoltage(batteries, 12), 0);
}

export function getJoltage(line: string, length: number): number {
  const BATTERIES: number[] = line.split("").map(Number);
  const JOLTAGE: number[] = Array(length).fill(0);

  let minIndex = 0;

  for (let j = 0; j < length; j++) {
    let maxDigit = 0;

    // leave enough digits for remaining positions
    const maxSearchIndex = BATTERIES.length - (length - j);

    for (let b = minIndex; b <= maxSearchIndex; b++) {
      if (BATTERIES[b] > maxDigit) {
        maxDigit = BATTERIES[b];
        minIndex = b + 1;
      }
    }

    JOLTAGE[j] = maxDigit;
  }

  return Number(JOLTAGE.join(""));
}
