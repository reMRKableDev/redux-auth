const connection = require("../config");

/* Constructor for User */
const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
};

/* SQL Instructions */

// Create new user
User.create = (newUserObj, done) => {
  connection.query(
    "INSERT INTO users SET ? ",
    newUserObj,
    (queryError, queryResults) => {
      const secureUser = {
        firstName: newUserObj.firstName,
        lastName: newUserObj.lastName,
        email: newUserObj.email,
      };

      queryError
        ? done(queryError, null)
        : done(null, {
            id: queryResults.insertId,
            ...secureUser,
            message: "Success!",
          });
    }
  );
};

User.findOne = (newUserEmail, done) => {
  connection.query(
    `SELECT * FROM users WHERE email = '${newUserEmail}'`,
    (queryError, queryResults) => {
      queryError && done(queryError, null);

      queryResults.length
        ? done(null, queryResults[0])
        : done({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
