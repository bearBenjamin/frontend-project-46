/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const stringify = (value) => {
  if (typeof value === 'object') {
    const result = '[complex value]';
    return result;
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const getPlainFormat = (treeObject) => {
  const iter = (node, parents) => {
    const keys = node.flatMap((key) => {
      const parent = [...parents, `${key.key}`];
      const pathNameKey = parent.join('.');
      if (key.type === 'node') {
        const resultStr = `${iter(key.children, parent)}`;
        return resultStr;
      }
      if (key.type === 'delete') {
        const resultStr = `Property '${pathNameKey}' was removed`;
        return resultStr;
      }
      if (key.type === 'changed') {
        const resultStr = `Property '${pathNameKey}' was update. From ${stringify(key.value1)} to ${stringify(key.value2)}`;
        return resultStr;
      }
      if (key.type === 'added') {
        const resultStr = `Property '${pathNameKey}' was added with value: ${stringify(key.value2)}`;
        return resultStr;
      }
      if (key.type === 'unchanged') {
        return [];
      }
    });
    return `${keys.join('\n')}`;
  };
  return iter(treeObject, []);
};

export default getPlainFormat;
