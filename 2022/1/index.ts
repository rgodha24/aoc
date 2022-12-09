import * as utils from "utils";

export function part1(input: string) {
  const cals = input
    .split("\n\n")
    .map((block) => block.split("\n").map(Number));

  const sums = cals.map(utils.sum);

  return Math.max(...sums);
}

export function part2(input: string) {
  const cals = input
    .split("\n\n")
    .map((block) => block.split("\n").map(Number));

  const sums = cals.map(utils.sum).sort((a, b) => -a + b);

  return utils.sum(utils.maxes(sums, 3));
}
