import * as utils from "utils";
import { z } from "zod";

type Input = number | Input[];
const schema: z.ZodType<Input> = z.lazy(() => z.number().or(z.array(schema)));

export const parseData = (input: string) => {
  return input.split("\n\n").map((doubleLine) => utils.splitByLines(doubleLine).map((line) => JSON.parse(line))) as [
    Input,
    Input
  ][];
};

type CompareReturn = ">" | "<" | "=";

export const compareNumbers = (a: number, b: number): CompareReturn => {
  if (a > b) return ">";
  if (a === b) return "=";
  if (a < b) return "<";

  throw new Error("Invalid comparison");
};

export const compareArrays = (a: number[], b: number[]): CompareReturn => {
  for (let index = 0; index < a.length; index++) {
    const aVal = a[index];
    const bVal = b[index];

    if (aVal === undefined) return "<";
    if (bVal === undefined) return ">";

    const compareResult = compareNumbers(aVal, bVal);

    if (compareResult === ">") {
      return ">";
    }
    if (compareResult === "<") {
      return "<";
    }
  }

  if (a.length > b.length) return ">";
  if (a.length < b.length) return "<";

  return "=";
};

export const isNumberArray = (input: unknown): input is number[] => {
  return z.number().array().safeParse(input).success;
};

export const compare = (a: Input, b: Input): CompareReturn => {
  if (typeof a === "number" && typeof b === "number") {
    return compareNumbers(a, b);
  }

  if (typeof a === "number") {
    return compare([a], b);
  }

  if (typeof b === "number") {
    return compare(a, [b]);
  }
  if (isNumberArray(a) && isNumberArray(b)) {
    // console.log(a, b);
    return compareArrays(a, b);
  }

  for (let index = 0; index < a.length; index++) {
    const aVal = a[index];
    const bVal = b[index];

    if (aVal === undefined) {
      // console.log(aVal);
      return "<";
    }
    if (bVal === undefined) {
      // console.log(bVal);
      return ">";
    }

    // both numbers
    if (typeof aVal === "number" && typeof bVal === "number") {
      const compareResult = compareNumbers(aVal, bVal);

      // console.log(aVal, bVal, compareResult);

      if (compareResult === ">") {
        return ">";
      }
      if (compareResult === "<") {
        return "<";
      }
    } else if (isNumberArray(aVal) && isNumberArray(bVal)) {
      const compareResult = compareArrays(aVal, bVal);
      // console.log(aVal, bVal, compareResult);
      if (compareResult === ">") {
        return ">";
      }
      if (compareResult === "<") {
        return "<";
      }
    } else if (isNumberArray(aVal) && typeof bVal === "number") {
      const compareResult = compareArrays(aVal, [bVal]);

      if (compareResult === ">") {
        return ">";
      }
      if (compareResult === "<") {
        return "<";
      }
    } else if (typeof aVal === "number" && isNumberArray(bVal)) {
      const compareResult = compareArrays([aVal], bVal);

      if (compareResult === ">") {
        return ">";
      }
      if (compareResult === "<") {
        return "<";
      }
    } else {
      if (aVal === undefined) {
        return "<";
      }
      if (bVal === undefined) {
        return ">";
      }

      const compareResult = compare(aVal, bVal);

      if (compareResult === ">") {
        return ">";
      }
      if (compareResult === "<") {
        return "<";
      }
    }
  }

  if (b.length < a.length) return ">";
  if (b.length > a.length) return "<";

  return "=";
};

export const part1postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

export function part1(input: utils.InferReturnType<typeof part1postprocess>) {
  let answer = 0;
  input.forEach(([a, b], index) => {
    const result = compare(a, b);
    if (result === "<") {
      answer += index + 1;
      console.log(index + 1);
    }
  });

  return answer;
}

export const part2postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input.flat();
};

export function part2(input: utils.InferReturnType<typeof part2postprocess>) {
  input.push([[2]], [[6]]);

  input.sort((a, b) => {
    const result = compare(a, b);
    if (result === "<") {
      return -1;
    }
    if (result === ">") {
      return 1;
    }
    return 0;
  });

  let answer = 1;

  const isNumberArrayArray = (input: unknown): input is number[][] => {
    return z.number().array().array().safeParse(input).success;
  };

  input.forEach((a, index) => {
    if (isNumberArrayArray(a) && a.length === 1 && a[0]?.length === 1) {
      if (a[0][0] === 2) {
        answer *= index + 1;
        console.log(index + 1);
      }
      if (a[0][0] === 6) {
        answer *= index + 1;
        console.log(index + 1);
      }
    }
  });

  return answer;
}
