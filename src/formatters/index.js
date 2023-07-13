import getJsonFormat from './json.js';
import getPlainFormat from './plain.js';
import getDiffTreeObject from './stylish.js';

const getFormatResult = (formatName, treeFile) => {
  if (formatName === 'stylish') return getDiffTreeObject(treeFile);
  if (formatName === 'plain') return getPlainFormat(treeFile);
  if (formatName === 'json') return getJsonFormat(treeFile);
  return 'format not found';
};

export default getFormatResult;
