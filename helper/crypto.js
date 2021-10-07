const CryptoJS = require("crypto-js");
const { SECRET_KEY = "TEST KEY" } = process.env;
function encrypt(password) {
  return CryptoJS.HmacSHA1(password, SECRET_KEY);
}

module.exports = { encrypt };
