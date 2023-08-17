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
      if (key.type === 'node') return `"${key.key}":${iter(key.children, depth + 1)}`;
      if (key.type === 'delete') return `"-${key.key}":${stringify(key.value1)}`;
      if (key.type === 'changed') return `"-${key.key}":${stringify(key.value1)},"+${key.key}":${stringify(key.value2)}`;
      if (key.type === 'added') return `"+${key.key}":${stringify(key.value2)}`;
      if (key.type === 'unchanged') return `"${key.key}":${stringify(key.value1)}`;
    });
    return `{${keys.join(',')}}`;
  };
  return iter(diff);
};

export default getJsonFormat;
