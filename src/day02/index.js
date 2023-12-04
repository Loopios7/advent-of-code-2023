import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let idSum = 0;

  for (let i = 0; i < input.length; i++) {
    const cubes = input[i].split(/: |, |; /g);
    let gameId = 0;
    let possible = true;

    cubes.forEach((cube) => {
      if (cube.startsWith("Game "))
        return (gameId = Number(cube.split(" ")[1]));

      const c = cube.split(" ");
      c[0] = Number(c[0]);

      if (
        (c[1] == "red" && c[0] > 12) ||
        (c[1] == "green" && c[0] > 13) ||
        (c[1] == "blue" && c[0] > 14)
      )
        possible = false;
    });

    if (possible) idSum += gameId;
  }

  return idSum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let powerSum = 0;

  for (let i = 0; i < input.length; i++) {
    const cubes = input[i].split(/: |, |; /g);

    let red = 0;
    let green = 0;
    let blue = 0;

    cubes.forEach((cube) => {
      if (cube.startsWith("Game ")) return;

      const c = cube.split(" ");
      c[0] = Number(c[0]);

      if (c[1] == "red" && c[0] > red) red = c[0];
      if (c[1] == "green" && c[0] > green) green = c[0];
      if (c[1] == "blue" && c[0] > blue) blue = c[0];
    });

    powerSum += red * green * blue;
  }

  return powerSum;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green\nGame 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue\nGame 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red\nGame 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red\nGame 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
