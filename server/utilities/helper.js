const { connectToDatabase } = require("./db");

const initiateDbConnection = async () => {
  connectToDatabase();
};

module.exports = { initiateDbConnection };
