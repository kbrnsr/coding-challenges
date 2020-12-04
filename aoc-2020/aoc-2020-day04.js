const testData =
  `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const extractDataFromString = (dataString) => {
  const lines = dataString.split('\n');
  const result = {};
  lines.map(line => {
    const fieldDataLine = line.trim().split(' ')
    fieldDataLine.map(fieldData => {
      const [label, data] = fieldData.split(':');
      result[label] = data;
      return null;
    })
    return null;
  });
  return result;
}

const isValidInfo = (validLabels, objectToBeChecked) => {
  const objectKeys = Object.keys(objectToBeChecked);
  let result = validLabels.reduce((acc, label) => {
    return objectKeys.includes(label)
      ? acc && true : acc && false
  }, true)
  return result;
}

const solveDay04Part1 = (data) => {
  const validLabels = ['byr', 'iyr', 'eyr', 'hgt'
    , 'hcl', 'ecl', 'pid']
  const stringArray = data.split('\n\n');
  const infoArray = stringArray.map(s => extractDataFromString(s));
  const result = infoArray.reduce((acc, val) => {
    return isValidInfo(validLabels, val) ? acc + 1 : acc
  }, 0)
  return result;
}

console.log('Valid passports', solveDay04Part1(testData));

/**
 * $ node ./aoc-2020-day04.js
 * Valid passports 2
 */