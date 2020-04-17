require("dotenv").config();

/* APP DEPENDENCIES */
const express = require("express");
const morgan = require("morgan");
require("./auth");

/* APP CONFIGS */
const app = express();

/* ROUTE FETCHERS */
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const profileRouter = require("./routes/profile");

/* APP MIDDLEWARE */
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* ROUTE SETTERS */
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/profile", profileRouter);

/* ERROR HANDLER */
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

module.exports = app;
