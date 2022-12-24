import { a_star, cartesian_2d } from "../index";
import { mazes } from "./inherited-mazes-spec";
import { Maze } from "../types";
import { expect, it } from "vitest";

[5, 20, 50, 500].forEach((size: number) => {
  it(`Infinite plane straight line, with diagonal, size ${size}`, () => {
    const start: [number, number] = [size, size];

    const config = {
      start,
      isEnd: ([x, y]: [x: number, y: number]) => x === 0 && y === 0,
      neighbor: cartesian_2d.infinite_neighbor_with_diag_factory(),
      distance: cartesian_2d.diagonal_distance,
      heuristic: ([x, y]: [x: number, y: number]) => cartesian_2d.diagonal_distance([x, y], [0, 0]),
    };

    const result1 = a_star(config);

    expect(result1.path.length).toBe(size + 1);
    for (let i = size; i >= 0; --i) {
      expect(result1.path[i]).toStrictEqual([size - i, size - i]);
    }
  });
});

[5, 20, 50].forEach((size: number) => {
  it(`Infinite plane straight line, no diagonal, size ${size}`, () => {
    const start: [number, number] = [size, size];

    const config = {
      start,
      isEnd: ([x, y]: [x: number, y: number]) => x === 0 && y === 0,
      neighbor: cartesian_2d.infinite_neighbor_no_diag_factory(),
      distance: cartesian_2d.diagonal_distance,
      heuristic: ([x, y]: [x: number, y: number]) => cartesian_2d.diagonal_distance([x, y], [0, 0]),
    };

    const result2 = a_star(config);

    expect(result2.path.length).toBe(size * 2 + 1);
  });
});

mazes.forEach((maze: Maze, i) => {
  it(`Maze test ${i} "${maze.name}"`, () => {
    const map_neighbor4 = ([x, y]: [x: number, y: number]) =>
      cartesian_2d
        .infinite_neighbor_no_diag_factory()([x, y])
        .filter(([x, y]) => (maze.map[y] || "").charAt(x) !== "#");

    const map_neighbor8 = ([x, y]: [x: number, y: number]) =>
      cartesian_2d
        .infinite_neighbor_with_diag_factory()([x, y])
        .filter(([x, y]) => (maze.map[y] || "").charAt(x) !== "#");

    const config4 = {
      start: maze.start,
      isEnd: ([x, y]: [x: number, y: number]) => x === maze.end[0] && y === maze.end[1],
      neighbor: map_neighbor4,
      distance: cartesian_2d.diagonal_distance,
      heuristic: ([x, y]: [x: number, y: number]) => cartesian_2d.diagonal_distance([x, y], [maze.end[0], maze.end[1]]),
    };

    const config8 = {
      start: maze.start,
      isEnd: ([x, y]: [x: number, y: number]) => x === maze.end[0] && y === maze.end[1],
      neighbor: map_neighbor8,
      distance: cartesian_2d.diagonal_distance,
      heuristic: ([x, y]: [x: number, y: number]) => cartesian_2d.diagonal_distance([x, y], [maze.end[0], maze.end[1]]),
    };

    const result3 = a_star(config4),
      result4 = a_star(config8);

    if (maze.closest4 !== undefined) {
      expect(result3.path.length).toBe(maze.closest4);
      expect(maze.solve4).toBe(null);
    } else {
      expect(result3.path.length).toBe(maze.solve4);
    }

    if (maze.closest8 !== undefined) {
      expect(result4.path.length).toBe(maze.closest8);
      expect(maze.solve8).toBe(null);
    } else {
      expect(result4.path.length).toBe(maze.solve8);
    }
  });
});
