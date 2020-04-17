const bcrypt = require("bcrypt");
const express = require("express");
const router = express.Router();
const User = require("../database/models/user.model");

router.post("/", (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: req.body.password,
  });

  bcrypt
    .hash(newUser.password, 10)
    .then((hashedPassword) => {
      // set hashed password
      newUser.password = hashedPassword;

      // create new user
      User.create(newUser, (error, data) => {
        // if error --> return 500 status else return data
        error
          ? res
              .status(500)
              .send({ message: "A user with this email already exists!" })
          : res.status(200).send(data);
      });
    })
    .catch((hashErr) => console.error(`Hash Error: ${hashErr}`));
});

module.exports = router;
