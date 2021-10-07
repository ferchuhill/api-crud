const jwt = require("jsonwebtoken");
const SECRET_TOKEN = process.env.SECRET_TOKEN || "token";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const generateToken = (userId) => {
  jwt.sign({ sub: userId }, SECRET_TOKEN, {
    algorithm: "HS256",
    expiresIn: "7d",
  });
};

module.exports = generateToken;
