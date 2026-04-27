const { checkApiKey } = require("./checkApiKey");
const { patchBodyUpdate } = require("./patchBodyUpdate");
const { postPutHandler } = require("./PostPutHandler");

module.exports = { checkApiKey, postPutHandler,patchBodyUpdate };
