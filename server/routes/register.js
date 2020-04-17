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
      newUser.password = hashedPassword;

      User.create(newUser, (error, data) => {
        error
          ? res.status(500).send({
              message: "A user with this email already exists!",
            })
          : res.status(200).send(data);
      });
    })
    .catch((hashError) =>
      console.error(`Something went wrong when hashing: ${hashError}`)
    );
});

module.exports = router;
