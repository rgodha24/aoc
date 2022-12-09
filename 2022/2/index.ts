import * as utils from "utils";
import { z } from "zod";

export function part1(input: string) {
  const lines = utils.splitByLines(input);

  const schema = z.array(
    z.tuple([
      z.union([z.literal("A"), z.literal("B"), z.literal("C")]),
      z.union([z.literal("X"), z.literal("Y"), z.literal("Z")]),
    ])
  );

  const data = schema.parse(lines.map(utils.splitByWhiteSpace));

  let answer = 0;

  data.forEach(([them, me]) => {
    if (
      (them === "A" && me === "Y") ||
      (them === "B" && me === "Z") ||
      (them === "C" && me === "X")
    ) {
      answer += 6; // win
    }
    if (
      (them === "A" && me === "X") ||
      (them === "B" && me === "Y") ||
      (them === "C" && me === "Z")
    ) {
      answer += 3; // draw
    } else {
      answer += 0; // lose
    }

    if (me === "X") answer += 1;
    if (me === "Y") answer += 2;
    if (me === "Z") answer += 3;
  });

  return answer;
}

export function part2(input: string) {
  const lines = utils.splitByLines(input);

  const schema = z.array(
    z.tuple([
      z.union([z.literal("A"), z.literal("B"), z.literal("C")]),
      z.union([z.literal("X"), z.literal("Y"), z.literal("Z")]),
    ])
  );

  const data = schema.parse(lines.map(utils.splitByWhiteSpace));

  let answer = 0;

  data.forEach(([them, me]) => {
    if (me === "X") {
      // loss
      if (them === "A") answer += 3;
      if (them === "B") answer += 1;
      if (them === "C") answer += 2;
    }
    if (me === "Y") {
      // draw
      if (them === "A") answer += 4;
      if (them === "B") answer += 5;
      if (them === "C") answer += 6;
    }
    if (me === "Z") {
      // win
      if (them === "A") answer += 2;
      if (them === "B") answer += 3;
      if (them === "C") answer += 1;
      answer += 6;
    }
  });

  return answer;
}
