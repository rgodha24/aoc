import * as utils from "utils";

export function part1(input: string) {
  const data = input.split("");
  let answer: number = 0;

  data.forEach((char, index, array) => {
    const next4 = new Set(array.slice(index, index + 4));
    // console.log(next4)
    if (next4.size === 4 && answer === 0) {
      answer = index + 4;
    }
  });

  return answer;
}

export function part2(input: string) {
  const data = input.split("");
  let answer: number = 0;

  data.forEach((char, index, array) => {
    const next4 = new Set(array.slice(index, index + 14));
    // console.log(next4)
    if (next4.size === 14 && answer === 0) {
      answer = index + 14;
    }
  });

  return answer;
}
