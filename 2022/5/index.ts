import * as utils from "utils";

export function part1(file: string) {
  const input = utils.splitByDoubleLines(file) as [string, string];

  const crates = utils
    .rowsToColumns(
      input[0]
        .split("\n")
        .map((line) =>
          line
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("   ", "")
            .split(" ")
        )
        .slice(0, -1)
        .map((line, index, array) => {
          if (line.length !== array[array.length - 1].length) {
            for (
              let index = line.length;
              index < array[array.length - 1].length;
              index++
            ) {
              line.push("");
            }
          }
          return line;
        })
    )
    .map((line) => line.filter((item) => item !== ""));

  const instructions = input[1]
    .split("\n")
    .map(
      (line) =>
        line
          .replace("move", "")
          .replace(" from", "")
          .replace(" to", "")
          .split(" ")
          .map(Number)
          .slice(1, 4) as [number, number, number]
    )
    .map(([amount, from, to]) => ({ amount, from, to }));
  // console.log(instructions);
  // console.log(crates);

  instructions.forEach((instruction) => {
    const data = new Array(instruction.amount)
      .fill("")
      .map(() => crates[instruction.from - 1].shift() as string);
    crates[instruction.to - 1].unshift(...data.reverse());
    // console.log(crates)
  });
  return crates.map((crate) => crate[0]).join("");
}

export function part2(file: string) {
  const input = utils.splitByDoubleLines(file) as [string, string];

  const crates = utils
    .rowsToColumns(
      input[0]
        .split("\n")
        .map((line) =>
          line
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("   ", "")
            .split(" ")
        )
        .slice(0, -1)
        .map((line, index, array) => {
          if (line.length !== array[array.length - 1].length) {
            for (
              let index = line.length;
              index < array[array.length - 1].length;
              index++
            ) {
              line.push("");
            }
          }
          return line;
        })
    )
    .map((line) => line.filter((item) => item !== ""));

  const instructions = input[1]
    .split("\n")
    .map(
      (line) =>
        line
          .replace("move", "")
          .replace(" from", "")
          .replace(" to", "")
          .split(" ")
          .map(Number)
          .slice(1, 4) as [number, number, number]
    )
    .map(([amount, from, to]) => ({ amount, from, to }));
  // console.log(instructions);
  // console.log(crates);

  instructions.forEach((instruction) => {
    const data = new Array(instruction.amount)
      .fill("")
      .map(() => crates[instruction.from - 1].shift() as string);
    crates[instruction.to - 1].unshift(...data);
    // console.log(crates)
  });
  return crates.map((crate) => crate[0]).join("");
}
