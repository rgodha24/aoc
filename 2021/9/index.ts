import * as utils from "utils";
import { z } from "zod";

export function part1(input: string) {
  const data = z
    .number()
    .array()
    .array()
    .parse(utils.splitByLines(input).map((line) => line.split("").map(Number)));

  let answer = 0;

  // console.log(data.map((line) => line.join("")).join("\n"));

  data.forEach((row, yinit) => {
    const y = yinit;

    // console.log(y)
    row.forEach((number, xinit) => {
      const x = xinit;
      const adjacent = utils
        .getAdjacent(data, x, y)
        .map((val) => number < val)
        .filter((a) => a);

      if (adjacent.length === utils.getAdjacent(data, x, y).length) {
        // console.log(x, y);
        answer += 1 + number;
      }
    });
  });

  // console.log(answer);

  return answer;
}

export function part2(input: string) {
  const data = z
    .number()
    .array()
    .array()
    .parse(utils.splitByLines(input).map((line) => line.split("").map(Number)));

  let answer = 0;

  // console.log(data.map((line) => line.join("")).join("\n"));

  data.forEach((row, yinit) => {
    const y = yinit;

    // console.log(y)
    row.forEach((number, xinit) => {
      const x = xinit;
      const adjacent = utils
        .getAdjacent(data, x, y)
        .map((val) => number < val)
        .filter((a) => a);

      if (adjacent.length === utils.getAdjacent(data, x, y).length) {
        // console.log(x, y);
        answer += 1 + number;
      }
    });
  });

  // console.log(answer);

  return answer;
}
