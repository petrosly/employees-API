const usersArray = require("../models/generateUsersArray");
const User = require("../models/user.model");

const generate = async () => {
  await User.deleteMany({}).exec();
  await User.create(usersArray);
};

module.exports = generate;
