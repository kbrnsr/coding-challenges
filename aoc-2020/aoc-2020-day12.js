const testData = ['F10', 'N3', 'F7', 'R90', 'F11'];

/**
 * |
 * |   Concept, ship starts at (0, 0) on X
 * |
 * |
 * |___________ 
 */

const NORTH = 'N', SOUTH = 'S', EAST = 'E', WEST = 'W';
const LEFT = 'L', RIGHT = 'R', FORWARD = 'F';

const degreeToUnitX = (degree) => Math.round(Math.cos(degree));
const degreeToUnitY = (degree) => Math.round(Math.sin(degree));

const extractInfoFromData = (data) => {
  const coordinateRegex = /([A-Z]){1}(\d+)/g;
  return data.map(element => {
    const [, action, value] = [...element.matchAll(coordinateRegex)][0];
    return [action, parseInt(value)];
  });
}

const navigate = (action, value, coordX, coordY, degree) => {
  let newCoordX = coordX, newCoordY = coordY, newDegree = degree;

  switch (action) {
    case NORTH:
      newCoordY += value;
      break;
    case SOUTH:
      newCoordY -= value;
      break;
    case EAST:
      newCoordX += value;
      break;
    case WEST:
      newCoordX -= value;
      break;
    case FORWARD:
      const dirX = degreeToUnitX(newDegree);
      const dirY = degreeToUnitY(newDegree);
      newCoordX = newCoordX + (value * dirX);
      newCoordY = newCoordY + (value * dirY);
      break;
    case LEFT:
      newDegree += value;
      break;
    case RIGHT:
      newDegree -= value;
      break;
    default:
      console.log('No [action, value]', [action, value]);
      break;
  }

  return [newCoordX, newCoordY, newDegree];
};

const navigationInstructions = (data, coordX, coordY, degree) => {
  let [newCoordX, newCoordY, newDegree]
    = [coordX, coordY, degree];
  const instructions = extractInfoFromData(data);

  instructions.map((instruction, i) => {
    const [action, value] = instruction;
    [newCoordX, newCoordY, newDegree]
      = navigate(action, value, newCoordX, newCoordY, newDegree);
  })

  return [newCoordX, newCoordY, newDegree];
};

const solveDay12Part1 = (data) => {
  const [coordX, coordY, degree] = [0, 0, 0];
  const [newCoordX, newCoordY, newDegree] =
    navigationInstructions(data, coordX, coordY, degree);
  const result = Math.abs(newCoordX) + Math.abs(newCoordY);

  return result;
};

/* 
import { readFileAndReturnArrayOfStrings } from './aoc-2020-api.mjs';

const inputData = readFileAndReturnArrayOfStrings('./aoc-2020-day12.txt');
const inputResult = solveDay12Part1(inputData);
console.log('Manhatten distance', inputResult);
 */

/**
 * WRONG
 * $ node ./aoc-2020-day12.js
 * Manhatten distance 1644
 */

const testResult = solveDay12Part1(testData);
console.log('Manhatten distance', testResult);

/**
 * $ node ./aoc-2020-day12.js
 * Manhatten distance 25
 */
