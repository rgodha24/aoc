import { describe, expect, it } from "vitest";
import { compareNumbers, compareArrays, compare } from "..";

describe("test compare", () => {
  it("compare numbers does = right", () => {
    expect(compareNumbers(1, 1)).toBe("=");
  });
  it("compare numbers does > right", () => {
    expect(compareNumbers(2, 1)).toBe(">");
  });
  it("compare numbers does < right", () => {
    expect(compareNumbers(1, 2)).toBe("<");
  });
  it("compareArrays 1", () => {
    expect(compareArrays([], [1])).toBe("<");
  });
  it("compareArrays 2", () => {
    expect(compareArrays([9], [8, 7, 8])).toBe(">");
  });
  it("compareArrays 3", () => {
    expect(compareArrays([4, 4], [4, 4])).toBe("=");
  });
  it("compareArrays 4", () => {
    expect(compareArrays([2, 3, 4], [4])).toBe("<");
  });
  it("compareArrays 5", () => {
    expect(compareArrays([7, 7, 7, 7], [7, 7, 7])).toBe(">");
  });
  it("compare 1", () => {
    expect(compare([1, 1, 3, 1, 1], [1, 1, 5, 1, 1])).toBe("<");
  });
  it("compare 2", () => {
    expect(compare([9], [[8, 7, 6]])).toBe(">");
  });
  it("compare 3", () => {
    expect(compare([[4, 4], 4, 4], [[4, 4], 4, 4, 4])).toBe("<");
  });
  it("compare 4", () => {
    expect(compare([[1], [2, 3, 4]], [[1], 4])).toBe("<");
  });
  it("compare 5", () => {
    expect(compare([7, 7, 7, 7], [7, 7, 7])).toBe(">");
  });
  it("compare 6", () => {
    expect(compare([[1],[2,3,4]], [[1],4])).toBe("<")
  })
});
