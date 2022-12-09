import { describe, expect, it } from "vitest";
import { part2 as part2solver } from "../";
import { part2, part2example, part2exampleanswer } from "../inputs";

describe("test part 2", () => {
  it("has a real input", () => {
    expect(part2.length).not.equals(0);
  });
  it("returns a value for normal input", () => {
    const answer = part2solver(part2);
    console.log(answer);
    expect(answer).not.toBeUndefined();
  });
});
