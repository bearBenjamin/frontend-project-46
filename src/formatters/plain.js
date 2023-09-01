/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return value;
};

const getPlainFormat = (diff) => {
  const iter = (node, parents) => {
    const keys = node.flatMap((key) => {
      const parent = [...parents, `${key.key}`];
      const pathNameKey = parent.join('.');
      switch (key.type) {
        case 'node': {
          return `${iter(key.children, parent)}`;
        }
        case 'delete': {
          return `Property '${pathNameKey}' was removed`;
        }
        case 'changed': {
          return `Property '${pathNameKey}' was updated. From ${stringify(key.value1)} to ${stringify(key.value2)}`;
        }
        case 'added': {
          return `Property '${pathNameKey}' was added with value: ${stringify(key.value)}`;
        }
        case 'unchanged': {
          return [];
        }
        default:
          return null;
      }
    });
    return `${keys.join('\n')}`;
  };
  return iter(diff, []);
};

export default getPlainFormat;
