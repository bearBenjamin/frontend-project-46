/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const getPlainFormat = (treeObject) => {
  const iter = (node, parents) => {
    const keys = node.flatMap((key) => {
      const parent = [...parents, `${key.key}`];
      const pathNameKey = parent.join('.');
      if (key.type === 'node') return `${iter(key.children, parent)}`;
      if (key.type === 'delete') return `Property '${pathNameKey}' was removed`;
      if (key.type === 'changed') return `Property '${pathNameKey}' was updated. From ${stringify(key.value1)} to ${stringify(key.value2)}`;
      if (key.type === 'added') return `Property '${pathNameKey}' was added with value: ${stringify(key.value2)}`;
      if (key.type === 'unchanged') return [];
    });
    return `${keys.join('\n')}`;
  };
  return iter(treeObject, []);
};

export default getPlainFormat;
