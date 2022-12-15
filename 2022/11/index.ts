import * as utils from "utils";
import { z } from "zod";

export const parseData = (input: string) => {
  const monkeys = input.split("\n\n").map((line) => line.split("\n").slice(1));
  // holy crap actually the longest map function i've ever written
  return monkeys.map((monkey) => {
    const startingItems = utils.stringArrayToNumberArray(utils.splitByCommas(monkey[0].split(": ")[1]));

    const operationStrings = monkey[1].split("= ")[1].trim().split(" ");

    const operationSchema = z.object({
      first: z.literal("old"),
      operator: z.literal("+").or(z.literal("*")),
      second: z.number().or(z.literal("old")),
    });
    const operationObjOld = {
      first: operationStrings[0] === "old" ? "old" : Number(operationStrings[0]),
      operator: operationStrings[1],
      second: operationStrings[2] === "old" ? "old" : Number(operationStrings[2]),
    };

    const operationObj = operationSchema.parse(operationObjOld);

    let operation: (old: number) => number = (old) => old;

    if (operationObj.second === "old") {
      if (operationObj.operator === "+") {
        operation = (old) => old + old;
      }
      if (operationObj.operator === "*") {
        operation = (old) => old * old;
      }
    } else {
      if (operationObj.operator === "+") {
        operation = (old) => old + Number(operationObj.second);
      }
      if (operationObj.operator === "*") {
        operation = (old) => old * Number(operationObj.second);
      }
    }

    const testNumber = z.preprocess((a) => Number(a), z.number()).parse(monkey[2].split("by ")[1]);

    const trueMonkey = z.preprocess((a) => Number(a), z.number()).parse(monkey[3].split("monkey ")[1]);
    const falseMonkey = z.preprocess((a) => Number(a), z.number()).parse(monkey[4].split("monkey ")[1]);

    return {
      items: startingItems,
      operation,
      test: (num: number) => {
        return num % testNumber === 0;
      },
      trueMonkey,
      falseMonkey,
      inspections: 0,
      testNumber,
    };
  });
};

export function part1postprocess(input: utils.InferReturnType<typeof parseData>) {
  return input;
}

export function part1(input: utils.InferReturnType<typeof part1postprocess>) {
  const NUM_ROUNDS = 20;

  for (let round = 0; round < NUM_ROUNDS; round++) {
    for (let monkeyIndex = 0; monkeyIndex < input.length; monkeyIndex++) {
      const monkey = input[monkeyIndex];

      monkey.items.forEach((item) => {
        const worryLevel = Math.floor(monkey.operation(item) / 3);
        const trueOrFalse = monkey.test(worryLevel);

        monkey.inspections++;

        if (trueOrFalse) {
          input[monkey.trueMonkey].items.push(worryLevel);
        }
        if (!trueOrFalse) {
          input[monkey.falseMonkey].items.push(worryLevel);
        }
      });

      monkey.items = [];
    }
  }

  const [first, second] = input
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2);

  return first * second;
}

export function part2postprocess(input: utils.InferReturnType<typeof parseData>) {
  return { monkeys: input, divisor: input.map((monkey) => monkey.testNumber).reduce((a, b) => a * b, 1) };
}

export function part2({ monkeys, divisor }: utils.InferReturnType<typeof part2postprocess>) {
  const NUM_ROUNDS = 10_000;

  let overflowed = 0;
  let removed = 0;

  console.log(divisor);

  for (let round = 0; round < NUM_ROUNDS; round++) {
    for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
      const monkey = monkeys[monkeyIndex];

      monkey.items.forEach((val) => {
        val %= divisor;

        let worryLevel = monkey.operation(val);

        monkey.inspections++;
        const trueOrFalse = monkey.test(worryLevel);

        if (trueOrFalse) {
          monkeys[monkey.trueMonkey].items.push(worryLevel);
        }
        if (!trueOrFalse) {
          monkeys[monkey.falseMonkey].items.push(worryLevel);
        }
      });

      monkey.items = [];

    }

  }

  const [first, second] = monkeys
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2);

  // console.log(first, second);

  return first * second;
}
