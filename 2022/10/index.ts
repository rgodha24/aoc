import * as utils from "utils";
import { z } from "zod";

export const parseData = (input: string) => {
  const lines = utils.splitByLines(input);

  const schema = z.array(
    z.discriminatedUnion("type", [
      z.object({ type: z.literal("noop") }),
      z.object({ type: z.literal("addx"), value: z.coerce.number() }),
    ])
  );

  return schema.parse(
    lines.map((line) => {
      const [type, value] = line.split(" ");

      switch (type) {
        case "noop":
          return { type: "noop" };
        case "addx":
          return { type: "addx", value };
      }
    })
  );
};

export const part1postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

export function part1(input: utils.InferReturnType<typeof part1postprocess>) {
  let answer: number[] = [];
  let index = 0;
  let x = 1;

  input.forEach((val) => {
    switch (val.type) {
      case "noop":
        index++;
        answer.push(x);
        break;
      case "addx":
        answer.push(x);
        answer.push(x);
        x += val.value;

        index += 2;
        break;
    }
  });

  console.log(answer[19]);

  return utils.sum(
    answer.map((val, index) => {
      if (index === 19 || index === 59 || index === 99 || index === 139 || index === 179 || index === 219) {
        console.log(val);
        return val * (index + 1);
      }
      return 0;
    })
  );
}

export const part2postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

export function part2(input: utils.InferReturnType<typeof part2postprocess>) {
  let answer: number[] = [];
  let index = 0;
  let x = 1;

  input.forEach((val) => {
    switch (val.type) {
      case "noop":
        index++;
        answer.push(x);
        break;
      case "addx":
        answer.push(x);
        answer.push(x);
        x += val.value;

        index += 2;
        break;
    }
  });

  const final = answer.map((val, index) => {
    if (val === index % 40 || val - 1 === index % 40 || val + 1 === index % 40) {
      return "#" as const;
    }
    return "." as const;
  });

  return utils
    .group(final, 40)
    .map((val) => val.join("").replaceAll(".", " "))
    .join("\n");
}
