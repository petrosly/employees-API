const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
const database = "mongodb://localhost:27017/test";
const generateController = require("../controllers/generate.controller");

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
  generateController();
  res.status(200).send("Generated usersArray");
});
