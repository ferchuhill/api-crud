const { connect } = require("mongoose");

const MONGO_URI =
  process.env.MONGO_URI || "mongodb://localhost:27017/next_test";

async function connectToDatabase() {
  await connect(MONGO_URI);
}

module.exports = { connectToDatabase };
