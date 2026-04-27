const fs = require("fs").promises
const path = require("path");

async function readFileHandler(...args) {
  const file = await fs.readFile(path.join(__dirname, "..", args.join("/")),"utf-8");
  return file;
}
module.exports.readFileHandler = readFileHandler
