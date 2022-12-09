import * as utils from "utils";
import { z } from "zod";

export function part1(input: string) {
  const data = z
    .array(z.tuple([z.string().array(), z.string().array()]))
    .parse(
      utils
        .splitByLines(input)
        .map((line) => line.split(" | ").map((block) => block.split(" ")))
    );

  const answer = data.map(([a, b]) => {
    // console.log(b.map((x) => x.length));
    return b
      .map(
        (c) =>
          c.length === 2 || c.length === 4 || c.length === 3 || c.length === 7
      )
      .filter((d) => d).length;
  });

  // console.log(answer);

  return utils.sum(answer);
}

export function part2(input: string) {
  return;
}
