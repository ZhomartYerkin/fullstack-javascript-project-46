import fs from 'fs';
import path from 'path';
import parse from './parser.js';

export default function genDiff(filepath1, filepath2) {
  const fullPath1 = path.resolve(process.cwd(), filepath1);
  const fullPath2 = path.resolve(process.cwd(), filepath2);

  const data1 = fs.readFileSync(fullPath1, 'utf-8');
  const data2 = fs.readFileSync(fullPath2, 'utf-8');

  const format1 = path.extname(filepath1).slice(1);
  const format2 = path.extname(filepath2).slice(1);

  const obj1 = parse(data1, format1);
  const obj2 = parse(data2, format2);

  return JSON.stringify({ obj1, obj2 });
}
