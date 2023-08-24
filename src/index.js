import path from 'path';
import fs from 'fs';
import parse from './parse.js';
import buildTree from './diff.js';
import format from './formatters/index.js';

const getFormat = ((filepath) => path.extname(filepath).slice(1));

const readFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return parse(getFormat(fullPath), data);
};

const gendiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const diff = buildTree(data1, data2);
  return format(formatName, diff);
};

export default gendiff;
