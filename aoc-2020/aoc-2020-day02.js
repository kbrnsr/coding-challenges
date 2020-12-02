const testData = [
  "1-3 a: abcde",
  "1-3 b: cdefg",
  "2-9 c: ccccccccc"
]

const validatePassword = (data) => {
  // Could probably used regEx for the whole thing
  const splitData = data.split('');
  const minimumOccurences = splitData[0];
  const maximumOccurences = splitData[2];
  const characterToCount = splitData[4];
  let count = 0;
  // Go through rest of array
  let i;
  for (i = 7; i < splitData.length; i++) {
    if (splitData[i] === characterToCount) {
      count += 1;
      // return false early if count > maximumOccurences
      if (count > maximumOccurences) {
        return false;
      }
    }
  }
  return (count >= minimumOccurences);
}

const solveDay01part1 = (a) => {
  let validPasswords = 0;
  a.map(dataString => {
    if (validatePassword(dataString)) {
      validPasswords += 1;
    }
    return null;
  })
  return validPasswords;
};

console.log(solveDay01part1(testData))