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