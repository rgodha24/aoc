import { z } from "zod";
import { Grid } from "./grid";

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

export const stringArrayToNumberArray = (input: string[]) =>
  z.array(z.preprocess((arg) => Number(arg), z.number())).parse(input);

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

export const getAdjacentIndices = (input: unknown[][], [x, y]: [number, number]) => {
  const xlength = input[0].length;
  const ylength = input.length;

  const answer: [number, number][] = [];

  if (x >= 1) {
    answer.push([x - 1, y]);
  }
  if (y >= 1) {
    answer.push([x, y - 1]);
  }
  if (x < xlength - 1) {
    answer.push([x + 1, y]);
  }
  if (y < ylength - 1) {
    answer.push([x, y + 1]);
  }

  return answer;
};

export const getAdjacentOrDiagonalIndices = (input: unknown[][], [x, y]: [number, number]) => {
  const xlength = input[0].length;
  const ylength = input.length;

  const answer: [number, number][] = [];

  if (x >= 1) {
    answer.push([x - 1, y]);
    if (y >= 1) {
      answer.push([x - 1, y - 1]);
    }
    if (y < ylength - 1) {
      answer.push([x - 1, y + 1]);
    }
  }
  if (y >= 1) {
    answer.push([x, y - 1]);
  }
  if (x < xlength - 1) {
    answer.push([x + 1, y]);
    if (y >= 1) {
      answer.push([x + 1, y - 1]);
    }
    if (y < ylength - 1) {
      answer.push([x + 1, y + 1]);
    }
  }
  if (y < ylength - 1) {
    answer.push([x, y + 1]);
  }
  return answer;
};

export const getDiagonalIndices = (input: unknown[][], [x, y]: [number, number]) => {
  const xlength = input[0].length;
  const ylength = input.length;

  const answer: [number, number][] = [];

  if (x >= 1) {
    if (y >= 1) {
      answer.push([x - 1, y - 1]);
    }
    if (y < ylength - 1) {
      answer.push([x - 1, y + 1]);
    }
  }
  if (x < xlength - 1) {
    answer.push([x + 1, y]);
    if (y >= 1) {
      answer.push([x + 1, y - 1]);
    }
    if (y < ylength - 1) {
      answer.push([x + 1, y + 1]);
    }
  }

  return answer;
};

export const compare2Points = (a: [number, number], b: [number, number]) => {
  return a[0] === b[0] && a[1] === b[1];
};

export const lowercaseCharToNum = (char: string) => {
  if (char === "a") return 1;
  if (char === "b") return 2;
  if (char === "c") return 3;
  if (char === "d") return 4;
  if (char === "e") return 5;
  if (char === "f") return 6;
  if (char === "g") return 7;
  if (char === "h") return 8;
  if (char === "i") return 9;
  if (char === "j") return 10;
  if (char === "k") return 11;
  if (char === "l") return 12;
  if (char === "m") return 13;
  if (char === "n") return 14;
  if (char === "o") return 15;
  if (char === "p") return 16;
  if (char === "q") return 17;
  if (char === "r") return 18;
  if (char === "s") return 19;
  if (char === "t") return 20;
  if (char === "u") return 21;
  if (char === "v") return 22;
  if (char === "w") return 23;
  if (char === "x") return 24;
  if (char === "y") return 25;
  if (char === "z") return 26;

  throw new Error("Invalid character");
};

export const numToLowerCaseChar = (num: number) => {
  if (num === 1) return "a";
  if (num === 2) return "b";
  if (num === 3) return "c";
  if (num === 4) return "d";
  if (num === 5) return "e";
  if (num === 6) return "f";
  if (num === 7) return "g";
  if (num === 8) return "h";
  if (num === 9) return "i";
  if (num === 10) return "j";
  if (num === 11) return "k";
  if (num === 12) return "l";
  if (num === 13) return "m";
  if (num === 14) return "n";
  if (num === 15) return "o";
  if (num === 16) return "p";
  if (num === 17) return "q";
  if (num === 18) return "r";
  if (num === 19) return "s";
  if (num === 20) return "t";
  if (num === 21) return "u";
  if (num === 22) return "v";
  if (num === 23) return "w";
  if (num === 24) return "x";
  if (num === 25) return "y";
  if (num === 26) return "z";

  throw new Error("Invalid number");
};

export const gridFind = <T>(grid: T[][], value: T) => {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      if (grid[y][x] === value) {
        return [x, y] as [number, number];
      }
    }
  }

  console.log(value, grid);

  throw new Error("Value not found in gridFind func");
};

export type InferReturnType<T extends Function> = T extends (...args: any[]) => infer R ? R : never;

export const clone = <T>(input: T): T => JSON.parse(JSON.stringify(input)) as T;

export const smoothPath = (input: [number, number][]): [number, number][] => {
  const answer: [number, number][] = [];

  for (let i = 0; i < input.length; i++) {
    const current = input[i]!;
    const next = input[i + 1];

    if (Array.isArray(next) && next.length === 2) {
      answer.push(...pathBetween([current, next]).slice(0, -1));
    } else {
      answer.push(current);
      break;
    }
  }

  return answer;
};

export const pathBetween = (input: [[number, number], [number, number]]): [number, number][] => {
  const answer: [number, number][] = [];

  const [start, end] = input;

  const [x1, y1] = start;
  const [x2, y2] = end;

  const xDiff = x2 - x1;
  const yDiff = y2 - y1;

  if (xDiff !== 0 && yDiff !== 0) throw new Error("invalid path between");

  const xDiffAbs = Math.abs(xDiff);
  const yDiffAbs = Math.abs(yDiff);

  const xSign = xDiff / xDiffAbs;
  const ySign = yDiff / yDiffAbs;

  for (let i = 0; i < xDiffAbs; i++) {
    answer.push([x1 + i * xSign, y1]);
  }

  for (let i = 0; i < yDiffAbs; i++) {
    answer.push([x2, y1 + i * ySign]);
  }

  answer.push(end);

  return answer;
};

export { z, Grid };
export { a_star, cartesian_2d, str_irregular } from "./astar";
