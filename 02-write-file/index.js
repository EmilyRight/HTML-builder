const fs = require('fs');
const readline = require('readline');
const path = require('path');
const {stdout} = require ('process');


let filePаth = path.join(__dirname, 'text.txt');
let writeStream = fs.createWriteStream(filePаth, {encoding: 'utf-8'});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


rl.question('Write here: ', (answer) => {
  if (answer === 'exit') {
    rl.close();
    stdout.write('Have a nice day)' + '\n');
  } else {
    writeStream.write(answer + '\n');
  }

  rl.on('line', (input) => {
    if (input === 'exit') {
      rl.close();
    } else {
      writeStream.write(input + '\n');
    }
  });
  rl.on('close', () => {
    writeStream.write("----------end of input----------");
    stdout.write('Have a nice day)' + '\n');
  });
});