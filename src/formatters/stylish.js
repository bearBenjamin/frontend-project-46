/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const replacer = '  ';
const spaceCount = 2;

const indent = (depth) => " ".repeat(spaceCount * depth - 2);

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

  if (!_.isObject(value)) return String(value);

  const objectProperties = Object.keys(value).map((key) => `${indent(depth + 1)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${objectProperties.join('\n')}\n${indent(depth)}  }`;
};

const getStylishFormat = (diff, depth = 1) => {
  const [numberIndents, closeBrace] = retreat(depth);

  const keys = diff.map((node) => {
    switch (node.type) {
      case 'node': {
        return `${indent(depth)}  ${node.key}: ${getStylishFormat(node.children, depth + 1)}`;
      }
      case 'delete': {
        return `${indent(depth)}- ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'unchanged': {
        return `${indent(depth)}  ${node.key}: ${stringify(node.value, depth)}`;
      }
      case 'changed': {
        const line1 = `${indent(depth)}- ${node.key}: ${stringify(node.value1, depth)}`;
        const line2 = `${indent(depth)}+ ${node.key}: ${stringify(node.value2, depth)}`;
        return `${line1}\n${line2}`;
      }
      case 'added': {
        return `${indent(depth)}+ ${node.key}: ${stringify(node.value, depth)}`;
      }
      default:
        return null;
    }
  });
  return `{\n${keys.join('\n')}\n${closeBrace}}`;
};

export default getStylishFormat;
