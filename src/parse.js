// import YAML from 'yaml';
import yaml from 'js-yaml';

const parse = (extension, data) => {
  switch (extension) {
    case '.json': {
      const result = JSON.parse(data);
      return result;
    }
    case '.yml':
    case '.yaml': {
      const result = yaml.load(data);
      return result;
    }
    default:
      throw new Error(`'Ошибка. Файлы с расширением '${extension}' не поддерживаются'`);
  }
};

export default parse;
