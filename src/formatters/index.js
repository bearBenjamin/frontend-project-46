import getJsonFormat from './json.js';
import getPlainFormat from './plain.js';
import getDiffTreeObject from './stylish.js';

const getFormatResult = (formatName, treeFile) => {
  let result;
  if (formatName === 'stylish') {
    result = getDiffTreeObject(treeFile);
  }
  if (formatName === 'plain') {
    result = getPlainFormat(treeFile);
  }
  if (formatName === 'json') {
    result = getJsonFormat(treeFile);
  }
  return result;
};

export default getFormatResult;
