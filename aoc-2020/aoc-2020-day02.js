// import { readFileAndReturnArrayOfStrings } from './aoc-2020-api.mjs';

const testData = [
  "1-3 a: abcde",
  "1-3 b: cdefg",
  "2-9 c: ccccccccc"
]

const validatePasswordPart1 = (data) => {
  const re = /(\d+)-(\d+) ([a-z]{1}): ([a-z]*)/;
  const found = data.match(re);
  const minimum = parseInt(found[1]);
  const maximum = parseInt(found[2]);
  const charString = found[3];
  const rest = found[4];
  let counter = 0;
  let i;
  for (i = 0; i < rest.length; i += 1) {
    if (rest[i] === charString) {
      counter += 1;
    }
  }
  return ((counter >= minimum) && (counter <= maximum));
}

const solveDay01part1 = (a) => {
  let validPasswords = 0;
  a.map(dataString => {
    if (validatePasswordPart1(dataString)) {
      validPasswords += 1;
    }
    return null;
  })
  return validPasswords;
};

console.log(solveDay01part1(testData))
// const dataArray = readFileAndReturnArrayOfStrings('./aoc-2020-day02.txt')
// console.log(solveDay01part1(dataArray));