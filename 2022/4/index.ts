import * as utils from "utils";
import { z } from "zod";
export function part1(input: string) {
  const schema = z.array(
    z.tuple([
      z.tuple([z.number(), z.number()]),
      z.tuple([z.number(), z.number()]),
    ])
  );
  const data = schema.parse(
    utils
      .splitByLines(input)
      .map((line) =>
        utils.splitByCommas(line).map((group) => group.split("-").map(Number))
      )
  );

  let answer = 0;

  data.forEach(([first, second]) => {
    if (first[0] >= second[0] && first[1] <= second[1]) {
      answer++;
    } else if (first[0] <= second[0] && first[1] >= second[1]) {
      answer++;
    }
  });

  return answer;
}

export function part2(input: string) {
  const schema = z.array(
    z.tuple([
      z.tuple([z.number(), z.number()]),
      z.tuple([z.number(), z.number()]),
    ])
  );
  const data = schema.parse(
    utils
      .splitByLines(input)
      .map((line) =>
        utils.splitByCommas(line).map((group) => group.split("-").map(Number))
      )
  );

  let answer = 0;

  data.forEach(([first, second], index) => {
    const range1 = new Set(utils.range(first[0], first[1] + 1));
    const range2 = new Set(utils.range(second[0], second[1] + 1));

    let valid = false;
    if ([...range1].some((n) => range2.has(n))) valid = true;
    if ([...range2].some((n) => range1.has(n))) valid = true;

    if (valid) {
      answer++;
      // console.log(index)
    }
  });

  return answer;
}
