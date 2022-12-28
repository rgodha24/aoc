import { describe, expect, it } from "vitest";
import { getManhattanDistance } from "../index.js";

describe("other", () => {
  it("manhattan distance", () => {
    expect(getManhattanDistance(4, 3)).toBe(7);
  });
});
