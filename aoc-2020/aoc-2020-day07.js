const testData = ['light red bags contain 1 bright white bag, 2 muted yellow bags.',
  'dark orange bags contain 3 bright white bags, 4 muted yellow bags.',
  'bright white bags contain 1 shiny gold bag.',
  'muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.',
  'shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.',
  'dark olive bags contain 3 faded blue bags, 4 dotted black bags.',
  'vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.',
  'faded blue bags contain no other bags.',
  'dotted black bags contain no other bags.'];

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

/* 
import { readFileAndReturnArrayOfStrings }
  from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfStrings('./aoc-2020-day07.txt');

console.log('Unique bag colors that can contain at least one',
  'shiny gold bag', solveDay07Part1(data).length);

console.log('Unique bag colors that can contain at least one',
  'shiny gold bag', solveDay07Part1(testData).length);
 */

/**
 * $ node ./aoc-2020-day07.js
 * Unique bag colors that can contain at least one shiny gold bag 4
 */
