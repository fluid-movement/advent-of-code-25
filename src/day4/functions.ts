import { readLines } from "../utils/file.ts";

export type Result = {
  step1: number;
  step2: number;
};

type Tuple = [number, number];

export function parse(file: string): number[][] {
  return readLines(file).map((line: string) => {
    return line.split("").map((char: string) => {
      return char === "@" ? 1 : 0;
    });
  });
}

export function process(file: string): Result {
  const result = {
    step1: step1(parse(file)),
    step2: step2(parse(file)),
  };

  return result;
}

export function step1(input: number[][]): number {
  return sum(input) - sum(remove(input));
}

export function isRemovable(input: number[][], x: number, y: number): boolean {
  let neighbors = 0;

  for (let a = x - 1; a <= x + 1; a++) {
    for (let b = y - 1; b <= y + 1; b++) {
      if (a === x && b === y) {
        continue; // dont count self
      }

      if (input[a] !== undefined && input[a][b] !== undefined) {
        neighbors += input[a][b];
      }
    }
  }

  return neighbors < 4;
}

export function remove(input: number[][]): number[][] {
  const removable: Tuple[] = [];

  input.forEach((row, x) => {
    row.forEach((current, y) => {
      if (current === 0) {
        return;
      }

      if (isRemovable(input, x, y)) {
        removable.push([x, y]);
      }
    });
  });

  removable.forEach((remove: Tuple) => {
    input[remove[0]][remove[1]] = 0;
  });

  return input;
}

export function sum(input: number[][]): number {
  return input.reduce((acc, row) => {
    return acc + row.reduce((rowAcc, cell) => rowAcc + cell, 0);
  }, 0);
}

export function step2(input: number[][]): number {
  const startingValue = sum(input);
  while (true) {
    const currentSum = sum(input);

    remove(input);

    if (currentSum === sum(input)) {
      return startingValue - currentSum;
    }
  }
}
