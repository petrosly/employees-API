const usersArray = require("../models/generateUsersArray");
const User = require("../models/user.model");

const generate = async (req, res) => {
  try {
    await User.deleteMany({}).exec();
    await User.create(usersArray);
    res.status(200).send({ message: "Created Users array correctly" });
  } catch (e) {
    console.error(e);
    res.status(400).send("Error occured when creating Users array");
  }
};

module.exports = generate;
