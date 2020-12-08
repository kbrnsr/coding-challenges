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

const CputThread = (instructions, initialAcc) => {
  let tAcc = [initialAcc];
  let tInstructIndex = 0;
  const execInstruct = (instruct) => {
    const { opcode, sign, aInteger } = instruct;
    const theInteger = parseInt([sign, aInteger]
      .join(''));
    switch (opcode) {
      case JMP:
        tInstructIndex += theInteger;
        tInstructIndex -= 1;
        break;
      case ACC:
        tAcc.unshift(tAcc[0] + theInteger);
        break;
      case NOP:
        break;
      default:
        return false;
    }
    return true;
  };
  const tExecute = (iToExecute) => {
    let i;
    for (i = 0; i < iToExecute; i++) {
      if (tInstructIndex >= instructions.length) {
        return [tInstructIndex, tAcc];
      }
      execInstruct(instructions[tInstructIndex])
      tInstructIndex += 1;
    }
    return [tInstructIndex, tAcc];
  };
  return {
    tExecute
  };
};

const Cpu = (instructions) => {
  const cpuT = CputThread(instructions, 0);
  const execute = () => {
    const executed = [];
    let tPointer = 0, tValue = [];
    let continueExec = true;
    while (continueExec) {
      if (executed.includes(tPointer)) {
        return [tPointer, tValue];
      } else {
        executed.push(tPointer);
      }
      [tPointer, tValue] = cpuT.tExecute(1);
      if (instructions[tPointer] === undefined) {
        continueExec = false;
      }
    }
    return [tPointer, tValue];
  };
  return {
    execute
  };
};

const parseDatum = (datum) => {
  const instructionRegex = /(acc|nop|jmp){1} (\+|-)(\d+)/;
  const parsedDatum = [...datum.match(instructionRegex)];
  const [, opcode, sign, aInteger] = parsedDatum;
  const instruction = { opcode, sign, aInteger };
  return instruction
}

const transformDataToInstructions = (data) => {
  const instructions = data.map((datum) => {
    return parseDatum(datum);
  });
  return instructions;
};

const solveDay08Part1 = (Data) => {
  const instructions = transformDataToInstructions(Data);
  const result = Cpu(instructions).execute();
  return result;
};

/* 
import { readFileAndReturnArrayOfStrings } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfStrings('./aoc-2020-day08.txt');
const result = solveDay08Part1(data);
console.log('Stop before executing [index, accumulator]'
  , [result[0], result[1][0]]);
 */

/**
 * $ node ./aoc-2020-day08.js
 * Stop before executing [index, accumulator] [ 488, 1941 ]
 */

const testResult = solveDay08Part1(testData);
console.log('Stop before executing [index, accumulator]'
  , [testResult[0], testResult[1][0]]);

/**
 * $ node ./aoc-2020-day08.js
 * Stop before executing [index, accumulator] [ 1, 5 ]
 */
