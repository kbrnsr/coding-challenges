const testData = [35, 20, 15, 25, 47, 40, 62, 55
  , 65, 95, 102, 117, 150, 182, 127, 219, 299, 277
  , 309, 576];

const slidingWindow = (data) => {
  const validSums = [];
  /**
   * data = [1, 2, 3];
   * validSums = [[3, 4], [3, 5], [4, 5]]
   */
  data.map((first, i) => {
    validSums.push([]);
    data.map((second) => {
      if (first != second) {
        validSums[i].push(first + second);
      }
    })
  });

  const isValInValidSums = (val) => {
    return validSums.reduce((acc, sumArray) => {
      return sumArray.includes(val) || acc;
    }, false);
  }

  const calculateAndInsertValue = (val) => {
    data.shift(); validSums.shift();
    data.push(val); validSums.push([]);
    data.map(first => {
      const cIndex = data.length - 1;
      if (val != first) {
        validSums[cIndex].push(val + first);
      }
    });
  }

  const slide = (value) => {
    if (!isValInValidSums(value)) {
      return false;
    }
    calculateAndInsertValue(value)
    return true;
  };

  return {
    slide
  };
};

const slidingRange = (range, data) => {
  let rStart = 0;
  let rEnd = range;
  // sum = all values in range added together
  let sum = data.slice(rStart, rEnd)
    .reduce((acc, val) => acc + val
      , 0);

  const findSum = (value) => {
    while (rEnd < data.length) {
      if (sum === value) {
        return [true, [rStart, rEnd, sum]];
      }
      // Adjust sum and slide range by 1
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
  let invalidVal;
  data.slice(window).map((val) => {
    if (contExec) {
      const xmasBool = xmas.slide(val);
      if (!xmasBool) {
        contExec = false;
        invalidVal = val;
      }
    }
  });
  return invalidVal;
};

const findRange = (sum, data) => {
  let range = 2;
  // Generate ranges
  // , min = 2, max = length of data array
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
