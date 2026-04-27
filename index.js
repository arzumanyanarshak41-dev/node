const express = require("express");
const { HomePageRoute } = require("./Routes/HomePageRoute");
const { checkApiKey } = require("./middlewares");
const { createError } = require("./helpers");

require("dotenv").config();
const port = process.env.PORT;
const apiKey = process.env.APIKEY;

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.status(200);
  res.set({ "Cache-Control": "no-store" });
  res.json(createError("Add Api Key to URL"));
});

app.use(`/${apiKey}`, checkApiKey, HomePageRoute);

app.listen(port, (err) =>
  err ? console.log(err) : console.log(`Server is Running: Port ${port}`),
);
