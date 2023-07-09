import readFile from './src/readFile.js';
import fileExtension from './src/parse.js';
import { getTreeObject } from './src/fileDiff.js';
import { getFormatResult } from './src/formatters/resultFormat.js';

const getDiff = (filepath1, filepath2, format) => {
  const dataFile1 = readFile(filepath1);
  const dataFile2 = readFile(filepath2);
  const objFile1 = fileExtension(filepath1, dataFile1);
  const objFile2 = fileExtension(filepath2, dataFile2);
  const treeFile = getTreeObject(objFile1, objFile2);
  const result = getFormatResult(format, treeFile);
  return result;
};

export default getDiff;
