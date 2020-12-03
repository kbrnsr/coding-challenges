import fs from 'fs';

export const readFileAndReturnArrayOfStrings = (path) => {
  const fileContent = fs.readFileSync(path, 'utf-8');
  const stringArray = fileContent.trim().split('\n');
  const parsedAsStringArray = stringArray
    .map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine !== '') {
        return trimmedLine;
      }
    });
  return parsedAsStringArray;
}

export const readFileAndReturnArrayOfCharacterArrays = (fileLocation) => {
  const fileContent = fs.readFileSync(fileLocation, 'utf-8');
  const stringArray = fileContent.trim().split('\n');
  const parsedAsCharactersArray = stringArray.map(line => {
    const trimmedLine = line.trim();
    if (trimmedLine !== '') {
      return trimmedLine.split('');
    }
  });
  return parsedAsCharactersArray
}

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
  return readLinesAndExecuteFunction(fileLocation, parseInteger)
}
