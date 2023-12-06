import run from "aocrunner";
import { extractNumberArray } from "../utils/regex.js";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const times = [];
  const distances = [];
  const recordBeats = [];

  input.forEach((line) => {
    if (/Time:/g.test(line)) times.push(...extractNumberArray(line));
    if (/Distance:/g.test(line)) distances.push(...extractNumberArray(line));
  });

  for (let race = 0; race < times.length; race++) {
    const time = times[race];
    const distance = distances[race];
    let beats = 0;

    for (let ms = 0; ms <= time; ms++) {
      if (ms * (time - ms) > distance) {
        beats++;
      }
    }

    recordBeats.push(beats);
  }

  const product = recordBeats.reduce(function (product, value) {
    return product * value;
  });

  return product;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let time = 0;
  let distance = 0;

  input.forEach((line) => {
    line = line.replace(/\s/g, ""); // remove whitespaces
    if (/Time:/g.test(line)) time = extractNumberArray(line)[0];
    if (/Distance:/g.test(line)) distance = extractNumberArray(line)[0];
  });

  let beats = 0;

  for (let ms = 0; ms <= time; ms++) {
    if (ms * (time - ms) > distance) {
      beats++;
    }
  }

  return beats;
};

run({
  part1: {
    tests: [
      {
        input: `Time:      7  15   30\nDistance:  9  40  200`,
        expected: 288,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Time:      7  15   30\nDistance:  9  40  200`,
        expected: 71503,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
