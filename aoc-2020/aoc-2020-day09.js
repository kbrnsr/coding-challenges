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

const solveDay09Part1 = (window, data) => {
  return validateData(window, data);
};

/* 
import { readFileAndReturnArrayOfIntegers } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfIntegers('./aoc-2020-day09.txt');
console.log('Invalid value found', solveDay09Part1(25, data));
 */

/**
 * $ node ./aoc-2020-day09.js
 * Invalid value found 507622668
 */

console.log('Invalid value found', solveDay09Part1(5, testData));

/**
 * $ node ./aoc-2020-day09.js
 * Invalid value found 127
 */
