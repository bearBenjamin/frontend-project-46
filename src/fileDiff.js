import _ from 'lodash';

const getTreeObject = (obj1, obj2) => {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  const keys3 = _.union(keys1, keys2);
  const keys = _.sortBy(keys3);

  const treeObject = keys.map((key) => {
    if (_.isObject(obj1[key]) && _.isObject(obj2[key])) {
      const result = { type: 'node', key, children: getTreeObject(obj1[key], obj2[key]) };
      return result;
    }
    if (!_.has(obj1, key)) {
      const result = { type: 'added', key, value2: obj2[key] };
      return result;
    }
    if (!_.has(obj2, key)) {
      const result = { type: 'delete', key, value1: obj1[key] };
      return result;
    }
    if (obj1[key] !== obj2[key]) {
      const result = {
        type: 'changed', key, value1: obj1[key], value2: obj2[key],
      };
      return result;
    }
    const result = { type: 'unchanged', key, value1: obj2[key] };
    return result;
  });
  return treeObject;
};

export default getTreeObject;
