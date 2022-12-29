import * as utils from "utils";

export function part1(input: string) {
  const { data, removed } = getData(input);

  // console.log(data);

  let answer = 0;

  const dataAsColumns = utils.rowsToColumns(data);

  // console.log(dataAsColumns)

  data.forEach((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === data.length - 1) return;
    else {
      row.forEach((value, columnIndex) => {
        if (columnIndex === 0 || columnIndex === row.length - 1) return;
        else {
          const column = dataAsColumns[columnIndex];

          // most stupid code i've ever written lmao
          const treesAbove =
            column.slice(0, rowIndex).length !== 0
              ? column.slice(0, rowIndex)
              : [999];
          const treesBelow =
            column.slice(rowIndex + 1).length !== 0
              ? column.slice(rowIndex + 1)
              : [999];
          const treesLeft =
            row.slice(0, columnIndex).length !== 0
              ? row.slice(0, columnIndex)
              : [999];
          const treesRight =
            row.slice(columnIndex + 1).length !== 0
              ? row.slice(columnIndex + 1)
              : [999];

          // console.log(treesAbove, treesBelow, treesLeft, treesRight);

          const maxes = [
            utils.max(treesAbove),
            utils.max(treesBelow),
            utils.max(treesLeft),
            utils.max(treesRight),
          ] as const;

          // console.log(maxes, rowIndex, columnIndex);

          if (maxes.some((max) => value > max)) {
            answer++;
            // console.log(value, maxes, rowIndex, columnIndex);
          }
        }
      });
    }
  });

  // console.log(answer);

  return answer + removed;
}

export function part2(input: string) {
  const { data, removed } = getData(input);

  // console.log(data);

  let answer: number[] = [];

  const dataAsColumns = utils.rowsToColumns(data);

  // console.log(dataAsColumns)

  data.forEach((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === data.length - 1) return;
    else {
      row.forEach((value, columnIndex) => {
        if (columnIndex === 0 || columnIndex === row.length - 1) return;
        else {
          const column = dataAsColumns[columnIndex];

          // most stupid code i've ever written lmao
          const treesAbove =
            column.slice(0, rowIndex).length !== 0
              ? column.slice(0, rowIndex)
              : [999];
          const treesBelow =
            column.slice(rowIndex + 1).length !== 0
              ? column.slice(rowIndex + 1)
              : [999];
          const treesLeft =
            row.slice(0, columnIndex).length !== 0
              ? row.slice(0, columnIndex)
              : [999];
          const treesRight =
            row.slice(columnIndex + 1).length !== 0
              ? row.slice(columnIndex + 1)
              : [999];

          let score: [number, number, number, number] = [
            evaluateTrees(treesAbove.reverse(), value),
            evaluateTrees(treesBelow, value),
            evaluateTrees(treesLeft.reverse(), value),
            evaluateTrees(treesRight, value),
          ];

          const scenicScore = score.reduce((a, b) => a * b, 1);

          answer.push(scenicScore);
        }
      });
    }
  });

  // console.log(answer);

  return utils.max(answer);
}

const evaluateTrees = (trees: number[], value: number) => {
  let answer = 0;
  for (let index = 0; index < trees.length; index++) {
    const element = trees[index];
    answer++;
    if (element >= value) {
      break;
    }
  }
  return answer;
};

const getData = (input: string) => {
  const data = utils
    .splitByLines(input)
    .map((line) => utils.split(line).map(Number));

  return {
    data,
    removed:
      utils
        .splitByLines(input)
        .map((line) => utils.split(line).map(Number))
        .flat().length -
      data
        .map((a) => a)
        .slice(1, -1)
        .map((line) => line.slice(1, -1))
        .flat().length,
  };
};
