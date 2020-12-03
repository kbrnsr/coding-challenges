const testPattern = [
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

const solveday03part1 = (startLocation, slope, pattern) => {
  const patternX = pattern[0].length;
  const patternY = pattern.length;
  let locationX = (startLocation[0] - 1);
  let locationY = (startLocation[1] - 1);

  return traverseMapAndCount(
    locationX, locationY, patternX, patternY, slope[0], slope[1], pattern
  );
}

console.log(solveday03part1([1, 1], [3, 1], testPattern));