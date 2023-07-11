import readFile from './readFile.js';
import fileExtension from './parse.js';
import getTreeObject from './fileDiff.js';
import getFormatResult from './formatters/index.js';

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
