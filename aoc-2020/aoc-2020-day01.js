import fs from 'fs';

const returnsTuplesOfThreeNumbersIfSumMatches = (a, sum) => {
  const sumOfThreeNumbers = (a, b, c) => (a + b + c);
  const sumArray = [];
  let i;
  for (i = 0; i < a.length; i++) {
    let j;
    for (j = 0; j < a.length; j++) {
      let k;
      for(k = 0; k < a.length; k++) {
        const firstNumber = a[i];
        const secondNumber = a[j];
        const thirdNumber = a[k];
        if (sumOfThreeNumbers(firstNumber, secondNumber, thirdNumber) === sum) {
          sumArray.push([firstNumber, secondNumber, thirdNumber]);
        }
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

const solveAocDay01Part2WithInputFile = (fileLocation) => {
  const integerArray = readFileAndReturnArrayOfNumbers(fileLocation);
  return returnsTuplesOfThreeNumbersIfSumMatches(integerArray, 2020);
}

console.log(solveAocDay01Part2WithInputFile('./aoc-2020-day01.input'))