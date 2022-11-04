const  fs = require('fs');
const path = require('path');

const projectPath = path.join(__dirname, 'project-dist');
const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const copiedAssets = path.join(__dirname, 'project-dist', 'assets');
const bundlePath = path.join(__dirname, 'project-dist', 'style.css');
const sourcePath = path.resolve(__dirname, 'styles');
const newHtml = path.join(__dirname, 'project-dist', 'index.html');

async function generateHTML() {

  const templateData = await  fs.promises.readFile(templatePath, 'utf-8');
  await  fs.promises.writeFile(newHtml, templateData);
  const components = await  fs.promises.readdir(componentsPath, { withFileTypes: true });

  for (const component of components) {
    const componentName = component.name.split('.')[0];
    const componentType = component.name.split('.')[1];

    if (component.isFile() && componentType == 'html') {

      const componentItem = path.join(componentsPath, component.name);
      const componentData = await  fs.promises.readFile(componentItem, 'utf-8');
      const templateTag = `{{${componentName}}}`;
      const data = await  fs.promises.readFile(newHtml, 'utf-8');
      await  fs.promises.writeFile((newHtml), data.replace(templateTag, componentData));
    }
  }
}

async function createProjectDir() {
  await  fs.promises.rm(projectPath , { recursive: true, force: true });
  await  fs.promises.mkdir(projectPath , { recursive: true });
}

async function createBundle(error) {
  if (error) {
    console.log(error);
  } else {
    let files = await  fs.promises.readdir(sourcePath, {withFileTypes: true});
    let stylesArray = [];
    for (const file of files) {

      if (file.isFile() && path.extname(`${file.name}`) == '.css') {
        const filePath = path.join(sourcePath, file.name);

        const styles = await  fs.promises.readFile(filePath, 'utf-8');

        stylesArray.push(styles + '\n');
      }
    }
    await  fs.promises.writeFile(bundlePath, stylesArray.join('\n'));
  }
}

async function copyAssets(assetsPath, copiedAssets) {

  await  fs.promises.mkdir(copiedAssets, { recursive: true });
  let files = await  fs.promises.readdir(assetsPath, {withFileTypes: true});
  for (const file of files) {
    const newLocal = file.name;
    let sourceFile = path.join(assetsPath, `${newLocal}`);
    let copiedFile = path.join(copiedAssets, `${newLocal}`);
    if (file.isFile()) {
      await fs.promises.copyFile(sourceFile, copiedFile);
    } else {
      await copyAssets(sourceFile, copiedFile);
    }
  }
}


async function buildPage() {
  await createProjectDir();
  copyAssets(assetsPath, copiedAssets);
  createBundle();
  generateHTML();
}

buildPage();
