const mongoose = require("mongoose");
const { findOneAndDelete, findByIdAndDelete } = require("../models/user.model");
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
      !mongoose.isValidObjectId(req.params.id) ||
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

const deleteUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id) || req.params.id.length != 24) {
    res.status(400).send("The id you provided is not in valid format.");
    return;
  }

  try {
    await User.findByIdAndDelete(req.params.id).exec();
    res.status(200).send(`User with id ${req.params.id} is now deleted`);
  } catch (e) {
    res.status(400).send("An error occured while deleting the user: " + e);
  }
};

const deleteDepartment = async (req, res) => {
  let employeesOfDepartment;
  try {
    employeesOfDepartment = await User.find({
      department: req.params.department,
    });
  } catch (e) {
    res
      .status(400)
      .send(
        "An error occured when trying to find users with the given department: " +
          e
      );
  }

  if (employeesOfDepartment.length == 0) {
    res
      .status(400)
      .send("No employees inside the department you try to delete");
    return;
  }

  employeesOfDepartment.forEach(async (employee) => {
    try {
      await User.deleteOne(employee).exec();
    } catch (e) {
      res
        .status(400)
        .send("An error occured while deleting the department you want: " + e);
    }
  });

  res
    .status(200)
    .send(`Deleted ${req.params.department} department successfully`);
};

const updateUser = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id) || req.params.id.length != 24) {
    res.status(400).send("The id you provided is not in valid format.");
    return;
  }
};

module.exports = {
  findUsers,
  findUserById,
  createUser,
  deleteUser,
  deleteDepartment,
  updateUser,
};
