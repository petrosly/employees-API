const express = require("express");
const { json, urlencoded } = require("body-parser");
const morgan = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const database = "mongodb://localhost:27017/test";
const generateController = require("../controllers/generate.controller");
const findUsers = require("../controllers/crud.controllers");

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
