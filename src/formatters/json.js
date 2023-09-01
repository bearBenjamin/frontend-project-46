/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const stringify = (value, depth) => {
  if (!_.isObject(value)) return `"${value}"`;
  const objectProperties = Object.keys(value).map((key) => {
    if (_.isObject(value)) return `"${key}":${stringify(value[key], depth + 1)}`;
    return `"${key}":"${value[key]}"`;
  });
  return `{\n${objectProperties.join(',')}}`;
};

const getJsonFormat = (diff, depth = 1) => {
  const iter = (node) => {
    const keys = node.map((key) => {
      switch (key.type) {
        case 'node': {
          return `"${key.key}":${iter(key.children, depth + 1)}`;
        }
        case 'delete': {
          return `"-${key.key}":${stringify(key.value)}`;
        }
        case 'changed': {
          return `"-${key.key}":${stringify(key.value1)},"+${key.key}":${stringify(key.value2)}`;
        }
        case 'added': {
          return `"+${key.key}":${stringify(key.value)}`;
        }
        case 'unchanged': {
          return `"${key.key}":${stringify(key.value)}`;
        }
        default:
          return null;
      }
    });
    return `{${keys.join(',')}}`;
  };
  return iter(diff);
};

export default getJsonFormat;
