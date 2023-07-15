const router = require("express").Router();
const bcrypt = require("bcrypt");

const { User } = require("../models");
const logger = require("../utilities/logger");

router.get("/", async (request, response) => {
  try {
    const users = await User.findAll({
      attributes: ["email", "name", "age"],
    });
    response.json(users);
  } catch (error) {
    logger.error(error);
    return response.status(400).end();
  }
});

router.get("/:id", async (request, response) => {
  const id = request.params.id;
  let user;
  try {
    user = await User.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "email", "age", "name"],
    });
    if (user) {
      response.json(user);
    } else {
      response.status(400).json({ error: "user not found" });
    }
  } catch (error) {
    logger.error(error);
  }
});

router.post("/", async (request, response) => {
  const { name, email, age, password } = request.body;

  if (!(name && email && password)) {
    return response.status(400).json({
      error: "Missing Credentials",
    });
  }
  const isAlreadyRegistered = await User.findOne({
    where: {
      email: email,
    },
  });

  if (isAlreadyRegistered) {
    return response.status(400).json({
      error: "User already registered, please login",
    });
  }

  const saltRounds = 12;
  let passwordHash;
  try {
    passwordHash = await bcrypt.hash(password, saltRounds);
  } catch (error) {
    logger.error(error);
    return response.status(500).end();
  }

  try {
    const user = await User.create({
      name,
      email,
      age,
      passwordHash,
    });
    response
      .json({ name: user.name, email: user.email, age: user.age })
      .status(200);
  } catch (error) {
    logger.error(error);
    return response.status(500).end();
  }
  // try {
  //   const user = await User.create(request.body);
  //   response.json(user);
  // } catch (error) {
  //   logger.error(error);
  //   return response.status(400).end();
  // }
});

module.exports = router;
