import run from "aocrunner";
import { transpose } from "../utils/array.js";
import { abs, re } from "mathjs";

const parseInput = (rawInput) => rawInput.split("\n").map((x) => x.split(""));

function calcDistances(input, emptyMultiplier) {
  let galaxy = [];
  let emptyYs = [];
  let emptyXs = [];

  let galaxyCount = 0;
  input.forEach((line, i) => {
    line.forEach((char, j) => {
      if (char === "#") input[i][j] = galaxyCount++;
    });
  });

  for (let y = 0; y < input.length; y++) {
    const row = input[y];
    galaxy.push(row);
    if (
      row.every((val) => {
        return val === ".";
      })
    ) {
      emptyYs.push(y);
    }
  }

  const galaxyTp = transpose(galaxy);
  galaxy = [];

  for (let x = 0; x < galaxyTp.length; x++) {
    const col = galaxyTp[x];
    galaxy.push(col);
    if (col.every((val) => val === ".")) {
      emptyXs.push(x);
    }
  }

  galaxy = transpose(galaxy);

  const coordinates = [];

  for (let y = 0; y < galaxy.length; y++) {
    for (let x = 0; x < galaxy[y].length; x++) {
      if (/\d+/g.test(galaxy[y][x])) {
        coordinates.push([x, y]);
      }
    }
  }

  let sum = 0;

  for (let i = 0; i < coordinates.length; i++) {
    const coords1 = coordinates[i];

    for (let j = i + 1; j < coordinates.length; j++) {
      const coords2 = coordinates[j];

      const filteredEmptyX = emptyXs.filter(
        (val) =>
          (coordinates[i][0] < val && val < coordinates[j][0]) ||
          (coordinates[i][0] > val && val > coordinates[j][0]),
      );
      const filteredEmptyY = emptyYs.filter(
        (val) =>
          (coordinates[i][1] < val && val < coordinates[j][1]) ||
          (coordinates[i][1] > val && val > coordinates[j][1]),
      );

      const emptiesX =
        filteredEmptyX.length * emptyMultiplier - filteredEmptyX.length;
      const emptiesY =
        filteredEmptyY.length * emptyMultiplier - filteredEmptyY.length;

      const spaceX = emptiesX > 0 ? emptiesX : 0;
      const spaceY = emptiesY > 0 ? emptiesY : 0;

      const deltaX = abs(coords1[0] - coords2[0]) + spaceX;
      const deltaY = abs(coords1[1] - coords2[1]) + spaceY;

      sum += deltaX + deltaY;
    }
  }
  return sum;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return calcDistances(input, 2);

  // let galaxy = [];

  // let galaxyCount = 0;
  // input.forEach((line, i) => {
  //   line.forEach((char, j) => {
  //     if (char === "#") input[i][j] = galaxyCount++;
  //   });
  // });

  // for (let y = 0; y < input.length; y++) {
  //   const row = input[y];
  //   galaxy.push(row);
  //   if (
  //     row.every((val) => {
  //       return val === ".";
  //     })
  //   ) {
  //     galaxy.push(row);
  //   }
  // }

  // const galaxyTp = transpose(galaxy);
  // galaxy = [];

  // for (let x = 0; x < galaxyTp.length; x++) {
  //   const col = galaxyTp[x];
  //   galaxy.push(col);
  //   if (col.every((val) => val === ".")) {
  //     galaxy.push(col);
  //   }
  // }

  // galaxy = transpose(galaxy);

  // const coordinates = [];

  // for (let y = 0; y < galaxy.length; y++) {
  //   for (let x = 0; x < galaxy[y].length; x++) {
  //     if (/\d+/g.test(galaxy[y][x])) {
  //       coordinates.push([x, y]);
  //     }
  //   }
  // }

  // let sum = 0;

  // for (let i = 0; i < coordinates.length; i++) {
  //   const coords1 = coordinates[i];

  //   for (let j = i + 1; j < coordinates.length; j++) {
  //     const coords2 = coordinates[j];
  //     const deltaX = abs(coords1[0] - coords2[0]);
  //     const deltaY = abs(coords1[1] - coords2[1]);
  //     sum += deltaX + deltaY;
  //   }
  // }

  // return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  // let galaxy = [];
  // let emptyYs = [];
  // let emptyXs = [];

  // let galaxyCount = 0;
  // input.forEach((line, i) => {
  //   line.forEach((char, j) => {
  //     if (char === "#") input[i][j] = galaxyCount++;
  //   });
  // });

  // for (let y = 0; y < input.length; y++) {
  //   const row = input[y];
  //   galaxy.push(row);
  //   if (
  //     row.every((val) => {
  //       return val === ".";
  //     })
  //   ) {
  //     emptyYs.push(y);
  //   }
  // }

  // const galaxyTp = transpose(galaxy);
  // galaxy = [];

  // for (let x = 0; x < galaxyTp.length; x++) {
  //   const col = galaxyTp[x];
  //   galaxy.push(col);
  //   if (col.every((val) => val === ".")) {
  //     emptyXs.push(x);
  //   }
  // }

  // galaxy = transpose(galaxy);

  // const coordinates = [];

  // for (let y = 0; y < galaxy.length; y++) {
  //   for (let x = 0; x < galaxy[y].length; x++) {
  //     if (/\d+/g.test(galaxy[y][x])) {
  //       coordinates.push([x, y]);
  //     }
  //   }
  // }

  // let sum = 0;

  // for (let i = 0; i < coordinates.length; i++) {
  //   const coords1 = coordinates[i];

  //   for (let j = i + 1; j < coordinates.length; j++) {
  //     const coords2 = coordinates[j];

  //     const filteredEmptyX = emptyXs.filter(
  //       (val) =>
  //         (coordinates[i][0] < val && val < coordinates[j][0]) ||
  //         (coordinates[i][0] > val && val > coordinates[j][0]),
  //     );
  //     const filteredEmptyY = emptyYs.filter(
  //       (val) =>
  //         (coordinates[i][1] < val && val < coordinates[j][1]) ||
  //         (coordinates[i][1] > val && val > coordinates[j][1]),
  //     );

  //     const emptiesX = filteredEmptyX.length * 2 - filteredEmptyX.length;
  //     const emptiesY = filteredEmptyY.length * 2 - filteredEmptyY.length;

  //     const spaceX = emptiesX > 0 ? emptiesX : 0;
  //     const spaceY = emptiesY > 0 ? emptiesY : 0;

  //     const deltaX = abs(coords1[0] - coords2[0]) + spaceX;
  //     const deltaY = abs(coords1[1] - coords2[1]) + spaceY;

  //     sum += deltaX + deltaY;
  //   }
  // }

  // return sum;
  return calcDistances(input, 1000000);
};

run({
  part1: {
    tests: [
      {
        input: `...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....`,
        expected: 374,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `...#......\n.......#..\n#.........\n..........\n......#...\n.#........\n.........#\n..........\n.......#..\n#...#.....`,
        expected: 1030,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
