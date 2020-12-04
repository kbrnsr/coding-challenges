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

const testDataRulesInvalid =
  `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007`;

const testDataRulesValid =
  `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;

const validLabels = ['byr', 'iyr', 'eyr', 'hgt'
  , 'hcl', 'ecl', 'pid']

let byr = 0;
let iyr = 0;
let eyr = 0;
let hgt = 0;
let hcl = 0;
let ecl = 0;
let pid = 0;

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
const isLength = (val, theLength) => val.length === theLength;
const isLength9 = (val) => val.length === 9;
const isBetween = (val, min, max) => (min <= val) && (val <= max);
const isContainedIn = (val, container) => {
  return container.reduce((acc, containerValue) => {
    return containerValue === val ? acc || true : acc || false;
  }, false)
}

const checkByr = (val) => {
  const re = /[0-9]{4}/g;
  const regexBool = re.test(val);
  const betweenBool = isBetween(val, 1920, 2002);
  return regexBool && betweenBool;
}

const checkIyr = (val) => {
  const re = /[0-9]{4}/g;
  const regexBool = re.test(val);
  const betweenBool = isBetween(val, 2010, 2020);
  return regexBool && betweenBool;
}

const checkEyr = (val) => {
  const re = /[0-9]{4}/g;
  const regexBool = re.test(val);
  const betweenBool = isBetween(val, 2020, 2030);
  return regexBool && betweenBool;
}

const checkHgt = (val) => {
  const getMaxLengthAndMinMax = (suffix) => {
    if (suffix === 'cm') { return ['100'.length, 150, 193] }
    if (suffix === 'in') { return ['10'.length, 59, 76] }
  }
  const hgtInteger = val.slice(0, -2)
  const hgtSuffix = val.slice(-2)
  const containBool = isContainedIn(hgtSuffix, ['cm', 'in']);
  if (!containBool) { return false; }
  const [maxValueLength, min, max] = getMaxLengthAndMinMax(hgtSuffix);
  const lengthBool = isLength(hgtInteger, maxValueLength);
  const betweenBool = isBetween(hgtInteger, min, max);
  return lengthBool && betweenBool;
}

const checkHcl = (val) => {
  const re = /[a-z0-9]{6}/g;
  const hclPrefix = val[0];
  const hclValue = val.slice(1);
  if (hclPrefix !== '#') { return false };
  const hexBool = re.test(hclValue);
  return hexBool;
}

const checkEcl = (val) => {
  const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  const containBool = isContainedIn(val, eyeColors);
  return containBool;
}

const checkPid = (val) => {
  const re = /[0-9]{9}/g;
  const padVal = val.padStart(9, '0');
  if (!isLength9(padVal)) { return false; }
  const regexBool = re.test(padVal);
  return regexBool;
}

const checkRulesForLabel = (label, infoToBeChecked) => {
  switch (label) {
    case 'byr':
      return checkByr(infoToBeChecked);
    case 'iyr':
      return checkIyr(infoToBeChecked);
    case 'eyr':
      return checkEyr(infoToBeChecked);
    case 'hgt':
      return checkHgt(infoToBeChecked);
    case 'hcl':
      return checkHcl(infoToBeChecked);
    case 'ecl':
      return checkEcl(infoToBeChecked);
    case 'pid':
      return checkPid(infoToBeChecked);
    default:
      return false;
  }
}

const isValidInfoWithRules = (objectToBeChecked) => {
  const objectKeys = Object.keys(objectToBeChecked);
  let result = validLabels.reduce((acc, label) => {
    if (!objectKeys.includes(label)) {
      return acc && false;
    }
    return checkRulesForLabel(label, objectToBeChecked[label])
      ? acc && true : acc && false;
  }, true)
  return result;
}

const isValidInfo = (objectToBeChecked) => {
  const objectKeys = Object.keys(objectToBeChecked);
  let result = validLabels.reduce((acc, label) => {
    return objectKeys.includes(label)
      ? acc && true : acc && false
  }, true)
  return result;
}

const solveDay04Part1 = (data) => {
  const stringArray = data.split('\n\n');
  const infoArray = stringArray.map(s => extractDataFromString(s));
  const result = infoArray.reduce((acc, val) => {
    return isValidInfo(val) ? acc + 1 : acc
  }, 0)
  return result;
}

const solveDay04Part2 = (data) => {
  const stringArray = data.split('\n\n');
  const infoArray = stringArray.map(s => extractDataFromString(s));
  const result = infoArray.reduce((acc, val) => {
    return isValidInfoWithRules(val) ? acc + 1 : acc
  }, 0)
  return result;
}


import { readFileAndReturnFileContent } from './aoc-2020-api.mjs';

const data = readFileAndReturnFileContent('./aoc-2020-day04.txt');

console.log('Valid passports', solveDay04Part1(data));
console.log('Valid passports with rules'
  , solveDay04Part2(data));

/**
 * $ node ./aoc-2020-day04.js
 * Valid passports 250
 */
/*
console.log('Valid passports', solveDay04Part1(testData));
console.log('Valid passports with rules (some invalid)'
  , solveDay04Part2(testDataRulesInvalid));
console.log('Valid passports with rules (some valid)'
  , solveDay04Part2(testDataRulesValid));
 */
/**
 * $ node ./aoc-2020-day04.js
 * Valid passports 2
 */
