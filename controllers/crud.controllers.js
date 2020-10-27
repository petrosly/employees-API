const User = require("../models/user.model");

const findUsers = async (req, res) => {
  try {
    const docs = await User.find({}).lean().exec();
    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
  }
};

module.exports = findUsers;
