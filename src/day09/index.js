import run from "aocrunner";
import { extractNumberArray } from "../utils/regex.js";

const parseInput = (rawInput) => rawInput.split("\n");

function calculatePrediction(report) {
  const diffSteps = [report];
  let done = false;

  while (!done) {
    const lastDiff = diffSteps[diffSteps.length - 1];
    const newDiff = calculateDiffArray(lastDiff);
    diffSteps.push(newDiff);
    done = newDiff.every((val, i, arr) => val === arr[0]);
  }

  for (let i = diffSteps.length - 1; i >= 0; i--) {
    if (i == diffSteps.length - 1) {
      diffSteps[i].push(diffSteps[i][0]);
    } else {
      diffSteps[i].push(
        diffSteps[i][diffSteps[i].length - 1] +
          diffSteps[i + 1][diffSteps[i + 1].length - 1],
      );
    }
  }
  const prediction = diffSteps[0][diffSteps[0].length - 1];
  return prediction;
}

function calculateDiffArray(nums) {
  const diffs = [];

  for (let i = 0; i < nums.length - 1; i++) {
    diffs.push(nums[i + 1] - nums[i]);
  }

  return diffs;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const reports = input.map((x) => extractNumberArray(x));

  let predictionSum = 0;

  reports.forEach((report) => {
    predictionSum += calculatePrediction(report);
  });

  return predictionSum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const reports = input.map((x) => extractNumberArray(x));

  let predictionSum = 0;

  reports.forEach((report) => {
    predictionSum += calculatePrediction(report.reverse());
  });

  return predictionSum;
};

run({
  part1: {
    tests: [
      {
        input: `0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45`,
        expected: 114,
      },
      {
        input: `0 -3 -6 -9 -12 -15\n1 3 6 10 15 21\n10 13 16 21 30 45`,
        expected: 78,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0 3 6 9 12 15\n1 3 6 10 15 21\n10 13 16 21 30 45`,
        expected: 2,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
