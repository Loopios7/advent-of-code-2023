import run from "aocrunner";
import { getAllIndexes } from "../utils/array.js";

const parseInput = (rawInput) => rawInput.split("\n");

function extractCardVals(str) {
  return str.split("").map((x) => {
    if (x === "T") return 10;
    if (x === "J") return 11;
    if (x === "Q") return 12;
    if (x === "K") return 13;
    if (x === "A") return 14;
    return Number(x);
  });
}

function extractCardValsJoker(str) {
  return str.split("").map((x) => {
    if (x === "J") return 1;
    if (x === "T") return 10;
    if (x === "Q") return 11;
    if (x === "K") return 12;
    if (x === "A") return 13;
    return Number(x);
  });
}

function getCardCounts(cards) {
  const cardCount = Array(13).fill(0);

  cards.forEach((card) => cardCount[card - 2]++);

  const numCards = new Map([
    [1, getAllIndexes(cardCount, 1).map((x) => x + 2)],
    [2, getAllIndexes(cardCount, 2).map((x) => x + 2)],
    [3, getAllIndexes(cardCount, 3).map((x) => x + 2)],
    [4, getAllIndexes(cardCount, 4).map((x) => x + 2)],
    [5, getAllIndexes(cardCount, 5).map((x) => x + 2)],
  ]);

  return numCards;
}

function getCardCountsJoker(cards) {
  const cardCount = Array(13).fill(0);

  cards.forEach((card) => cardCount[card - 1]++);

  const numCards = new Map([
    [1, getAllIndexes(cardCount, 1).map((x) => x + 1)],
    [2, getAllIndexes(cardCount, 2).map((x) => x + 1)],
    [3, getAllIndexes(cardCount, 3).map((x) => x + 1)],
    [4, getAllIndexes(cardCount, 4).map((x) => x + 1)],
    [5, getAllIndexes(cardCount, 5).map((x) => x + 1)],
  ]);

  return numCards;
}

function calcCat(counts) {
  if (counts.get(5).length == 1) return 6;
  if (counts.get(4).length == 1) return 5;
  if (counts.get(3).length == 1 && counts.get(2).length == 1) return 4;
  if (counts.get(3).length == 1) return 3;
  if (counts.get(2).length == 2) return 2;
  if (counts.get(2).length == 1) return 1;
  return 0;
}

function calcCatJoker(counts) {
  let J = 0;

  counts.forEach((x, key) => {
    const iJ = x.indexOf(1);
    J += (iJ + 1) * key;
    if (iJ >= 0) {
      x.splice(iJ, 1);
    }
  });

  if (
    counts.get(5).length == 1 ||
    (counts.get(4).length == 1 && J == 1) ||
    (counts.get(3).length == 1 && J == 2) ||
    (counts.get(2).length == 1 && J == 3) ||
    (counts.get(1).length == 1 && J == 4) ||
    J == 5
  )
    return 6;
  if (
    counts.get(4).length == 1 ||
    (counts.get(3).length == 1 && J == 1) ||
    (counts.get(2).length == 1 && J == 2) ||
    (counts.get(1).length >= 1 && J == 3) ||
    J == 4
  )
    return 5;
  if (
    (counts.get(3).length == 1 && counts.get(2).length == 1) ||
    (counts.get(2).length == 2 && J == 1) ||
    (counts.get(3).length == 1 && J >= 1) ||
    (counts.get(2).length == 1 && J >= 2)
  )
    return 4;
  if (
    counts.get(3).length == 1 ||
    (counts.get(2).length == 1 && J >= 1) ||
    (counts.get(1).length >= 1 && J >= 2) ||
    J == 3
  )
    return 3;
  if (counts.get(2).length == 2 || (counts.get(2).length == 1 && J >= 1))
    return 2;
  if (counts.get(2).length == 1 || J >= 1) return 1;
  return 0;
}

function sortCard(a, b) {
  if (a.category > b.category) return 1;
  if (a.category < b.category) return -1;
  for (let i = 0; i < 5; i++) {
    if (a.cards[i] > b.cards[i]) return 1;
    if (a.cards[i] < b.cards[i]) return -1;
  }
  return 0;
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const hands = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i].split(" ");

    const bet = Number(line[1]);
    const cardVals = extractCardVals(line[0]);
    const cardCounts = getCardCounts(cardVals);
    const cat = calcCat(cardCounts); // 0 hc, 1 1p, 2 2p, 3 3s, 4 fh, 5 4s, 6 5s

    hands.push({ cards: cardVals, category: cat, bet: bet });
  }

  hands.sort(sortCard);

  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += (i + 1) * hands[i].bet;
  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const hands = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i].split(" ");

    const bet = Number(line[1]);
    const cardVals = extractCardValsJoker(line[0]);
    const cardCounts = getCardCountsJoker(cardVals);
    const cat = calcCatJoker(cardCounts); // 0 hc, 1 1p, 2 2p, 3 3s, 4 fh, 5 4s, 6 5s

    hands.push({ cards: cardVals, category: cat, bet: bet });
  }

  hands.sort(sortCard);

  let sum = 0;
  for (let i = 0; i < hands.length; i++) {
    sum += (i + 1) * hands[i].bet;
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`,
        expected: 6440,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `32T3K 765\nT55J5 684\nKK677 28\nKTJJT 220\nQQQJA 483`,
        expected: 5905,
      },
      // {
      //   input: `2J345 1\n22345 1\n2JJ34 1\n22234 1\n2JJJ3 1\n22223 1\nJ2JJJ 1\n2JJJJ 1\n22222 1`,
      //   expected: 0, // Joker test data for debugging
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
