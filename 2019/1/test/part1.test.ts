import { describe, expect, it } from "vitest";
import { part1 as part1solver } from "../";
import { part1, part1example, part1exampleanswer } from "../inputs";

describe("test part 1", () => {
  it("has a real input", () => {
    expect(part1.length).not.equals(0);
  });
  it("returns a value for normal input", () => {
    const answer = part1solver(part1);
    console.log(answer);
    expect(answer).not.toBeUndefined();
  });
});
