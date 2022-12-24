import { a_star, str_irregular } from "../index";
import { StrIrregularList } from "../types";
import { expect, it } from "vitest";

const streets: StrIrregularList = [
  ["B", "A", 2],
  ["B", "L", 1],
  ["L", "M", 1],
  ["M", "C", 1],
  ["C", "K", 2],
  ["A", "K", 1],
  ["A", "J", 2],
  ["J", "I", 2],
  ["I", "H", 1],
  ["H", "G", 3],
  ["G", "F", 4],
  ["F", "K", 2],
  ["F", "E", 3],
  ["E", "D", 2],
  ["D", "C", 1],
];

const mux = str_irregular.from_edges(streets);

it("Streets B to H for 7", () => {
  const res = a_star({
    start: "B",
    isEnd: (loc) => loc === "H",
    neighbor: mux.neighbor,
    distance: mux.distance,
    heuristic: (_loc) => 0,
  });

  expect(res.path).toStrictEqual(["B", "A", "J", "I", "H"]);
  expect(res.cost).toBe(7);
});

it("Streets B to E for 6", () => {
  const res = a_star({
    start: "B",
    isEnd: (loc) => loc === "E",
    neighbor: mux.neighbor,
    distance: mux.distance,
    heuristic: (_loc) => 0,
  });

  expect(res.path).toStrictEqual(["B", "L", "M", "C", "D", "E"]);
  expect(res.cost).toBe(6);
});
