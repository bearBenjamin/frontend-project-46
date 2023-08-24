/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const indentsFormater = (item) => {
  const replacer = '  ';
  const spaceCount = 2;
  const indent = spaceCount * item;
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
  const [numberIndents, closeBrace] = indentsFormater(depth);

  if (!_.isObject(value)) return `${value}`;

  const objectProperties = Object.keys(value).map((key) => {
    if (_.isObject(value)) return `${numberIndents}  ${key}: ${stringify(value[key], depth + 1)}`;
    // return `${numberIndents} ${key}: ${value[key]}`; не понятно, нужна эта строка или не нужна???
  });
  return `{\n${objectProperties.join('\n')}\n${closeBrace}}`;
};

const getStylishFormat = (diff, depth = 1) => {
  const [numberIndents, closeBrace] = indentsFormater(depth);

  const keys = diff.map((key) => {
    if (key.type === 'node') return `${numberIndents}  ${key.key}: ${getStylishFormat(key.children, depth + 1)}`;
    if (key.type === 'delete') return `${numberIndents}- ${key.key}: ${stringify(key.value, depth + 1)}`;
    if (key.type === 'unchanged') return `${numberIndents}  ${key.key}: ${stringify(key.value, depth + 1)}`;
    if (key.type === 'changed') return `${numberIndents}- ${key.key}: ${stringify(key.value1, depth + 1)}\n${numberIndents}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
    if (key.type === 'added') return `${numberIndents}+ ${key.key}: ${stringify(key.value, depth + 1)}`;
  });
  return `{\n${keys.join('\n')}\n${closeBrace}}`;
};

export default getStylishFormat;
