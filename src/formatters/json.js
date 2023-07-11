/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
const stringify = (value, depth) => {
  if (typeof value === 'object' && value !== null) {
    const objectProperties = Object.keys(value).map((key) => {
      if (typeof value === 'object') {
        const result = `"${key}":${stringify(value[key], depth + 1)}`;
        return result;
      }
      const result = `"${key}":"${value[key]}"`;
      return result;
    });
    const str = `{\n${objectProperties.join(',')}}`;
    // console.log('str: ', str)
    return `${str}`;
  }
  if (typeof value === 'string') {
    return `"${value}"`;
  }
  return `"${value}"`;
};

const getJsonFormat = (treeObject, depth = 1) => {
  const iter = (node) => {
    const keys = node.map((key) => {
      if (key.type === 'node') {
        const resultStr = `"${key.key}":${iter(key.children, depth + 1)}`;
        // console.log('node: ', resultStr)
        return resultStr;
      }
      if (key.type === 'delete') {
        const resultStr = `"-${key.key}":${stringify(key.value1)}`;
        return resultStr;
      }
      if (key.type === 'changed') {
        const resultStr = `"-${key.key}":${stringify(key.value1)},"+${key.key}":${stringify(key.value2)}`;
        return resultStr;
      }
      if (key.type === 'added') {
        const resultStr = `"+${key.key}":${stringify(key.value2)}`;
        return resultStr;
      }
      if (key.type === 'unchanged') {
        const resultStr = `"${key.key}":${stringify(key.value1)}`;
        return resultStr;
      }
    });
    return `{${keys.join(',')}}`;
  };
  return iter(treeObject);
};

export default getJsonFormat;
