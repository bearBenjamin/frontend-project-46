import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;
const keyOffset = 2;
const closeBracketOffset = 4;

const getIndents = (depth) => ({
  open: replacer.repeat(spacesCount * depth - keyOffset),
  close: replacer.repeat(spacesCount * depth - closeBracketOffset),
});

const stringify = (value, depth) => {
  const indents = getIndents(depth);

  if (!_.isObject(value)) return String(value);

  const properties = Object.keys(value).map((key) => `${indents.open}  ${key}: ${stringify(value[key], depth + 1)}`);
  return `{\n${properties.join('\n')}\n${indents.close}}`;
};

const getStylishFormat = (diff, depth = 1) => {
  const indents = getIndents(depth);

  const keys = diff.map((key) => {
    switch (key.type) {
      case 'node': {
        return `${indents.open}  ${key.key}: ${getStylishFormat(key.children, depth + 1)}`;
      }
      case 'delete': {
        return `${indents.open}- ${key.key}: ${stringify(key.value, depth + 1)}`;
      }
      case 'unchanged': {
        return `${indents.open}  ${key.key}: ${stringify(key.value, depth + 1)}`;
      }
      case 'changed': {
        const line1 = `${indents.open}- ${key.key}: ${stringify(key.value1, depth + 1)}`;
        const line2 = `${indents.open}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
        return `${line1}\n${line2}`;
      }
      case 'added': {
        return `${indents.open}+ ${key.key}: ${stringify(key.value, depth + 1)}`;
      }
      default:
        return null;
    }
  });
  return `{\n${keys.join('\n')}\n${indents.close}}`;
};

export default getStylishFormat;

/* const iter = (node, depth) => {
  const indents = getIndents(depth);
  switch (node.type) {
    case 'node': {
      const children = node.children.map((node) => iter(node, depth + 1));
      console.log(children)
      return `${indents.open}  ${node.key}: {\n${children.join('\n')}\n${indents.close}}`;
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
  const keys = diff.map((node) => iter(node, depth));
  return `{\n${keys.join('\n')}\n}`
} */
