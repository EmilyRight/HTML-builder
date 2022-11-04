const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname, 'secret-folder');

fs.readdir(dirPath, {withFileTypes: true}, (error, myDir) => {
  if (error) {
    console.log(error);
  } else {
    myDir.forEach((dir) => {
      fs.stat(`${dirPath}/${dir.name}`, (err, stats) => {
        if (error) {
          console.log(error);
        } else {
          if (dir.isFile()) {
            console.log((dir.name).substring(0, (dir.name).indexOf('.')) + ' - ' + (dir.name).substring((dir.name).indexOf('.') + 1, (dir.name).length) + ' - ' + Number((stats.size / 1024).toFixed(2)) + ' Kb' );
          }
        }
      });
    });
  }
});