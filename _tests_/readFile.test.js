import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import content from '../src/readFile.js';
import getDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('readFile', () => {
  const readContent = content('./_fixtures_/file1.json');
  const filename = 'file1.json';
  expect(readContent).toEqual(readFile(filename));
});

test('readFile', () => {
  const readContent = content('./_fixtures_/file2.json');
  const filename = 'file2.json';
  expect(readContent).toEqual(readFile(filename));
});

test('getDiff', () => {
  const fileDiff = getDiff('./_fixtures_/file1.json', './_fixtures_/file2.json');
  expect(fileDiff).toMatch(readFile('expected.txt'));
});
