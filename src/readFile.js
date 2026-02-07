import fs from 'fs';
import path from 'path';

export default (filepath) => {
  const absolutePath = path.resolve(process.cwd(), filepath);
  return fs.readFileSync(absolutePath, 'utf-8');
};
