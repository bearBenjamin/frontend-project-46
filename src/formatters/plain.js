import _ from 'lodash';

const stringify = (value) => {
  if (_.isObject(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const getPlainFormat = (diff) => {
  const iter = (node, parents) => {
    const nodes = node.flatMap((node) => {
      const parent = [...parents, `${node.key}`];
      const pathNameKey = parent.join('.');
      switch (node.type) {
        case 'node': {
          return `${iter(node.children, parent)}`;
        }
        case 'delete': {
          return `Property '${pathNameKey}' was removed`;
        }
        case 'changed': {
          return `Property '${pathNameKey}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        }
        case 'added': {
          return `Property '${pathNameKey}' was added with value: ${stringify(node.value)}`;
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
