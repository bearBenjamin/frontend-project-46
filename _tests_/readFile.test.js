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

const json1 = getFixturePath('file1.json');
const json2 = getFixturePath('file2.json');

const yml1 = getFixturePath('file1.yml');
const yml2 = getFixturePath('file2.yml');

describe('gendiff', () => {
  test('getDiff extension Json', () => {
    expect(gendiff(json1, json2, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(json1, json2, 'plain')).toEqual(expectedPlain);
    expect(gendiff(json1, json2, 'json')).toEqual(expectedJson);
    expect(gendiff(json1, json2)).toEqual(expectedStylish);
  });

  test('genDiff extension Yml', () => {
    expect(gendiff(yml1, yml2, 'stylish')).toEqual(expectedStylish);
    expect(gendiff(yml1, yml2, 'plain')).toEqual(expectedPlain);
    expect(gendiff(yml1, yml2, 'json')).toEqual(expectedJson);
    expect(gendiff(yml1, yml2)).toEqual(expectedStylish);
  });
});
