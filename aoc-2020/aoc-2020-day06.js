const testData = `abc

a
b
c

ab
ac

a
a
a
a

b`

const countUniqueAnswers = group => {
  const uniqueGroupAnswers = {};
  group.map(personAnwser => {
    const personSplit = personAnwser.split('');
    personSplit.map(answer => {
      if (!Object.keys(uniqueGroupAnswers)
        .includes(answer)) {
        uniqueGroupAnswers[answer] = 1;
      } else {
        uniqueGroupAnswers[answer] += 1
      }
    });
  })
  return uniqueGroupAnswers;
}

const transformDataToGroups = (groupData) => {
  const groupSplit = groupData.split('\n\n');
  const groupTrans = groupSplit.map(group => {
    return group.split('\n');
  })
  return groupTrans;
};

const solveDay06Part1 = (data) => {
  const groupData = transformDataToGroups(data);
  const answersCount = groupData.map(group => {
    return countUniqueAnswers(group);
  })
  const result = answersCount.reduce((acc, current) => {
    const currentLength = Object.keys(current).length;
    return acc + currentLength;
  }, 0)

  return result;
};

/* 
import { readFileAndReturnFileContent }
  from './aoc-2020-api.mjs';

const data =
  readFileAndReturnFileContent('./aoc-2020-day06.txt');

console.log("Sum of unique answers in groups"
  , solveDay06Part1(data));
 */

/**
 * $ node ./aoc-2020-day06.js
 * Sum of unique answers in groups 6768
 */

console.log("Sum of unique answers in groups"
  , solveDay06Part1(testData));

/**
 * $ node ./aoc-2020-day06.js
 * Sum of unique answers in groups 11
 */
