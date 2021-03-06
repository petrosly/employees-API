const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const database = "mongodb://localhost:27017/test";
const generateController = require("../controllers/generate.controller");
const {
  findUsers,
  findUserById,
  createUser,
  deleteUser,
  deleteDepartment,
  updateUserById,
} = require("../controllers/crud.controllers");

//Middleware

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev"));
mongoose.set("useCreateIndex", true);

//Connecting to database and catching connection errors, then starting the server

mongoose
  .connect(database, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} and database is connected`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.get("/", (req, res) => {
  res.send("Server is currently running");
});

app.get("/api/generate", (req, res) => {
  generateController(req, res);
});

app.get("/api/employees", (req, res) => {
  findUsers(req, res);
});

app.get("/api/employees/:id", (req, res) => {
  findUserById(req, res);
});

app.post("/api/employees", (req, res) => {
  createUser(req, res);
});

app.delete("/api/employees/:id", (req, res) => {
  deleteUser(req, res);
});

app.delete("/api/department/:department", (req, res) => {
  deleteDepartment(req, res);
});

app.put("/api/employees/:id", (req, res) => {
  updateUserById(req, res);
});

app.all("/*", (req, res) => {
  res.status(404).send("The url you are trying to access is not valid");
});
