import run from "aocrunner";
import { extractNumberArray, extractRegexArray } from "../utils/regex.js";
import { createNumberArray } from "../utils/array.js";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const seeds = [];
  const maps = new Map();
  let currentMap = "";
  let minLoc;

  input.forEach((line) => {
    if (line == "") return;

    if (line.includes("seeds:")) {
      seeds.push(...extractNumberArray(line));
      return;
    }

    const mapName = extractRegexArray(line, /^[a-z-]+/g)[0];

    if (mapName) {
      maps.set(mapName, []);
      currentMap = mapName;
    } else {
      const map = maps.get(currentMap);
      const nums = extractNumberArray(line);

      map.push(nums);
    }
  });

  seeds.forEach((seed) => {
    maps.forEach((assignment) => {
      let done = false;

      assignment.forEach((ass) => {
        if (done) return;
        const [destination, source, range] = ass;
        if (seed >= source && seed <= source + range - 1) {
          seed = destination + (seed - source);
          done = true;
        }
      });
    });

    if (!minLoc || minLoc > seed) minLoc = seed;
  });

  return minLoc;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `seeds: 79 14 55 13\n\nseed-to-soil map:\n50 98 2\n52 50 48\n\nsoil-to-fertilizer map:\n0 15 37\n37 52 2\n39 0 15\n\nfertilizer-to-water map:\n49 53 8\n0 11 42\n42 0 7\n57 7 4\n\nwater-to-light map:\n88 18 7\n18 25 70\n\nlight-to-temperature map:\n45 77 23\n81 45 19\n68 64 13\n\ntemperature-to-humidity map:\n0 69 1\n1 0 69\n\nhumidity-to-location map:\n60 56 37\n56 93 4`,
        expected: 35,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
