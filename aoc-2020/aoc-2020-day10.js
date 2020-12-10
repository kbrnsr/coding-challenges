const testData1 = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4,];
const testData2 = [28, 33, 18, 42, 31, 14, 46, 20,
  48, 47, 24, 23, 49, 45, 19, 38, 39, 11, 1, 32, 25,
  35, 8, 17, 7, 9, 4, 2, 34, 10, 3]

const countValEqualsInArray = (val, arr) => {
  return arr.reduce((acc, curr) => (
    curr === val ? acc + 1 : acc), 0);
};

const solveDay10Part1 = (data) => {
  const joltages = [...data].sort((a, b) => {
    return a - b;
  });
  joltages.push(joltages.slice(-1)[0] + 3);
  const diffs = joltages.map((joltage, i, arr) => {
    if (i === 0) { return joltage; }
    else { return joltage - arr[i - 1]; }
  });
  const diff1s = countValEqualsInArray(1, diffs);
  const diff3s = countValEqualsInArray(3, diffs);
  return diff1s * diff3s;
};

/* 
import { readFileAndReturnArrayOfIntegers } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfIntegers('./aoc-2020-day10.txt');
console.log(solveDay10Part1(data));
 */

/**
 * $ node aoc-2020-day10.js
 * 2760
 */

console.log(solveDay10Part1(testData1));
console.log(solveDay10Part1(testData2));

/**
 * $ node aoc-2020-day10.js
 * 35
 * 220
 */
