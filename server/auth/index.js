require("dotenv").config();

const bcrypt = require("bcrypt");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../database/models/user.model");
const { APP_SECRET } = process.env;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (email, password, done) => {
      User.findOne(email, (err, foundUser) => {
        if (err) {
          if (err.kind === "not_found") {
            done(null, false, { message: "Can't find user with this email!" });
          } else {
            done(null, false, {
              message: "Connection error when retrieving the user",
            });
          }
        } else {
          bcrypt
            .compare(password, foundUser.password)
            .then((isUser) => isUser && done(null, foundUser))
            .catch((compareErr) =>
              console.error(`Compare error: ${compareErr}`)
            );
        }
      });
    }
  )
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: APP_SECRET,
    },
    (jwtPayload, done) => {
      User.findOne(jwtPayload.email, (err, foundUser) => {
        err ? console.error(error) : done(null, foundUser);
      });
    }
  )
);
