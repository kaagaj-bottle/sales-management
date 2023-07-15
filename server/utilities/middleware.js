const jwt = require("jsonwebtoken");
const config = require("./config.js");

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      request.decodedToken = jwt.verify(
        authorization.substring(7),
        config.SECRET_STRING
      );
    } catch {
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { tokenExtractor };
