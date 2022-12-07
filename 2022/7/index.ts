import * as utils from "utils";

export function part1(input: string) {
  const data = parseData(input);

  const root = getRoot(data);

  const answer = getDirs(root)
    .map((dir) => utils.sum(getFiles(dir).map((file) => file.size)))
    .filter((size) => size < 100000);

  return utils.sum(answer);
}

export function part2(input: string) {
  const data = parseData(input);

  const root = getRoot(data);

  const rootSize = utils.sum(getFiles(root).map((file) => file.size));
  const unusedSpace = 70_000_000 - rootSize;
  const minDelete = 30_000_000 - unusedSpace;

  const answer = getDirs(root)
    .map((dir) => utils.sum(getFiles(dir).map((file) => file.size)))
    .filter((size) => size >= minDelete)
    .sort((a, b) => b - a)
    .reverse();

  return answer[0];
}

const getRoot = (data: (cd | ls)[]): Dir => {
  const root: Dir = {
    files: [],
    dirs: {},
  };

  // basically a path of where we are in the file tree. if it's empty, then we are at the root
  let area: string[] = [];

  data.forEach((command) => {
    if (command.command === "cd") {
      if (command.to === "..") {
        // go back one, or get rid of the last one in the path
        area.pop();
      } else {
        // go into the dir, add one to the end of the array
        area.push(command.to);
      }
    }
    if (command.command === "ls") {
      command.output.forEach((output) => {
        if (output.type === "dir") {
          setDir(root, area, output.name);
        }
        if (output.type === "file") {
          setFile(root, area, output);
        }
      });
    }
  });

  return root;
};

const parseData = (input: string) =>
  input
    // each command on different line
    .split("$")
    // split each command output into lines
    .map((line) => line.trim().split("\n"))
    // get rid of empty first array
    .slice(1)
    // parse input into easier format to read
    .map(([first, ...rest]): cd | ls => {
      if (first === "ls") {
        return {
          command: first,
          output: rest.map((output): File | DirInput => {
            const split = output.split(" ");
            // if it's a dir, return this object (makes ts happier which makes me happier)
            if (split[0] === "dir") {
              return {
                type: "dir",
                name: split[1],
              };
            } else {
              // if it's a file, return this (again ts happier = me happier)
              return {
                type: "file",
                size: Number(split[0]),
                name: split[1],
              };
            }
          }),
        };
      } else if (first.startsWith("cd")) {
        return {
          command: "cd",
          to: first.split(" ")[1],
        };
      } else {
        // makes ts happy with types of array
        throw new Error("L bozo ");
      }
    })
    // removes the cd / bc that only happens once, so it doesn't matter if we just start at root
    .slice(1);

const getFiles = (dir: Dir): File[] => {
  const values = Object.values(dir.dirs);

  return [...dir.files, ...values.map((dir) => getFiles(dir)).flat()];
};

const getDirs = (dir: Dir): Dir[] => {
  const values = Object.values(dir.dirs);

  return [dir, ...values.map((dir) => getDirs(dir)).flat()];
};

const setFile = (dir: Dir, path: string[], value: File) => {
  if (path.length === 0) {
    dir.files.push(value);
  } else {
    const [first, ...rest] = path;
    if (!dir.dirs[first]) {
      dir.dirs[first] = {
        files: [],
        dirs: {},
      };
    }
    setFile(dir.dirs[first], rest, value);
  }
};

const setDir = (dir: Dir, path: string[], name: string) => {
  if (path.length === 0) {
    dir.dirs[name] = {
      files: [],
      dirs: {},
    };
  } else {
    const [first, ...rest] = path;
    if (!dir.dirs[first]) {
      dir.dirs[first] = {
        files: [],
        dirs: {},
      };
    }
    setDir(dir.dirs[first], rest, name);
  }
};

type File = {
  type: "file";
  size: number;
  name: string;
};

type DirInput = {
  type: "dir";
  name: string;
};

type cd = {
  command: "cd";
  to: string;
};

type ls = {
  command: "ls";
  output: (File | DirInput)[];
};
type Dir = {
  files: File[];
  dirs: Record<string, Dir>;
};
