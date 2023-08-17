import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import buildTree from './fileDiff.js';
import formats from './formatters/index.js';

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf8');
  const result = parse(filepath, data);
  return result;
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diff = buildTree(data1, data2);
  return formats(formatName, diff);
};

export default gendiff;
