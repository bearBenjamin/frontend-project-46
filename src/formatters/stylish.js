/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const replacer = '  ';
const spaceCount = 2;

const retreat = (depth) => {
  const indent = spaceCount * depth;
  const indentCloseBrace = indent - spaceCount;
  const indents = {
    numberIndents: replacer.repeat(indent - 1),
    closeBrace: replacer.repeat(indentCloseBrace),
  };
  const {
    numberIndents, closeBrace,
  } = indents;
  return [numberIndents, closeBrace];
};

const stringify = (value, depth) => {
  const [numberIndents, closeBrace] = retreat(depth);

  if (!_.isObject(value)) return `${value}`;

  const objectProperties = Object.keys(value).map((key) => `${numberIndents}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${objectProperties.join('\n')}\n${closeBrace}}`;
};

const getStylishFormat = (diff, depth = 1) => {
  const [numberIndents, closeBrace] = retreat(depth);

  const keys = diff.map((key) => {
    switch (key.type) {
      case 'node': {
        return `${numberIndents}  ${key.key}: ${getStylishFormat(key.children, depth + 1)}`;
      }
      case 'delete': {
        return `${numberIndents}- ${key.key}: ${stringify(key.value, depth + 1)}`;
      }
      case 'unchanged': {
        return `${numberIndents}  ${key.key}: ${stringify(key.value, depth + 1)}`;
      }
      case 'changed': {
        const line1 = `${numberIndents}- ${key.key}: ${stringify(key.value1, depth + 1)}`;
        const line2 = `${numberIndents}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
        return `${line1}\n${line2}`;
      }
      case 'added': {
        return `${numberIndents}+ ${key.key}: ${stringify(key.value, depth + 1)}`;
      }
      default:
        return null;
    }
  });
  return `{\n${keys.join('\n')}\n${closeBrace}}`;
};

export default getStylishFormat;
