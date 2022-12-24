import * as utils from "utils";
import { gridFind } from "utils";
import { z } from "zod";

export const parseData = (input: string) => {
  const chars = input.split("\n").map((line) => line.split(""));

  const schema = z.array(z.array(z.number().or(z.literal("goal").or(z.literal("start")))));

  const data = schema.parse(
    chars.map((line) =>
      line.map((char) => {
        if (char === "S") return "start";
        if (char === "E") return "goal";
        return utils.lowercaseCharToNum(char);
      })
    )
  );

  return {
    start: gridFind(data, "start"),
    goal: gridFind(data, "goal"),
    grid: new utils.Grid(data.map((line) => line.map((char) => (char === "start" ? 1 : char === "goal" ? 26 : char)))),
  };
};

export const part1postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

export function part1({ start, goal, grid }: utils.InferReturnType<typeof part1postprocess>) {
  const path = grid.pathfind({
    start,
    goal,
    getNeighbours: "adjacent",
    filterNeigbours: ({ value, neighbourVal }) => {
      return (
        neighbourVal === value + 1 ||
        neighbourVal === value ||
        neighbourVal === value - 1 ||
        neighbourVal === value - 2 ||
        neighbourVal === value - 3 ||
        neighbourVal === value - 4 ||
        neighbourVal === value - 5 ||
        neighbourVal === value - 6 ||
        neighbourVal === value - 7 ||
        neighbourVal === value - 8
      );
    },
  });

  if (path.visited !== undefined) {
    const visited = path.visited;
    const visitedGrid = grid.map((val) => utils.numToLowerCaseChar(val));

    visited.forEach((val) => {
      visitedGrid.set(val.split(",").map(Number) as [number, number], "." as "a");
    });

    console.log(path.status, path.path, visited, "\n", visitedGrid.toString());
  }

  return path.path.length - 1;
}

export const part2postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

export function part2(input: utils.InferReturnType<typeof part2postprocess>) {
  return;
}
