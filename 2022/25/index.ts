import * as utils from "utils";
import { z } from "zod";

export type SNAFU = (-2 | -1 | 0 | 1 | 2)[];

export const parseSnafu = (input: SNAFU): number => {
  let answer = 0;

  utils
    .clone(input)
    .reverse()
    .forEach((val, index) => {
      const place = Math.pow(5, index);
      answer += val * place;
    });

  return answer;
};

export const numberToSNAFU = (number: number): SNAFU => {
  const schema = z.union([z.literal(0), z.literal(1), z.literal(2), z.literal(3), z.literal(4)]);

  // highest first
  const base5 = schema.array().parse(number.toString(5).split("").map(Number)).reverse();

  let addNextNumber = false;
  const snafu: SNAFU = [];

  for (let index = 0; index < base5.length; index++) {
    if (parseSnafu(snafu) === number) break;

    let val: typeof base5[number] | 5 | undefined = base5[index];

    if (val === undefined) val = 0;

    if (addNextNumber) val = (val + 1) as 1 | 2 | 3 | 4 | 5;

    switch (val) {
      case 0:
        {
          addNextNumber = false;
          snafu.push(0);
        }
        break;
      case 1: {
        addNextNumber = false;
        snafu.push(1);
        break;
      }
      case 2: {
        addNextNumber = false;
        snafu.push(2);
        break;
      }
      case 3: {
        addNextNumber = true;
        snafu.push(-2);
        base5.push(0);
        break;
      }
      case 4: {
        addNextNumber = true;
        snafu.push(-1);
        base5.push(0);
        break;
      }
      case 5: {
        addNextNumber = true;
        snafu.push(0);
        base5.push(0);
        break;
      }
      default: {
        addNextNumber = false;
        console.error(val);
      }
    }
  }

  let answer = snafu.reverse();

  if (parseSnafu(answer) !== number) throw new Error("number to snafu failed, do it manually ");

  return answer.slice(answer.findIndex((val) => val !== 0));
};

export const stringToSNAFU = (input: string): SNAFU => {
  return input.split("").map((val) => {
    switch (val) {
      case "=":
        return -2;
      case "-":
        return -1;
      case "0":
        return 0;
      case "1":
        return 1;
      case "2":
        return 2;
      default:
        throw new Error("Invalid SNAFU string");
    }
  });
};

export const SNAFUToString = (input: SNAFU): string => {
  return input.join("").replaceAll("-2", "=").replaceAll("-1", "-");
};

export const parseData = (input: string) => {
  const lines = input.split("\n");

  const schema = z
    .literal("1")
    .or(z.literal("2").or(z.literal("0").or(z.literal("-").or(z.literal("=")))))
    .array();

  const data: SNAFU[] = lines.map((line) =>
    schema.parse(line.split("")).map((val) => {
      switch (val) {
        case "=":
          return -2;
        case "-":
          return -1;
        case "0":
          return 0;
        case "1":
          return 1;
        case "2":
          return 2;
      }
    })
  );

  return data;
};

export const part1postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input.map((SNAFU) => parseSnafu(SNAFU));
};

export function part1(input: utils.InferReturnType<typeof part1postprocess>) {
  const sum = utils.sum(input);

  console.log(sum, sum.toString(5));

  try {
    return SNAFUToString(numberToSNAFU(sum));
  } catch (error) {
    return sum;
  }
}

export const part2postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

export function part2(input: utils.InferReturnType<typeof part2postprocess>) {
  return;
}
