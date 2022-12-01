import { z } from "zod";

export function part1(input: string) {
  const schema = z.array(z.tuple([z.tuple([z.number(), z.number()]), z.tuple([z.number(), z.number()])]));

  const data = schema.parse(
    input.split("\n").map((line) => line.split("->").map((column) => column.trim().split(",").map(Number)))
  );

  return;
}

export function part2(input: string) {
  return;
}
