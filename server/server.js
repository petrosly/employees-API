const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 3000;
const database = "mongodb://localhost:27017/test";

//Connecting to database and catching connection errors, then starting the server
mongoose
  .connect(database)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} and database is connected`);
    });
  })
  .catch((error) => {
    console.error(error);
  });

app.get("/", (req, res) => {
  res.send("Trexeis!");
});

const user = new mongoose.Schema({
  name: String,
});

const User = mongoose.model("user", user);
