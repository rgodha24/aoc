import { z } from "zod";

export const splitByLines = (input: string) => input.split("\n");

export const splitByWhiteSpace = (input: string) => input.split(/\s+/);

export const sum = (input: number[]) => input.reduce((a, b) => a + b, 0);

export const stringArrayToNumberArray = (input: string[]) => z.array(z.number()).parse(input);

export const rowsToColumns = (input: string[][]) => {
  const columns: string[][] = [];
  input.forEach((row) => {
    row.forEach((column, index) => {
      if (!columns[index]) columns[index] = [];
      columns[index].push(column);
    });
  });
  return columns;
};

export const split = (input: string) => input.split("");

export const mostCommon = (input: string[]) => {
  const counts: Record<string, number> = {};
  input.forEach((x) => {
    if (!counts[x]) counts[x] = 0;
    counts[x]++;
  });
  // @ts-ignore
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0][0];
};
export const allEqual = (input: unknown[]) => {
  return input.every((x) => x === input[0]);
};

export const checkDiagonals = (input: unknown[]) => {
  if (allEqual([input[0], input[6], input[12], input[18], input[24]])) {
    return true;
  }
  if (allEqual([input[4], input[8], input[12], input[16], input[20]])) {
    return true;
  }
  return false;
};

export const checkRows = (input: unknown[]) => {
  for (let i = 0; i < 25; i += 5) {
    if (allEqual(input.slice(i, i + 5))) {
      return true;
    }
  }
  return false;
};

export const checkColumns = (input: unknown[]) => {
  for (let i = 0; i < 5; i++) {
    if (allEqual([input[i], input[i + 5], input[i + 10], input[i + 15], input[i + 20]])) {
      return true;
    }
  }
  return false;
};
