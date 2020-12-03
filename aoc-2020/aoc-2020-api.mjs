import fs from 'fs';

const readLinesAndExecuteFunction = (fileLocation, executeFunction) => {
  const fileContent = fs.readFileSync(fileLocation, 'utf-8');
  const stringArray = fileContent.trim().split('\n');
  const parsedArray = stringArray.map(line => {
    const trimmedLine = line.trim();
    if (trimmedLine !== '') {
      return executeFunction(trimmedLine);
    }
  });
  return parsedArray;
}

export const readFileAndReturnArrayOfIntegers = (fileLocation) => {
  const parseInteger = line => parseInt(line, 10);
  return readLinesAndExecuteFunction(fileLocation, parseInteger);
}

export const readFileAndReturnArrayOfStrings = (fileLocation) => {
  const parseString = line => line;
  return readLinesAndExecuteFunction(fileLocation, parseString);
}

export const readFileAndReturnArrayOfCharacterArrays = (fileLocation) => {
  const parseCharacter = line => line.split('');
  return readLinesAndExecuteFunction(fileLocation, parseCharacter);
}
