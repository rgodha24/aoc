import * as utils from "utils";

export function part1(input: string) {
  const data = utils.splitByLines(input).map((line) => {
    const split = line.split("");

    return [
      new Set(split.slice(0, split.length / 2)),
      new Set(split.slice(split.length / 2, split.length)),
    ] as const;
  });

  let answer: string[] = [];

  data.forEach(([set1, set2]) => {
    set1.forEach((item) => {
      if (set2.has(item)) {
        answer.push(item);
      }
    });
  });

  // console.log(answer);

  return utils.sum(answer.map(getPriority));
}

const getPriority = (char: string) => {
  let code = char.charCodeAt(0);

  if (char.toUpperCase() === char) {
    code -= 40 - 26 + 24;
  } else {
    code -= 60 + 36;
  }
  // console.log(char, code);
  return code;
};

export function part2(input: string) {
  const data = utils
    .group(utils.splitByLines(input), 3)
    .map(
      ([line1, line2, line3]) =>
        [new Set(line1), new Set(line2), new Set(line3)] as const
    );

  let answer: string[] = [];

  data.forEach(([set1, set2, set3]) => {
    set1.forEach((item) => {
      if (set2.has(item) && set3.has(item)) {
        answer.push(item);
      }
    });
  });

  return utils.sum(answer.map(getPriority));
}
