const testData = ['nop +0',
  'acc +1',
  'jmp +4',
  'acc +3',
  'jmp -3',
  'acc -99',
  'acc +1',
  'jmp -4',
  'acc +6'];
const [ACC, NOP, JMP] = ['acc', 'nop', 'jmp'];

const Cpu = (instructions) => {
  let cAcc = 0;
  let instructPointer = 0;
  const execInstruct = (instruct) => {
    const { opcode, sign, aInteger } = instruct;
    const theInteger = parseInt([sign, aInteger]
      .join(''));
    switch (opcode) {
      case JMP:
        instructPointer += theInteger;
        instructPointer -= 1;
        break;
      case ACC:
        cAcc += theInteger;
        break;
      case NOP:
        break;
      default:
        console.log('Something has gone terribly wrong');
        return false;
    }
    return true;
  };

  const execute = () => {
    const executed = [];
    const accArray = [];
    let continueExec = true;
    while (continueExec) {
      if (executed.includes(instructPointer)) {
        return [accArray, executed];
      }
      execInstruct(instructions[instructPointer]);
      executed.unshift(instructPointer);
      accArray.unshift(cAcc);
      instructPointer += 1;
      // Next instruction doesn't exist
      if (instructions[instructPointer] === undefined) {
        continueExec = false;
      }
    }
    return [accArray, executed];
  };

  return {
    execute
  };
};

const parseDatum = (datum) => {
  const instructionRegex = /(acc|nop|jmp){1} (\+|-)(\d+)/;
  const parsedDatum = [...datum.match(instructionRegex)];
  const [, opcode, sign, aInteger] = parsedDatum;
  const instruction = {
    opcode,
    sign,
    aInteger
  };
  return instruction
}

const transformDataToInstructions = (data) => {
  const instructions = data.map((datum) => {
    return parseDatum(datum);
  });
  return instructions;
};

const solveDay08Part1 = (data) => {
  const instructions = transformDataToInstructions(data);
  const result = Cpu(instructions).execute();
  return result;
};

/* 
import { readFileAndReturnArrayOfStrings } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfStrings('./aoc-2020-day08.txt');

console.log('Accumulator before hitting infinite loop'
  , solveDay08Part1(data)[0][1]);
 */

/**
 * $ node ./aoc-2020-day08.js
 * Accumulator before hitting infinite loop 1941
 */

console.log('Accumulator before hitting infinite loop'
  , solveDay08Part1(testData)[0][1]);

/**
 * $ node ./aoc-2020-day08.js
 * Accumulator before hitting infinite loop 5
 */
