import { z } from "zod";
import * as utils from "utils";

export function part1(input: string) {
  const schema = z.array(z.tuple([z.tuple([z.number(), z.number()]), z.tuple([z.number(), z.number()])]));

  const a = utils
    .splitByLines(input)
    .map((line) => line.split("->").map((column) => column.trim().split(",").map(Number)));

  // console.log(a);

  const data = schema.parse(a);

  const points = data.map(([a, b]) => {
    const [x1, y1] = a;
    const [x2, y2] = b;

    const xdiff = x2 - x1;
    const ydiff = y2 - y1;
    const xsign = Math.sign(xdiff);
    const ysign = Math.sign(ydiff);

    const points = [] as Array<[number, number]>;

    for (let index = 0; index < utils.max([xdiff, ydiff]); index++) {
      const x = x1 + index * xsign;
      const y = y1 + index * ysign;

      points.push([x, y]);
    }

    return points;
  });

  const biggest = utils.max(data.map((a) => utils.max(a.map(utils.max))));

  const grid = new Array<number>(biggest + 1).fill(0).map(() => new Array<number>(biggest + 1).fill(0));

  points.flat().forEach(([x, y]) => {
    grid[x][y] += 1;
  });

  // console.log(grid);

  return grid.map((row) => row.filter((x) => x > 1)).flat().length - 1;
}

export function part2(input: string) {
  return;
}
