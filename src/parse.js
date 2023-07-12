import YAML from 'yaml';
import yaml from 'js-yaml';

const fileExtension = (filepath, data) => {
  const extension = filepath.split('.');
  if (extension[extension.length - 1] === 'json') {
    const obj = JSON.parse(data);
    return obj;
  }
  if (extension[extension.length - 1] === 'yml') {
    const obj = yaml.load(data);
    return obj;
  }
  if (extension[extension.length - 1] === 'yaml') {
    const obj = YAML.parse(data);
    return obj;
  }
  return (`"Ошибка. Файлы с расширением" ${extension[extension.length - 1]} "не поддерживаются"`);
};

export default fileExtension;
