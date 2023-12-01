import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

function calcSum(input) {
  let sum = 0;

  for (let i = 0; i < input.length; i++) {
    const lineChars = input[i].split("");

    let firstNum = -1;
    let lastNum = -1;

    for (let j = 0; j < lineChars.length; j++) {
      const char = lineChars[j];
      const num = Number(char);

      if (!isNaN(num)) {
        if (firstNum === -1) firstNum = num;
        lastNum = num;
      }
    }

    sum += Number(`${firstNum}${lastNum}`);
  }

  return sum;
}

function convertStringNums(str) {
  const re = /(?=([0-9]|one|two|three|four|five|six|seven|eight|nine))/g;
  var m,
    res = [];

  while ((m = re.exec(str))) {
    if (m.index === re.lastIndex) {
      re.lastIndex++;
    }
    res.push(
      m[1]
        .replaceAll("one", 1)
        .replaceAll("two", 2)
        .replaceAll("three", 3)
        .replaceAll("four", 4)
        .replaceAll("five", 5)
        .replaceAll("six", 6)
        .replaceAll("seven", 7)
        .replaceAll("eight", 8)
        .replaceAll("nine", 9),
    );
  }

  return res.join("");
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return calcSum(input);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  for (let i = 0; i < input.length; i++) {
    input[i] = convertStringNums(input[i]);
  }

  return calcSum(input);
};

run({
  part1: {
    tests: [
      {
        input: `1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet`,
        expected: 142,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1abc2\npqr3stu8vwx\na1b2c3d4e5f\ntreb7uchet`,
        expected: 142,
      },
      {
        input: `two1nine\neightwothree\nabcone2threexyz\nxtwone3four\n4nineeightseven2\nzoneight234\n7pqrstsixteen`,
        expected: 281,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
