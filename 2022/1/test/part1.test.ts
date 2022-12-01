import { describe, expect, it } from "vitest";
import { part1 as part1solver } from "../";
import { part1, part1example, part1exampleanswer } from "../inputs";

describe("test part 1", () => {
  it("has an example input + answer", () => {
    expect(part1example).not.equals("");
    expect(part1exampleanswer).not.equals("");
  });
  it("has a real input", () => {
    expect(part1.length).not.equals(0);
  });
  it("returns a value", () => {
    expect(part1solver(part1)).not.toBeUndefined();
  });
  it("returns the correct value for the example", () => {
    expect(String(part1solver(part1example))).toBe(part1exampleanswer);
  });
  it("returns a value for normal input", () => {
    const answer = part1solver(part1);
    console.log(answer);
    expect(answer).not.toBeUndefined();
  });
});
