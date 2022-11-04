const fs = require('fs');
const path = require('path');


let filePаth = path.join(__dirname, 'text.txt');
let stream = new fs.ReadStream(filePаth, {encoding: 'utf-8'});

stream.on('readable', function(){
  let data = stream.read();

  if(data!==null) console.log(data);
});

