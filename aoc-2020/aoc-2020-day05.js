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
    if (currentVal === left) {
      lower = lower;
      upper = upper - Math.floor((upper - lower) / 2);
      calculated = lower;
    } else if (currentVal === right) {
      lower = lower + Math.ceil((upper - lower) / 2);
      upper = upper;
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

const solveDay05Part1 = (data) => {
  let maxSeat = {
    row: 0, column: 0, seat: 0
  };
  const boardingInfo = testData.map((boardingPass) => {
    const [row, column, seat]
      = rowColumnSeatIdFrom(boardingPass);
    if (seat > maxSeat.seat) {
      maxSeat = { row, column, seat };
    }
    return [row, column, seat];
  })
  return maxSeat;
};

console.log("Max seat ID", solveDay05Part1(testData));

/**
 * $ node ./aoc-2020-day05.js
 * Max seat ID { row: 102, column: 4, seat: 820 }
 */
