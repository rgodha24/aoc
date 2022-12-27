import { part2 } from "../inputs/index.js";
import { parseData, part2postprocess, part2 as part2solver } from "../index.js";

const getData = (input: string) => part2postprocess(parseData(input));

const answer = part2solver(getData(part2));

console.log("part2 answer: ", answer);
