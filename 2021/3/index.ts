import {
  mostCommon,
  rowsToColumns,
  split,
  splitByLines,
  findAmount,
} from "utils";

export function part1(input: string) {
  const rows = splitByLines(input).map(split);
  const columns = rowsToColumns(rows);

  const columnsMost = columns.map(mostCommon);
  const columnsLeast = columnsMost.map((val) =>
    val.replaceAll("1", "2").replaceAll("0", "1").replaceAll("2", "0")
  );

  const gamma = parseInt(columnsMost.join(""), 2);
  const epsilon = parseInt(columnsLeast.join(""), 2);

  return gamma * epsilon;
}

export function part2(input: string) {
  let o2 = 0;
  let co2 = 0;

  {
    let rows = splitByLines(input).map(split);

    const length = rows[0].length;

    for (let index = 0; index < length; index++) {
      const ones = findAmount(
        rows.map((row) => row[index]),
        "1"
      );
      const zeroes = findAmount(
        rows.map((row) => row[index]),
        "0"
      );

      const most = ones >= zeroes ? "1" : "0";

      rows = rows.filter((row) => row[index] === most);
      if (rows.length === 1) {
        o2 = parseInt(rows[0].join(""), 2);
      }
    }
  }
  {
    let rows = splitByLines(input).map(split);

    const length = rows[0].length;

    for (let index = 0; index < length; index++) {
      const ones = findAmount(
        rows.map((row) => row[index]),
        "1"
      );
      const zeroes = findAmount(
        rows.map((row) => row[index]),
        "0"
      );

      const most = ones < zeroes ? "1" : "0";

      // console.log(ones, zeroes, most);

      rows = rows.filter((row) => row[index] === most);
      if (rows.length === 1) {
        // console.log(rows[0]);
        co2 = parseInt(rows[0].join(""), 2);
      }
    }
  }

  // console.log(o2, co2);

  return o2 * co2;
}
