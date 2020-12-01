const expenses = [1721, 979, 366, 299, 675, 1456];

const returnsTuplesOfTwoNumbersIfSumMatches = (a, sum) => {
  const sumOfTwoNumber = (a, b) => (a + b);
  sumArray = [];
  let i;
  for (i = 0; i < a.length; i++) {
    let j;
    for (j = 0; j < a.length; j++) {
      const firstNumber = a[i]
      const secondNumber = a[j]
      if (sumOfTwoNumber(firstNumber, secondNumber) === sum) {
        sumArray.push([firstNumber, secondNumber]);
      }
    }
  }
  return sumArray;
}

console.log(returnsTuplesOfTwoNumbersIfSumMatches(expenses, 2020));