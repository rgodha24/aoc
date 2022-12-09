import { z } from "zod";
import { checkColumns, checkRows, sum } from "utils";

export function part1(input: string) {
  const numbers = z
    .number()
    .array()
    .parse(input.split("\n\n")[0].split(",").map(Number));

  let answer = 0;

  let boards = z
    .number()
    .array()
    .array()
    .parse(
      z
        .string()
        .array()
        .parse(input.split("\n\n").slice(1))
        .map((a) => a.split("\n"))
        .map((a) => a.map((b) => b.split(/\s/).map(Number)).flat())
    ) as (number | "done")[][];

  numbers.forEach((number) => {
    boards = boards.map((board) => {
      if (board.includes(number)) {
        board[board.indexOf(number)] = "done";
      }
      return board;
    });

    boards.forEach((board) => {
      if (checkColumns(board) || checkRows(board)) {
        if (answer === 0) {
          answer = number * sum(board.map((x) => (x === "done" ? 0 : x)));
          // console.table({ answer, number, sum: sum(board.map((x) => (x === "done" ? 0 : x))) });
          // console.log(board);
        }
      }
    });
  });

  return answer;
}

export function part2(input: string) {
  const numbers = z
    .number()
    .array()
    .parse(input.split("\n\n")[0].split(",").map(Number));

  let answer = 0;

  let boards = z
    .number()
    .array()
    .array()
    .parse(
      z
        .string()
        .array()
        .parse(input.split("\n\n").slice(1))
        .map((a) => a.split("\n"))
        .map((a) =>
          a
            .map((b) =>
              b
                .split(/\s/g)
                .filter((a) => a !== "")
                .map(Number)
            )
            .flat()
        )
    ) as (number | "done")[][];

  // console.log(boards[0].length);

  numbers.forEach((number) => {
    if (boards.length === 1) {
      // console.log(sum(boards[0].map((x) => (x === "done" ? 0 : x))) - number, number);
      if (answer === 0) {
        answer =
          (sum(boards[0].map((x) => (x === "done" ? 0 : x))) - number) * number;
        // console.log(boards, number, sum(boards[0].map((x) => (x === "done" ? 0 : x))) - number, boards[0].length);
      }
    } else {
      boards = boards.map((board) => {
        const initialLength = board.length;
        if (board.includes(number)) {
          board[board.indexOf(number)] = "done";
        }
        if (initialLength !== 25) {
          // console.log(board.length, initialLength, board);
        }
        return board;
      });

      boards = boards.filter((board) => {
        if (checkColumns(board) || checkRows(board)) {
          // console.log(board, number, checkColumns(board), checkRows(board));
          return false;
        }
        return true;
      });
    }
  });
  return answer;
}
