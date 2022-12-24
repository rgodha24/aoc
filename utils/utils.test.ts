import { describe, expect, it } from "vitest";
import { getAdjacentIndices } from ".";

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
});
