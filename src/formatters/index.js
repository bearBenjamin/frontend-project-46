import getJsonFormat from './json.js';
import getPlainFormat from './plain.js';
import getStylishFormat from './stylish.js';

/* const format = (formatName, diff) => {
  if (formatName === 'stylish') return getStylishFormat(diff);
  if (formatName === 'plain') return getPlainFormat(diff);
  if (formatName === 'json') return getJsonFormat(diff);
  return 'format not found';
}; */

const format = (formatName, diff) => {
  switch (formatName) {
    case 'stylish': {
      return getStylishFormat(diff);
    }
    case 'plain': {
      return getPlainFormat(diff);
    }
    case 'json': {
      return getJsonFormat(diff);
    }
    default:
      throw new Error(`${formatName} not supported`);
  }
};

export default format;
