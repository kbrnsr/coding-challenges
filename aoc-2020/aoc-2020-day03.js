const testData = [
  ['.', '.', '#', '#', '.', '.', '.', '.', '.', '.', '.'],
  ['#', '.', '.', '.', '#', '.', '.', '.', '#', '.', '.'],
  ['.', '#', '.', '.', '.', '.', '#', '.', '.', '#', '.'],
  ['.', '.', '#', '.', '#', '.', '.', '.', '#', '.', '#'],
  ['.', '#', '.', '.', '.', '#', '#', '.', '.', '#', '.'],
  ['.', '.', '#', '.', '#', '#', '.', '.', '.', '.', '.'],
  ['.', '#', '.', '#', '.', '#', '.', '.', '.', '.', '#'],
  ['.', '#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
  ['#', '.', '#', '#', '.', '.', '.', '#', '.', '.', '.'],
  ['#', '.', '.', '.', '#', '#', '.', '.', '.', '.', '#'],
  ['.', '#', '.', '.', '#', '.', '.', '.', '#', '.', '#']
]

const isAtree = markerCharacter => markerCharacter === '#';

const translateXtoJ = (x, mapX) => {
  // If x is 13 and mapX 11
  // return 2
  return x % mapX;
}

const traverseMapAndCount = (startJ, startI, maxJ, maxI, slopeJ, slopeI, pattern) => {
  let countSquares = 0;
  let countTrees = 0;
  let locationJ = startJ;
  let locationI = startI;
  let notOutOfBounds = true;

  while (notOutOfBounds) {
    const marker = pattern[locationI][translateXtoJ(locationJ, maxJ)];
    if (isAtree(marker)) {
      countTrees += 1;
    } else {
      countSquares += 1;
    }

    // Jump to next coordinate
    locationJ += slopeJ;
    locationI += slopeI;

    // If we're out of bounds
    if (locationI >= maxI) {
      notOutOfBounds = false;
    }
  }
  return [countSquares, countTrees];
}

const solveDay03Part1 = (startLocation, slope, pattern) => {
  const patternX = pattern[0].length;
  const patternY = pattern.length;
  let locationX = (startLocation[0] - 1);
  let locationY = (startLocation[1] - 1);

  return traverseMapAndCount(
    locationX, locationY, patternX, patternY, slope[0], slope[1], pattern
  );
}

const solveDay03Part2 = (pattern) => {
  const slopes = [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]];
  let result = 1;
  slopes.forEach(slope => {
    const counts = solveDay03Part1([1, 1], slope, pattern);
    result *= counts[1];
  });
  return result
}

/*
import { readFileAndReturnArrayOfCharacterArrays } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfCharacterArrays('./aoc-2020-day03.txt');

console.log('Encountered [squares, trees]', solveDay03Part1([1, 1], [3, 1], data));
console.log('Trees in every slope multipled together', solveDay03Part2(data));
 */

/**
 * $ node ./aoc-2020-day03.js
 * Encountered [squares, trees] [ 37, 286 ]
 * Trees in every slope multipled together 3638606400
 */

console.log('Encountered [squares, trees]', solveDay03Part1([1, 1], [3, 1], testData));
console.log('Trees in every slope multipled together', solveDay03Part2(testData));

/**
 * $ node ./aoc-2020-day03.js
 * Encountered [squares, trees] [ 4, 7 ]
 * Trees in every slope multipled together 336
 */
