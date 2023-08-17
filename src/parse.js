// import YAML from 'yaml';
import yaml from 'js-yaml';

const parse = (filepath, data) => {
  const extension = filepath.split('.');
  if (extension[extension.length - 1] === 'json') {
    const result = JSON.parse(data);
    return result;
  }
  if (extension[extension.length - 1] === 'yml' || extension[extension.length - 1] === 'yaml') {
    const result = yaml.load(data);
    return result;
  }
  return (`"Ошибка. Файлы с расширением" ${extension[extension.length - 1]} "не поддерживаются"`);
};

export default parse;
