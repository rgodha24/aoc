import * as utils from "utils";
import { z } from "zod";

export function part1(input: string) {
  const data = z
    .array(z.number().min(0).max(7))
    .parse(input.split(",").map(Number));

  const array = new Array(9).fill(0).map((a) => 0);

  data.forEach((fish) => {
    array[fish] += 1;
  });

  // console.log(array);

  for (let index = 0; index < 80; index++) {
    const zeroes = array.shift();

    array.push(zeroes || 0);
    array[6] += zeroes || 0;
  }

  return utils.sum(array);
}

export function part2(input: string) {
  const data = z
    .array(z.number().min(0).max(7))
    .parse(input.split(",").map(Number));

  const array = new Array(9).fill(0).map((a) => 0);

  data.forEach((fish) => {
    array[fish] += 1;
  });

  // console.log(array);

  for (let index = 0; index < 256; index++) {
    const zeroes = array.shift();

    array.push(zeroes || 0);
    array[6] += zeroes || 0;
  }

  return utils.sum(array);
}
