import * as utils from "utils";

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

export function part1(input: string) {
  type Dir = {
    files: File[];
    dirs: Record<string, Dir>;
  };
  const data = input
    .split("$")
    .map((line) => line.trim().split("\n"))
    .slice(1)
    .map(([first, ...rest]): cd | ls => {
      if (first === "ls") {
        return {
          command: first,
          output: rest.map((output): File | DirInput => {
            const split = output.split(" ");

            if (split[0] === "dir") {
              return {
                type: "dir",
                name: split[1],
              };
            } else {
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
        throw new Error("L bozo ");
      }
    })
    .slice(1);

  // data.forEach((data) => console.log(data));

  const root: Dir = {
    files: [],
    dirs: {},
  };

  let area: string[] = [];

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

  data.forEach((command) => {
    if (command.command === "cd") {
      if (command.to === "..") {
        area.pop();
      } else {
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

  // console.log(JSON.stringify(root));

  // find the dirs in root that have files of size > 100000
  // then find the dirs in those dirs that have files of size > 100000

  const getFiles = (dir: Dir): File[] => {
    const values = Object.values(dir.dirs);

    return [...dir.files, ...values.map((dir) => getFiles(dir)).flat()];
  };

  const getDirs = (dir: Dir): Dir[] => {
    const values = Object.values(dir.dirs);

    return [dir, ...values.map((dir) => getDirs(dir)).flat()];
  };

  const answer = getDirs(root)
    .map((dir) => utils.sum(getFiles(dir).map((file) => file.size)))
    .filter((size) => size < 100000);

  return utils.sum(answer);
}

export function part2(input: string) {
  type Dir = {
    files: File[];
    dirs: Record<string, Dir>;
  };
  const data = input
    .split("$")
    .map((line) => line.trim().split("\n"))
    .slice(1)
    .map(([first, ...rest]): cd | ls => {
      if (first === "ls") {
        return {
          command: first,
          output: rest.map((output): File | DirInput => {
            const split = output.split(" ");

            if (split[0] === "dir") {
              return {
                type: "dir",
                name: split[1],
              };
            } else {
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
        throw new Error("L bozo ");
      }
    })
    .slice(1);

  // data.forEach((data) => console.log(data));

  const root: Dir = {
    files: [],
    dirs: {},
  };

  let area: string[] = [];

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

  data.forEach((command) => {
    if (command.command === "cd") {
      if (command.to === "..") {
        area.pop();
      } else {
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

  // console.log(JSON.stringify(root));

  // find the dirs in root that have files of size > 100000
  // then find the dirs in those dirs that have files of size > 100000

  const getFiles = (dir: Dir): File[] => {
    const values = Object.values(dir.dirs);

    return [...dir.files, ...values.map((dir) => getFiles(dir)).flat()];
  };

  const getDirs = (dir: Dir): Dir[] => {
    const values = Object.values(dir.dirs);

    return [dir, ...values.map((dir) => getDirs(dir)).flat()];
  };

  const rootSize = utils.sum(getFiles(root).map((file) => file.size));

  const unusedSpace =  70_000_000 - rootSize;

  const minDelete = 30_000_000 - unusedSpace;

  const answer = getDirs(root)
    .map((dir) => utils.sum(getFiles(dir).map((file) => file.size)))
    .filter((size) => size >= minDelete).sort((a, b) => b - a).reverse();

  return answer[0];
}
