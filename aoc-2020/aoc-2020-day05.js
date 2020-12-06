const testData = [
  ['B', 'F', 'F', 'F', 'B', 'B', 'F', 'R', 'R', 'R'],
  ['F', 'F', 'F', 'B', 'B', 'B', 'F', 'R', 'R', 'R'],
  ['B', 'B', 'F', 'F', 'B', 'B', 'F', 'R', 'L', 'L']
];

// lower/upper can also be seen as left/right
const calculateBinaryTraverse = (left, right, minimum, maximum, data) => {
  let calculated = maximum;

  let lower = minimum;
  let upper = maximum;

  let i;
  for (i = 0; i < data.length; i++) {
    const currentVal = data[i];
    const mid = ((upper - lower) / 2);
    if (currentVal === left) {
      upper = Math.floor(upper - mid);
      calculated = lower;
    } else if (currentVal === right) {
      lower = Math.ceil(lower + mid);
      calculated = upper;
    }
  }
  return calculated;
};

const rowColumnFrom = (bPass) => {
  const row = calculateBinaryTraverse('F', 'B', 0, 127, bPass.slice(0, 7));
  const column = calculateBinaryTraverse('L', 'R', 0, 7, bPass.slice(7))
  return [row, column];
};

const rowColumnSeatIdFrom = (bPass) => {
  const [row, column] = rowColumnFrom(bPass)
  const seat = (row * 8) + column
  return [row, column, seat];
};

const insertSorted = (val, c) => {
  const cLength = c.length;
  if (cLength === 0) {
    c[0] = val;
    return val;
  } else {
    let i;
    for (i = 0; i < cLength; i += 1) {
      if (c[i].seat > val.seat) {
        c.splice(i, 0, val);
        return val;
      }
    }
    c.push(val);
    return val;
  }
}

const solveDay05Part1 = (boardingData) => {
  const sortedBySeatId = [];
  boardingData.map((boardingPass) => {
    const [row, column, seat]
      = rowColumnSeatIdFrom(boardingPass);
    insertSorted({
      row, column, seat, bPass: boardingPass.join('')
    }, sortedBySeatId);
    return [row, column, seat];
  })
  return sortedBySeatId;
};

const solveDay05Part2 = (sortedSeats) => {
  let i;
  for (i = 1; i < sortedSeats.length; i += 1) {
    const prevSeat = sortedSeats[i - 1].seat;
    const currentSeat = sortedSeats[i].seat;

    if ((currentSeat - prevSeat) == 2) {
      return prevSeat + 1;
    }
  }
  return undefined;
}

/* 
import { readFileAndReturnArrayOfCharacterArrays }
  from './aoc-2020-api.mjs';

const data =
  readFileAndReturnArrayOfCharacterArrays('./aoc-2020-day05.txt');

const fileSeats = solveDay05Part1(data)
console.log("Max seat ID", fileSeats[fileSeats.length - 1]);
console.log("Missing seat ID", solveDay05Part2(fileSeats));
 */

/**
 * $ node ./aoc-2020-day05.js
 * Max seat ID { row: 124, column: 6, seat: 998, bPass: 'BBBBBFFRRL' }
 * Missing seat ID 676
 */

const testSeats = solveDay05Part1(testData)
console.log("Max seat ID", testSeats[testSeats.length - 1]);

/**
 * $ node ./aoc-2020-day05.js
 * Max seat ID { row: 102, column: 4, seat: 820, bPass: 'BBFFBBFRLL' }
 */
