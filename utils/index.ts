import { z } from "zod";

export const splitByLines = (input: string) => input.split("\n");

export const splitByWhiteSpace = (input: string) => input.split(/\s+/);

export const sum = (input: number[]) => input.reduce((a, b) => a + b, 0);

export const stringArrayToNumberArray = (input: string[]) => z.array(z.number()).parse(input);
