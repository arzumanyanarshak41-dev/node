const fs = require("fs").promises;
const path = require("path");

async function writeFileHandler(d, data) {
  await fs.writeFile(path.join(__dirname, "..", d), data);
}
module.exports.writeFileHandler = writeFileHandler
