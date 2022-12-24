import { describe, expect, it } from "vitest";
import { Grid } from ".";

describe("test grid", () => {
  it("test map", () => {
    const grid = new Grid([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(grid.map((a) => a + 1).grid).toEqual([
      [2, 3, 4],
      [5, 6, 7],
      [8, 9, 10],
    ]);
  });

  it("test some", () => {
    const grid = new Grid([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(grid.some((a) => a === 5)).toBe(true);
    expect(grid.some((a) => a === 10)).toBe(false);
  });

  it("test every", () => {
    const grid = new Grid([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    expect(grid.every((a) => a < 10)).toBe(true);
    expect(grid.every((a) => a < 5)).toBe(false);
  });

  it("test pathfind", () => {});
});
