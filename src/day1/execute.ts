import type { Command, Result } from "./types.ts";

export function execute(
  current: number,
  result: Result,
  command: Command,
): { current: number; result: Result } {
  let nextState: number;

  if (command.direction === "R") {
    nextState = current + command.steps;

    if (nextState >= 100) {
      result.passedZero += Math.floor(nextState / 100);
    }
  } else {
    nextState = current - command.steps;

    if (nextState < 0) {
      result.passedZero += Math.ceil(Math.abs(nextState) / 100);

      // make sure starting from 0 isn't counted twice
      if (current === 0) {
        result.passedZero--;
      }

      nextState = 100 - Math.abs(nextState % 100);

      // Check if we land on 0 after going negative (nextState % 100 === 0)
      if (Math.abs(nextState % 100) === 0) {
        result.passedZero++;
      }
    } else if (nextState === 0) {
      result.passedZero++;
    }
  }

  nextState = nextState % 100;

  if (nextState === 0) result.atZero++;

  return { current: nextState, result };
}
