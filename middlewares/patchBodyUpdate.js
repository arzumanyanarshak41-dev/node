const { readFileHandler, createError } = require("../helpers");

async function patchBodyUpdate(req, res, next) {
  let users = JSON.parse(await readFileHandler("DB", "Users.json"));
  const user = users.find((u) => +u.id === +req.params.id);
  const newBody = { ...user, ...req.body };
  let { name, age, email, password, confirmPassword } = newBody;
  name = name
    ?.trim()
    .split(" ")
    .map((el) => el[0].toUpperCase() + el.slice(1).toLowerCase())
    .join(" ");

  if (
    +age > 18 &&
    +age < 65 &&
    password?.trim() === confirmPassword?.trim() &&
    !users.some((u) => u.email === email && u.id != req.params?.id)
  ) {
    res.locals.user = {
      id: +req.params.id || Date.now(),
      name,
      age,
      email,
      password,
    };
    res.locals.users = users;
    next();
  } else {
    res.status(500);
    res.json(createError("Wrong Input"));
  }
}

module.exports.patchBodyUpdate = patchBodyUpdate;
