import getPlainFormat from './plain.js';
import getStylishFormat from './stylish.js';

const format = (formatName, diff) => {
  switch (formatName) {
    case 'stylish': {
      return getStylishFormat(diff);
    }
    case 'plain': {
      return getPlainFormat(diff);
    }
    case 'json': {
      return JSON.stringify(diff);
    }
    default:
      throw new Error(`${formatName} not supported`);
  }
};

export default format;
