import _ from 'lodash';

export const getTreeFile = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys3 = [...keys1, ...keys2];
  const keys = new Set(keys3);
  const keysSort = Array.from(keys);
  const newKeysSort = _.sortBy(keysSort);
  const treeFile = newKeysSort.map((key) => {
    let result;
    if (obj1[key] && obj2[key]) {
      if (obj1[key] === obj2[key]) {
        result = { type: 'unchange', key, value1: obj1[key] };
      }
      if (obj1[key] !== obj2[key]) {
        result = {
          type: 'change', key, value1: obj1[key], value2: obj2[key],
        };
      }
    }
    if (obj1[key] !== undefined && obj2[key] === undefined) {
      result = { type: 'delete', key, value1: obj1[key] };
    }
    if (obj2[key] !== undefined && obj1[key] === undefined) {
      result = { type: 'added', key, value1: obj2[key] };
    }
    return result;
  });
  return treeFile;
};

export const getDiffTreeFile = (treeFile) => {
  const keys = treeFile.map((key) => {
    let resultingStr;
    if (key.type === 'delete') {
      resultingStr = `  - ${key.key}: ${key.value1}\n`;
    }
    if (key.type === 'unchange') {
      resultingStr = `    ${key.key}: ${key.value1}\n`;
    }
    if (key.type === 'change') {
      resultingStr = `  - ${key.key}: ${key.value1}\n  + ${key.key}: ${key.value2}\n`;
    }
    if (key.type === 'added') {
      resultingStr = `  + ${key.key}: ${key.value1}`;
    }
    return resultingStr;
  });
  console.log(keys);
  const result = `{\n${keys.join('')}\n}`;
  console.log(result);
  return result;
};
