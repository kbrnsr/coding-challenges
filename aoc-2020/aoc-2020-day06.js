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
  return [uniqueGroupAnswers, group.length];
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
    const [answers,] = current;
    const keysLength = Object.keys(answers).length
    return acc + keysLength;
  }, 0)

  return result;
};

const countAllYes = (answers, groupLength) => {
  const answersValues = Object.values(answers);
  const groupAllYesCount = answersValues
    .reduce((allYesCount, answerCount) => {
      if (answerCount === groupLength) {
        return allYesCount + 1;
      } else {
        return allYesCount;
      }
    }, 0)
  return groupAllYesCount;
}

const solveDay06Part2 = (data) => {
  const groupData = transformDataToGroups(data);
  const answersCount = groupData.map(group => {
    return countUniqueAnswers(group);
  })
  const result = answersCount
    .reduce((allYes, group) => {
      const [groupAnswers, groupLength] = group;
      const groupAllYesCount = countAllYes(groupAnswers, groupLength);
      return allYes + groupAllYesCount;
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
console.log("Sum of common answers in groups"
  , solveDay06Part2(data));
 */

/**
 * $ node ./aoc-2020-day06.js
 * Sum of unique answers in groups 6768
 * Sum of common answers in groups 3484
 */

console.log("Sum of unique answers in groups"
  , solveDay06Part1(testData));
console.log("Sum of common answers in groups"
  , solveDay06Part2(testData));

/**
 * $ node ./aoc-2020-day06.js
 * Sum of unique answers in groups 11
 * Sum of common answers in groups 6
 */
