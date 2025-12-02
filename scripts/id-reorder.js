// const fs = require('fs');
import { fs } from 'fs';

const IdReorder = (fileName) => {
  const root =
    'D:\\Adi\\projects\\biserica-aviatiei (github)\\components\\config\\';
  const source = fileName + '.ts';
  const destination = fileName + '-copy.ts';
  const sourceFile = fs.readFileSync(root.concat(source), 'utf-8');
  const destinationFile = fs.createWriteStream(root.concat(destination), {
    flags: 'a',
  });

  let i = 0;
  const offset = '    id: ';
  const offsetSkip = '     id: ';
  const CRLF = '\r\n';

  sourceFile.split(CRLF).forEach((line) => {
    if (line.includes(offset) && !line.includes(offsetSkip)) {
      i++;
      const newLine = offset.concat(i.toString()).concat(',');
      destinationFile.write(newLine);
      console.log(newLine);
    } else {
      destinationFile.write(line);
      console.log(line);
    }
    destinationFile.write(CRLF);
  });
};

const main = async () => {
  // process.argv.forEach(function (val, index, array) {
  //   console.log(index + ': ' + val);
  // });
  const fileName = process.argv[2];
  IdReorder(fileName);
};

main();

// node .\scripts\id-reorder.js
