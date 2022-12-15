import { describe, expect, it } from "vitest";
import { parseData, part1 as part1solver, part1postprocess } from "../";
import { part1, part1example, part1exampleanswer } from "../inputs";

const getData = (input: string) => part1postprocess(parseData(input));

describe("test part 1", () => {
  it("has an example input + answer", () => {
    expect(part1example).not.equals("");
    expect(part1exampleanswer).not.equals("");
  });
  it("has a real input", () => {
    expect(part1.length).not.equals(0);
  });
  it("returns the correct value for the example", () => {
    expect(String(part1solver(getData(part1example)))).toBe(part1exampleanswer);
  });
  it("returns a value for normal input", () => {
    const answer = part1solver(getData(part1));
    console.log(answer);
    expect(answer).not.toBeUndefined();
  });
});
