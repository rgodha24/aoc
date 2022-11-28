import path from "path";
import { fileURLToPath } from "url";
import { readFileSync } from "fs";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


export const part1 = readFileSync(path.join(__dirname, "part1.txt"), "utf-8");
export const part1example = readFileSync(path.join(__dirname, "part1example.txt"), "utf-8");
export const part1exampleanswer = readFileSync(path.join(__dirname, "part1exampleanswer.txt"), "utf-8");
export const part2 = readFileSync(path.join(__dirname, "part2.txt"), "utf-8");
export const part2example = readFileSync(path.join(__dirname, "part2example.txt"), "utf-8");
export const part2exampleanswer = readFileSync(path.join(__dirname, "part2exampleanswer.txt"), "utf-8");
