export function createNumberArray(length, offset = 0) {
  console.log("createNumberArray()", "length:", length, "offset:", offset);
  return Array.from(Array(length), (_, i) => i + offset);
}
