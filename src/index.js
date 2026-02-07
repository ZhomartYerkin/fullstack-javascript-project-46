import fs from 'fs';
import path from 'path';
import _ from 'lodash';
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

  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  const lines = keys.map((key) => {
    if (!Object.hasOwn(obj2, key)) {
      return `  - ${key}: ${obj1[key]}`;
    }

    if (!Object.hasOwn(obj1, key)) {
      return `  + ${key}: ${obj2[key]}`;
    }

    if (obj1[key] !== obj2[key]) {
      return [
        `  - ${key}: ${obj1[key]}`,
        `  + ${key}: ${obj2[key]}`,
      ].join('\n');
    }

    return `    ${key}: ${obj1[key]}`;
  });

  return `{\n${lines.join('\n')}\n}\n`;
}

