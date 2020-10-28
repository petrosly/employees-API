const mongoose = require("mongoose");
const User = require("../models/user.model");

const findUsers = async (req, res) => {
  try {
    const docs = await User.find({}).lean().exec();
    res.status(200).json({ data: docs });
  } catch (e) {
    console.error(e);
  }
};

const findUserById = async (req, res) => {
  try {
    if (
      !mongoose.Types.ObjectId.isValid(req.params.id) ||
      req.params.id.length != 24
    ) {
      res.status(400).send("The id you provided is not in valid format.");
      return;
    }
    const doc = await User.findById(req.params.id).lean().exec();
    if (doc == null) {
      res.status(400).send("No user with the provided id ");
    }
    res.status(200).json({ data: doc });
  } catch (e) {
    console.error(e);
  }
};

const createUser = async (req, res) => {
  if (
    !req.body.firstName ||
    !req.body.lastName ||
    !req.body.email ||
    !req.body.department ||
    !req.body.yearsWorking
  ) {
    res
      .status(400)
      .send(
        "The data you provided are not valid, please include: firstName, lastName, email, department, yearsWorking"
      );
    return;
  }

  try {
    await User.create(req.body);
    res.status(201).send("Create user successfully");
  } catch (e) {
    res
      .status(400)
      .send(
        "An error occured when creating user with the data you provided: " + e
      );
  }
};

module.exports = { findUsers, findUserById, createUser };
