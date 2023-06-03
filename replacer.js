const fs = require("fs/promises");
const path = require("path");

const folder = process.argv[2];

deepReadDir(folder)
  .then(() => console.log("Done!"))
  .catch(err => console.error(err));

async function deepReadDir(folder) {
  const files = await fs.readdir(folder);

  for (const file of files) {
    const filePath = path.join(folder, file);
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      await deepReadDir(filePath);
    } else {
      await replaceRequireWithImport(filePath);
    }
  }
}

async function replaceRequireWithImport(filePath) {
  const fileContent = await fs.readFile(filePath, "utf8");
  const newFileContent = fileContent
    .replace(/const (.*) = require\((.*)\);/g, "import $1 from $2;")
    .replace(/module.exports = (.*)/g, "export default $1");

  await fs.writeFile(filePath, newFileContent);
  await replaceJsToTs(filePath);
}

// function that replace the js file to a ts file
async function replaceJsToTs(filePath) {
  const newFilePath = await filePath.replace(".js", ".ts");
  await fs.rename(filePath, newFilePath);
}
