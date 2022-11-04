const fs = require('fs');
const path = require('path');
const sourceDir = path.join(__dirname, 'files');
const copiedDir = path.join(__dirname, 'files-copy');

async function copyDir() {
  await fs.promises.rm(copiedDir, { recursive: true, force: true });
  await fs.promises.mkdir(copiedDir, { recursive: true });


  let files = await fs.promises.readdir(sourceDir, {withFileTypes: true});
  for (const file of files) {
    fs.stat(path.resolve(sourceDir, `${file}`), () => {
      let sourceFile = path.join(sourceDir, `${file.name}`);
      let copiedFile = path.join(copiedDir, `${file.name}`);

      if (file.isFile()) {
        fs.promises.copyFile(sourceFile, copiedFile);
      }

    });
  }
}
copyDir();
