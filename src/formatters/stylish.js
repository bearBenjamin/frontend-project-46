/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const indentsFormater = (item) => {
  const replacer = '..';
  const spaceCount = 1;
  const indent = spaceCount * item;
  const indentCloseBrace = indent - spaceCount;
  const indents = {
    numberIndents: replacer.repeat(indent),
    closeBrace: replacer.repeat(indentCloseBrace),
  };
  return indents;
};

const stringify = (value, depth) => {
  const indents = indentsFormater(depth);
  const { numberIndents, closeBrace } = indents;

  if (!_.isObject(value)) return `${value}`;

  const objectProperties = Object.keys(value).map((key) => {
    if (_.isObject(value)) return `${numberIndents}${key}: ${stringify(value[key], depth + 1)}`;
    return `${numberIndents}${key}: ${value[key]}`;
  });

  return `{\n${objectProperties.join('\n')}\n${closeBrace}}`;
};

const getDiffTreeObject = (treeObject, depth = 1) => {
  const indents = indentsFormater(depth);
  const { numberIndents, closeBrace } = indents;

  const keys = treeObject.map((key) => {
    if (key.type === 'node') return `${numberIndents}${key.key}: ${getDiffTreeObject(key.children, depth + 1)}`;
    if (key.type === 'delete') return `${numberIndents}- ${key.key}: ${stringify(key.value1, depth + 1)}`;
    if (key.type === 'unchanged') return `${numberIndents}  ${key.key}: ${stringify(key.value1, depth + 1)}`;
    if (key.type === 'changed') return `${numberIndents}- ${key.key}: ${stringify(key.value1, depth + 1)}\n${numberIndents}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
    if (key.type === 'added') return `${numberIndents}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
  });
  return `{\n${keys.join('\n')}\n${closeBrace}}`;
};

export default getDiffTreeObject;
