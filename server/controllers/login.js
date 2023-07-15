const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const { User } = require("../models");
const logger = require("../utilities/logger");
const config = require("../utilities/config");

const router = require("express").Router();

router.post("/", async (request, response) => {
  const { email, password } = request.body;

  let user;

  try {
    user = await User.findOne({
      where: {
        email: email,
      },
    });
  } catch (error) {
    logger.error(error);
    return response.status(400).json({
      error: "email or password not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
  if (!isPasswordValid) {
    return response.status(401).json({
      error: "email or password not found",
    });
  }

  const forToken = {
    email: user.email,
    id: user.id,
  };

  const token = jwt.sign(forToken, config.SECRET_STRING);

  response
    .status(200)
    .send({ token, email: user.email, name: user.name })
    .end();
});

module.exports = router;
