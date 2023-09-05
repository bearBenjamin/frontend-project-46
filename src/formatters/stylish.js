import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const keyOffset = 2;

const getIndents = (depth) => ({
  open: replacer.repeat(spacesCount * depth - keyOffset),
  close: replacer.repeat(spacesCount * depth - spacesCount),
});

const stringify = (value, depth) => {
  const indents = getIndents(depth);

  if (!_.isObject(value)) return String(value);

  const properties = Object.keys(value).map((key) => `${indents.open}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${properties.join('\n')}\n${indents.close}}`;
};

const iter = (node, depth) => {
  const indents = getIndents(depth);

  switch (node.type) {
    case 'node': {
      const childrens = node.children.map((nest) => iter(nest, depth + 1));
      return `${indents.open}  ${node.key}: {\n${childrens.join('\n')}\n${indents.close}    }`;
    }
    case 'delete': {
      return `${indents.open}- ${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    case 'unchanged': {
      return `${indents.open}  ${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    case 'changed': {
      const line1 = `${indents.open}- ${node.key}: ${stringify(node.value1, depth + 1)}`;
      const line2 = `${indents.open}+ ${node.key}: ${stringify(node.value2, depth + 1)}`;
      return `${line1}\n${line2}`;
    }
    case 'added': {
      return `${indents.open}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
    }
    default:
      return null;
  }
};

const getStylishFormat = (diff, depth = 1) => {
  const nodes = diff.map((node) => iter(node, depth));
  return `{\n${nodes.join('\n')}\n}`;
};

export default getStylishFormat;
