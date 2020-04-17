const connection = require("../config");

// constructor for Users
const User = function (user) {
  this.firstName = user.firstName;
  this.lastName = user.lastName;
  this.email = user.email;
  this.password = user.password;
};

// functions for saving data and reading data from the db
// Create
User.create = (newUserObj, done) => {
  connection.query(
    "INSERT INTO users SET ?",
    newUserObj,
    (queryError, queryResults) => {
      // check error --. if exists return the error msg else return the created user
      queryError
        ? done(queryError, null)
        : done(null, {
            id: queryResults.insertId,
            ...newUserObj,
            message: "Success!",
          });
    }
  );
};

/* User.findOne; */
User.findOne = (newUserEmail, done) => {
  connection.query(
    `SELECT * FROM users WHERE email = '${newUserEmail}' `,
    (queryError, queryResults) => {
      // check error --> return the error
      queryError && done(queryError, null);

      // check for the results found...if user exists, return user else return a flag for not found
      queryResults.length
        ? done(null, queryResults[0])
        : done({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
