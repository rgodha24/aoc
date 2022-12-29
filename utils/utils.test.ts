import { describe, expect, it } from "vitest";
import { getAdjacentIndices, pathBetween, smoothPath } from ".";

describe("utils", () => {
  it("test adjacent indices edges", () => {
    expect(
      getAdjacentIndices(
        [
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
        ],
        [2, 4]
      ).length
    ).toBe(3);
  });

  it("test adjacent indices middle", () => {
    expect(
      getAdjacentIndices(
        [
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
          [0, 1, 2, 3, 4, 5, 6, 7],
        ],
        [2, 3]
      ).length
    ).toBe(4);
  });

  it("test smooth path func 1", () => {
    expect(
      smoothPath([
        [0, 0],
        [0, 2],
        [2, 2],
      ])
    ).toStrictEqual([
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
      [2, 2],
    ]);
  });

  it("test path between 1", () => {
    expect(
      pathBetween([
        [0, 0],
        [0, 2],
      ])
    ).toStrictEqual([
      [0, 0],
      [0, 1],
      [0, 2],
    ]);
  });

  it("path between throws", () => {
    expect(() =>
      pathBetween([
        [0, 0],
        [2, 2],
      ])
    ).toThrowError();
  });
});
