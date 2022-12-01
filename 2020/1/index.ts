import { fileToNumberArray } from "utils";

export function part1(input: string) {
  const data = fileToNumberArray(input);

  let answer = 0;

  data.forEach((num1) => {
    data.forEach((num2) => {
      if (num1 + num2 === 2020) {
        answer = num1 * num2;
      }
    });
  });

  return answer;
}

export function part2(input: string) {
  const data = fileToNumberArray(input);

  let answer = 0;

  data.forEach((num1) => {
    data.forEach((num2) => {
      data.forEach((num3) => {
        if (num1 + num2 + num3 === 2020) {
          answer = num1 * num2 * num3;
        }
      });
    });
  });

  return answer;
}
