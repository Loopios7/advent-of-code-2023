import _ from "lodash";

export function createNumberArray(length, offset = 0) {
  console.log("createNumberArray()", "length:", length, "offset:", offset);
  return Array.from(Array(length), (_, i) => i + offset);
}

export function getAllIndexes(arr, val) {
  var indexes = [],
    i = -1;
  while ((i = arr.indexOf(val, i + 1)) != -1) {
    indexes.push(i);
  }
  return indexes;
}

export function transpose(arr) {
  return _.unzip(arr);
}
