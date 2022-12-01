import { describe, expect, it } from "vitest";
import { part2 as part2solver } from "../";
import { part2, part2example, part2exampleanswer } from "../inputs";

describe("test part 2", () => {
  it("has an example input + answer", () => {
    expect(part2example).not.equals("");
    expect(part2exampleanswer).not.equals("");
  });
  it("has a real input", () => {
    expect(part2.length).not.equals(0);
  });
  it("returns a value", () => {
    expect(part2solver(part2)).not.toBeUndefined();
  });
  it("returns the correct value for the example", () => {
    expect(String(part2solver(part2example))).toBe(part2exampleanswer);
  });
  it("returns a value for normal input", () => {
    const answer = part2solver(part2);
    console.log(answer);
    expect(answer).not.toBeUndefined();
  });
});
