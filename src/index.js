import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import buildTree from './fileDiff.js';
import format from './formatters/index.js';

/* const disassembler = (filepath) => {
  const obj = path.parse(filepath);
  const { ext } = obj;
  const resultStr = ext.slice(1);
  return resultStr;
}; */

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf8');
  const obj = path.parse(fullPath);
  const { ext } = obj;
  const result = parse(ext, data);
  return result;
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diff = buildTree(data1, data2);
  return format(formatName, diff);
};

export default gendiff;
