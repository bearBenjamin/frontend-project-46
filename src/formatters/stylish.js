const indentsFormater = (item) => {
    const replacer = '..';
    const spaceCount = 1;
    const indent = spaceCount * item;
    const indentCloseBrace = indent - spaceCount;
    const indents = {
      numberIndents: replacer.repeat(indent),
      closeBrace: replacer.repeat(indentCloseBrace)
    };
    return indents;
  };

  const stringify = (value, depth) => {
  
      const indents = indentsFormater(depth);
      const { numberIndents, closeBrace } = indents;
  
      if (typeof value === 'object' && value !== null) {
        const objectProperties = Object.keys(value).map((key) => {
          if (typeof value === 'object') {
            const result = `${numberIndents}${key}: ${stringify(value[key], depth + 1)}`;
            return result;
          }
          const result = `${numberIndents}${key}: ${value[key]}`;
          return result
        });
  
        const str = `{\n${objectProperties.join('\n')}\n${closeBrace}}`;
        return `${str}`;

      } else {
        return String(value);
      };
    };

  export const getDiffTreeObject = (treeObject, depth = 1) => {
    const indents = indentsFormater(depth);
    const { numberIndents, closeBrace } = indents;

    const keys = treeObject.map((key) => {
      if (key.type === 'node') {
        const resultStr = `${numberIndents}${key.key}: ${getDiffTreeObject(key.children, depth + 1)}`;
        return resultStr;
      }
      if (key.type === 'delete') {
        const resultStr = `${numberIndents}- ${key.key}: ${stringify(key.value1, depth + 1)}`;
        return resultStr;
      };
      if (key.type === 'unchanged') {
        const resultStr = `${numberIndents}  ${key.key}: ${stringify(key.value1, depth + 1)}`;
        return resultStr;
      };
      if (key.type === 'changed') {
        const resultStr = `${numberIndents}- ${key.key}: ${stringify(key.value1, depth + 1)}\n${numberIndents}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
        return resultStr;
      };
      if (key.type === 'added') {
        const resultStr = `${numberIndents}+ ${key.key}: ${stringify(key.value2, depth + 1)}`;
        return resultStr;
      };
    });
    return `{\n${keys.join('\n')}\n${closeBrace}}`;
  };