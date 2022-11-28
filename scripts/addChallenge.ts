import { fstat, readFileSync, writeFileSync, copyFileSync, mkdirSync } from "fs";
import readline from "readline/promises";
import { parse, stringify } from "yaml";
import path from "path";
import mv from "mv";
import glob from "fast-glob";

async function main() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const year = parseInt(await rl.question("What year is this challenge for? "));
  const day = parseInt(await rl.question("What day is this challenge for? "));
  rl.close();
  const a = path.relative(__dirname, "../pnpm-workspace.yaml");
  const pnpmWorkspace = parse(readFileSync(a, "utf-8")).packages as Array<unknown>;

  //   console.log(Array.isArray(pnpmWorkspace), pnpmWorkspace);

  pnpmWorkspace.push(`${year}/*`);

  // deduplicate pnpmworkspace
  const pnpmWorkspaceSet = new Set(pnpmWorkspace);
  pnpmWorkspace.length = 0;
  pnpmWorkspaceSet.forEach((x) => pnpmWorkspace.push(x));

  writeFileSync(a, stringify({ packages: Array.from(pnpmWorkspace) }));

  const files = glob
    .sync(["../template/**/*", "!../template/node_modules/**/*"])
    .map((x) => [x, x.replace("template", `${year}/${day}`)] as [string, string]);

  mkdirSync(path.join(__dirname, `../${year}/${day}`), { recursive: true });
  mkdirSync(path.join(__dirname, `../${year}/${day}/inputs`), { recursive: true });
  mkdirSync(path.join(__dirname, `../${year}/${day}/test`), { recursive: true });

  files.forEach((file) => {
    copyFileSync(path.join(__dirname, file[0]), path.join(__dirname, file[1]));
  });

  const filesToUpdate = [
    readFileSync(path.join(__dirname, `../${year}/${day}/package.json`), "utf-8"),
    readFileSync(path.join(__dirname, `../${year}/${day}/README.md`), "utf-8"),
  ] as const;

  filesToUpdate.forEach((file, index) => {
    const a = file.replace("{{year}}", year.toString());
    const b = a.replace("{{day}}", day.toString());
    writeFileSync(path.join(__dirname, `../${year}/${day}/${index === 0 ? "package.json" : "README.md"}`), b);
  });

  //   console.log(year, day, pnpmWorkspace);
}

main();
