import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  const numbers = [];
  const symbolPosArr = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let match;
    let re = /\d+/g;
    while ((match = re.exec(line)) != null) {
      numbers.push({ num: Number(match[0]), index: match.index, line: i });
    }

    re = /[^\d.]/g;
    while ((match = re.exec(line)) != null) {
      symbolPosArr.push(`${match.index}.${i}`);
    }
  }

  numbers.forEach((n) => {
    n.touching = false;

    for (let indexC = -1; indexC < `${n.num}`.length + 1; indexC++) {
      for (let lineC = -1; lineC < 2; lineC++) {
        const pos = `${n.index + indexC}.${n.line + lineC}`;
        if (symbolPosArr.includes(pos)) {
          n.touching = true;
        }
      }
    }

    if (n.touching) sum += n.num;
  });

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;
  const numbers = [];
  const symbols = new Map();
  const symbolPosArr = [];

  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let match;
    let re = /\d+/g;
    while ((match = re.exec(line)) != null) {
      numbers.push({ num: Number(match[0]), index: match.index, line: i });
    }

    re = /[^\d.]/g;
    while ((match = re.exec(line)) != null) {
      symbols.set(`${match.index}.${i}`, {
        sym: match[0],
        index: match.index,
        line: i,
        nums: [],
      });
      symbolPosArr.push(`${match.index}.${i}`);
    }
  }

  numbers.forEach((n) => {
    for (let indexC = -1; indexC < `${n.num}`.length + 1; indexC++) {
      for (let lineC = -1; lineC < 2; lineC++) {
        const pos = `${n.index + indexC}.${n.line + lineC}`;
        if (symbolPosArr.includes(pos)) {
          symbols.get(pos).nums.push(n.num);
        }
      }
    }
  });

  symbols.forEach((symbol) => {
    if (symbol.sym == "*" && symbol.nums.length == 2) {
      sum += symbol.nums[0] * symbol.nums[1];
    }
  });

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `467..114..\n...*......\n..35..633.\n......#...\n617*......\n.....+.58.\n..592.....\n......755.\n...$.*....\n.664.598..`,
        expected: 467835,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
