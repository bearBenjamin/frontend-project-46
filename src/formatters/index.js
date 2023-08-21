import getJsonFormat from './json.js';
import getPlainFormat from './plain.js';
import getStylishFormat from './stylish.js';

const format = (formatName, diff) => {
  if (formatName === 'stylish') return getStylishFormat(diff);
  if (formatName === 'plain') return getPlainFormat(diff);
  if (formatName === 'json') return getJsonFormat(diff);
  return 'format not found';
};

export default format;
