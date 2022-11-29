import { mostCommon, rowsToColumns, split, splitByLines } from "utils";

export function part1(input: string) {
  const rows = splitByLines(input).map(split);
  const columns = rowsToColumns(rows);

  const columnsMost = columns.map(mostCommon);
  const columnsLeast = columnsMost.map((val) => val.replaceAll("1", "2").replaceAll("0", "1").replaceAll("2", "0"));

  const gamma = parseInt(columnsMost.join(""), 2);
  const epsilon = parseInt(columnsLeast.join(""), 2);

  return gamma * epsilon;
}

export function part2(input: string) {
  let o2 = 0;
  let co2 = 0;

  {
    let rows = splitByLines(input).map(split);

    for (let index = 0; index < rows[0].length; index++) {
      const columns = rowsToColumns(rows);
      let mostCommonNumber = mostCommon(columns[index]);

      if (rows.length === 2) {
        mostCommonNumber = "1";
      }

      if (rows.length === 1) {
        break;
      }
      //   console.log(rows);
      rows = rows.filter((row) => row[index] === mostCommonNumber);
    }

    console.log(rows);

    // console.log(rows[0].join(""));

    o2 = parseInt(rows[0].join(""), 2);
    console.log(o2);
  }

  {
    let rows = splitByLines(input).map(split);

    for (let index = 0; index < rows[0].length; index++) {
      const columns = rowsToColumns(rows);
      let leastCommonNumber = mostCommon(columns[index]) === "1" ? "0" : "1";

      if (rows.length === 2) {
        leastCommonNumber = "0";
      }

      if (rows.length === 1) {
        break;
      }
      //   console.log(index, rows);
      rows = rows.filter((row) => row[index] === leastCommonNumber);
    }

    console.log(rows);
    co2 = parseInt(rows[0].join(""), 2);
  }

  console.log(co2, o2);

  return o2 * co2;
}
