const { createError } = require("../helpers/createError");

require("dotenv").config();
const apiKey = process.env.APIKEY;
function checkApiKey(req, res, next) {
  const enteredKey = req.baseUrl.split("/").at(1);
  if (enteredKey == apiKey) {
    return next();
  }
  res.status(404);
  res.json(createError("Wrong Api Key"));
}
module.exports.checkApiKey = checkApiKey;
