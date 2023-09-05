import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const getPlainFormat = (diff) => {
  const iter = (node, parents) => {
    const nodes = node.flatMap((nest) => {
      const parent = [...parents, `${nest.key}`];
      const pathNameKey = parent.join('.');
      switch (nest.type) {
        case 'node': {
          return `${iter(nest.children, parent)}`;
        }
        case 'delete': {
          return `Property '${pathNameKey}' was removed`;
        }
        case 'changed': {
          return `Property '${pathNameKey}' was updated. From ${stringify(nest.value1)} to ${stringify(nest.value2)}`;
        }
        case 'added': {
          return `Property '${pathNameKey}' was added with value: ${stringify(nest.value)}`;
        }
        case 'unchanged': {
          return [];
        }
        default:
          return null;
      }
    });
    return `${nodes.join('\n')}`;
  };
  return iter(diff, []);
};

export default getPlainFormat;
