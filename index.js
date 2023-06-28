import readFile from './src/readFile.js';
import fileExtension from './src/parse.js';
import { getTreeFile, getDiffTreeFile } from './src/fileDiff.js';

const getDiff = (filepath1, filepath2) => {
  const dataFile1 = readFile(filepath1);
  const dataFile2 = readFile(filepath2);
  const objFile1 = fileExtension(filepath1, dataFile1);
  const objFile2 = fileExtension(filepath2, dataFile2);
  const treeFile = getTreeFile(objFile1, objFile2);
  const result = getDiffTreeFile(treeFile);
  return result;
};

export default getDiff;
