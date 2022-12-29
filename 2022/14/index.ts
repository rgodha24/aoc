import * as utils from "utils";
import { z } from "zod";

export const parseData = (input: string, type: "example" | "real") => {
  const schema = z.tuple([z.coerce.number(), z.coerce.number()]);

  return input.split("\n").map((line) => line.split(" -> ").map((val) => schema.parse(val.split(",").map(Number))));
};

export const part1postprocess = (input: ReturnType<typeof parseData>, type: "example" | "real") => {
  return input;
};

export function part1(input: ReturnType<typeof part1postprocess>, type: "example" | "real") {
  const min = input
    .map((val) => val.map((a) => a[0]))
    .flat()
    .sort((a, b) => a - b)[0];
  const max = input
    .map((val) => val.map((a) => a[0]))
    .flat()
    .sort((a, b) => a - b)
    .reverse()[0];

  const maxy = input
    .map((val) => val.map((a) => a[1]))
    .flat()
    .sort((a, b) => a - b)
    .reverse()[0];

  console.log(maxy);

  const arr = [...new Array(maxy + 1)].map(() => [...new Array(max - min + 1)].map(() => "." as const));
  const grid = new utils.Grid<"." | "#" | "o">(arr);

  const path = input.map((val) => utils.smoothPath(val));

  path.forEach((row) => {
    row.forEach(([x, y]) => {
      grid.set([x - min, y], "#");
    });
  });

  const sandLocation = 500 - min;

  let index = 0;

  while (true) {
    try {
      drop(grid, sandLocation);
      // if (index > 30) throw new Error("too many iterations");
      index++;
    } catch (e) {
      console.log(grid.toString());
      return index;
    }
  }
}

export const drop = (grid: utils.Grid<"." | "#" | "o">, sandLocation: number, errOnFallOutOfMap = false) => {
  let y = 0;
  let x = sandLocation;

  while (1) {
    if (grid.get([x, y + 1]) === ".") {
      y++; // falls
    } else if (grid.get([x, y + 1]) !== ".") {
      // catches on something, now we check the sides
      if (
        x - 1 >= 0 &&
        grid.get([x - 1, y + 1]) !== "." &&
        x + 1 < grid.grid[0].length &&
        grid.get([x + 1, y + 1]) !== "."
      ) {
        // sides aren't clear, so we place the sand in the current location
        grid.set([x, y], "o");
        if (x === sandLocation && y === 0) throw new Error("reached 0, 500");
        return;
      } else if (x - 1 >= 0 && grid.get([x - 1, y + 1]) === ".") {
        // left side is clear, so we move left
        x--;
      } else if (x + 1 < grid.grid[0].length && grid.get([x + 1, y + 1]) === ".") {
        // right side is clear, so we move right
        x++;
      } else {
        throw new Error("falling out of map");
      }
    }
  }
};

export const part2postprocess = (input: ReturnType<typeof parseData>, type: "example" | "real") => {
  // adding the extra floor at the bottom

  const maxy = input
    .map((val) => val.map((a) => a[1]))
    .flat()
    .sort((a, b) => a - b)
    .reverse()[0];

  const maxx = input
    .map((val) => val.map((a) => a[0]))
    .flat()
    .sort((a, b) => a - b)
    .reverse()[0];

  const minx = input
    .map((val) => val.map((a) => a[0]))
    .flat()
    .sort((a, b) => a - b)[0];

  console.log([
    [minx, maxy + 2],
    [maxx, maxy + 2],
  ]);

  input.push([
    [0, maxy + 2],
    [maxx * 2, maxy + 2],
  ]);

  return input;
};

export function part2(input: ReturnType<typeof part2postprocess>, type: "example" | "real") {
  return part1(input, type) + 1; // if this works itll be so stupid lmao
  // IT WORKED LMAOOOOOO THATS SO GOOD
}
