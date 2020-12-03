import fs from 'fs';

export const readFileAndReturnArrayOfStrings = (path) => {
  const fileContent = fs.readFileSync(path, 'utf-8');
  const stringArray = fileContent.trim().split('\n');

  const stringArrayTrimmedAndNotEmpty = stringArray
    .map(line => {
      const trimmedLine = line.trim();
      if (trimmedLine !== '') {
        return trimmedLine;
      }
    });
  return stringArrayTrimmedAndNotEmpty;
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