import * as utils from "utils";

export function part1(input: string) {
  const data = utils.fileToNumberArray(input);

  return utils.sum(
    data.map((val) => {
      return Math.floor(val / 3) - 2;
    })
  );
}

export function part2(input: string) {
  function findFuel(a: number): number {
    const fuel = Math.floor(a / 3) - 2;

    if (fuel > 8) {
      return fuel + findFuel(fuel);
    } else {
      return fuel;
    }
  }

  const data = utils.fileToNumberArray(input);

  return utils.sum(data.map(findFuel));
}