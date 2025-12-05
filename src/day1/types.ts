export type Command = {
  direction: "R" | "L";
  steps: number;
};

export type Result = {
  atZero: number;
  passedZero: number;
};
