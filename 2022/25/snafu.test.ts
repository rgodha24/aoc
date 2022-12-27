import { describe, it, expect } from "vitest";
import { parseSnafu, SNAFU, stringToSNAFU, numberToSNAFU, SNAFUToString } from ".";

const cases = (
  [
    [1, "1"],
    [2, "2"],
    [3, "1="],
    [4, "1-"],
    [5, "10"],
    [6, "11"],
    [7, "12"],
    [8, "2="],
    [9, "2-"],
    [10, "20"],
    [15, "1=0"],
    [20, "1-0"],
    [2_022, "1=11-2"],
    [12_345, "1-0---0"],
    [314_159_265, "1121-1110-1=0"],
  ] satisfies [number, string][]
).map(([number, snafu]) => [stringToSNAFU(snafu), number]) satisfies [SNAFU, number][];

describe("parse SNAFU test", () => {
  cases.forEach(([SNAFU, number], index) => {
    it(`parse SNAFU ${index}`, () => {
      expect(parseSnafu(SNAFU)).toBe(number);
    });
  });

  cases.forEach(([SNAFU, number], index) => {
    it(`number ${number} -> SNAFU ${index}`, () => {
      expect(SNAFUToString(numberToSNAFU(number))).toEqual(SNAFUToString(SNAFU));
    });
  });
});
