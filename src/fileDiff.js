import _ from 'lodash';

const buildTree = (data1, data2) => {
  console.log('data1: ', data1);
  console.log('data2: ', data2);
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const keys3 = _.union(keys1, keys2);
  const keys = _.sortBy(keys3);

  const diff = keys.map((key) => {
    if (_.isObject(data1[key]) && _.isObject(data2[key])) return { type: 'node', key, children: buildTree(data1[key], data2[key]) };
    if (!_.has(data1, key)) return { type: 'added', key, value2: data2[key] };
    if (!_.has(data2, key)) return { type: 'delete', key, value1: data1[key] };
    // eslint-disable-next-line object-curly-newline
    if (data1[key] !== data2[key]) return { type: 'changed', key, value1: data1[key], value2: data2[key] };
    return { type: 'unchanged', key, value1: data2[key] };
  });
  return diff;
};

export default buildTree;
