import getDiffTreeObject from './stylish.js';

const getFormatResult = (format, treeFile) => {
  let result;
  if (format === 'stylish') {
    result = getDiffTreeObject(treeFile);
  }
  return result;
};

export default getFormatResult;
