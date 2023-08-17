import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import gendiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '_fixtures_', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJson.txt');

describe('gendiff', () => {
  test('getDiff extensionJson', () => {
    const filepath1 = './_fixtures_/file1.json';
    const filepath2 = './_fixtures_/file2.json';
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
    expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
  });

  test('genDiff extensionYml', () => {
    const filepath1 = './_fixtures_/file1.yml';
    const filepath2 = './_fixtures_/file2.yml';
    expect(gendiff(filepath1, filepath2, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(filepath1, filepath2, 'plain')).toEqual(expectedPlain);
    expect(gendiff(filepath1, filepath2, 'json')).toEqual(expectedJson);
    expect(gendiff(filepath1, filepath2)).toEqual(expectedStylish);
  });
});
