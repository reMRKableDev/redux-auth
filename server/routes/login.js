const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { APP_SECRET } = process.env;
const rateLimit = require("express-rate-limit");

// set up rate limiter: maximum of 100 requests per 15 minutes
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // max 100 requests per windowMs
});

router.post("/", limiter, (req, res, next) => {
  passport.authenticate("local", (authErr, user, info) => {
    authErr && res.status(500).send(authErr);

    if (!user) {
      res.status(400).send(info);
    } else {
      // token
      const token = jwt.sign(JSON.stringify(user), APP_SECRET);

      //secure user
      const secureUser = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      };

      // send back info to client
      res.status(200).send({ secureUser, token });
    }
  })(req, res, next);
});

module.exports = router;
