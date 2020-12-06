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
  const uniqueGroupAnswers = [];
  group.map(personAnwser => {
    const personSplit = personAnwser.split('');
    personSplit.map(answer => {
      if (!uniqueGroupAnswers.includes(answer)) {
        uniqueGroupAnswers.push(answer);
      }
    });
  })
  return uniqueGroupAnswers.length;
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
    return acc + current;
  }, 0)

  return result;
};

console.log("Sum of unique answers in groups", solveDay06Part1(testData))

/**
 * $ node ./aoc-2020-day06.js
 * Sum of unique answers in groups 11
 */
