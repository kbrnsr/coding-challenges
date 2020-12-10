const testData = ['nop +0', 'acc +1', 'jmp +4', 'acc +3'
  , 'jmp -3', 'acc -99', 'acc +1', 'jmp -4', 'acc +6'];
const [ACC, NOP, JMP] = ['acc', 'nop', 'jmp'];
// Instruction = {opcode: string, payload: integer}

const StateMachine = (instructions) => {
  let state = {
    acc: 0,
    pointer: 0,
    executed: []
  };

  const execInstruct = (instruct) => {
    const { acc, pointer } = state;
    const { opcode, payload } = instruct;
    switch (opcode) {
      case JMP:
        if (payload === 0) {
          console.error('jmp 0 failure')
          return;
        }
        // JMP value - 1 => +1 in caller
        setState({ pointer: (pointer + payload) - 1 });
        break;
      case ACC:
        setState({ acc: acc + payload });
        break;
      case NOP: break;
      default:
        console.log(`Fatal: ${instruct}`);
    }
    return;
  };

  const setState = (val) => {
    state = { ...state, ...val };
  };

  const execute = () => {
    const { executed, pointer } = state;
    if (executed.includes(pointer)) {
      return false;
    }
    execInstruct(instructions[pointer]);
    executed.push(pointer);
    // need to consider if we executed a JMP
    const newPointer = state.pointer;
    setState({ pointer: state.pointer + 1, executed });
    return true;
  };

  const findLoop = () => {
    const stateChanges = [];
    let contExec = true;
    while (contExec) {
      const executeBool = execute();
      stateChanges.push({
        ...state, executed: [...state.executed]
      });
      if (state.pointer >= instructions.length
        || !executeBool) {
        contExec = false;
      }
    }
    return stateChanges;
  };

  return {
    findLoop
  };
};

const parseDatum = (datum) => {
  const instructionRegex = /(acc|nop|jmp){1} (\+|-)(\d+)/;
  const parsedDatum = [...datum.match(instructionRegex)];
  const [, opcode, sign, theInteger] = parsedDatum;
  const instruction = {
    opcode,
    payload: parseInt([sign, theInteger].join(''))
  };
  return instruction;
};

const transformDataToInstructions = (data) => {
  const instructions = data.map((datum) => {
    return parseDatum(datum);
  });
  return instructions;
};

const solveDay08Part1 = (data) => {
  const instructions = transformDataToInstructions(data);
  const sm = StateMachine(instructions);
  const result = sm.findLoop();
  return result;
};

/* 
import { readFileAndReturnArrayOfStrings } from './aoc-2020-api.mjs';

const data = readFileAndReturnArrayOfStrings('./aoc-2020-day08.txt');
const inputChanges = solveDay08Part1(data);
const inputChangeIndex = inputChanges.length - 1;
console.log('Accumulator before infite loop'
  , inputChanges[inputChangeIndex].acc);
 */

/**
 * $ node aoc-2020-day08.js
 * Accumulator before infite loop 1941
 */

const testChanges = solveDay08Part1(testData);
const testChangeIndex = testChanges.length - 1;
console.log('Accumulator before infite loop'
  , testChanges[testChangeIndex].acc);

/**
 * $ node aoc-2020-day08.js
 * Accumulator before infite loop 5
 */
