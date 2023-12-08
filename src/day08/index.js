import run from "aocrunner";
import { extractRegexArray } from "../utils/regex.js";
import { lcm } from "mathjs";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  let sequence = "";
  let map = new Map();

  input.forEach((line) => {
    if (line == "") return;
    if (/\w{3} = \(\w{3}, \w{3}\)/g.test(line)) {
      const letters = extractRegexArray(line, /\w{3}/g);
      map.set(letters[0], {
        left: letters[1],
        right: letters[2],
      });
    } else {
      sequence = line.split("");
    }
  });

  let curr = "AAA";
  let sequenceI = 0;
  let loopCount = 0;

  while (curr != "ZZZ") {
    const paths = map.get(curr);
    const dir = sequence[sequenceI % sequence.length];
    if (dir == "L") curr = paths.left;
    else if (dir == "R") curr = paths.right;
    loopCount++;
    sequenceI++;
  }

  return loopCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let sequence = "";
  let map = new Map();
  const curr = [];

  input.forEach((line) => {
    if (line == "") return;
    if (/\w{3} = \(\w{3}, \w{3}\)/g.test(line)) {
      const letters = extractRegexArray(line, /\w{3}/g);
      map.set(letters[0], {
        left: letters[1],
        right: letters[2],
      });
      if (/\w{2}A/g.test(letters[0])) curr.push(letters[0]);
    } else {
      sequence = line.split("");
    }
  });

  const cycles = [];

  for (let i = 0; i < curr.length; i++) {
    let sequenceI = 0;
    let loopCount = 0;
    let complete = false;
    while (!complete) {
      const paths = map.get(curr[i]);
      const dir = sequence[sequenceI % sequence.length];

      if (dir == "L") curr[i] = paths.left;
      else if (dir == "R") curr[i] = paths.right;
      if (/\w{2}Z/g.test(curr[i])) complete = true;

      loopCount++;
      sequenceI++;
    }
    cycles.push(loopCount);
  }

  return lcm(...cycles);
};

run({
  part1: {
    tests: [
      {
        input: `RL\n\nAAA = (BBB, CCC)\nBBB = (DDD, EEE)\nCCC = (ZZZ, GGG)\nDDD = (DDD, DDD)\nEEE = (EEE, EEE)\nGGG = (GGG, GGG)\nZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR\n\nAAA = (BBB, BBB)\nBBB = (AAA, ZZZ)\nZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR\n\n11A = (11B, XXX)\n11B = (XXX, 11Z)\n11Z = (11B, XXX)\n22A = (22B, XXX)\n22B = (22C, 22C)\n22C = (22Z, 22Z)\n22Z = (22B, 22B)\nXXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
