import fs from 'fs';

const returnsTuplesOfTwoNumbersIfSumMatches = (a, sum) => {
  const sumOfTwoNumber = (a, b) => (a + b);
  const sumArray = [];
  let i;
  for (i = 0; i < a.length; i++) {
    let j;
    for (j = 0; j < a.length; j++) {
      const firstNumber = a[i]
      const secondNumber = a[j]
      if (sumOfTwoNumber(firstNumber, secondNumber) === sum) {
        console.log("pushing");
        sumArray.push([firstNumber, secondNumber]);
      }
    }
  }
  return sumArray;
}

const readFileAndReturnArrayOfNumbers = (fileLocation) => {
  const fileContent = fs.readFileSync(fileLocation, 'utf-8');
  const stringArray = fileContent.trim().split('\n');
  const parsedAsIntegersArray = stringArray.map(line => {
    const trimmedLine = line.trim();
    if (trimmedLine !== '') {
      return parseInt(trimmedLine);
    }
  });
  return parsedAsIntegersArray
}

const solveAocDay01WithInputFile = (fileLocation) => {
  const integerArray = readFileAndReturnArrayOfNumbers(fileLocation);
  return returnsTuplesOfTwoNumbersIfSumMatches(integerArray, 2020);
}

console.log(solveAocDay01WithInputFile('./aoc-2020-day01.input'))