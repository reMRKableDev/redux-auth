const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const secureUser = {
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
    };
    res.status(200).send(secureUser);
  }
);

module.exports = router;
