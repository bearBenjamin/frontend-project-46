import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('getDiff stylish', () => {
  const fileDiff = gendiff('./_fixtures_/file3.json', './_fixtures_/file4.json', 'stylish');
  expect(fileDiff).toEqual(readFile('expected2.txt'));
});

test('getDiff plain', () => {
  const fileDiff = gendiff('./_fixtures_/file1.json', './_fixtures_/file2.json', 'plain');
  expect(fileDiff).toEqual(readFile('plain.txt'));
});

test('genDiff .yml and .yml stylish', () => {
  const fileDiff = gendiff('./_fixtures_/filepath1.yml', './_fixtures_/filepath2.yml', 'stylish');
  expect(fileDiff).toEqual(readFile('expected.txt'));
});

test('genDiff .yml and .yml plain', () => {
  const fileDiff = gendiff('./_fixtures_/filepath1.yml', './_fixtures_/filepath2.yml', 'plain');
  expect(fileDiff).toEqual(readFile('plain.txt'));
});

test('getDiff json', () => {
  const fileDiff = gendiff('./_fixtures_/file1.json', './_fixtures_/file2.json', 'json');
  expect(fileDiff).toEqual(readFile('json.txt'));
});

test('genDiff .yml and .yml json', () => {
  const fileDiff = gendiff('./_fixtures_/filepath1.yml', './_fixtures_/filepath2.yml', 'json');
  expect(fileDiff).toEqual(readFile('json.txt'));
});
