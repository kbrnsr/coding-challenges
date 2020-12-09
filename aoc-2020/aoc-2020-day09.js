const testData = [35, 20, 15, 25, 47, 40, 62, 55
  , 65, 95, 102, 117, 150, 182, 127, 219, 299, 277
  , 309, 576];

const slidingWindow = (data) => {
  const validSums = [];
  const validTuples = [];
  data.map((first, i) => {
    validSums.push([]); validTuples.push([]);
    data.map((second) => {
      if (first != second) {
        validSums[i].push(first + second);
        validTuples[i].push([first, second]);
      }
    })
  });
  const slide = (value) => {
    const isInContainer = validSums
      .reduce((acc, c) => {
        return c.includes(value) || acc;
      }, false);
    if (!isInContainer) {
      return false;
    }
    // Calculate and insert
    data.shift(); validSums.shift(); validTuples.shift();
    data.push(value); validSums.push([]); validTuples.push([]);
    data.map(first => {
      const cIndex = data.length - 1;
      if (value != first) {
        validSums[cIndex].push(value + first);
        validTuples[cIndex].push([value, first]);
      }
    });
    return true;
  };
  return {
    slide
  };
};

const slidingRange = (range, data) => {
  let rStart = 0;
  let rEnd = range;
  let sum = data.slice(rStart, rEnd)
    .reduce((acc, val) => acc + val, 0);
  const findSum = (value) => {
    while (rEnd < data.length) {
      if (sum === value) {
        return [true, [rStart, rEnd, sum]];
      }
      sum -= data[rStart]; sum += data[rEnd];
      rStart += 1; rEnd += 1;
    }
    return [false, [0, 0, 0]];
  };
  return {
    findSum
  };
};

const validateData = (window, data) => {
  const xmas = slidingWindow(data.slice(0, window));
  let contExec = true;
  let invalid;
  data.slice(window).map((val) => {
    if (contExec) {
      const xmasBool = xmas.slide(val);
      if (!xmasBool) {
        contExec = false;
        invalid = val;
      }
    }
  });
  return invalid;
};

const findRange = (sum, data) => {
  let range = 2;
  while (range <= data.length) {
    const xmas = slidingRange(range, data);
    const [rangeBool, rangeRange] = xmas.findSum(sum);
    if (rangeBool) {
      return [rangeRange];
    }
    range += 1;
  }
};

const solveDay09Part1 = (window, data) => {
  return validateData(window, data);
};

const solveDay09Part2 = (sum, data) => {
  const [rangeRange] = findRange(sum, data);
  const [rangeStart, rangeEnd,] = rangeRange;
  const rangeArray = [...data.slice(rangeStart, rangeEnd)];
  rangeArray.sort((a, b) => a - b);
  const [low, high] = [rangeArray[0]
    , rangeArray[rangeArray.length - 1]];
  return low + high;
};

/* 
import { readFileAndReturnArrayOfIntegers } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfIntegers('./aoc-2020-day09.txt');

const inputInvalid = solveDay09Part1(25, data);
console.log('Invalid value found', inputInvalid);
console.log('Encryption weakness'
  , solveDay09Part2(inputInvalid, data));
 */

/**
 * $ node ./aoc-2020-day09.js
 * Invalid value found 507622668
 * Encryption weakness 76688505
 */

const testInvalid = solveDay09Part1(5, testData)
console.log('Invalid value found', testInvalid);
console.log('Encryption weakness'
  , solveDay09Part2(testInvalid, testData));

/**
 * $ node ./aoc-2020-day09.js
 * Invalid value found 127
 * Encryption weakness 62
 */
