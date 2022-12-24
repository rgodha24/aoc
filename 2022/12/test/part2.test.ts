import { describe, expect, it } from "vitest";
import { part2 as part2solver, parseData, part2postprocess } from "../";
import { part2, part2example, part2exampleanswer } from "../inputs";

const getData = (input: string) => part2postprocess(parseData(input));

describe("test part 2", () => {
  it.skip("has an example input + answer", () => {
    expect(part2example).not.equals("");
    expect(part2exampleanswer).not.equals("");
  });
  it.skip("has a real input", () => {
    expect(part2.length).not.equals(0);
  });
  it.skip("returns the correct value for the example", () => {
    expect(String(part2solver(getData(part2example)))).toBe(part2exampleanswer);
  });
  it.skip("returns a value for normal input", () => {
    const answer = part2solver(getData(part2));
    console.log(answer);
    expect(answer).not.toBeUndefined();
  });
});
