const fs = require('fs');
const path = require('path');
const bundlePath = path.join(__dirname, 'project-dist', 'bundle.css');
const sourcePath = path.resolve(__dirname, 'styles');

async function createBundle(error) {
  if (error) {
    throw new Error('Something went wrong')
  } else {
    let sourceFiles = await fs.promises.readdir(sourcePath, {withFileTypes: true});
    let stylesheet = [];
    for (const file of sourceFiles) {
      if (file.isFile() && path.extname(`${file.name}`) == '.css') {
        const filePath = path.join(sourcePath, file.name);
        const styles = await fs.promises.readFile(filePath, 'utf-8');
        stylesheet.push(styles);
      }
    }
    await fs.promises.writeFile(bundlePath, stylesheet.join('\n'));
  }
}
createBundle();