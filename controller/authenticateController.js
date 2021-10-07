// ./controllers/authenticate
const User = require("../models/User");
const Person = require("../models/Person");
const jwt = require("jsonwebtoken");
const { encrypt } = require("../helper/crypto");
const { connectToDatabase } = require("../helper/dbConnect");

const SECRET_TOKEN = process.env.SECRET_TOKEN;

const validate = async (username, password) => {
  const user = await User.findOne({ username: username }).exec();
  if (!user) {
    return undefined;
  }
  if (user.password === encrypt(password).toString()) {
    return await Person.findById(user.person);
  }
  return undefined;
};

authenticateController = {
  async authenticate(req, res) {
    await connectToDatabase();

    try {
      const { username, password } = req.body;
      const person = await validate(username, password);
      if (person) {
        const token = jwt.sign({ sub: person.id }, SECRET_TOKEN, {
          algorithm: "HS256",
          expiresIn: "7d",
        });
        res.status(201).json({ success: true, data: { person, token } });
      } else {
        res
          .status(201)
          .json({ success: false, data: "Username or password is incorrect" });
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ success: false });
    }
  },
};

module.exports = authenticateController;
