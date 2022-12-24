import { a_star, cartesian_2d } from "../index";
import { mazes } from "./inherited-mazes-spec";
import { expect, it } from "vitest";

// start: 'starting point for the search as `config.start`',
// isEnd: 'function evaluating whether a cell is an end point to boolean as `config.isEnd`',
// neighbor: 'function returning the neighbors of a cell to node array as `config.neighbor`',
// distance: 'function returning the distance between two cells to number as `config.distance`',
// heuristic: 'best-guess no-overestimate distance-to-end to number as `config.heuristic`'

it("Config missing start", () => {
  expect(() =>
    a_star({ isEnd: () => false, neighbor: () => [], distance: () => 0, heuristic: () => 0 } as any)
  ).toThrow();
});

it("Config missing isEnd", () => {
  expect(() => a_star({ start: 1, neighbor: () => [], distance: () => 0, heuristic: () => 0 } as any)).toThrow();
});

it("Config missing neighbor", () => {
  expect(() => a_star({ start: 1, isEnd: () => false, distance: () => 0, heuristic: () => 0 } as any)).toThrow();
});

it("Config missing distance", () => {
  expect(() => a_star({ start: 1, isEnd: () => false, neighbor: () => [], heuristic: () => 0 } as any)).toThrow();
});

it("Config missing heuristic", () => {
  expect(() => a_star({ start: 1, isEnd: () => false, neighbor: () => [], distance: () => 0 } as any)).toThrow();
});

it("Config with negative timeout", () => {
  expect(() =>
    a_star({
      start: 1,
      isEnd: () => false,
      neighbor: () => [],
      distance: () => 0,
      heuristic: () => 0,
      timeout: -1,
    } as any)
  ).toThrow();
});

it("Config with fractional timeout", () => {
  expect(() =>
    a_star({
      start: 1,
      isEnd: () => false,
      neighbor: () => [],
      distance: () => 0,
      heuristic: () => 0,
      timeout: 1.5,
    } as any)
  ).toThrow();
});

it("Config with string timeout", () => {
  expect(() =>
    a_star({
      start: 1,
      isEnd: () => false,
      neighbor: () => [],
      distance: () => 0,
      heuristic: () => 0,
      timeout: "2",
    } as any)
  ).toThrow();
});

const maze_tgt = mazes[7]!;

it("Immediate timeout", () => {
  expect(
    a_star({
      start: maze_tgt.start,
      isEnd: ([_a, _b]) => false,
      neighbor: ([a, b]) => [[a + 1, b] as [number, number], [a - 1, b] as [number, number]],
      distance: cartesian_2d.diagonal_distance,
      heuristic: ([x, y]: [x: number, y: number]) =>
        cartesian_2d.diagonal_distance([x, y], [maze_tgt.end[0], maze_tgt.end[1]]),
      timeout: 1,
    })
  ).toMatchObject({ status: "timeout" });
});
