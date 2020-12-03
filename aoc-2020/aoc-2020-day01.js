const testData = [
  1721,
  979,
  366,
  299,
  675,
  1456
]

const tupleOfTwoNumbersIfSumMatches = (a, integerToBeMatched) => {
  const sumOfTwoNumbers = (a, b) => (a + b);
  let i;
  for (i = 0; i < a.length; i++) {
    let j;
    for (j = 0; j < a.length; j++) {
      const firstNumber = a[i];
      const secondNumber = a[j];
      if (sumOfTwoNumbers(firstNumber
        , secondNumber) === integerToBeMatched) {
        return [firstNumber, secondNumber];
      }
    }
  }
  return [];
}

const tupleOfThreeNumbersIfSumMatches = (a, integerToBeMatched) => {
  const sumOfThreeNumbers = (a, b, c) => (a + b + c);
  let i;
  for (i = 0; i < a.length; i++) {
    let j;
    for (j = 0; j < a.length; j++) {
      let k;
      for (k = 0; k < a.length; k++) {
        const firstNumber = a[i];
        const secondNumber = a[j];
        const thirdNumber = a[k];
        if (sumOfThreeNumbers(firstNumber
          , secondNumber
          , thirdNumber) === integerToBeMatched) {
          return [firstNumber, secondNumber, thirdNumber];
        }
      }
    }
  }
  return [];
}

const solveDay01Part1 = (data, sum) => {
  const result = tupleOfTwoNumbersIfSumMatches(data, sum);
  return [result, (result[0] * result[1])];
}

const solveDay01Part2 = (data, sum) => {
  const result = tupleOfThreeNumbersIfSumMatches(data, sum);
  return [result, (result[0] * result[1] * result[2])];
}

import { readFileAndReturnArrayOfIntegers } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfIntegers('./aoc-2020-day01.txt');

console.log('Two numbers with sum 2020 gives product'
  , solveDay01Part1(data, 2020));
console.log('Three numbers with sum 2020 gives product'
  , solveDay01Part2(data, 2020));

/**
 * $ node ./aoc-2020-day01.js
 * Two numbers with sum 2020 gives product [ [ 1263, 757 ], 956091 ]
 * Three numbers with sum 2020 gives product [ [ 211, 241, 1568 ], 79734368 ]
 */

console.log('Two numbers with sum 2020 gives product'
  , solveDay01Part1(testData, 2020));
console.log('Three numbers with sum 2020 gives product'
  , solveDay01Part2(testData, 2020));

/**
 * $ node ./aoc-2020-day01.js
 * Two numbers with sum 2020 gives product [ [ 1721, 299 ], 514579 ]
 * Three numbers with sum 2020 gives product [ [ 979, 366, 675 ], 241861950 ]
 */
