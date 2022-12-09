import * as utils from "utils";

export function part1(input: string) {
  const crabPositions = utils.numberArraySchema.parse(
    utils.splitByCommas(input).map(Number)
  );

  const max = utils.max(crabPositions);
  const min = utils.min(crabPositions);

  const answer = utils.min(
    utils.range(min, max + 1).map((index) => {
      return utils.sum(
        crabPositions.map((position) => Math.abs(position - index))
      );
    })
  );

  return answer;
}

export function part2(input: string) {
  const crabPositions = utils.numberArraySchema.parse(
    utils.splitByCommas(input).map(Number)
  );

  const max = utils.max(crabPositions);
  const min = utils.min(crabPositions);

  const fuelCost = (delta: number) => {
    let answer = 0;
    for (let index = 0; index < delta; index++) {
      answer += index + 1;
    }
    return answer;
  };

  const answer = utils.min(
    utils.range(min, max + 1).map((index) => {
      return utils.sum(
        crabPositions.map((position) => fuelCost(Math.abs(position - index)))
      );
    })
  );

  return answer;
}
