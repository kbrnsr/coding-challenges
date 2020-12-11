const testData = [
  ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
  ['L', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
  ['L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.'],
  ['L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
  ['L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L'],
  ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L'],
  ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
  ['L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L'],
  ['L', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
  ['L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L']
]

const SeatingSystem = (seats) => {
  const FLOOR = '.', EMPTY = 'L', OCCUPIED = '#';
  const dimension = seats.length;

  const sliceStart = (val) => {
    return (val === 0) ? val : val - 1;
  };

  const sliceEnd = (val) => {
    return (val === dimension - 1) ? val + 1 : val + 2;
  };

  const seatSlice = (i, j) => {
    return seats.slice(sliceStart(i), sliceEnd(i))
      .map(row => (row.slice(sliceStart(j), sliceEnd(j))));
  }

  const countEmptyOccupied = (a) => (a
    .reduce(([rowEmpty, rowOccupied], rowCurr) => {
      const [colEmpty, colOccupied] = rowCurr
        .reduce(([colE, colO], val) => {
          if (val === EMPTY) { return [colE + 1, colO]; }
          if (val === OCCUPIED) { return [colE, colO + 1] };
          return [colE, colO];
        }, [0, 0])
      return [rowEmpty + colEmpty, rowOccupied + colOccupied];
    }, [0, 0]));

  const countSliceEmptyOccupied = (i, j) => {
    const emptyChair = (seats[i][j] === EMPTY) ? 1 : 0;
    const occupiedChair = (seats[i][j] === OCCUPIED) ? 1 : 0;
    const seatsAdjacent = seatSlice(i, j);
    const [empties, occupies] = countEmptyOccupied(seatsAdjacent);
    return [empties - emptyChair, occupies - occupiedChair];
  };

  const changeSeat = (i, j) => {
    const seat = seats[i][j];
    if (seat === FLOOR) { return FLOOR; };
    const [emptyCount, occupiedCount] = countSliceEmptyOccupied(i, j);
    if (seat === EMPTY) {
      if (occupiedCount === 0) { return OCCUPIED; }
      return seat;
    }
    if (seat === OCCUPIED) {
      if (occupiedCount >= 4) { return EMPTY; }
      return seat;
    }
    return seat
  };

  return {
    changeSeat,
    countEmptyOccupied
  };
};

const playRound = (seats) => {
  const ss = SeatingSystem(seats);
  let changed = 0;
  const newSeats = seats.map((row, i) => {
    return row.map((val, j) => {
      const newVal = ss.changeSeat(i, j);
      if (val !== newVal) { changed += 1; }
      return newVal;
    })
  });
  return [changed, newSeats];
};

const playUntilNoChange = (seats) => {
  let continueExec = true;
  let lastRound = seats;
  while (continueExec) {
    const [changed, newSeats] = playRound(lastRound);
    lastRound = newSeats;
    if (changed === 0) {
      continueExec = false;
    }
  }
  return lastRound;
};

const solveDay11Part1 = (data) => {
  const board = playUntilNoChange(data);
  const ss = SeatingSystem(board);
  const [countE, countO] = ss.countEmptyOccupied(board);
  return countO;
};

/* 
import { readFileAndReturnArrayOfCharacterArrays } from './aoc-2020-api.mjs';

const data =
  readFileAndReturnArrayOfCharacterArrays('./aoc-2020-day11.txt');
console.log('Occupied seats after playing', solveDay11Part1(data));
 */

/**
 * $ node ./aoc-2020-day11.js
 * Occupied seats after playing 2470
 */

console.log('Occupied seats after playing', solveDay11Part1(testData));

/**
 * $ node ./aoc-2020-day11.js
 * Occupied seats after playing 37
 */
