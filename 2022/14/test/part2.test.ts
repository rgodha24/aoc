import { describe, expect, it } from "vitest";
import { part2 as part2solver, parseData, part2postprocess } from "../";
import { part2, part2example, part2exampleanswer } from "../inputs";

const getData = (input: string, type: "example" | "real") => part2postprocess(parseData(input, type), type);

describe("test part 2", () => {
  it("has an example input + answer", () => {
    expect(part2example).not.equals("");
    expect(part2exampleanswer).not.equals("");
  });
  it("has a real input", () => {
    expect(part2.length).not.equals(0);
  });
  it("returns the correct value for the example", () => {
    const type = "example";
    expect(String(part2solver(getData(part2example, type), type))).toBe(part2exampleanswer);
  });
  it("returns a value for normal input", () => {
    const type = "real";
    const answer = part2solver(getData(part2, type), type);
    console.log(answer);
    expect(answer).not.toBeUndefined();
  });
});
