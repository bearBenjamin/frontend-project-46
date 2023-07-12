import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import content from '../src/readFile.js';
import getDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('readFile file1.json', () => {
  const filename = 'file1.json';
  const pathMy = getFixturePath(filename);
  const readContent = content(pathMy);
  expect(readContent).toEqual(readFile(filename));
});

test('readFile file2.json', () => {
  const readContent = content('./_fixtures_/file2.json');
  const filename = 'file2.json';
  expect(readContent).toEqual(readFile(filename));
});

test('getDiff stylish', () => {
  const fileDiff = getDiff('./_fixtures_/file1.json', './_fixtures_/file2.json', 'stylish');
  expect(fileDiff).toEqual(readFile('expected.txt'));
});

test('getDiff plain', () => {
  const fileDiff = getDiff('./_fixtures_/file1.json', './_fixtures_/file2.json', 'plain');
  expect(fileDiff).toEqual(readFile('plain.txt'));
});

test('readFile filepath1.yml', () => {
  const readContent = content('./_fixtures_/filepath1.yml');
  const filename = 'filepath1.yml';
  expect(readContent).toEqual(readFile(filename));
});

test('readFile filepath2.yml', () => {
  const filename = 'filepath2.yml';
  const pathMy = getFixturePath(filename);
  const readContent = content(pathMy);
  expect(readContent).toEqual(readFile(filename));
});

test('genDiff .yml and .yml stylish', () => {
  const fileDiff = getDiff('./_fixtures_/filepath1.yml', './_fixtures_/filepath2.yml', 'stylish');
  expect(fileDiff).toEqual(readFile('expected.txt'));
});

test('genDiff .yml and .yml plain', () => {
  const fileDiff = getDiff('./_fixtures_/filepath1.yml', './_fixtures_/filepath2.yml', 'plain');
  expect(fileDiff).toEqual(readFile('plain.txt'));
});

test('getDiff plain', () => {
  const fileDiff = getDiff('./_fixtures_/file1.json', './_fixtures_/file2.json', 'json');
  expect(fileDiff).toEqual(readFile('json.txt'));
});

test('genDiff .yml and .yml plain', () => {
  const fileDiff = getDiff('./_fixtures_/filepath1.yml', './_fixtures_/filepath2.yml', 'json');
  expect(fileDiff).toEqual(readFile('json.txt'));
});
