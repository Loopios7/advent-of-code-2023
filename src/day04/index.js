import run from "aocrunner";
import _ from "lodash";

const parseInput = (rawInput) => rawInput.split("\n");

function getIntersectingCards(line) {
  const bits = line.split(/:|\|/gm);
  const sideA = [];
  const sideB = [];

  let match;
  let re = /\d+/g;
  while ((match = re.exec(bits[1])) != null) {
    sideA.push(Number(match[0]));
  }
  while ((match = re.exec(bits[2])) != null) {
    sideB.push(Number(match[0]));
  }

  const intersection = _.intersection(sideA, sideB);
  return intersection;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;

  for (let lineI = 0; lineI < input.length; lineI++) {
    const line = input[lineI];
    sum += Math.floor(2 ** (getIntersectingCards(line).length - 1));
  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let count = 0;

  const cardsMap = new Map(
    input.map((x) => {
      return [
        Number(x.split(":")[0].replace("Card ", "")),
        getIntersectingCards(x).length,
      ];
    }),
  );

  const cardStack = input.map((x) => {
    return Number(x.split(":")[0].replace("Card ", ""));
  });

  while (cardStack.length > 0) {
    count++;
    const card = cardStack.pop();

    for (let i = 1; i <= cardsMap.get(card); i++) {
      cardStack.push(card + i);
    }
  }

  return count;
};

run({
  part1: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53\nCard 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19\nCard 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1\nCard 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83\nCard 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36\nCard 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
        expected: 30,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
