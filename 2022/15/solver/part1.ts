import { part1 } from "../inputs/index.js";
import { parseData, part1postprocess, part1 as part1solver } from "../index.js";

const getData = (input: string) => part1postprocess(parseData(input));

const answer = part1solver(getData(part1));

console.log("part1 answer: ", answer);
