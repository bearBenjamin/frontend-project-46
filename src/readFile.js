import path from 'path';
import fs from 'fs';

const content = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(fullPath, 'utf8').toString();
  return data;
};

export default content;
