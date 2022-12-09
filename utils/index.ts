import { z } from "zod";

export const splitByLines = (input: string) => input.split("\n");

export const splitByDoubleLines = (input: string) => input.split("\n\n");

export const splitByWhiteSpace = (input: string) => input.split(/\s+/);

export const splitByCommas = (input: string) => input.split(",");

export const numberArraySchema = z.array(z.number());

export const sum = (input: number[]) => input.reduce((a, b) => a + b, 0);

export const max = (input: number[]) => Math.max(...input);

export const min = (input: number[]) => Math.min(...input);

type ConstructTuple<n, TType, Arr extends TType[] = []> = Arr["length"] extends n
  ? Arr
  : ConstructTuple<n, TType, [...Arr, TType]>;

export function group<T extends unknown, L extends number>(input: T[], length: L): ConstructTuple<L, T>[] {
  const result: unknown[][] = [];

  for (let i = 0; i < input.length; i += length) {
    result.push(input.slice(i, i + length));
  }

  return result as ConstructTuple<L, T>[];
}

export const maxes = (input: number[], amount: number) => {
  const sorted = input.sort((a, b) => b - a);

  return sorted.slice(0, amount);
};

export const getAdjacent = (input: number[][], x: number, y: number) => {
  const xlength = input[0].length;
  const ylength = input.length;

  const answer = [];

  if (x >= 1) {
    answer.push(input[y][x - 1]);
  }
  if (y >= 1) {
    answer.push(input[y - 1][x]);
  }
  if (x < xlength - 1) {
    answer.push(input[y][x + 1]);
  }
  if (y < ylength - 1) {
    answer.push(input[y + 1][x]);
  }

  return answer.filter((a) => a !== undefined);
};

export function range(start: number, stop?: number, step?: number) {
  if (typeof stop == "undefined") {
    // one param defined
    stop = start;
    start = 0;
  }

  if (typeof step == "undefined") {
    step = 1;
  }

  if ((step > 0 && start >= stop) || (step < 0 && start <= stop)) {
    return [];
  }

  var result = [];
  for (var i = start; step > 0 ? i < stop : i > stop; i += step) {
    result.push(i);
  }

  return result;
}

export const stringArrayToNumberArray = (input: string[]) => z.array(z.number()).parse(input);

export const fileToNumberArray = (input: string) =>
  z.array(z.preprocess(Number, z.number())).parse(splitByLines(input));

export const rowsToColumns = <T>(input: T[][]) => {
  const columns: T[][] = [];
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

export function findAmount<T, U extends T>(input: T[], value: U) {
  return input.filter((x) => x === value).length;
}

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
