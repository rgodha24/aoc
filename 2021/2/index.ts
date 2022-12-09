import { splitByLines, splitByWhiteSpace } from "utils";
import { z } from "zod";

export function part1(input: string) {
  const lines = splitByLines(input);
  // console.log(lines);
  const directions = lines.map(splitByWhiteSpace);
  // console.log(directions);

  const schema = z.array(
    z.tuple([
      z.enum(["forward", "down", "up"]),
      z.preprocess((val) => Number(val), z.number()),
    ])
  );

  const data = schema.parse(directions);
  // console.log(data);
  let x: number = 0;
  let y: number = 0;

  data.forEach(([direction, value]) => {
    switch (direction) {
      case "forward":
        x += value;
        break;
      case "down":
        y -= value;
        break;
      case "up":
        y += value;
        break;
    }
  });

  return Math.abs(x * y);
}

export function part2(input: string) {
  const lines = splitByLines(input);
  // console.log(lines);
  const directions = lines.map(splitByWhiteSpace);
  // console.log(directions);

  const schema = z.array(
    z.tuple([
      z.enum(["forward", "down", "up"]),
      z.preprocess((val) => Number(val), z.number()),
    ])
  );

  const data = schema.parse(directions);
  // console.log(data);
  let x: number = 0;
  let y: number = 0;
  let aim = 0;

  data.forEach(([direction, value]) => {
    switch (direction) {
      case "forward":
        y += aim * value;
        x += value;
        break;
      case "down":
        aim -= value;
        break;
      case "up":
        aim += value;
        break;
    }
  });

  return Math.abs(x * y);
}
