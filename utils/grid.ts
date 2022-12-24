import {
  getAdjacentIndices,
  getAdjacentOrDiagonalIndices,
  getDiagonalIndices,
  rowsToColumns,
  a_star,
  str_irregular,
  compare2Points,
} from ".";
import { StrIrregularList } from "./astar/types";

export const getNeighboursTypes = {
  adjacent: (coord: [number, number], grid: Grid<any>) => {
    return getAdjacentIndices(grid.grid, coord);
  },
  diagonal: (coord: [number, number], grid: Grid<any>) => {
    return getDiagonalIndices(grid.grid, coord);
  },
  adjacentOrDiagonal: (coord: [number, number], grid: Grid<any>) => {
    return getAdjacentOrDiagonalIndices(grid.grid, coord);
  },
};

export type PathfindArgs<T> = {
  start: [number, number];
  goal: [number, number];
  filterNeigbours?: (
    val: { coords: [number, number]; value: T; neighbourVal: T; neighbourCoords: [number, number] },
    grid: Grid<T>
  ) => boolean;
  getNeighbours?: keyof typeof getNeighboursTypes;
};

export class Grid<T> {
  constructor(public grid: T[][]) {}

  getIndex(coords: [number, number]) {
    const [x = 0, y = 0] = coords;
    const answer = this.grid[y][x];
    return answer;
  }

  set([x, y]: [number, number], value: T) {
    this.grid[y][x] = value;
  }

  clone() {
    return new Grid(this.grid);
  }

  invert() {
    return new Grid(rowsToColumns(this.grid));
  }

  map<U>(fn: (value: T, coords: [number, number], grid: Grid<T>) => U) {
    return new Grid(this.grid.map((row, y) => row.map((value, x) => fn(value, [x, y], this))));
  }

  forEach(fn: (value: T, coords: [number, number], grid: Grid<T>) => void) {
    this.grid.forEach((row, y) => row.forEach((value, x) => fn(value, [x, y], this)));
  }

  indexWhere(fn: (value: T, coords: [number, number], grid: Grid<T>) => boolean) {
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (fn(this.grid[y][x], [x, y], this)) {
          return [x, y];
        }
      }
    }
  }

  indicesWhere(fn: (value: T, coords: [number, number], grid: Grid<T>) => boolean) {
    const indices: [number, number][] = [];
    for (let y = 0; y < this.grid.length; y++) {
      for (let x = 0; x < this.grid[y].length; x++) {
        if (fn(this.grid[y][x], [x, y], this)) {
          indices.push([x, y]);
        }
      }
    }
    return indices;
  }

  some(fn: (value: T, coords: [number, number], grid: Grid<T>) => boolean) {
    return this.grid.some((row, y) => row.some((value, x) => fn(value, [x, y], this)));
  }

  every(fn: (value: T, coords: [number, number], grid: Grid<T>) => boolean) {
    return this.grid.every((row, y) => row.every((value, x) => fn(value, [x, y], this)));
  }

  pathfind({ start, goal, filterNeigbours = () => true, getNeighbours = "adjacent" }: PathfindArgs<T>) {
    const getNeighbourFunction =
      typeof getNeighbours === "function" ? getNeighbours : getNeighboursTypes[getNeighbours];

    const hash = ([x, y]: [number, number]) => `${x},${y}` as const;

    const grid: Grid<string[]> = this.map((value, coords) => {
      return (getNeighbourFunction(coords, this.clone()).filter((x) => x !== undefined) ?? []).filter(
        (neighbourCoords) => {
          const neighbourVal = (this.clone() || new Grid<T>([[]]))?.getIndex(neighbourCoords);
          const filtered = filterNeigbours({ coords, value, neighbourVal, neighbourCoords }, this);

          return filtered;
        }
      );
    }).map((value) => value.map(hash));

    let list: StrIrregularList = [];

    grid.forEach((neighbour, coords) => {
      neighbour.forEach((val) => {
        list.push([val, hash(coords), 1]);
      });
    });

    console.log(list.slice(40));

    list = list.filter((val, index, arr) => {
      const reversed = arr.findIndex((newVal) => val[0] === newVal[1] && val[1] === newVal[0]);

      if (val[1] === "7,5") console.log(val, reversed);

      if (reversed === -1) return true;

      return index < reversed;
    });

    console.log(list);

    try {
      const mux = str_irregular.from_edges(list);

      return a_star({
        distance: mux.distance,
        neighbor: mux.neighbor,
        heuristic: (_loc) => 1,
        start: hash(start),
        isEnd: (loc) => loc === hash(goal),
      });
    } catch (e) {
      console.error(e);
      throw new Error("");
    }
  }

  toString() {
    return this.grid
      .map((row) => row.map((val) => JSON.stringify(val)).join(""))
      .join("\n")
      .replaceAll('"', "");
  }
}
