// beacon and sensor are backwards but im way too lazy to care at this point
import * as utils from "utils";
import { z } from "zod";

export const getManhattanDistance = (dx: number, dy: number) => Math.abs(dx) + Math.abs(dy);

export const parseData = (input: string) => {
  const schema = z.object({
    beacon: z.object({
      x: z.coerce.number(),
      y: z.coerce.number(),
    }),
    sensor: z.object({
      x: z.coerce.number(),
      y: z.coerce.number(),
    }),
  });

  const data = input
    .split("\n")
    .map((line) => {
      const words = utils.splitByWhiteSpace(line);

      return schema.parse({
        sensor: {
          x: words[2].replace("x=", "").replace(",", ""),
          y: words[3].replace("y=", "").replace(":", ""),
        },
        beacon: {
          x: words[8].replace("x=", "").replace(",", ""),
          y: words[9].replace("y=", "").replace(":", ""),
        },
      });
    })
    .map(({ beacon, sensor }) => ({
      beacon,
      sensor,
      distance: getManhattanDistance(Math.abs(beacon.x - sensor.x), Math.abs(beacon.y - sensor.y)),
    }));

  return data;
};

export const part1postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

const getMapAtY = (input: { sensor: { x: number; y: number }; distance: number }[], y: number) => {
  const vals = input.map(({ sensor, distance }) => {
    const ydiff = Math.abs(y - sensor.y);
    const answer = distance - ydiff;

    if (answer > 0) {
      return [sensor.x - answer, sensor.x + answer];
    }
    return [0, 0];
  }) satisfies [number, number][];

  const answer = new Map<number, boolean>();

  vals.forEach((val) => {
    const range = utils.range(val[0], val[1]);

    range.forEach((x) => answer.set(x, true));
  });
  return answer;
};

export function part1(input: utils.InferReturnType<typeof part1postprocess>, y = 2000000) {
  const answer = getMapAtY(input, y);

  return answer.size;
}

export const part2postprocess = (input: utils.InferReturnType<typeof parseData>) => {
  return input;
};

export function part2(input: utils.InferReturnType<typeof part2postprocess>, max: number = 4_000_000) {
  let iterations = 0;
  for (let index = 0; index < input.length; index++) {
    const { distance, sensor } = input[index];

    const distPlus1 = distance + 1;

    for (let x = 0; x < distPlus1; x++) {
      let y = distPlus1 - x;
      iterations++;

      const coords = (
        [
          [sensor.x + x, sensor.y + y],
          [sensor.x - x, sensor.y + y],
          [sensor.x + x, sensor.y - y],
          [sensor.x - x, sensor.y - y],
        ] satisfies [number, number][]
      ).filter(checkCoord(max));

      if (coords.some((coord) => !isReachable(input, coord))) {
        console.log(
          coords,
          
          iterations
        );

        const correctIndex = coords.map((coord) => isReachable(input, coord)).indexOf(false)

        return coords[correctIndex][0]*4000000 + coords[correctIndex][1];
      }
    }
  }

  throw new Error("no answer found");
}

export const checkCoord = (max: number) => (coord: [number, number]) => {
  if (coord[0] < 0 || coord[1] < 0) {
    return false;
  }

  if (coord[0] > max || coord[1] > max) {
    return false;
  }

  return true;
};

function isReachable(
  sensors: { distance: number; sensor: { x: number; y: number } }[],
  [x, y]: readonly [number, number]
) {
  for (let index = 0; index < sensors.length; index++) {
    const {
      distance,
      sensor: { x: sensorx, y: sensory },
    } = sensors[index];

    if (distance >= getManhattanDistance(x - sensorx, y - sensory)) {
      return true;
    }
  }

  return false;
}
