import { readLines } from "../utils/file.ts";

export type Result = {
  step1: number;
  step2: number;
};

type Equation = {
  numbers: number[];
  operator: string;
};

export type Input = Equation[];

export function process(file: string): Result {
  const result = {
    step1: sum(step1(file)),
    step2: sum(step2(file)),
  };

  return result;
}

export function step1(file: string): Input {
  const rows = readLines(file)
    .map((line) => line.split(" ").filter((cell) => cell.trim()));

  const numColumns = rows[0].length;

  return Array.from({ length: numColumns }, (_, colIndex) => {
    const column = rows.map((row) => row[colIndex]);

    return {
      numbers: column.slice(0, -1).map(Number),
      operator: column[column.length - 1],
    };
  });
}

// Helper: Extract a single column from the grid
function getColumn(rows: string[][], colIndex: number): string[] {
  return rows.map((row) => row[colIndex] || "");
}

// Helper: Parse a column into number and operator
function parseColumn(rows: string[][], colIndex: number) {
  const column = getColumn(rows, colIndex);

  const operator = column.at(-1)?.trim() || "";
  const digitChars = column.slice(0, -1).map((char) => char.trim()).join("");
  const number = Number(digitChars);

  return { number, operator };
}

// Helper: Check if this column separates equations (is empty/zero)
function isSeparator(parsed: { number: number; operator: string }): boolean {
  return parsed.number === 0;
}

export function step2(file: string): Input {
  const rows = readLines(file).map((line) => line.split(""));
  const numColumns = rows[0].length;

  const equations: Input = [];
  let currentEquation: Equation = { numbers: [], operator: "" };

  for (let col = 0; col < numColumns; col++) {
    const parsed = parseColumn(rows, col);

    if (isSeparator(parsed)) {
      // Start a new equation
      equations.push(currentEquation);
      currentEquation = { numbers: [], operator: "" };
    } else {
      // Add to current equation
      currentEquation.numbers.push(parsed.number);
      if (parsed.operator) {
        currentEquation.operator = parsed.operator;
      }
    }
  }

  // Don't forget the last equation
  equations.push(currentEquation);

  return equations;
}

export function sum(input: Input): number {
  return input.reduce((sum, equation) => {
    return sum + calculate(equation);
  }, 0);
}

export function calculate(equation: Equation): number {
  return equation.numbers.reduce((acc, num) => {
    switch (equation.operator) {
      case "+":
        return acc + num;
      case "*":
        return acc * num;
      case "-":
        return acc - num;
      case "/":
        return acc / num;
      default:
        throw new Error(`Unknown operator: ${equation.operator}`);
    }
  });
}
