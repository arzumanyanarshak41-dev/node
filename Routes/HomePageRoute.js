const { json } = require("express");
const {
  readFileHandler,
  writeFileHandler,
  createError,
} = require("../helpers");
const { postPutHandler, patchBodyUpdate } = require("../middlewares");
const fs = require("fs").promises;
const HomePageRoute = require("express").Router();
HomePageRoute.get("/", async (req, res) => {
  const file = await readFileHandler("Pages", "index.html");
  res.set({ "Cache-Control": "no-store" });
  res.send(file);
});
HomePageRoute.get("/users", async (req, res) => {
  const users = JSON.parse(await readFileHandler("DB", "Users.json"));
  res.json(users);
});
HomePageRoute.get("/users/:id", async (req, res) => {
  const users = JSON.parse(await readFileHandler("DB", "Users.json"));
  const user = users.find((u) => u.id == req.params.id);
  res.json(user);
});
HomePageRoute.post("/users", postPutHandler, async (req, res) => {
  let users = res.locals.users;
  users.push(res.locals.user);
  await writeFileHandler("DB/Users.json", JSON.stringify(users));
  res.status(200);
  res.json(users);
});
HomePageRoute.put("/users/:id", postPutHandler, async (req, res) => {
  let users = res.locals.users;
  users = users.map((u) => (u.id == req.params.id ? res.locals.user : u));
  await writeFileHandler("DB/Users.json", JSON.stringify(users));
  res.status(200);
  res.json(users);
});
HomePageRoute.patch("/users/:id", patchBodyUpdate, async (req, res) => {
  let users = res.locals.users;
  users = users.map((u) => (u.id == req.params.id ? res.locals.user : u));
  await writeFileHandler("DB/Users.json", JSON.stringify(users));
  res.status(200);
  res.json(users);
});
HomePageRoute.delete("/users/:id", async (req, res) => {
  const users = JSON.parse(await readFileHandler("DB", "Users.json"));
  const newUsers = users.filter((u) => +u.id !== +req.params.id);
  if (newUsers.length == users.length) {
    res.status(500);
    res.json(createError("Wrong ID"));
    return;
  }
  await writeFileHandler("DB/Users.json", JSON.stringify(newUsers));
  res.status(200);
  res.json(newUsers);
});
module.exports.HomePageRoute = HomePageRoute;
