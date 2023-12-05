export function extractNumberArray(str) {
  const re = /\d+/g;
  let match;
  const numbers = [];

  while ((match = re.exec(str)) != null) {
    numbers.push(Number(match[0]));
  }
  return numbers;
}

export function extractRegexArray(str, re) {
  let match;
  const matches = [];

  while ((match = re.exec(str)) != null) {
    matches.push(match[0]);
  }
  return matches;
}
