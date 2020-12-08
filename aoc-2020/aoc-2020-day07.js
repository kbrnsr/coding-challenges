const testData = ['light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.'];
const testData2 = ['shiny gold bags contain 2 dark red bags.',
  'dark red bags contain 2 dark orange bags.',
  'dark orange bags contain 2 dark yellow bags.',
  'dark yellow bags contain 2 dark green bags.',
  'dark green bags contain 2 dark blue bags.',
  'dark blue bags contain 2 dark violet bags.',
  'dark violet bags contain no other bags.']

const transformTextToBags = (bagString) => {
  const bagsRegex = /((\d) ([a-z]+) ([a-z]+))+/g;
  const noBagsRegex = /no other bags/;
  if (noBagsRegex.test(bagString)) { return []; }
  const bagsMatch = [...bagString.matchAll(bagsRegex)];
  const results = bagsMatch.map(el => {
    const [, , amount, adj, color] = el;
    return { amount, adj, color, key: [adj, color].join(' ') };
  });
  return results;
};

const transformTextToBagsLists = (stringArray) => {
  const keyValues = {};
  stringArray.map(el => {
    const [key, rest] = el.split('s contain');
    const val = transformTextToBags(rest);
    keyValues[key.slice(0, -4)] = [...val];
    return [key, val];
  })
  return keyValues;
};

const bagIsContainedIn = (bagMatch, bag, c, bagCache) => {
  if (bagCache.includes(bag)) { return true; }
  if (c[bagMatch].length === 0) {
    return false;
  }
  else {
    if (bagMatch === bag) {
      return true;
    }
    else {
      const result = c[bag].reduce((acc, current) => {
        return acc || bagIsContainedIn(bagMatch, current.key, c, bagCache);
      }, false);
      if (result) { bagCache.push(bag); }
      return result;
    }
  }
};

const countUniqueColorsOuter = (matchAdj, matchColor, c) => {
  const matchBag = [matchAdj, matchColor].join(' ');
  const bagCache = [];
  Object.keys(c).map((checkBag) => {
    bagIsContainedIn(matchBag, checkBag, c, bagCache);
    return [];
  });
  const uniqueColorsOuter = bagCache.reduce((acc, curr) => {
    if (!acc.includes(c[curr].color)) {
      acc.push(c[curr]);
    }
    return acc;
  }, []);
  return uniqueColorsOuter;
};

const solveDay07Part1 = (stringArray) => {
  // key = 'light red'
  // value = '[{amount, adj, color}, {...}]'
  const results = transformTextToBagsLists(stringArray);
  const countColor = countUniqueColorsOuter('shiny', 'gold', results);
  return countColor;
};

const requiredBagsInBag = (bag, c) => {
  const checkBags = c[bag];
  const bagsInThisbag = checkBags.length;

  const result = checkBags.reduce((acc, currBag) => {
    const res = requiredBagsInBag(currBag.key, c);
    return (acc + (currBag.amount * res));
  }, 1);
  return result;

};

const countRequiredBags = (bagAdj, bagColor, c) => {
  const checkBag = [bagAdj, bagColor].join(' ');
  const result = requiredBagsInBag(checkBag, c);
  return result - 1;
};

const solveDay07Part2 = (stringArray) => {
  // key = 'light red'
  // value = '[{amount, adj, color}, {...}]'
  const results = transformTextToBagsLists(stringArray);
  const requiredCount = countRequiredBags('shiny', 'gold', results);

  return requiredCount;
};

/* 
import { readFileAndReturnArrayOfStrings }
  from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfStrings('./aoc-2020-day07.txt');

console.log('Unique bag colors that can contain at least one',
  'shiny gold bag', solveDay07Part1(data).length);
console.log('Required bags in',
  'shiny gold bag', solveDay07Part2(data));
 */

/**
 * $ node ./aoc-2020-day07.js
 * Unique bag colors that can contain at least one shiny gold bag 370
 * Required bags in shiny gold bag 29547
 */

console.log('Unique bag colors that can contain at least one',
  'shiny gold bag', solveDay07Part1(testData).length);
console.log('Required bags in',
  'shiny gold bag', solveDay07Part2(testData2));

/**
 * $ node ./aoc-2020-day07.js
 * Unique bag colors that can contain at least one shiny gold bag 4
 * Required bags in shiny gold bag 126
 */
